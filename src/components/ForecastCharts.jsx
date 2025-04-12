// src/components/ForecastCharts.jsx
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { fetchOccupancyForecast, fetchBedsForecast } from "../api";
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend 
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ForecastCharts = () => {
  const [forecastData, setForecastData] = useState({
    occupancy: null,
    beds: null
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadForecasts = async () => {
      try {
        const [occupancy, beds] = await Promise.all([
          fetchOccupancyForecast(),
          fetchBedsForecast()
        ]);
        
        setForecastData({
          occupancy: {
            labels: Object.keys(occupancy),
            values: Object.values(occupancy)
          },
          beds: {
            labels: beds.map(item => item.date),
            values: beds.map(item => item.predicted_beds)
          }
        });
      } catch (error) {
        console.error("Forecast load error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadForecasts();
  }, []);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: '7-Day Occupancy Forecast' }
    },
    scales: {
      x: { display: true, title: { display: true, text: 'Date' } },
      y: { display: true, title: { display: true, text: 'Beds' }, beginAtZero: true }
    }
  };

  if (isLoading) return <div className="p-6 text-center">Loading forecasts...</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">AI Forecasts</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Bed Occupancy (Next 7 Days)</h3>
          <Line
            data={{
              labels: forecastData.occupancy.labels,
              datasets: [{
                label: 'Occupancy Rate',
                data: forecastData.occupancy.values,
                borderColor: 'rgb(79, 70, 229)',
                tension: 0.3
              }]
            }}
            options={chartOptions}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Bed Demand Forecast (Next 30 Days)</h3>
          <Line
            data={{
              labels: forecastData.beds.labels,
              datasets: [{
                label: 'Predicted Beds Needed',
                data: forecastData.beds.values,
                borderColor: 'rgb(14, 165, 233)',
                tension: 0.3
              }]
            }}
            options={chartOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default ForecastCharts;