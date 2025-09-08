import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { genreMap } from "../api/genre";
import { fetchMoviesByGenre } from "../api/tmdb";
import MovieCard from "./MovieCard"; // Import MovieCard

function GenreMovies() {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMovies() {
      setLoading(true);
      const data = await fetchMoviesByGenre(id);

      // Transform TMDB API response so MovieCard gets correct props
      const formattedMovies = data.map((m) => ({
        id: m.id,
        title: m.title,
        year: m.release_date ? m.release_date.split("-")[0] : "N/A",
        poster: m.poster_path
          ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
          : null,
        genres: m.genre_ids
          ? m.genre_ids.map((gid) => genreMap[gid]).filter(Boolean)
          : [],
      }));

      setMovies(formattedMovies);
      setLoading(false);
    }
    getMovies();
  }, [id]);

  if (loading) return <p className="text-lg text-center">Loading movies...</p>;

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold text-center">
        {genreMap[id]} Movies
      </h1>

      {movies.length === 0 ? (
        <p className="text-center text-gray-400">
          No movies found for this genre.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default GenreMovies;
