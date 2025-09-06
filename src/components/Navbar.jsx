import React, { useState } from "react";
import { Link } from "react-router-dom";
import { genreMap } from "../api/genre";

function Navbar({ onSearch }) {
  const [term, setTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(term);
  };

  return (
    <div className="flex items-center justify-between px-4 py-4 mx-auto shadow-lg navbar bg-base-100">
      <div>
        <Link to="/" className="text-xl btn btn-ghost hover:text-red-500/80">
          StreamX
        </Link>
      </div>

      <div className="flex-2">
        <div className="hidden space-x-8 md:flex">
          <Link className="font-medium text-white hover:text-red-400" to="/">
            Home
          </Link>

          {/* Navbar */}

          <div className="relative group">
            <button className="font-medium text-white hover:text-red-400">Genre</button>

            {/* Dropdown Panel */}
            <div className="left-0 invisible mt-2 transition-all duration-300 bg-gray-800
                            opacity-0 absolute group-hover:opacity-100 group-hover:visible 
                            w-[640px] p-6 rounded-lg shadow-lg z-[9999]"
              >
                              
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(genreMap).map(([id, name]) => (
                  <h2
                    className="block text-gray-300 hover:text-white"
                    key={id}
                    to={`/genre${id}`}
                  >
                    {name}
                  </h2>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-4">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="w-24 input input-bordered md:w-auto"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
        <button type="submit" className="btn bg-red-500/80">
          Search
        </button>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://i.pinimg.com/736x/be/c2/08/bec208dea5475efadce0faa2a682ff85.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </form>
    </div>
  );
}

export default Navbar;
