import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem("selectedLanguage", language);
  };

  useEffect(() => {
    const storedLanguage = localStorage.getItem("selectedLanguage");
    if (storedLanguage && storedLanguage !== i18n.language) {
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n]);

  return (
    <div className="mb-6 flex justify-end">
      <select
        onChange={(e) => changeLanguage(e.target.value)}
        value={i18n.language}
        className="px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 shadow-md text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200 ease-in-out"
      >
        <option value="en">EN</option>
        <option value="pt">PT</option>
      </select>
    </div>
  );
};
