'use client';

type ButtonsProps = {
  showAll: () => void;
  showFavorites: () => void;
  showFavoritesOnly: boolean;
  favoritesCount: number;
  isGridView: boolean; 
  toggleView: () => void; 
};

export default function Buttons({
  showAll,
  showFavorites,
  showFavoritesOnly,
  favoritesCount,
  isGridView,
  toggleView,
}: ButtonsProps) {
  return (
    <div className="flex justify-center gap-4 mb-6 mt-6 flex-wrap">
      <button
        onClick={showAll}
        className={`px-6 py-2 rounded-lg transition-colors bg-blueBotton ${
          !showFavoritesOnly
            ? 'bg-bottonPag text-white'
            : 'bg-blueBotton text-white hover:bg-bottonHover'
        }`}
      >
        Todos os Pokémon
      </button>
      <button
        onClick={showFavorites}
        className={`px-6 py-2 rounded-lg transition-colors flex items-center gap-2 bg-blueBotton ${
          showFavoritesOnly
            ? 'bg-bottonPag text-white'
            : 'bg-blueBotton text-white hover:bg-bottonHover'
        }`}
      >
        ❤️ Favoritos ({favoritesCount})
      </button>
      <button
        onClick={toggleView}
        className="px-6 py-2 rounded-lg bg-blueBotton text-white hover:bg-bottonHover transition-colors"
      >
        {isGridView ? 'Ver em Lista' : 'Ver em Grid'}
      </button>
    </div>
  );
}
