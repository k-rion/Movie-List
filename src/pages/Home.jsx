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
      <div className="relative w-full h-[70vh] sm:h-[80vh] md:h-[85vh] overflow-hidden">
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
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute z-30 p-2 transition-all -translate-y-1/2 rounded-full sm:p-3 left-2 sm:left-4 bg-black/50 hover:bg-black/70 top-1/2"
        >
          <i className="text-lg text-white sm:text-xl fa-solid fa-chevron-left"></i>
        </button>
        <button
          onClick={handleNext}
          className="absolute z-30 p-2 transition-all -translate-y-1/2 rounded-full sm:p-3 right-2 sm:right-4 bg-black/50 hover:bg-black/70 top-1/2"
        >
          <i className="text-lg text-white sm:text-xl fa-solid fa-chevron-right"></i>
        </button>

        {/* Hero Content */}
        <div className="absolute bottom-0 z-20 w-full max-w-6xl px-4 py-8 text-white transform -translate-x-1/2 sm:px-6 sm:py-12 left-1/2">
          <div className="flex flex-col items-start mb-6 md:flex-row md:items-center">
            <h1 className="mb-4 text-2xl font-bold sm:text-4xl md:text-6xl md:mb-0 md:mr-6">
              {movies[currentIndex]?.title}
            </h1>
            <div className="flex items-center px-3 py-1 bg-red-600 rounded-full sm:px-4 sm:py-2">
              <span className="text-xs font-semibold sm:text-sm">TRENDING</span>
              <div className="w-2 h-2 ml-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="flex flex-wrap items-center mb-4 text-sm sm:text-base">
            <span className="px-2 py-1 mb-2 mr-2 font-semibold bg-green-600 rounded sm:px-3 sm:mr-3 md:mb-0">
              HD
            </span>
            <div className="flex items-center mb-2 mr-3 md:mb-0">
              <i className="mr-1 text-yellow-400 fa-solid fa-star"></i>
              <span>{movies[currentIndex]?.vote_average?.toFixed(1)}</span>
            </div>
            <span className="mb-2 mr-3 md:mb-0">
              {movies[currentIndex]?.runtime || "120"} min
            </span>
            <span className="mb-2 md:mb-0">
              {movies[currentIndex]?.release_date?.split("-")[0]}
            </span>
          </div>

          <p className="max-w-xl mb-6 text-sm text-gray-300 sm:max-w-2xl sm:mb-8 sm:text-base md:text-lg line-clamp-3 md:line-clamp-none">
            {movies[currentIndex]?.overview}
          </p>

          <button className="flex items-center px-6 py-3 text-sm font-semibold text-white transition-all bg-red-600 rounded-lg sm:px-8 sm:py-4 sm:text-lg hover:bg-red-700 hover:scale-105">
            <i className="mr-2 sm:mr-3 fa-solid fa-play"></i> Watch Now
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="absolute z-30 flex space-x-2 -translate-x-1/2 sm:space-x-3 bottom-16 sm:bottom-20 left-1/2">
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
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                  idx === currentIndex
                    ? "bg-white scale-125"
                    : "bg-gray-500 hover:bg-gray-400"
                }`}
              ></div>
              <span
                className={`hidden sm:block mt-1 sm:mt-2 text-xs font-medium transition-opacity ${
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
      <div className="grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 place-items-center">
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

      {/* Categories Section */}
      <div className="px-4 py-8 bg-gray-800 sm:px-6 sm:py-12">
        <h2 className="mb-6 text-2xl font-bold text-white sm:mb-8 sm:text-3xl">
          Browse by Category
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {Object.entries(genreMap)
            .slice(0, 12)
            .map(([id, name]) => (
              <Link
                key={id}
                to={`/movie/genre/${id}`}
                className="p-3 transition-all bg-gray-700 rounded-lg cursor-pointer sm:p-4 hover:bg-red-600"
              >
                <div className="text-center">
                  <i className="mb-2 text-lg sm:text-2xl fa-solid fa-film"></i>
                  <h3 className="text-xs font-medium text-white sm:text-sm">
                    {name}
                  </h3>
                </div>
              </Link>
            ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="px-4 py-6 text-xs text-center text-gray-400 bg-gray-900 sm:px-6 sm:py-8 sm:text-sm">
        <p>&copy; {new Date().getFullYear()} StreamX. All rights reserved.</p>
      </footer>
    </div>
  );
}
