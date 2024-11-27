import { api } from "@/services/api";

interface getPokemonCardsProps {
  currentPage: number;
  pageSize: number;
  orderBy: string;
  names?: string;
}

export const getPokemonCards = async ({currentPage, pageSize, orderBy, names}: getPokemonCardsProps) => {
  const response = await api.get("cards", {
      params: {
        page: currentPage,
        pageSize,
        orderBy,
        q: names ? `name:${names}` : ''
      },
    });
  return response.data;
};