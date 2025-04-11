import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { FaSync } from 'react-icons/fa';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase.config';

const MainContent = () => {
  const [userData, setUserData] = useState({
    totalBalance: 0,
    budgetUsed: 0,
    debtsPending: 0,
    pieChartData: {
      Rent: 0,
      Food: 0,
      Salary: 0,
      Freelance: 0,
      InvestmentIncome: 0,
    },
    barChartData: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setIsRefreshing(true);
      setError(null);
      const q = query(collection(db, "userFormData"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const latestDoc = querySnapshot.docs[0];
      
      if (latestDoc) {
        const data = latestDoc.data();
        setUserData({
          totalBalance: Number(data.totalBalance) || 0,
          budgetUsed: Number(data.budgetUsed) || 0,
          debtsPending: Number(data.debtsPending) || 0,
          pieChartData: {
            Rent: Number(data.pieChartData?.Rent) || 0,
            Food: Number(data.pieChartData?.Food) || 0,
            Salary: Number(data.pieChartData?.Salary) || 0,
            Freelance: Number(data.pieChartData?.Freelance) || 0,
            InvestmentIncome: Number(data.pieChartData?.InvestmentIncome) || 0,
          },
          barChartData: data.barChartData || []
        });
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) return <div className="flex justify-center items-center h-full">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  // Transform pieChartData for expenses
  const pieDataExpenses = [
    { name: "Rent", value: Number(userData.pieChartData.Rent), color: "#FF8042" },
    { name: "Food", value: Number(userData.pieChartData.Food), color: "#00C49F" },
  ];

  // Transform pieChartData for income
  const pieDataIncome = [
    { name: "Salary", value: Number(userData.pieChartData.Salary), color: "#0088FE" },
    { name: "Freelance", value: Number(userData.pieChartData.Freelance), color: "#00C49F" },
    { name: "Investment Income", value: Number(userData.pieChartData.InvestmentIncome), color: "#FFBB28" },
  ];

  return (
    <main className="flex-1 p-6">
      {/* Refresh Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={fetchData}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          <FaSync className={`${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow-md">
          <p>Total Balance</p>
          <h2 className="text-xl font-bold">Rs. {Number(userData.totalBalance).toLocaleString()}</h2>
        </div>
        <div className="bg-white p-4 rounded shadow-md">
          <p>Budget Used</p>
          <h2 className="text-xl font-bold">{userData.budgetUsed}%</h2>
        </div>
        <div className="bg-white p-4 rounded shadow-md">
          <p>Debts Pending</p>
          <h2 className="text-xl font-bold">Rs. {Number(userData.debtsPending).toLocaleString()}</h2>
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
          <h3 className="font-bold mb-4">Current Month Income and Expenses</h3>
          <BarChart width={500} height={250} data={userData.barChartData}>
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
  
