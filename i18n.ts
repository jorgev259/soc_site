import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation';

import locales from './locales/langs.json'

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./locales/langs/${locale}.json`)).default
  };
});
