"use client";
import Image from "next/image";
import React from "react";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type NavbarProps = {
  pokemonFilter: (value: string) => void; // função que recebe a string do filtro
};

const Navbar: React.FC<NavbarProps> = ({ pokemonFilter }) => {
  return (
    <nav className="w-full bg-slate-900 text-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-3">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <div className="flex items-center relative m-0">
            <Image src="/logo.png" alt="Logo pokemon" height={70} width={70} />
          </div>

          {/* BARRA DE PESQUISA */}
          <div className="flex-1 flex justify-center px-2">
            <div className="relative w-full max-w-md">
              {/* Ícone dentro do input */}
              <SearchIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                fontSize="medium"
              />

              {/* Substituímos o input pelo TextField */}
              <TextField
                fullWidth
                placeholder="Pesquisar..."
                variant="outlined"
                size="small"
                onChange={(e) => pokemonFilter(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    backgroundColor: "#1f2937", // mesma cor do seu input original bg-gray-800
                    borderColor: "#4b5563", // mesma cor da borda border-gray-600
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#4b5563",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#4b5563",
                  },
                  "& .MuiInputBase-input": {
                    paddingLeft: "2.5rem", // espaço para o ícone
                  },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#3b82f6", // cor do foco
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "white",
                    opacity: 0.6,
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
