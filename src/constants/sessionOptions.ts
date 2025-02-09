const sessionOptions = {
  password: process.env.IRONCLAD as string,
  cookieName: 'soc_cookie',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
}

export default sessionOptions
