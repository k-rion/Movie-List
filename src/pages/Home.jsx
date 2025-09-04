import React from "react";
import MovieCard from "../components/MovieCard";
import { genreMap } from "../api/genre";

export default function Home({ movies }) {
  return (
    <div className="grid grid-cols-2 gap-4 p-6 md:grid-cols-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={{
            id: movie.id,
            title: movie.title,
            genre: movie.genre,
            year: movie.release_date?.split("-")[0],
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            genres: movie.genre_ids.map((id) => genreMap[id] || "Unknown"),
          }}
        />
      ))}
    </div>
  );
}
