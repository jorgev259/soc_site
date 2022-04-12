import bcrypt from 'bcrypt'
import { UserInputError, ForbiddenError } from 'apollo-server-errors'
import generator from 'generate-password'
import { composeResolvers } from '@graphql-tools/resolvers-composition'
import { DateTime } from 'luxon'
import { Op } from 'sequelize'
import path from 'path'
import fs from 'fs-extra'
import sharp from 'sharp'

import { createForgor } from '@/lib/forgor'
import { hasRole, isAuthed } from '@/lib/resolvers'
import { getPlaiceholder } from '@/lib/plaiceholder/plaiceholder.ts'

const resolversComposition = {
  'Mutation.*': hasRole('MANAGE_USER'),
  'Mutation.updatePass': [],
  'Mutation.createForgorLink': [],
  'Mutation.updateUser': [isAuthed],
  'Mutation.registerUser': []
}

const streamToString = (stream) => {
  const chunks = []
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
    stream.on('error', (err) => reject(err))
    stream.on('end', () => resolve(Buffer.concat(chunks)))
  })
}

async function cropPFP (streamItem, username) {
  const { createReadStream } = await streamItem
  const pathString = '/var/www/soc_img/img/user'
  const fullPath = path.join(pathString, `${username}.png`)

  await fs.ensureDir(pathString)

  const image = await streamToString(createReadStream())
  let sharpImage = sharp(image)
  const metadata = await sharpImage.metadata()
  const { width, height } = metadata

  if (width !== height) {
    sharpImage = sharpImage
      .extract(width > height
        ? { left: (width - height) / 2, top: 0, width: height, height }
        : { left: 0, top: (height - width) / 2, width, height: width }
      )
  }

  await sharpImage.resize({ width: 200, height: 200 })
    .png()
    .toFile(fullPath)

  const result = await getPlaiceholder(fullPath)
  const { base64 } = result

  return base64
}

const resolvers = {
  Mutation: {
    registerUser: async (_, { username, email, pfp }, { db }) => {
      return db.transaction(async () => {
        await Promise.all([
          db.models.user.findByPk(username).then(result => {
            if (result) throw new UserInputError('Username already in use')
          }),
          db.models.user.findOne({ where: { email } }).then(result => {
            if (result) throw new UserInputError('Email already in use')
          })
        ])

        const password = generator.generate({ length: 30, numbers: true, upercase: true, strict: true })
        const user = await db.models.user.create({ username, email, password: await bcrypt.hash(password, 10) })
        if (pfp) user.placeholder = pfp ? await cropPFP(pfp, username) : 'data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAACwAQCdASoEAAQAAUAmJZgCdAEO9p5AAPa//NFYLcn+a7b+3z7ynq/qXv+iG0yH/y1D9eBf9pqWugq9G0RnxmxwsjaA2bW8AAA='

        await createForgor(user, db)

        return true
      })
    },
    updateUserRoles: async (parent, { username, roles }, { db, payload }, info) => {
      const user = await db.models.user.findByPk(username)
      user.setRoles(roles)
      await user.save()
      return true
    },
    deleteUser: async (parent, { username }, { db, payload }, info) => {
      const user = await db.models.user.findByPk(username)
      if (!user) throw new UserInputError('Not Found')
      user.destroy()
      return 1
    },

    createForgorLink: async (_, { key }, { db }) => {
      const user = await db.models.user.findOne({ where: { [Op.or]: [{ username: key }, { email: key }] } })
      if (!user) throw new UserInputError('Not Found')

      await createForgor(user, db)
      return true
    },
    updatePass: async (_, { key, pass }, { db }) => {
      const row = await db.models.forgor.findByPk(key)
      if (!row) throw new ForbiddenError()

      const now = DateTime.now()
      const expires = DateTime.fromJSDate(row.expires)

      if (now > expires) throw new ForbiddenError()

      return db.transaction(async () => {
        const user = await db.models.user.findByPk(row.username)
        user.password = await bcrypt.hash(pass, 10)

        await user.save()
        await row.destroy()
        return true
      })
    },
    updateUser: async (_, { username, email, password, pfp }, { db, user }) => {
      if (username) user.username = username
      if (email) user.email = email
      if (password) user.password = await bcrypt.hash(password, 10)
      if (pfp) user.placeholder = await cropPFP(pfp, username)

      await user.save()
      return true
    },

    createRole: async (parent, args, { db, user, payload }) => db.models.role.create(args),
    updateRole: async (parent, { key, name, permissions }, { db, payload }) => {
      const role = await db.models.role.findByPk(key)
      if (!role) throw new UserInputError('Not Found')

      if (role.name !== name) {
        await db.query(`UPDATE roles SET name = "${name}" WHERE name = "${key}"`)
      }
      role.permissions = permissions

      await role.save()
      return role
    },
    deleteRole: async (parent, { name }, { db, user, payload }) => {
      const role = await db.models.role.findByPk(name)
      if (!role) throw new UserInputError('Not Found')
      await role.destroy()

      return name
    }
  }
}

export default composeResolvers(resolvers, resolversComposition)
