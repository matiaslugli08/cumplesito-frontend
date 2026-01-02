import React from 'react';
import { useLanguage, Language } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

/**
 * Language selector component
 */
export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

  return (
    <div className="relative inline-block">
      <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-gray-300 hover:border-primary-500 transition-colors">
        <Globe className="w-4 h-4 text-gray-600" />
        <select
          value={language}
          onChange={handleChange}
          className="bg-transparent outline-none cursor-pointer text-sm font-medium text-gray-700"
        >
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </div>
    </div>
  );
};
