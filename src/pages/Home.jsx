import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { genreMap } from "../api/genre";

export default function Home({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto change every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === movies.length - 1 ? 0 : prev + 1
      );
    }, 6000);
    return () => clearInterval(interval);
  }, [movies]);

  if (!movies || movies.length === 0 || !movies[currentIndex]) {
    return (
      <div className="flex items-center justify-center h-[80vh] text-white">
        No movies found.
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full h-[80vh] overflow-hidden">
        {/* Background slides */}
        {movies.slice(0, 5).map((movie, index) => (
          <div
            key={movie.id}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
          </div>
        ))}

        {/* Hero Content */}
        <div className="absolute bottom-0 z-20 max-w-4xl px-6 py-20 text-white">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            {movies[currentIndex]?.title}
          </h1>
          <p className="mb-2">
            <span className="px-2 py-1 text-xs bg-green-600 rounded">HD</span>{" "}
            Duration: {movies[currentIndex]?.runtime || "120"}min • IMDB:{" "}
            {movies[currentIndex]?.vote_average?.toFixed(1)} • Year:{" "}
            {movies[currentIndex]?.release_date?.split("-")[0]}
          </p>
          <p className="max-w-xl mb-6 text-gray-200 line-clamp-3">
            {movies[currentIndex]?.overview}
          </p>
          <button className="text-white btn bg-red-500/80 animate-bounce">
            <i className="fa-solid fa-play"></i> Watch Now
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="absolute z-30 flex space-x-2 -translate-x-1/2 bottom-6 left-1/2">
          {movies.slice(0, 5).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentIndex
                  ? "bg-white scale-110"
                  : "bg-gray-500 hover:bg-gray-400"
              }`}
            ></button>
          ))}
        </div>
      </div>

      {/* Trending Section */}
      <h2 className="mt-8 ml-6 text-xl font-semibold text-white">Trending</h2>
      <div className="grid grid-cols-2 gap-6 p-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={{
              id: movie.id,
              title: movie.title,
              year: movie.release_date?.split("-")[0],
              poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              genres: movie.genre_ids.map((id) => genreMap[id] || "Unknown"),
            }}
          />
        ))}
      </div>
    </>
  );
}
