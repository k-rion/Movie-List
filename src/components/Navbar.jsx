import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";

function Navbar({ onSearch }) {
  const [term, setTerm] = useState("");
  const loginRef = useRef();

  const handleClearSearch = () => {
    setTerm("");
    onSearch("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(term);
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 mx-auto shadow-md navbar bg-base-100">
      {/* Brand / Logo */}
      <Link to="/" className="text-2xl font-bold btn btn-ghost hover:text-red-500/80">
        StreamX
      </Link>

      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="flex items-center w-1/3 gap-2">
        <label className="flex items-center w-full gap-2 input input-bordered">
          <input
            type="text"
            className="w-full bg-transparent outline-none"
            placeholder="Search movies..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          {term && (
            <button
              type="button"
              className="text-gray-500 hover:text-red-500"
              onClick={handleClearSearch}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          )}
        </label>
      </form>

      {/* Auth Buttons */}
      <div className="flex items-center gap-3">
        <button
          className="btn btn-outline"
          onClick={() => loginRef.current.openModal("login")}
        >
          Login
        </button>
        <button
          className="text-white btn bg-red-500/80 hover:bg-red-600"
          onClick={() => loginRef.current.openModal("signup")}
        >
          Sign Up
        </button>
      </div>

      {/* Modal */}
      <Login ref={loginRef} />
    </div>
  );
}

export default Navbar;
