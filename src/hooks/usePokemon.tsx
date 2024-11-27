import { PokemonContext } from "@/context/PokemonContext";
import { useContext } from "react";

function usePokemon() {
  const context = useContext(PokemonContext);

  if (!context) {
    throw new Error("usePokemon must be used within a PokemonProvider");
  }

  return context;
}

export { usePokemon };
