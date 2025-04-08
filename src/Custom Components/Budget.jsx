import React, { useState, useEffect } from "react";
import { Progress } from "../components/ui/progress";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Pencil } from "lucide-react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.config';

const Budget = () => {
  const [budgetData, setBudgetData] = useState({
    totalBudget: 0,
    totalUsed: 0,
    totalLeft: 0,
    budgets: []
  });

  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "userFormData"));
        const latestDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
        
        if (latestDoc) {
          const data = latestDoc.data();
          
          // Calculate budget data from pieChartData
          const totalExpenses = Number(data.pieChartData.Rent) + Number(data.pieChartData.Food);
          
          // Create budgets array from pieChartData
          const budgetsArray = [
            {
              name: "Rent",
              budget: Number(data.pieChartData.Rent),
              used: Number(data.pieChartData.Rent) * (data.budgetUsed / 100),
              balance: Number(data.pieChartData.Rent) * (1 - data.budgetUsed / 100)
            },
            {
              name: "Food",
              budget: Number(data.pieChartData.Food),
              used: Number(data.pieChartData.Food) * (data.budgetUsed / 100),
              balance: Number(data.pieChartData.Food) * (1 - data.budgetUsed / 100)
            }
          ];

          setBudgetData({
            totalBudget: totalExpenses,
            totalUsed: totalExpenses * (data.budgetUsed / 100),
            totalLeft: totalExpenses * (1 - data.budgetUsed / 100),
            budgets: budgetsArray
          });
        }
      } catch (error) {
        console.error("Error fetching budget data: ", error);
      }
    };

    fetchBudgetData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 p-6 w-[81vw]">
        {/* Budget Summary */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <Card>
            <CardContent className="p-4 text-center">
              Rs. {budgetData.totalBudget.toLocaleString()}<br/>Total Budget
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              Rs. {budgetData.totalUsed.toLocaleString()}<br/>Total Used
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center text-green-600">
              Rs. {budgetData.totalLeft.toLocaleString()}<br/>Total Left
            </CardContent>
          </Card>
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
              {budgetData.budgets.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2">Rs. {item.budget.toLocaleString()}</td>
                  <td className="border p-2">
                    Rs. {item.used.toLocaleString()}
                    <Progress value={(item.used / item.budget) * 100} className="mt-1" />
                  </td>
                  <td className="border p-2 text-green-600">Rs. {item.balance.toLocaleString()}</td>
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
