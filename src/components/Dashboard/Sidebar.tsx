import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className="h-full p-4 space-y-4 bg-gray-800 text-white">
      <h2 className="text-lg font-bold">Dashboard</h2>
      <nav className="space-y-2">
        <a href="#" className="block px-4 py-2 rounded hover:bg-gray-700">
          Home
        </a>
        <a href="#" className="block px-4 py-2 rounded hover:bg-gray-700">
          Profile
        </a>
        <a href="#" className="block px-4 py-2 rounded hover:bg-gray-700">
          Settings
        </a>
        <a href="#" className="block px-4 py-2 rounded hover:bg-gray-700">
          Logout
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
