import { PokemonType } from "@/types";
import { createContext, useState } from "react";

export const PokemonContext = createContext<{
  pokemons: PokemonType[];
  setPokemons: React.Dispatch<React.SetStateAction<PokemonType[]>>;
  selectedPokemon: PokemonType | null;
  setSelectedPokemon: React.Dispatch<React.SetStateAction<PokemonType | null>>;
  selectPokemon: (pokemon: PokemonType) => void;
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
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonType | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const pageSize = 20;

  const selectPokemon = (pokemon: PokemonType) => {
    setSelectedPokemon(pokemon);
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
