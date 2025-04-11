import React, { useState, useEffect } from "react";
import { Progress } from "../components/ui/progress";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Pencil, X, RefreshCw } from "lucide-react";
import { collection, getDocs, query, orderBy, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';

const Budget = () => {
  const [budgetData, setBudgetData] = useState({
    totalBudget: 0,
    totalUsed: 0,
    totalLeft: 0,
    budgets: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [newBudget, setNewBudget] = useState({
    name: '',
    budget: '',
    used: '',
    balance: ''
  });

  const fetchBudgetData = async () => {
    try {
      setIsRefreshing(true);
      const q = query(collection(db, "userFormData"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const latestDoc = querySnapshot.docs[0];
      
      if (latestDoc) {
        const data = latestDoc.data();
        setBudgetData({
          totalBudget: Number(data.totalBudget) || 0,
          totalUsed: Number(data.totalUsed) || 0,
          totalLeft: Number(data.totalLeft) || 0,
          budgets: Array.isArray(data.budgets) ? data.budgets.map(budget => ({
            name: budget.name || '',
            budget: Number(budget.budget) || 0,
            used: Number(budget.used) || 0,
            balance: Number(budget.balance) || 0
          })) : []
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBudgetData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-100 justify-center items-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-100 justify-center items-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  const handleAddBudget = async () => {
    try {
      const balance = Number(newBudget.budget) - Number(newBudget.used);
      const budgetToAdd = {
        ...newBudget,
        balance,
        budget: Number(newBudget.budget),
        used: Number(newBudget.used)
      };

      const updatedBudgets = [...budgetData.budgets, budgetToAdd];
      const newTotalBudget = budgetData.totalBudget + Number(newBudget.budget);
      const newTotalUsed = budgetData.totalUsed + Number(newBudget.used);
      const newTotalLeft = newTotalBudget - newTotalUsed;

      // Update Firestore
      const q = query(collection(db, "userFormData"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const latestDoc = querySnapshot.docs[0];
      
      if (latestDoc) {
        await updateDoc(doc(db, "userFormData", latestDoc.id), {
          budgets: updatedBudgets,
          totalBudget: newTotalBudget,
          totalUsed: newTotalUsed,
          totalLeft: newTotalLeft
        });
      }

      setBudgetData(prev => ({
        ...prev,
        budgets: updatedBudgets,
        totalBudget: newTotalBudget,
        totalUsed: newTotalUsed,
        totalLeft: newTotalLeft
      }));

      setNewBudget({ name: '', budget: '', used: '', balance: '' });
      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding budget:", error);
    }
  };

  const handleEditBudget = async () => {
    try {
      const balance = Number(editingBudget.budget) - Number(editingBudget.used);
      const updatedBudgets = budgetData.budgets.map(budget => 
        budget.name === editingBudget.name ? { ...editingBudget, balance } : budget
      );

      // Recalculate totals
      const newTotalBudget = updatedBudgets.reduce((sum, budget) => sum + Number(budget.budget), 0);
      const newTotalUsed = updatedBudgets.reduce((sum, budget) => sum + Number(budget.used), 0);
      const newTotalLeft = newTotalBudget - newTotalUsed;

      // Update Firestore
      const q = query(collection(db, "userFormData"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const latestDoc = querySnapshot.docs[0];
      
      if (latestDoc) {
        await updateDoc(doc(db, "userFormData", latestDoc.id), {
          budgets: updatedBudgets,
          totalBudget: newTotalBudget,
          totalUsed: newTotalUsed,
          totalLeft: newTotalLeft
        });
      }

      setBudgetData(prev => ({
        ...prev,
        budgets: updatedBudgets,
        totalBudget: newTotalBudget,
        totalUsed: newTotalUsed,
        totalLeft: newTotalLeft
      }));

      setShowEditModal(false);
      setEditingBudget(null);
    } catch (error) {
      console.error("Error updating budget:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Add Refresh Button */}
      <div className="flex justify-end mb-4">
        <Button 
          onClick={fetchBudgetData}
          disabled={isRefreshing}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>

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
            <Button 
              className="bg-blue-500"
              onClick={() => setShowAddModal(true)}
            >
              Add Budget
            </Button>
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
              {budgetData.budgets && budgetData.budgets.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2">Rs. {item.budget.toLocaleString()}</td>
                  <td className="border p-2">
                    Rs. {item.used.toLocaleString()}
                    <Progress 
                      value={item.budget > 0 ? (item.used / item.budget) * 100 : 0} 
                      className="mt-1" 
                    />
                  </td>
                  <td className="border p-2 text-green-600">Rs. {item.balance.toLocaleString()}</td>
                  <td className="border p-2">
                    <Pencil 
                      className="w-4 h-4 cursor-pointer mx-auto" 
                      onClick={() => {
                        setEditingBudget(item);
                        setShowEditModal(true);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Add Budget Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Budget</h3>
              <X className="cursor-pointer" onClick={() => setShowAddModal(false)} />
            </div>
            <Input
              className="mb-3"
              placeholder="Budget Name"
              value={newBudget.name}
              onChange={(e) => setNewBudget({...newBudget, name: e.target.value})}
            />
            <Input
              className="mb-3"
              type="number"
              placeholder="Budget Amount"
              value={newBudget.budget}
              onChange={(e) => setNewBudget({...newBudget, budget: e.target.value})}
            />
            <Input
              className="mb-4"
              type="number"
              placeholder="Used Amount"
              value={newBudget.used}
              onChange={(e) => setNewBudget({...newBudget, used: e.target.value})}
            />
            <Button 
              className="w-full bg-blue-500"
              onClick={handleAddBudget}
            >
              Add Budget
            </Button>
          </div>
        </div>
      )}

      {/* Edit Budget Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit Budget</h3>
              <X className="cursor-pointer" onClick={() => setShowEditModal(false)} />
            </div>
            <Input
              className="mb-3"
              placeholder="Budget Name"
              value={editingBudget.name}
              onChange={(e) => setEditingBudget({...editingBudget, name: e.target.value})}
            />
            <Input
              className="mb-3"
              type="number"
              placeholder="Budget Amount"
              value={editingBudget.budget}
              onChange={(e) => setEditingBudget({...editingBudget, budget: e.target.value})}
            />
            <Input
              className="mb-4"
              type="number"
              placeholder="Used Amount"
              value={editingBudget.used}
              onChange={(e) => setEditingBudget({...editingBudget, used: e.target.value})}
            />
            <Button 
              className="w-full bg-blue-500"
              onClick={handleEditBudget}
            >
              Save Changes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budget;
