import { Details } from "@/pages/Details";
import { Home } from "@/pages/Home";
import { Routes, Route } from "react-router-dom";

export function Router() {
  return (
    <Routes>
      <Route path="/pokemons" element={<Home />} />
      <Route path="/pokemon/:id" element={<Details />} />
    </Routes>
  );
}
