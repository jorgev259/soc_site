import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'

import sessionOptions from './sessionOptions'

const getSession = () => getIronSession(cookies(), sessionOptions)

export default getSession
