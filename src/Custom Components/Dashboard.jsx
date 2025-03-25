import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { FaHome, FaChartPie, FaUser, FaMoneyBillWave, FaRobot, FaPlus } from 'react-icons/fa';

const Sidebar = ({ setActivePage }) => (
  <div className="w-1/5 bg-gray-100 h-screen p-5">
    <h1 className="text-2xl font-bold mb-8">🔹Finance<span className="text-black">Advisor</span></h1>
    <ul>
      {[
        { icon: <FaHome />, name: 'Dashboard' },
        { icon: <FaChartPie />, name: 'Budget' },
        { icon: <FaUser />, name: 'Account' },
        { icon: <FaMoneyBillWave />, name: 'Debts' },
        { icon: <FaRobot />, name: 'Ai Assistant' },
      ].map((item, index) => (
        <li key={index} className="flex items-center mb-6 cursor-pointer" onClick={() => setActivePage(item.name)}>
          <span className="mr-4 text-xl">{item.icon}</span>
          {item.name}
        </li>
      ))}
    </ul>
    <button className="flex items-center mt-8 bg-blue-500 text-white px-4 py-2 rounded-lg">
      <FaPlus className="mr-2" /> Add
    </button>
  </div>
);

const Dashboard = () => {
  const [activePage, setActivePage] = useState('Dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  const data = [
    { month: 'March', income: 10000, expenses: 5000 },
    { month: 'April', income: 15000, expenses: 8000 },
    { month: 'May', income: 20000, expenses: 12000 },
    { month: 'June', income: 25000, expenses: 16000 },
    { month: 'July', income: 27000, expenses: 18000 },
    { month: 'August', income: 30000, expenses: 20000 },
  ];

  const pieDataExpenses = [
    { name: 'Rent', value: 5000 },
    { name: 'Food', value: 3000 },
    { name: 'Utilities', value: 2000 },
    { name: 'Groceries', value: 4000 },
  ];

  const pieDataIncome = [
    { name: 'Salary', value: 15000 },
    { name: 'Freelance', value: 10000 },
    { name: 'Investment Income', value: 5000 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const filteredData = data.filter((item) => item.month.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex">
      <Sidebar setActivePage={setActivePage} />
      <div className="w-4/5 p-8">
        <div className="mb-8 flex justify-between items-center">
          <input 
            className="w-1/3 p-2 border rounded-lg" 
            placeholder="Search by month..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="p-2 border rounded-full">🔍</button>
        </div>

        {activePage === 'Dashboard' && (
          <>
            <div className="grid grid-cols-4 gap-6 mb-8">
              {[{ label: 'Total Balance', value: 'Rs. 20,528' },
                { label: 'Budget Used', value: '79%' },
                { label: 'Debts Pending', value: '0' },
                { label: 'Goals Completed', value: '0/0' }].map((card, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-gray-600">{card.label}</h3>
                    <p className="text-xl font-bold">{card.value}</p>
                  </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold mb-4">This Month Expenses vs Income</h3>
                <div className="flex">
                  <PieChart width={200} height={200}>
                    <Pie data={pieDataExpenses} dataKey="value" nameKey="name" outerRadius={80}>
                      {pieDataExpenses.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                  <PieChart width={200} height={200}>
                    <Pie data={pieDataIncome} dataKey="value" nameKey="name" outerRadius={80}>
                      {pieDataIncome.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-4">Last 6 Months Income and Expenses</h3>
                <BarChart width={500} height={300} data={filteredData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="income" fill="#82ca9d" />
                  <Bar dataKey="expenses" fill="#8884d8" />
                </BarChart>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
