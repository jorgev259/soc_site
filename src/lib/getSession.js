import { getIronSession } from 'iron-session-v8'
import sessionOptions from './sessionOptions'

const getSession = async (req, res) => {
  const session = getIronSession(req, res, sessionOptions)
  return session
}

export default getSession
