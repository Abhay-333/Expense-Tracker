import React from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { FaSearch, FaHome, FaWallet, FaUser, FaMoneyBillWave, FaRobot, FaPlus } from 'react-icons/fa';

const MainContent = () => {
  const pieDataExpenses = [
    { name: "Rent", value: 5000, color: "#FF8042" },
    { name: "Food", value: 3000, color: "#00C49F" },
    { name: "Utilities", value: 2000, color: "#FFBB28" },
    { name: "Groceries", value: 4000, color: "#FF6666" },
  ];

  const pieDataIncome = [
    { name: "Salary", value: 15000, color: "#0088FE" },
    { name: "Freelance", value: 10000, color: "#00C49F" },
    { name: "Investment Income", value: 2000, color: "#FFBB28" },
  ];

  const barData = [
    { month: "March", income: 10000, expenses: 5000 },
    { month: "April", income: 15000, expenses: 7500 },
    { month: "May", income: 20000, expenses: 10000 },
    { month: "June", income: 25000, expenses: 12500 },
    { month: "July", income: 27000, expenses: 15000 },
    { month: "August", income: 30000, expenses: 17000 },
  ];

  return (
    <main className="flex-1 p-6">
      {/* Search Bar */}
      <div className="flex justify-between items-center mb-6">
        <input
          className="w-1/2 p-2 border rounded"
          type="text"
          placeholder="Search by month..."
        />
        <FaSearch className="text-gray-500" />
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow-md">
          <p>Total Balance</p>
          <h2 className="text-xl font-bold">Rs. 20,528</h2>
        </div>
        <div className="bg-white p-4 rounded shadow-md">
          <p>Budget Used</p>
          <h2 className="text-xl font-bold">79%</h2>
        </div>
        <div className="bg-white p-4 rounded shadow-md">
          <p>Debts Pending</p>
          <h2 className="text-xl font-bold">0</h2>
        </div>
        <div className="bg-white p-4 rounded shadow-md">
          <p>Goals Completed</p>
          <h2 className="text-xl font-bold">0/0</h2>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        {/* Pie Charts */}
        <div className="bg-white p-6 rounded shadow-md">
          <h3 className="font-bold mb-4">This Month Expenses vs Income</h3>
          <div className="flex justify-around">
            <PieChart width={200} height={200}>
              <Pie data={pieDataExpenses} dataKey="value" outerRadius={80}>
                {pieDataExpenses.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
            <PieChart width={200} height={200}>
              <Pie data={pieDataIncome} dataKey="value" outerRadius={80}>
                {pieDataIncome.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded shadow-md">
          <h3 className="font-bold mb-4">Last 6 Months Income and Expenses</h3>
          <BarChart width={500} height={250} data={barData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#00C49F" />
            <Bar dataKey="expenses" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
    </main>
  );
};

export default MainContent;





// import {
//     PieChart,
//     Pie,
//     Cell,
//     BarChart,
//     Bar,
//     XAxis,
//     YAxis,
//     Tooltip,
//     Legend,
//   } from "recharts";
//   import {
//     FaSearch,
//     FaHome,
//     FaWallet,
//     FaUser,
//     FaMoneyBillWave,
//     FaRobot,
//     FaPlus,
//   } from "react-icons/fa";
//   import { Link, Routes } from "react-router-dom";
//   import Budget from "./Budget";
//   import Account from "./Account";
//   import Debts from "./Debts";
//   import SideNav from "./SideNav";
//   import { Outlet } from "react-router-dom";
//   import MainContent from "./MainContent";
//   import { Route } from "react-router-dom";
  
//   const Dashboard = () => {
//     return (
//       <div className="flex h-screen bg-gray-100">
//         {/* Sidebar */}
//         <SideNav />
  
//         {/* Main Content */}
//         <Routes>
//           <Route path="/mainContent" element={<MainContent />}></Route>
//         </Routes>
//       </div>
//     );
//   };
  
//   export default Dashboard;
  