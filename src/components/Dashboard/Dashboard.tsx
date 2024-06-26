import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-4 bg-gray-100">
          <h2 className="text-2xl font-bold">Dashboard Content</h2>
          <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 bg-white rounded shadow">
              <h3 className="text-lg font-bold">Card 1</h3>
              <p>Content for card 1</p>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <h3 className="text-lg font-bold">Card 2</h3>
              <p>Content for card 2</p>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <h3 className="text-lg font-bold">Card 3</h3>
              <p>Content for card 3</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
