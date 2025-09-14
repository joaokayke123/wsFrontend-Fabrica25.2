'use client';

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export type Pokemon = {
  id: number;
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
};

export type PokemonCardType = {
  id: number;
  name: string;
  image: string;
  types: { type: { name: string } }[];
};

export const usePokemons = (pokemonsPerPage: number = 20, maxPokemonId: number = 1010) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Estados da paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(Math.ceil(maxPokemonId / pokemonsPerPage));

  // Carrega favoritos do localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('pokemonFavorites');
    if (savedFavorites) setFavorites(new Set(JSON.parse(savedFavorites)));
  }, []);

  // Salva favoritos no localStorage
  useEffect(() => {
    localStorage.setItem('pokemonFavorites', JSON.stringify([...favorites]));
  }, [favorites]);

  // Carrega Pokémon da página atual

  const getPokemons = useCallback(
    async (page: number) => {
      setLoading(true);
      const startId = (page - 1) * pokemonsPerPage + 1;
      const endId = Math.min(startId + pokemonsPerPage - 1, maxPokemonId);

      const endpoints = Array.from(
        { length: endId - startId + 1 },
        (_, i) => `https://pokeapi.co/api/v2/pokemon/${startId + i}`
      );

      try {
        const responses = await Promise.all(
          endpoints.map((url) => axios.get(url).catch(() => null))
        );
        const data = responses.filter((res) => res !== null).map((res) => res!.data);
        setPokemons(data);
        setAllPokemons(data);
      } finally {
        setLoading(false);
      }
    },
    [pokemonsPerPage, maxPokemonId]
  );

  useEffect(() => {
    if (!showFavoritesOnly) getPokemons(currentPage);
  }, [currentPage, showFavoritesOnly, getPokemons]);

  // Pesquisa por nome ou id
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (!term.trim()) return setPokemons(allPokemons);

    const filtered = allPokemons.filter(
      (p) => p.name.toLowerCase().includes(term.toLowerCase()) || p.id.toString().includes(term)
    );
    setPokemons(filtered);
  };

  // Favoritar/desfavoritar
  const handleFavorite = (pokemon: PokemonCardType) => {
    setFavorites((prev) => {
      const newFavs = new Set(prev);
      if (newFavs.has(pokemon.id)) newFavs.delete(pokemon.id);
      else newFavs.add(pokemon.id);
      return newFavs;
    });
  };

  // Mostrar apenas favoritos
  const showFavorites = async () => {
    if (favorites.size === 0) return alert('Você não tem nenhum Pokémon favorito ainda!');
    setShowFavoritesOnly(true);
    setLoading(true);

    try {
      const responses = await Promise.all(
        [...favorites].map((id) =>
          axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).catch(() => null)
        )
      );
      const data = responses.filter((res) => res !== null).map((res) => res!.data);
      setPokemons(data);
    } finally {
      setLoading(false);
    }
  };

  const showAll = () => {
    setShowFavoritesOnly(false);
    setSearchTerm('');
    getPokemons(currentPage);
  };

  // Paginação
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && !showFavoritesOnly) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePreviousPage = () => handlePageChange(currentPage - 1);
  const handleNextPage = () => handlePageChange(currentPage + 1);

  return {
    pokemons,
    favorites,
    loading,
    searchTerm,
    showFavoritesOnly,
    handleSearch,
    handleFavorite,
    showFavorites,
    showAll,
    currentPage,
    totalPages,
    handlePageChange,
    handlePreviousPage,
    handleNextPage,
  };
};
