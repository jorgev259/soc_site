export async function getTranslation (locale = 'en') {
  const bundle = await import(`@/locales/langs/${locale}.json`)
  return bundle.default || bundle
}
