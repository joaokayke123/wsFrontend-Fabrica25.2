'use client';

import PokemonCard from '@/components/pokemonCard/page';
import Container from '@mui/material/Container';
import Footer from '@/components/footer/page';
import Navbar from '@/components/navBar/page';
import Pagination from '@/components/pagination/page';
import { usePokemons } from '@/hooks/usePokemons';
import Buttons from '@/components/topButtons/page';
import { useState } from 'react';

export default function HomePage() {
  const {
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
  } = usePokemons();

  const [isGridView, setIsGridView] = useState(true);
  const toggleView = () => setIsGridView((prev) => !prev);

  // Loading
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando Pokémon...</p>
        </div>
      </div>
    );

  return (
    <div>
      <Navbar pokemonFilter={handleSearch} />

      <Container maxWidth="xl">
        {/* BOTÕES */}
        <Buttons
          showAll={showAll}
          showFavorites={showFavorites}
          showFavoritesOnly={showFavoritesOnly}
          favoritesCount={favorites.size}
          isGridView={isGridView}
          toggleView={toggleView}
        />

        {/* GRID DE POKEMONS */}
        <div className="w-full max-w-[1200px] mx-auto">
          <div
            className={`grid gap-6 ${
              isGridView
                ? 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                : 'grid-cols-1'
            }`}
          >
            {pokemons.map((pokemon) => (
              <div key={pokemon.id} className={`w-full max-w-[250px] mx-auto`}>
                <PokemonCard
                  id={pokemon.id}
                  name={pokemon.name}
                  image={pokemon.sprites.front_default}
                  types={pokemon.types}
                  isFavorite={favorites.has(pokemon.id)}
                  onFavorite={() =>
                    handleFavorite({
                      id: pokemon.id,
                      name: pokemon.name,
                      image: pokemon.sprites.front_default,
                      types: pokemon.types,
                    })
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* PAGINAÇÃO */}
        {!showFavoritesOnly && !searchTerm && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
          />
        )}
      </Container>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
