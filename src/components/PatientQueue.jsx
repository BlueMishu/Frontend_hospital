// src/components/PatientQueue.jsx
import React from "react";
import { completePatient } from "../api";

const PatientQueue = ({ queue, onComplete }) => {
  const urgencyColors = {
    High: "red",
    Medium: "orange",
    Low: "green"
  };

  const handleComplete = async (patientId) => {
    if (window.confirm("Mark this patient's treatment as completed?")) {
      try {
        await completePatient(patientId);
        onComplete();
      } catch (error) {
        alert("Failed to complete patient. Check console for details.");
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Treatment Queue</h2>
      
      {queue.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No patients in queue</p>
      ) : (
        <div className="space-y-3">
          {queue.map((patient, index) => (
            <div 
              key={patient.firestore_id} 
              className="flex items-center justify-between p-4 bg-gray-50 rounded-md"
            >
              <div>
                <span className="text-gray-500 mr-2">#{index + 1}</span>
                <span className="font-medium">{patient.name}</span>
                <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full bg-${urgencyColors[patient.urgency]}-100 text-${urgencyColors[patient.urgency]}-800`}>
                  {patient.urgency}
                </span>
              </div>
              
              <button
                onClick={() => handleComplete(patient.firestore_id)}
                className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full hover:bg-green-200"
              >
                Complete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientQueue;