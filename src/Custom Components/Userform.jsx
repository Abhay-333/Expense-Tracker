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
    // Add budget data
    totalBudget: "",
    totalUsed: "",
    totalLeft: "",
    budgets: [
      {
        name: "Housing",
        budget: "",
        used: "",
        balance: ""
      },
      {
        name: "Food",
        budget: "",
        used: "",
        balance: ""
      },
      {
        name: "Transportation",
        budget: "",
        used: "",
        balance: ""
      }
    ],
    // Add debt data
    debts: [
      {
        title: "Home Loan",
        amount: "",
        emi: "",
        timeLeft: ""
      },
      {
        title: "Car Loan",
        amount: "",
        emi: "",
        timeLeft: ""
      }
    ],
    totalEMI: "",
    salaryPercentage: "",
    pieChartData: {
      Rent: "",
      Food: "",
      Salary: "",
      Freelance: "",
      InvestmentIncome: "",
    },
    barChartData: [
      { month: new Date().toLocaleString('default', { month: 'short' }), income: '', expenses: '' }
    ],
    // Add account data
    accounts: [
      {
        name: "Primary Account",
        income: "",
        expenses: "",
        balance: ""
      },
      {
        name: "Savings Account",
        income: "",
        expenses: "",
        balance: ""
      }
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleBarChartChange = (index, field, value) => {
    const updatedBarChartData = [...formData.barChartData];
    updatedBarChartData[index][field] = value;
    setFormData({ ...formData, barChartData: updatedBarChartData });
  };

  const handleBudgetChange = (index, field, value) => {
    const newBudgets = [...formData.budgets];
    newBudgets[index] = {
      ...newBudgets[index],
      [field]: value,
      balance: field === 'budget' || field === 'used' 
        ? Number(field === 'budget' ? value : newBudgets[index].budget) - 
          Number(field === 'used' ? value : newBudgets[index].used)
        : newBudgets[index].balance
    };
    setFormData({
      ...formData,
      budgets: newBudgets
    });
  };

  const handleDebtChange = (index, field, value) => {
    const newDebts = [...formData.debts];
    newDebts[index] = {
      ...newDebts[index],
      [field]: value
    };
    setFormData({
      ...formData,
      debts: newDebts
    });
  };

  const handleAccountChange = (index, field, value) => {
    const newAccounts = [...formData.accounts];
    newAccounts[index] = {
      ...newAccounts[index],
      [field]: value,
      balance: field === 'income' || field === 'expenses' 
        ? Number(field === 'income' ? value : newAccounts[index].income) - 
          Number(field === 'expenses' ? value : newAccounts[index].expenses)
        : newAccounts[index].balance
    };
    setFormData({
      ...formData,
      accounts: newAccounts
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        ...formData,
        timestamp: new Date().toISOString(), // Add timestamp
      };
      await addDoc(collection(db, "userFormData"), dataToSubmit);
      alert("Data submitted successfully!");
      navigate("/landing-page/dashboard");
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
              name={`pieChartData.${key}`}
              value={formData.pieChartData[key]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        ))}

        <h3 className="mt-4">Monthly Income & Expenses</h3>
        <div className="mb-2">
          <label>Monthly Income</label>
          <input
            type="number"
            value={formData.barChartData[0].income}
            onChange={(e) =>
              handleBarChartChange(0, "income", e.target.value)
            }
            className="w-full p-2 border rounded mb-1"
            required
          />
          <label>Monthly Expenses</label>
          <input
            type="number"
            value={formData.barChartData[0].expenses}
            onChange={(e) =>
              handleBarChartChange(0, "expenses", e.target.value)
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <h3 className="mt-4">Budget Information</h3>
        <input
          type="number"
          name="totalBudget"
          value={formData.totalBudget}
          onChange={handleChange}
          placeholder="Total Budget"
          className="w-full p-2 border rounded mb-2"
          required
        />
        <input
          type="number"
          name="totalUsed"
          value={formData.totalUsed}
          onChange={handleChange}
          placeholder="Total Used"
          className="w-full p-2 border rounded mb-2"
          required
        />
        <input
          type="number"
          name="totalLeft"
          value={formData.totalLeft}
          onChange={handleChange}
          placeholder="Total Left"
          className="w-full p-2 border rounded mb-2"
          required
        />

        <h3 className="mt-4">Budget Categories</h3>
        {formData.budgets.map((budget, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              value={budget.name}
              onChange={(e) => handleBudgetChange(index, 'name', e.target.value)}
              placeholder="Budget Name"
              className="w-full p-2 border rounded mb-2"
              required
            />
            <input
              type="number"
              value={budget.budget}
              onChange={(e) => handleBudgetChange(index, 'budget', e.target.value)}
              placeholder="Budget Amount"
              className="w-full p-2 border rounded mb-2"
              required
            />
            <input
              type="number"
              value={budget.used}
              onChange={(e) => handleBudgetChange(index, 'used', e.target.value)}
              placeholder="Used Amount"
              className="w-full p-2 border rounded mb-2"
              required
            />
          </div>
        ))}

        <h3 className="mt-4">Debt Information</h3>
        {formData.debts.map((debt, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              value={debt.title}
              onChange={(e) => handleDebtChange(index, 'title', e.target.value)}
              placeholder="Debt Title"
              className="w-full p-2 border rounded mb-2"
              required
            />
            <input
              type="number"
              value={debt.amount}
              onChange={(e) => handleDebtChange(index, 'amount', e.target.value)}
              placeholder="Total Amount"
              className="w-full p-2 border rounded mb-2"
              required
            />
            <input
              type="number"
              value={debt.emi}
              onChange={(e) => handleDebtChange(index, 'emi', e.target.value)}
              placeholder="EMI Amount"
              className="w-full p-2 border rounded mb-2"
              required
            />
            <input
              type="text"
              value={debt.timeLeft}
              onChange={(e) => handleDebtChange(index, 'timeLeft', e.target.value)}
              placeholder="Time Left"
              className="w-full p-2 border rounded mb-2"
              required
            />
          </div>
        ))}

        <input
          type="number"
          name="totalEMI"
          value={formData.totalEMI}
          onChange={handleChange}
          placeholder="Total EMI"
          className="w-full p-2 border rounded mb-2"
          required
        />
        <input
          type="number"
          name="salaryPercentage"
          value={formData.salaryPercentage}
          onChange={handleChange}
          placeholder="Salary Percentage"
          className="w-full p-2 border rounded mb-2"
          required
        />

        <h3 className="mt-4 text-lg font-semibold">Account Information</h3>
        
        {/* Income Sources */}
        <div className="mb-4">
          <h4 className="text-md font-medium mb-2">Income Sources</h4>
          <input
            type="number"
            name="pieChartData.Salary"
            value={formData.pieChartData.Salary}
            onChange={(e) => handleChange({
              target: {
                name: 'pieChartData.Salary',
                value: e.target.value
              }
            })}
            placeholder="Salary"
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            type="number"
            name="pieChartData.Freelance"
            value={formData.pieChartData.Freelance}
            onChange={(e) => handleChange({
              target: {
                name: 'pieChartData.Freelance',
                value: e.target.value
              }
            })}
            placeholder="Freelance Income"
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            type="number"
            name="pieChartData.InvestmentIncome"
            value={formData.pieChartData.InvestmentIncome}
            onChange={(e) => handleChange({
              target: {
                name: 'pieChartData.InvestmentIncome',
                value: e.target.value
              }
            })}
            placeholder="Investment Income"
            className="w-full p-2 border rounded mb-2"
            required
          />
        </div>

        {/* Expenses */}
        <div className="mb-4">
          <h4 className="text-md font-medium mb-2">Expenses</h4>
          <input
            type="number"
            name="pieChartData.Rent"
            value={formData.pieChartData.Rent}
            onChange={(e) => handleChange({
              target: {
                name: 'pieChartData.Rent',
                value: e.target.value
              }
            })}
            placeholder="Rent"
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            type="number"
            name="pieChartData.Food"
            value={formData.pieChartData.Food}
            onChange={(e) => handleChange({
              target: {
                name: 'pieChartData.Food',
                value: e.target.value
              }
            })}
            placeholder="Food"
            className="w-full p-2 border rounded mb-2"
            required
          />
        </div>

        {/* Account Details */}
        <div className="mb-4">
          <h4 className="text-md font-medium mb-2">Account Details</h4>
          {formData.accounts.map((account, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg mb-4">
              <h5 className="font-medium mb-2">{account.name}</h5>
              <input
                type="number"
                value={account.income}
                onChange={(e) => handleAccountChange(index, 'income', e.target.value)}
                placeholder="Income"
                className="w-full p-2 border rounded mb-2"
                required
              />
              <input
                type="number"
                value={account.expenses}
                onChange={(e) => handleAccountChange(index, 'expenses', e.target.value)}
                placeholder="Expenses"
                className="w-full p-2 border rounded mb-2"
                required
              />
              <div className="text-sm text-gray-600">
                Balance: Rs. {account.balance || 0}
              </div>
            </div>
          ))}
        </div>

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
