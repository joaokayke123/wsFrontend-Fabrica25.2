'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type PokemonCardProps = {
  id: number;
  name: string;
  image: string;
  types: { type: { name: string } }[];
  isFavorite?: boolean;
  onFavorite?: (pokemon: PokemonCardProps) => void;
};

const typeColors: Record<string, string> = {
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78C850',
  electric: '#F8D030',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dark: '#705848',
  dragon: '#7038F8',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
  normal: '#A8A878',
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default function PokemonCard({
  name,
  image,
  id,
  types,
  isFavorite,
  onFavorite,
}: PokemonCardProps) {
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => router.push(`/detalhes/${id}`);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 200);
    if (onFavorite) onFavorite({ id, name, image, types, onFavorite });
  };

  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <Card
      className="hover:scale-105 transition-transform duration-200"
      sx={{
        width: '100%', // ocupa 100% da coluna do grid
        maxWidth: 250, // tamanho máximo no desktop
        height: 380, // altura fixa
        cursor: 'pointer',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        background: '#382f69',
        '&:hover': {
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
        },
      }}
      onClick={handleClick}
    >
      {/* Favorito */}
      <IconButton
        onClick={handleFavoriteClick}
        className={isAnimating ? 'animate-bounce' : ''}
        sx={{
          position: 'absolute',
          top: 5,
          right: 5,
          color: isFavorite ? 'red' : 'rgba(255,255,255,0.8)',
          zIndex: 10,
          backgroundColor: 'rgba(0,0,0,0.1)',
          '&:hover': { backgroundColor: 'rgba(0,0,0,0.2)', transform: 'scale(1.1)' },
          transition: 'all 0.2s ease',
        }}
      >
        {isFavorite ? <FavoriteIcon className="animate-pulse" /> : <FavoriteBorderIcon />}
      </IconButton>

      <CardActionArea sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Imagem */}
        <div className="relative h-40 flex items-center justify-center bg-blueBotton">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center animate-pulse">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          {!imageError ? (
            <CardMedia
              component="img"
              image={image}
              alt={name}
              onLoad={handleImageLoad}
              onError={handleImageError}
              sx={{
                objectFit: 'contain',
                maxHeight: 160,
                width: 'auto',
                padding: 1,
                margin: '0 auto',
                display: 'block',
              }}
            />
          ) : (
            <div className="text-white text-center">
              <div className="text-4xl mb-2">❓</div>
              <div className="text-sm">Imagem não encontrada</div>
            </div>
          )}
        </div>

        {/* Conteúdo */}
        <CardContent
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'center',
            padding: 1,
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            sx={{
              fontWeight: 'bold',
              wordBreak: 'break-word',
              color: 'white', // nomes longos quebram linha
            }}
          >
            {capitalize(name)}
          </Typography>

          <Typography variant="body2" sx={{ fontSize: 20, mb: 1, color: 'white' }}>
            #{id.toString().padStart(3, '0')}
          </Typography>

          <div className="flex flex-wrap gap-3 justify-center">
            {types.map((t) => (
              <span
                key={t.type.name}
                style={{
                  backgroundColor: typeColors[t.type.name] || '#68A090',
                  borderRadius: 12,
                  padding: '2px 6px',
                  fontSize: 20,
                  color: 'white',
                  fontWeight: 500,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                }}
              >
                {capitalize(t.type.name)}
              </span>
            ))}
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
