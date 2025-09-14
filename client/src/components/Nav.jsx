import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const [searchQuery, setSearchQuery] = useState("");
const navigate = useNavigate();
const isValidId = (id) => /^[a-f\d]{24}$/i.test(id);
const isSingleWord = /^[^\s]+$/.test(searchQuery);

const handleSearch = (e) => {
  e.preventDefault();
  const query = searchQuery.trim();
  // if (searchQuery.trim() !== "") {
  //   navigate(`/book/${encodeURIComponent(searchQuery.trim())}`);
  // }
  if (isValidId(searchQuery.trim())) {
    navigate(`/book/${encodeURIComponent(searchQuery)}`);
  } else if (isSingleWord) {
    navigate(`/search?genre=${encodeURIComponent(searchQuery)}`);
  } else {
    navigate(`/search?title=${encodeURIComponent(searchQuery)}`);
  }
};


  return (
    <nav className="flex items-center justify-between p-4 bg-blue-600 text-white">
      <h1 className="text-xl font-bold">SU Library</h1>
      <div className="flex gap-4 items-center">
        <form onSubmit={handleSearch} className="flex">
          <input
            type="search"
            className="p-1 border-2 border-r-0 rounded-l text-black bg-white focus:outline-none"
            placeholder="Book Id"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="px-1.5 py-1 border-2 border-l-0 border-green-500 bg-green-500 text-white rounded-r hover:bg-green-700">
            Search
          </button>
        </form>

        <Link to="/">
          <button className="bg-sky-400 hover:bg-sky-600 px-3 py-1 rounded">
            Home
          </button>
        </Link>

        <Link to="/category">
          <button className="bg-sky-400 hover:bg-sky-600 px-3 py-1 rounded">
             Genre
          </button>
        </Link>

        <Link to="/create">
          <button className="bg-sky-400 hover:bg-sky-600 px-3 py-1 rounded flex items-center">
            <span className="mr-1">Add Book</span>
          </button>
        </Link>

        <Link to="/login">
          <button className="bg-red-500 hover:bg-red-700 px-3 py-1 rounded flex items-center">
            <span className="mr-1">Logout!</span>
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
