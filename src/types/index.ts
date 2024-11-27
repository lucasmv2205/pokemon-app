export type PokemonType = {
  id: string;
  name: string;
  types: string[];
  images: {
    small: string;
    large: string
  };
  resistances?: { type: string; value: string }[];
  weaknesses?: { type: string; value: string }[];
  attacks: { name: string; damage: string }[];
}

