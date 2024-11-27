import { PokemonProvider } from "@/context/PokemonContext";

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => (
  <PokemonProvider>{children}</PokemonProvider>
);

export default AppProvider;
