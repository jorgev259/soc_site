import slugifyFn from 'slugify'

export const slugify = text => slugifyFn(text, { lower: true, strict: true })
