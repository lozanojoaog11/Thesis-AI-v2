import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './Button';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'pt', label: 'PT' },
    { code: 'es', label: 'ES' },
  ];

  return (
    <div className="absolute top-4 right-4 flex space-x-2">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          variant={i18n.language === lang.code ? 'primary' : 'secondary'}
          size="sm"
        >
          {lang.label}
        </Button>
      ))}
    </div>
  );
};
