import React from "react";
import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`, { state: { movie } });
  };

  return (
    <div
      className="w-full shadow-xl cursor-pointer card bg-base-100"
      onClick={handleClick}
    >
      <div className="relative block overflow-hidden transition rounded shadow group hover:scale-105">
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full aspect-[2/3] object-cover rounded"
          />
        ) : (
          <div className="w-full aspect-[2/3] bg-gray-700 rounded flex items-center justify-center text-white text-sm">
            No Image
          </div>
        )}
        {/* Overlay */}
        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 bg-black/70 group-hover:opacity-100">
          <div className="flex flex-col items-center text-center">
            <h2 className="px-2 text-sm font-bold text-white sm:text-base md:text-lg">
              {movie.title}
            </h2>
            <p className="px-2 text-xs text-white sm:text-sm md:text-base">
              {movie.year}
            </p>
          </div>

          {/* Genres */}
          <div className="absolute flex flex-wrap gap-1 bottom-2 right-2">
            {movie.genres?.map((genre, index) => (
              <span
                key={index}
                className="px-2 py-1 text-[10px] sm:text-xs text-white rounded-full bg-red-500/80"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
