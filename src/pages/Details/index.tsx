import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "@/services/api";

interface PokemonCardDetails {
  id: string;
  name: string;
  images: {
    large: string;
  };
  types: string[];
  resistances?: { type: string; value: string }[];
  weaknesses?: { type: string; value: string }[];
  attacks: { name: string; damage: string }[];
}

export const Details = () => {
  const { id } = useParams<{ id: string }>();
  const [cardDetails, setCardDetails] = useState<PokemonCardDetails | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const response = await api.get(`cards/${id}`);
        setCardDetails(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar detalhes do Pokémon:", error);
        setLoading(false);
      }
    };

    fetchCardDetails();
  }, [id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) {
    return <div className="text-center">Loading details of this pokemon</div>;
  }

  if (!cardDetails) {
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
            src={cardDetails.images.large}
            alt={cardDetails.name}
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="card-details p-4">
          <h2 className="text-3xl font-bold mb-2">{cardDetails.name}</h2>
          <p className="text-sm text-gray-600">ID: {cardDetails.id}</p>
          <div className="flex gap-2 mt-2">
            {cardDetails.types?.map((type) => (
              <span
                key={type}
                className="text-xs bg-gray-200 px-2 py-1 rounded-full"
              >
                {type}
              </span>
            ))}
          </div>
          {cardDetails.resistances && cardDetails.resistances.length > 0 && (
            <div className="mb-4">
              <h2 className="text-2xl font-semibold">Resistances</h2>
              <ul className="list-disc ml-5">
                {cardDetails.resistances.map((resistance) => (
                  <li key={resistance.type}>
                    {resistance.type}: {resistance.value}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {cardDetails.weaknesses && cardDetails.weaknesses.length > 0 && (
            <div className="mb-4">
              <h2 className="text-2xl font-semibold">Weaknesses</h2>
              <ul className="list-disc ml-5">
                {cardDetails.weaknesses.map((weakness) => (
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
              {cardDetails.attacks?.map((attack, index) => (
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
