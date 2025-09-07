import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import { fetchPopularMovies, searchMovies } from "./api/tmdb";
import GenreMovies from "./components/GenreMovies";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchPopularMovies()
      .then((res) => {
        const data = Array.isArray(res) ? res : res?.results ?? [];
        setMovies(data);
      })
      .catch((err) => {
        console.error("fetchPopularMovies failed:", err);
        setMovies([]);
      });
  }, []);

  const handleSearch = async (term) => {
    try {
      if (term.trim() === "") {
        fetchPopularMovies()
          .then((res) =>
            setMovies(Array.isArray(res) ? res : res?.results ?? [])
          )
          .catch((err) => {
            console.error("fetchPopularMovies failed:", err);
            setMovies([]);
          });
      } else {
        const results = await searchMovies(term);
        setMovies(Array.isArray(results) ? results : results?.results ?? []);
      }
    } catch (err) {
      console.error("searchMovies failed:", err);
      setMovies([]);
    }
  };

  return (
    <BrowserRouter basename="/Movie-List">
      <Navbar onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Home movies={movies} />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/movie/genre/:id" element={<GenreMovies/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
