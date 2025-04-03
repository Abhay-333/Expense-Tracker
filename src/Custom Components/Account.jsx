import { useState } from "react";
import { FaEdit } from "react-icons/fa";

const Account = () => {
  const [accounts] = useState([
    { name: "Cash", income: 48500, expenses: 33972, balance: 14528 },
    { name: "State Bank of India", income: 38000, expenses: 42000, balance: 6000 },
  ]);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg h-full w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Accounts</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Add Account</button>
      </div>

      <div className="grid grid-cols-4 gap-4 text-center bg-gray-100 p-4 rounded-lg">
        <div>
          <p className="text-gray-500 text-sm">TOTAL ACCOUNTS</p>
          <p className="text-lg font-bold">{accounts.length}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">TOTAL INCOME</p>
          <p className="text-lg font-bold">Rs. 86,500</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">TOTAL EXPENSES</p>
          <p className="text-lg font-bold">Rs. 75,972</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">TOTAL BALANCE</p>
          <p className="text-lg font-bold text-green-600">Rs. 20,528</p>
        </div>
      </div>

      <table className="w-full mt-4 border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">ACCOUNT DETAILS</th>
            <th className="p-3">TOTAL INCOME</th>
            <th className="p-3">TOTAL EXPENSES</th>
            <th className="p-3">CURRENT BALANCE</th>
            <th className="p-3">EDIT</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account, index) => (
            <tr key={index} className="border-b">
              <td className="p-3">{account.name}</td>
              <td className="p-3">Rs. {account.income.toLocaleString()}</td>
              <td className="p-3">Rs. {account.expenses.toLocaleString()}</td>
              <td className="p-3 text-green-600">Rs. {account.balance.toLocaleString()}</td>
              <td className="p-3">
                <FaEdit className="text-gray-500 cursor-pointer hover:text-gray-800" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Account;
