import { api } from "@/services/api";

export const getPokemonById = async (id: string) => {
    const url = `cards/${id}`;
    const response = await api.get(url);

    return response.data;
  };