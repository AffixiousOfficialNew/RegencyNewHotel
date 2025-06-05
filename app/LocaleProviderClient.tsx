'use client';

import { useState, useEffect, ReactNode } from 'react';
import { IntlProvider } from 'next-intl';

export default function LocaleProviderClient({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState('en');
  const [messages, setMessages] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    const userLang = navigator.language.startsWith('ar') ? 'ar' : 'en';
    setLocale(userLang);

    import(`../messages/${userLang}.json`).then((module) => {
      setMessages(module.default);
    });
  }, []);

  if (!messages) {
    return null; // or loading spinner
  }

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
}
