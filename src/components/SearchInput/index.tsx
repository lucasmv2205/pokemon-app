import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface SearchInputProps {
  onSearch: (query: string) => void;
}

export const SearchInput = ({ onSearch }: SearchInputProps) => {
  const [searchParam, setSearchParam] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(searchParam);
  const { t } = useTranslation();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchParam);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchParam]);

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  return (
    <input
      data-cy="search-input"
      type="text"
      placeholder={t("search_by_name")}
      value={searchParam}
      onChange={(e) => setSearchParam(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};
