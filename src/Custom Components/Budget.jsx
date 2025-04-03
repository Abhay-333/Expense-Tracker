import React from "react";
import { Progress } from "../components/ui/progress";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Pencil } from "lucide-react";

const Budget = () => {
  const budgets = [
    { name: "Groceries", budget: 8000, used: 5600, balance: 2400 },
    { name: "Food", budget: 7000, used: 6392, balance: 608 },
    { name: "Rent", budget: 10000, used: 4500, balance: 5500 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}

      {/* Main Content */}
      <main className="flex-1 p-6 w-[81vw]">
        {/* Search Bar */}

        {/* Budget Summary */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <Card><CardContent className="p-4 text-center">Rs. 25,000<br/>Total Budget</CardContent></Card>
          <Card><CardContent className="p-4 text-center">Rs. 16,492<br/>Total Used</CardContent></Card>
          <Card><CardContent className="p-4 text-center text-green-600">Rs. 8,508<br/>Total Left</CardContent></Card>
        </div>

        {/* Budget Table */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between mb-4">
            <h2 className="text-lg font-semibold">Budgets</h2>
            <Button className="bg-blue-500">Add Budget</Button>
          </div>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Name</th>
                <th className="border p-2">Budget</th>
                <th className="border p-2">Used Amount</th>
                <th className="border p-2">Balance Left</th>
                <th className="border p-2">Edit</th>
              </tr>
            </thead>
            <tbody>
              {budgets.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2">Rs. {item.budget}</td>
                  <td className="border p-2">
                    Rs. {item.used}
                    <Progress value={(item.used / item.budget) * 100} className="mt-1" />
                  </td>
                  <td className="border p-2 text-green-600">Rs. {item.balance}</td>
                  <td className="border p-2"><Pencil className="w-4 h-4 cursor-pointer" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Budget;
