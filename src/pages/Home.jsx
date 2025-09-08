import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { genreMap } from "../api/genre";
import { Link } from "react-router-dom";

export default function Home({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto change every 6 seconds
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [movies, isPlaying]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 10000);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 10000);
  };

  if (!movies || movies.length === 0 || !movies[currentIndex]) {
    return (
      <div className="flex items-center justify-center h-[80vh] text-white">
        <div className="text-center">
          <i className="mb-4 text-6xl opacity-50 fa-solid fa-film"></i>
          <p className="text-xl">No movies found</p>
          <p className="text-gray-400">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative w-full h-[85vh] overflow-hidden">
        {/* Background slides with gradient overlay */}
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
            {/* Gradient overlay similar to MovieDetails */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute z-30 p-3 transition-all -translate-y-1/2 rounded-full left-4 bg-black/50 hover:bg-black/70 top-1/2"
        >
          <i className="text-xl text-white fa-solid fa-chevron-left"></i>
        </button>
        <button
          onClick={handleNext}
          className="absolute z-30 p-3 transition-all -translate-y-1/2 rounded-full right-4 bg-black/50 hover:bg-black/70 top-1/2"
        >
          <i className="text-xl text-white fa-solid fa-chevron-right"></i>
        </button>

        {/* Hero Content */}
        <div className="absolute bottom-0 z-20 w-full max-w-6xl px-6 py-12 text-white transform -translate-x-1/2 left-1/2">
          <div className="flex flex-col items-start mb-6 md:flex-row md:items-center">
            <h1 className="mb-4 text-4xl font-bold md:text-6xl md:mb-0 md:mr-6">
              {movies[currentIndex]?.title}
            </h1>
            <div className="flex items-center px-4 py-2 bg-red-600 rounded-full">
              <span className="text-sm font-semibold">TRENDING</span>
              <div className="w-2 h-2 ml-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="flex flex-wrap items-center mb-4">
            <span className="px-3 py-1 mb-2 mr-3 text-sm font-semibold bg-green-600 rounded md:mb-0">
              HD
            </span>
            <div className="flex items-center mb-2 mr-4 md:mb-0">
              <i className="mr-1 text-yellow-400 fa-solid fa-star"></i>
              <span>{movies[currentIndex]?.vote_average?.toFixed(1)}</span>
            </div>
            <span className="mb-2 mr-4 md:mb-0">
              {movies[currentIndex]?.runtime || "120"} min
            </span>
            <span className="mb-2 md:mb-0">
              {movies[currentIndex]?.release_date?.split("-")[0]}
            </span>
          </div>

          <p className="max-w-2xl mb-8 text-lg text-gray-300">
            {movies[currentIndex]?.overview}
          </p>

          {/* Only the Watch Now button remains */}
          <button className="flex items-center px-8 py-4 text-lg font-semibold text-white transition-all bg-red-600 rounded-lg hover:bg-red-700 hover:scale-105">
            <i className="mr-3 fa-solid fa-play"></i> Watch Now
          </button>
        </div>



        {/* Pagination Dots */}
        <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-20 left-1/2">
          {movies.slice(0, 5).map((movie, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                setIsPlaying(false);
                setTimeout(() => setIsPlaying(true), 10000);
              }}
              className="flex flex-col items-center group"
            >
              <div
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentIndex
                    ? "bg-white scale-125"
                    : "bg-gray-500 hover:bg-gray-400"
                }`}
              ></div>
              <span
                className={`mt-2 text-xs font-medium transition-opacity ${
                  idx === currentIndex
                    ? "text-white opacity-100"
                    : "text-gray-400 opacity-0 group-hover:opacity-100"
                }`}
              >
                {movie.title.length > 12
                  ? movie.title.substring(0, 12) + "..."
                  : movie.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Trending Section */}
      <div className="px-6 py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">Trending Now</h2>
            <p className="text-gray-400">Most popular movies this week</p>
          </div>
          <button className="flex items-center text-sm text-gray-400 transition-colors hover:text-white">
            View all <i className="ml-1 text-xs fa-solid fa-chevron-right"></i>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={{
                ...movie,
                id: movie.id,
                title: movie.title,
                year: movie.release_date?.split("-")[0],
                poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                genres: movie.genre_ids.map((id) => genreMap[id] || "Unknown"),
                backdrop_path: movie.backdrop_path,
                vote_average: movie.vote_average,
                overview: movie.overview,
                release_date: movie.release_date,
              }}
            />
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="px-6 py-12 bg-gray-800">
        <h2 className="mb-8 text-3xl font-bold text-white">
          Browse by Category
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {Object.entries(genreMap)
            .slice(0, 12)
            .map(([id, name]) => (
              <Link
                key={id}
                 to={`/movie/genre/${id}`}
                className="p-4 transition-all bg-gray-700 rounded-lg cursor-pointer hover:bg-red-600"
              >
                <div className="text-center">
                  <i className="mb-2 text-2xl fa-solid fa-film"></i>
                  <h3 className="text-sm font-medium text-white">{name}</h3>
                </div>
              </Link>
            ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-8 text-center text-gray-400 bg-gray-900">
        <p>&copy; {new Date().getFullYear()} StreamX. All rights reserved.</p>
      </footer>
    </div>
  );
}
