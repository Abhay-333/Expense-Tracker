import React, { useState } from 'react';
import AIPowered from "../resources/AI Powered.png"
// import { db } from './firebase';
// import { collection, addDoc } from 'firebase/firestore';

const UserForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    salary: '',
    monthlyExpense: '',
    passiveIncome: '',
    properties: '',
    insurance: '',
    loan: '',
  });

  const handleChange = (e) => {
    const { username, value } = e.target;
    setFormData({ ...formData, [username]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'userFormData'), formData);
      alert('Data submitted successfully!');
    } catch (error) {
      console.error('Error submitting data: ', error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-1/2 bg-blue-100 flex flex-col justify-center items-center p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">AI-powered Financial Assistant.</h1>
        <img src={AIPowered} alt="AI Finance" className="w-[90%]" />
      </div>

      {/* Right Section */}
      <form onSubmit={handleSubmit} className="w-1/2 p-8 bg-gray-200 rounded-lg flex flex-col justify-between">
        <div className="flex-grow overflow-y-auto">
          {Object.keys(formData).map((field) => (
            <div key={field} className="mb-4">
              <label className="block mb-2 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-2 border rounded border-purple-400"
                required
              />
            </div>
          ))}
        </div>
        <button type="submit" className="bg-gray-700 text-white py-2 px-4 rounded self-center mt-4">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;