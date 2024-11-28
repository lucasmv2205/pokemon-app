import { PokemonType } from "@/types";

interface PokemonCardProps {
  pokemon: PokemonType;
  handleCardClick: (pokemon: PokemonType) => void;
}

export const PokemonCard = ({ pokemon, handleCardClick }: PokemonCardProps) => {
  const { id, images, name, types } = pokemon;

  return (
    <div
      key={id}
      className="card bg-slate-100 shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow hover:-translate-y-1"
      onClick={() => handleCardClick(pokemon)}
      data-cy="pokemon-card"
    >
      <img
        src={images.small}
        alt={name}
        className="w-full h-48 object-contain mt-4"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-sm text-gray-600">ID: {id}</p>
        <div className="flex gap-2 mt-2">
          {types &&
            types.length > 0 &&
            types.map((type) => (
              <span
                key={type}
                className="text-xs bg-gray-200 px-2 py-1 rounded-full"
              >
                {type}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};
