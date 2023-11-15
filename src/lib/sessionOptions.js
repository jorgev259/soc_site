const sessionOptions = {
  password: process.env.IRONCLAD,
  cookieName: 'socuser',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
}

export default sessionOptions
