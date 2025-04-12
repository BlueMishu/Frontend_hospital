// src/components/PatientForm.jsx
import React, { useState } from "react";
import { registerPatient } from "../api";

const PatientForm = ({ onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: 30,
    problem: "",
    urgency: "Low",
    resourceChoice: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const payload = {
        ...formData,
        ...(formData.urgency === "Medium" && { resourceChoice: formData.resourceChoice })
      };
      
      const res = await registerPatient(payload);
      alert(res.message);
      setFormData({
        name: "",
        age: 30,
        problem: "",
        urgency: "Low",
        resourceChoice: ""
      });
      onUpdate();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-bold">Patient Registration</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          required
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            min="0"
            value={formData.age}
            onChange={(e) => setFormData({...formData, age: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Urgency Level</label>
          <select
            value={formData.urgency}
            onChange={(e) => setFormData({...formData, urgency: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      {formData.urgency === "Medium" && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Resource Preference</p>
          <div className="grid grid-cols-3 gap-3">
            {["ICU", "General", "Ventilator"].map((choice) => (
              <label key={choice} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="resourceChoice"
                  value={choice}
                  checked={formData.resourceChoice === choice}
                  onChange={(e) => setFormData({...formData, resourceChoice: e.target.value})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{choice}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Medical Issue</label>
        <textarea
          required
          value={formData.problem}
          onChange={(e) => setFormData({...formData, problem: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows="3"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
          isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
      >
        {isSubmitting ? "Registering Patient..." : "Register Patient"}
      </button>
    </form>
  );
};

export default PatientForm