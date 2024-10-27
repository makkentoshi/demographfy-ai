"use client"; 

import { IntlProvider } from "react-intl";
import { useEffect, useState } from "react";

interface IntlWrapperProps {
  locale: string;
  children: React.ReactNode;
}

const IntlWrapper: React.FC<IntlWrapperProps> = ({ locale, children }) => {
  const [messages, setMessages] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadMessages = async () => {
      const loadedMessages = await import(`../public/locales/${locale}.json`);
      setMessages(loadedMessages.default);
    };

    loadMessages();
  }, [locale]);

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
};

export default IntlWrapper;