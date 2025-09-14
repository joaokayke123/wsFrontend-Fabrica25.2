'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Chip, Button } from '@mui/material';

type PokemonDetail = {
  id: number;
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
  weight: number;
  base_experience: number;
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

export default function PokemonDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get<PokemonDetail>(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPokemon();
  }, [id]);

  if (!pokemon) return <div className="p-8 text-center">Carregando...</div>;

  return (
    <Box className="flex flex-col items-center p-8 gap-4">

      <Card sx={{ maxWidth: 400, width: '100%', backgroundColor: '#1f2937', color: 'white' }}>
        <CardMedia
          component="img"
          height="200"
          image={pokemon.sprites.front_default}
          alt={pokemon.name}
          sx={{ objectFit: 'contain', 
            backgroundImage: `url('/background-card.webp')`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center' }}
        />
        <CardContent>
          <Typography variant="h5" component="div" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
            {capitalize(pokemon.name)} #{pokemon.id}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, my: 1, flexWrap: 'wrap' }}>
            {pokemon.types.map((t) => (
              <Chip
                key={t.type.name}
                label={capitalize(t.type.name)}
                sx={{
                  backgroundColor: typeColors[t.type.name] || '#68A090',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              />
            ))}
          </Box>

          <Typography variant="body1">Peso: {pokemon.weight}</Typography>
          <Typography variant="body1">Experiência Base: {pokemon.base_experience}</Typography>
        </CardContent>
      </Card>
            <Button
        variant="contained"
        onClick={() => router.push('/')}
        sx={{ backgroundColor: '#382f69', '&:hover': { backgroundColor: '#231746' } }}
      >
        Voltar à Lista
      </Button>
    </Box>
  );
}
