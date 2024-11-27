import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PokemonType } from "@/types";
import { PokemonCard } from "@/components/PokemonCard";
import { getPokemonCards } from "@/services/getPokemonCards";
import { usePokemon } from "@/hooks/usePokemon";
import { SearchInput } from "@/components/SearchInput";

export const Home = () => {
  const {
    pokemons,
    setPokemons,
    selectPokemon,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    loading,
    setLoading,
    pageSize,
  } = usePokemon();
  const [searchParam, setSearchParam] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemonCards = async () => {
      try {
        const { data, totalCount } = await getPokemonCards({
          currentPage,
          pageSize,
          orderBy: "name",
          names: searchParam,
        });
        setPokemons(data);
        const calculatedTotalPages = Math.ceil(totalCount / pageSize);
        setTotalPages(calculatedTotalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
      }
    };

    fetchPokemonCards();
  }, [
    currentPage,
    pageSize,
    setLoading,
    setPokemons,
    setTotalPages,
    totalPages,
    searchParam,
  ]);

  const handleCardClick = (pokemon: PokemonType) => {
    selectPokemon(pokemon);
    navigate(`/pokemon/${pokemon.id}`);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <SearchInput onSearch={setSearchParam} />
      </div>
      <h1 className="text-3xl font-bold mb-6 text-center">Pokémon Cards</h1>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {pokemons?.map((card: PokemonType) => (
              <PokemonCard
                key={card.id}
                pokemon={card}
                handleCardClick={handleCardClick}
              />
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
