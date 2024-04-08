import { AuthenticationError, ForbiddenError } from 'apollo-server-errors'
import { getIronSession } from 'iron-session'

import sessionOptions from '@/next/constants/sessionOptions'

const getSession = (req, res) => getIronSession(req, res, sessionOptions)

export const isAuthedPages = (next) => (root, args, context, info) => {
  if (!context.user) throw new AuthenticationError()
  return next(root, args, context, info)
}

const hasPermPages = (perm) => (next) => async (root, args, context, info) => {
  const roles = await context.user.getRoles()
  const permissions = roles.map((r) => r.permissions).flat()
  if (!permissions.includes(perm)) throw new ForbiddenError()

  return next(root, args, context, info)
}

export const hasRolePage =
  (allowedRoles) =>
  async (context, props = {}) => {
    const { req, res } = context
    const session = await getSession(req, res)
    const { permissions = [] } = session

    if (!permissions.some((p) => allowedRoles.includes(p)))
      return { redirect: { destination: '/404', permanent: false } }
    return { props }
  }

export const hasRolePages = (role) => [isAuthedPages, hasPermPages(role)]

export const isAuthedPage = async (context, props = {}) => {
  const { req, res } = context
  const { username = null } = await getSession(req, res)

  if (!username) return { redirect: { destination: '/404', permanent: false } }
  else return { props }
}
