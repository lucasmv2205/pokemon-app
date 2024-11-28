import { BrowserRouter, Navigate } from "react-router-dom";
import { Details } from "@/pages/Details";
import { EmptyPage } from "@/pages/EmptyPage";
import { Home } from "@/pages/Home";
import { Routes, Route } from "react-router-dom";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/pokemons" />} />
        <Route path="/pokemons" element={<Home />} />
        <Route path="/pokemon/:id" element={<Details />} />
        <Route path="*" element={<EmptyPage />} />
      </Routes>
    </BrowserRouter>
  );
}
