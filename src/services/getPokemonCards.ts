import { api } from "@/services/api";

interface getPokemonCardsProps {
  currentPage: number;
  pageSize: number;
}

export const getPokemonCards = async ({currentPage, pageSize}: getPokemonCardsProps) => {
  const response = await api.get("cards", {
      params: {
        page: currentPage,
        pageSize,
      },
    });
  return response.data;
};