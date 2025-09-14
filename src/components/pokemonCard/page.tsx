"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useRouter } from "next/navigation";
import { useState } from "react";

type PokemonCardProps = {
  id: number;
  name: string;
  image: string;
  types: { type: { name: string } }[];
  isFavorite?: boolean;
  onFavorite?: (pokemon: PokemonCardProps) => void;
};

const typeColors: Record<string, string> = {
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dark: "#705848",
  dragon: "#7038F8",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
  normal: "#A8A878",
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

  const handleClick = () => {
    router.push(`/detalhes/${id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Animação de click
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 200);

    if (onFavorite) {
      onFavorite({ id, name, image, types, onFavorite });
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <Card
      className="m-10 hover:scale-105 transition-transform duration-200"
      sx={{
        maxWidth: 345,
        cursor: "pointer",
        position: "relative",
        "&:hover": {
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
        },
      }}
      onClick={handleClick}
    >
      {/* Ícone de Favorito com animação */}
      <IconButton
        onClick={handleFavoriteClick}
        className={isAnimating ? "animate-bounce" : ""}
        sx={{
          position: "absolute",
          top: 5,
          right: 5,
          color: isFavorite ? "red" : "rgba(255,255,255,0.8)",
          zIndex: 10,
          backgroundColor: "rgba(0,0,0,0.1)",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.2)",
            transform: "scale(1.1)",
          },
          transition: "all 0.2s ease",
        }}
      >
        {isFavorite ? (
          <FavoriteIcon className="animate-pulse" />
        ) : (
          <FavoriteBorderIcon />
        )}
      </IconButton>

      <CardActionArea>
        {/* Container da imagem com loading */}
        <div className="relative h-40 bg-blueBotton flex items-center justify-center">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {!imageError ? (
            <CardMedia
              component="img"
              image={image}
              height="160"
              alt={name}
              className={`transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              sx={{
                objectFit: "contain",
                padding: "10px",
              }}
            />
          ) : (
            <div className="text-white text-center">
              <div className="text-4xl mb-2">❓</div>
              <div className="text-sm">Imagem não encontrada</div>
            </div>
          )}
        </div>

        <CardContent className="bg-blueBotton">
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {capitalize(name)}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "rgba(255,255,255,0.8)",
              textAlign: "center",
              marginBottom: 2,
              fontSize: "0.9rem",
            }}
          >
            #{id.toString().padStart(3, "0")}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {types.map((t) => (
              <span
                key={t.type.name}
                style={{
                  backgroundColor: typeColors[t.type.name] || "#68A090",
                  borderRadius: "12px",
                  padding: "4px 8px",
                  fontSize: "0.75rem",
                  color: "white",
                  fontWeight: "500",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                }}
                className="hover:scale-105 transition-transform duration-150"
              >
                {capitalize(t.type.name)}
              </span>
            ))}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
