import React from 'react';
import { CiSearch } from 'react-icons/ci';

const SearchBar = ({ value, onChange, placeholder = 'Search auctions...' }) => {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <CiSearch className="text-gray-400 text-xl" />
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
        aria-label="Search auctions"
      />
    </div>
  );
};

export default SearchBar;
