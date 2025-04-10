import React, { useEffect, useState } from "react";
import AIPowered from "../resources/AI Powered.png";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";

const UserForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    totalBalance: "",
    budgetUsed: "",
    debtsPending: "",
    pieChartData: {
      Rent: "",
      Food: "",
      Salary: "",
      Freelance: "",
      InvestmentIncome: "",
    },
    barChartData: [
      { month: "March", income: "", expenses: "" },
      { month: "April", income: "", expenses: "" },
      { month: "May", income: "", expenses: "" },
      { month: "June", income: "", expenses: "" },
      { month: "July", income: "", expenses: "" },
      { month: "August", income: "", expenses: "" },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.pieChartData) {
      setFormData({
        ...formData,
        pieChartData: { ...formData.pieChartData, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleBarChartChange = (index, field, value) => {
    const updatedBarChartData = [...formData.barChartData];
    updatedBarChartData[index][field] = value;
    setFormData({ ...formData, barChartData: updatedBarChartData });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "userFormData"), formData);
      console.log(formData);
      alert("Data submitted successfully!");
      navigate("/landing-page/dashboard"); // This will now work with the protected route logic
    } catch (error) {
      console.error("Error submitting data: ", error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-blue-100 flex flex-col justify-center items-center p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          AI-powered Financial Assistant.
        </h1>
        <img src={AIPowered} alt="AI Finance" className="w-[90%]" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-1/2 p-8 overflow-y-auto bg-gray-200 rounded-lg flex flex-col"
      >
        <label>Total Balance</label>
        <input
          type="number"
          name="totalBalance"
          value={formData.totalBalance}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
          required
        />

        <label>Budget Used (%)</label>
        <input
          type="number"
          name="budgetUsed"
          value={formData.budgetUsed}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
          required
        />

        <label>Debts Pending</label>
        <input
          type="number"
          name="debtsPending"
          value={formData.debtsPending}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
          required
        />

        <h3 className="mt-4">Pie Chart Data</h3>
        {Object.keys(formData.pieChartData).map((key) => (
          <div key={key} className="mb-2">
            <label>{key}</label>
            <input
              type="number"
              name={key}
              value={formData.pieChartData[key]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        ))}

        <h3 className="mt-4">Bar Chart Data (Income & Expenses)</h3>
        {formData.barChartData.map((data, index) => (
          <div key={index} className="mb-2">
            <label>{data.month} Income</label>
            <input
              type="number"
              value={data.income}
              onChange={(e) =>
                handleBarChartChange(index, "income", e.target.value)
              }
              className="w-full p-2 border rounded mb-1"
              required
            />
            <label>{data.month} Expenses</label>
            <input
              type="number"
              value={data.expenses}
              onChange={(e) =>
                handleBarChartChange(index, "expenses", e.target.value)
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-gray-700 text-white py-2 px-4 rounded mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;
