import { render, screen, fireEvent } from "@testing-library/react";
import { PokemonCard } from "@/components/PokemonCard";
import { PokemonType } from "@/types";

describe("PokemonCard", () => {
  const mockPokemon: PokemonType = {
    id: "xy7-54",
    name: "Pikachu",
    types: ["Electric"],
    images: {
      small: "https://images.pokemontcg.io/xy7/54.png",
      large: "https://images.pokemontcg.io/xy7/54_hq.png",
    },
    attacks: [
      {
        name: "Flamethrower",
        cost: ["Fire", "Colorless"],
        convertedEnergyCost: 3,
        damage: "90",
        text: "A powerful fire attack that burns the enemy.",
      },
    ],
  };

  const mockHandleCardClick = jest.fn();

  it("renders the Pokemon card with correct data", () => {
    render(
      <PokemonCard
        pokemon={mockPokemon}
        handleCardClick={mockHandleCardClick}
      />
    );

    expect(screen.getByText(mockPokemon.name)).toBeInTheDocument();

    expect(screen.getByText(`ID: ${mockPokemon.id}`)).toBeInTheDocument();

    expect(screen.getByText(mockPokemon.types[0])).toBeInTheDocument();

    const img = screen.getByAltText(mockPokemon.name);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", mockPokemon.images.small);
  });

  it("calls handleCardClick with the correct ID when clicked", () => {
    render(
      <PokemonCard
        pokemon={mockPokemon}
        handleCardClick={mockHandleCardClick}
      />
    );

    const card = screen
      .getByRole("img", { name: mockPokemon.name })
      .closest("div");
    expect(card).toBeInTheDocument();

    if (card) fireEvent.click(card);

    expect(mockHandleCardClick).toHaveBeenCalledTimes(1);
    expect(mockHandleCardClick).toHaveBeenCalledWith(mockPokemon);
  });
});
