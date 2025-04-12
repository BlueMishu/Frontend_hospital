// src/api.js
const API_URL = "http://localhost:5001/api";

export const fetchResources = async () => {
  const response = await fetch(`${API_URL}/resources`);
  return response.json();
};

export const fetchQueue = async () => {
  const response = await fetch(`${API_URL}/queue`);
  return response.json();
};

export const registerPatient = async (patientData) => {
  const response = await fetch(`${API_URL}/patients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patientData),
  });
  return response.json();
};

export const completePatient = async (firestoreId) => {
  const response = await fetch(`${API_URL}/patients/${firestoreId}`, {
    method: "DELETE",
  });
  return response.json();
};

export const resetSystem = async () => {
  const response = await fetch(`${API_URL}/reset`, {
    method: "POST",
  });
  return response.json();
};

export const fetchOccupancyForecast = async () => {
  const response = await fetch(`${API_URL}/forecast/occupancy`);
  return response.json();
};

export const fetchBedsForecast = async () => {
  const response = await fetch(`${API_URL}/forecast/beds`);
  return response.json();
};
