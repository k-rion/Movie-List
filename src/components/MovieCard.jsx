import React from "react";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <div className="shadow-xl card bg-base-100 w-48 h-72">
      <Link
        to={`/movie/${movie.id}`}
        className="relative block overflow-hidden transition rounded shadow group hover:scale-105"
      >
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full aspect-[2/3] object-cover rounded "
        />

        {/* Overlay with title (initially hidden) */}
        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 bg-black/70 group-hover:opacity-100">
          <div className="flex flex-col items-center text-center">
            <h2 className="px-2 text-lg font-bold text-center text-white">
              {movie.title}
            </h2>
            <p className="px-2 text-lg font-bold text-center text-white">
              {movie.year}
            </p>
          </div>

          <div className="absolute flex flex-wrap gap-1 bottom-2 right-2">
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap justify-end gap-2 m-2">
                {movie.genres.map((genre, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs text-white rounded-full bg-red-500/80"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
