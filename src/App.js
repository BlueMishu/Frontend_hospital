// src/App.js
import React, { useState, useEffect } from "react";
import { fetchResources, fetchQueue } from "./api";
import Dashboard from "./components/Dashboard";
import PatientForm from "./components/PatientForm";
import PatientQueue from "./components/PatientQueue";
import ForecastCharts from "./components/ForecastCharts";

function App() {
  const [resources, setResources] = useState({});
  const [queue, setQueue] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  // Central data loader
  const loadData = async () => {
    try {
      const [resData, queueData] = await Promise.all([
        fetchResources(),
        fetchQueue()
      ]);
      setResources(resData);
      setQueue(queueData);
    } catch (error) {
      console.error("Failed to load data:", error);
      alert("Error loading data. Check console for details.");
    }
  };

  useEffect(() => {
    loadData();
  }, [refreshKey]);

  return (
    <div className="App p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">
        AI-Powered Hospital Resource Management
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <Dashboard 
            resources={resources} 
            onReset={() => setRefreshKey(k => k + 1)}
          />
          <ForecastCharts />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <PatientForm onUpdate={() => setRefreshKey(k => k + 1)} />
          <PatientQueue 
            queue={queue} 
            onComplete={() => setRefreshKey(k => k + 1)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;