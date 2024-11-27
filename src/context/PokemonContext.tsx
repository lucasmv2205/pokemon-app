import { PokemonCardType } from "@/types";
import { createContext, useState } from "react";

export const PokemonContext = createContext<{
  pokemons: PokemonCardType[];
  setPokemons: React.Dispatch<React.SetStateAction<PokemonCardType[]>>;
  selectedPokemon: PokemonCardType | null;
  setSelectedPokemon: React.Dispatch<
    React.SetStateAction<PokemonCardType | null>
  >;
  selectPokemon: (pokemon: PokemonCardType) => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
}>({
  pokemons: [],
  setPokemons: () => {},
  selectedPokemon: null,
  setSelectedPokemon: () => {},
  selectPokemon: () => {},
  loading: true,
  setLoading: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  totalPages: 1,
  setTotalPages: () => {},
  pageSize: 20,
});

interface PokemonProviderProps {
  children: React.ReactNode;
}

const PokemonProvider = ({ children }: PokemonProviderProps) => {
  const [pokemons, setPokemons] = useState<PokemonCardType[]>([]);
  const [selectedPokemon, setSelectedPokemon] =
    useState<PokemonCardType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const pageSize = 20;

  const selectPokemon = (pokemon: PokemonCardType) => {
    setSelectedPokemon(pokemon || null);
  };

  return (
    <PokemonContext.Provider
      value={{
        pokemons,
        setPokemons,
        selectedPokemon,
        setSelectedPokemon,
        selectPokemon,
        loading,
        setLoading,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
        pageSize,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export { PokemonProvider };
