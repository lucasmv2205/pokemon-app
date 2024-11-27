import { PokemonCardType } from "@/types";

interface PokemonCardProps {
  pokemon: PokemonCardType;
  handleCardClick: (pokemon: PokemonCardType) => void;
}

export const PokemonCard = ({ pokemon, handleCardClick }: PokemonCardProps) => {
  const { id, images, name, types } = pokemon;

  return (
    <div
      key={id}
      className="card bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
      onClick={() => handleCardClick(pokemon)}
    >
      <img
        src={images.small}
        alt={name}
        className="w-full h-48 object-contain"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-sm text-gray-600">ID: {id}</p>
        <div className="flex gap-2">
          {types.map((type) => (
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
