import React from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'

export default function MovieDetails() {
  useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const movie = location.state?.movie;

  if (!movie) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Movie not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white bg-gray-900">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="absolute z-50 w-10 p-2 transition rounded-full top-20 left-8 bg-black/50 hover:bg-black/70"
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>

      {/* Hero Section */}
      <div className="relative w-full h-96">
        <div 
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster.replace('w500', 'original')})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full p-6">
          <h1 className="mb-2 text-4xl font-bold">{movie.title}</h1>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-2 py-1 text-xs bg-green-600 rounded">HD</span>
            <span>IMDB: {movie.vote_average?.toFixed(1) || 'N/A'}</span>
            <span>{movie.year}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Poster */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <img 
              src={movie.poster} 
              alt={movie.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          
          {/* Details */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <h2 className="mb-4 text-2xl font-bold">Overview</h2>
            <p className="mb-6">{movie.overview || 'No overview available.'}</p>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <h3 className="mb-2 text-lg font-semibold">Details</h3>
                <p><strong>Release Date:</strong> {movie.release_date || 'Unknown'}</p>
                <p><strong>Rating:</strong> {movie.vote_average?.toFixed(1) || 'N/A'}/10</p>
              </div>
              
              <div>
                <h3 className="mb-2 text-lg font-semibold">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genres?.map((genre, index) => (
                    <span key={index} className="px-3 py-1 text-sm bg-red-600 rounded-full">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <button className="px-6 py-3 mt-8 transition bg-red-600 rounded-lg hover:bg-red-700">
              <i className="mr-2 fa-solid fa-play"></i> Watch Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}