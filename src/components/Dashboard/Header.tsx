import React from "react";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <h1 className="text-xl font-bold">My Dashboard</h1>
      <div className="flex items-center space-x-4">
        <span>Welcome, User</span>
        <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
