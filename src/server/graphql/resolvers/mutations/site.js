import { composeResolvers } from '@graphql-tools/resolvers-composition'
import { UserInputError } from 'apollo-server-errors'
import fs from 'fs-extra'
import path from 'path'

import { img } from '../../../utils'
import { hasRole } from '../../../utils/resolvers'

const resolversComposition = { 'Mutation.*': hasRole('UPDATE') }
const resolvers = {
  Mutation: {
    config: async (parent, data, { db, payload }, info) =>
      db.models.config.upsert(data)
        .then(() => db.models.config.findByPk(data.name)),

    uploadBanner: async (parent, { banner }, { db, payload }) => {
      const timestamp = Date.now()
      await img(banner, 'live', timestamp)
      await db.models.config.upsert({ name: 'banner', value: timestamp })

      return 1
    },

    selectBanner: async (parent, { name }, { db }) => {
      const filePath = path.join('/var/www/soc_img/img/live', `${name}.png`)
      if (!await fs.pathExists(filePath)) throw new UserInputError(`Banner '${name}' doesnt exist`)

      await db.models.config.upsert({ name: 'banner', value: name })

      return 1
    }
  }
}

export default composeResolvers(resolvers, resolversComposition)
