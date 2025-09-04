import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar({ onSearch }) {
  const [term, setTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(term);
  };

  return (
    <div className="flex items-center justify-between px-4 py-4 mx-auto navbar bg-base-100 shadow-lg">
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
          <Link
            className="font-medium text-white hover:text-red-400"
            to="/genre"
          >
            Genre
          </Link>
          <Link
            className="font-medium text-white hover:text-red-400"
            to="/favorite"
          >
            Favorite
          </Link>
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
