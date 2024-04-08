const sessionOptions = {
  password: process.env.IRONCLAD as string,
  cookieName: 'socuser',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
}

export default sessionOptions
