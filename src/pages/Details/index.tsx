import { useNavigate, useParams } from "react-router-dom";
import { usePokemon } from "@/hooks/usePokemon";
import { getPokemonById } from "@/services/getPokemonById";
import { useState } from "react";
import { AttackType } from "@/types";
import { ModalAttack } from "@/components/ModalAttack";
import AttacksList from "@/components/AttacksList";

export const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedPokemon, selectPokemon } = usePokemon();
  const [selectedAttack, setSelectedAttack] = useState<AttackType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAttackClick = (attack: AttackType) => {
    setSelectedAttack(attack);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAttack(null);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const getPokemon = async () => {
    try {
      if (id) {
        const { data } = await getPokemonById(id);
        selectPokemon(data);
      } else {
        console.error("No ID provided");
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  if (!selectedPokemon) {
    getPokemon().catch(() => {
      return (
        <div className="text-center">Any details found for this Pokémon.</div>
      );
    });
  }

  if (selectedPokemon) {
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
                  <h2 className="effect_label">Resistances</h2>
                  <ul className="effect_list">
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
                  <h2 className="effect_label">Weaknesses</h2>
                  <ul className="effect_list">
                    {selectedPokemon.weaknesses.map((weakness) => (
                      <li key={weakness.type}>
                        {weakness.type}: {weakness.value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            {selectedPokemon.attacks && selectedPokemon.attacks.length > 0 && (
              <AttacksList
                attacks={selectedPokemon.attacks}
                handleAttackClick={handleAttackClick}
              />
            )}
          </div>
        </div>

        {isModalOpen && selectedAttack && (
          <ModalAttack
            attack={selectedAttack}
            handleCloseModal={handleCloseModal}
          />
        )}
      </div>
    );
  }
};
