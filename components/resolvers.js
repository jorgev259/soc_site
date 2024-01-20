import { AuthenticationError, ForbiddenError } from 'apollo-server-errors'
import path from 'path'
import { getIronSession } from 'iron-session'

import sessionOptions from '@/next/lib/sessionOptions'
import { processImage, getImgColor } from '@/server/utils/image'

const getSession = (req, res) => getIronSession(req, res, sessionOptions)

export const isAuthed = next => (root, args, context, info) => {
  if (!context.user) throw new AuthenticationError()
  return next(root, args, context, info)
}

const hasPerm = perm => next => async (root, args, context, info) => {
  const roles = await context.user.getRoles()
  const permissions = roles.map(r => r.permissions).flat()
  if (!permissions.includes(perm)) throw new ForbiddenError()

  return next(root, args, context, info)
}

export const hasRole = role => [isAuthed, hasPerm(role)]
export const hasRolePage = allowedRoles =>
  async context => {
    const { req, res } = context
    const session = await getSession(req, res)
    const { permissions = [] } = session

    if (!permissions.some(p => allowedRoles.includes(p))) return { redirect: { destination: '/404', permanent: false } }
    return { props: {} }
  }

export const isAuthedPage =
  async (context, props = {}) => {
    const { req, res } = context
    const { username = null } = await getSession(req, res)

    if (!username) return { redirect: { destination: '/404', permanent: false } }
    else return { props }
  }

export const placeholder = (parent, folder) => {
  if (!parent.placeholder) solvePlaceholder(parent, folder)

  return parent.placeholder
}

async function solvePlaceholder (parent, folder) {
  const id = parent.slug || parent.id
  const pathString = path.join('/var/www/soc_img/img', folder)
  const fullPath = path.join(pathString, `${id}.png`)

  parent.placeholder = await processImage(fullPath)
  await parent.save()
}

export const headerColor = async (parent, folder) => parent.headerColor || (await solveHeaderColor(parent, folder)) || '#ffffff'

async function solveHeaderColor (parent, folder) {
  const color = await getImgColor(`${folder}/${parent.slug || parent.id}`)
  parent.headerColor = color
  parent.save()

  return color
}
