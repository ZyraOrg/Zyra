import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold">Zyra</div>
      <ul className="flex space-x-6">
        <li><a href="#home" className="hover:text-gray-400">Home</a></li>
        <li><a href="#explore" className="hover:text-gray-400">Explore</a></li>
        <li><a href="#how-it-works" className="hover:text-gray-400">How It Works</a></li>
        <li><a href="#faq" className="hover:text-gray-400">FAQ</a></li>
      </ul>
      <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">Get Started</button>
    </nav>
  );
};

export default Navbar;
