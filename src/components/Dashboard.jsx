// src/components/Dashboard.jsx
import React from "react";

const Dashboard = ({ resources, onReset }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold">Resource Dashboard</h2>
        <button
          onClick={onReset}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
        >
          Reset System
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded">
          <p className="text-gray-600">ICU Beds</p>
          <p className="text-3xl font-bold">{resources.icu || 0}</p>
        </div>
        <div className="bg-green-50 p-4 rounded">
          <p className="text-gray-600">General Beds</p>
          <p className="text-3xl font-bold">{resources.general || 0}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded">
          <p className="text-gray-600">MRI Usage</p>
          <p className="text-3xl font-bold">{resources.mri || 0}</p>
        </div>
        <div className="bg-orange-50 p-4 rounded">
          <p className="text-gray-600">Ventilators</p>
          <p className="text-3xl font-bold">{resources.ventilators || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;