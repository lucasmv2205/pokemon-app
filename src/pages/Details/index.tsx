import { useNavigate } from "react-router-dom";
import { usePokemon } from "@/hooks/usePokemon";

export const Details = () => {
  const navigate = useNavigate();
  const { selectedPokemon } = usePokemon();

  const handleBackClick = () => {
    navigate(-1);
  };

  if (!selectedPokemon) {
    return (
      <div className="text-center">Any details found for this Pokémon.</div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <button onClick={handleBackClick} className="mb-4 text-blue-500">
        Back
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src={selectedPokemon.images.large}
            alt={selectedPokemon.name}
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="card-details p-4">
          <h2 className="text-3xl font-bold mb-2">{selectedPokemon.name}</h2>
          <p className="text-sm text-gray-600">ID: {selectedPokemon.id}</p>
          <div className="flex gap-2 mt-2">
            {selectedPokemon.types?.map((type) => (
              <span
                key={type}
                className="text-xs bg-gray-200 px-2 py-1 rounded-full"
              >
                {type}
              </span>
            ))}
          </div>
          {selectedPokemon.resistances &&
            selectedPokemon.resistances.length > 0 && (
              <div className="mb-4">
                <h2 className="text-2xl font-semibold">Resistances</h2>
                <ul className="list-disc ml-5">
                  {selectedPokemon.resistances.map((resistance) => (
                    <li key={resistance.type}>
                      {resistance.type}: {resistance.value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          {selectedPokemon.weaknesses &&
            selectedPokemon.weaknesses.length > 0 && (
              <div className="mb-4">
                <h2 className="text-2xl font-semibold">Weaknesses</h2>
                <ul className="list-disc ml-5">
                  {selectedPokemon.weaknesses.map((weakness) => (
                    <li key={weakness.type}>
                      {weakness.type}: {weakness.value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Attacks:</h3>
            <ul className="list-disc pl-5">
              {selectedPokemon.attacks?.map((attack, index) => (
                <li key={index}>
                  <strong>{attack.name}</strong> - {attack.damage} of damage
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
