import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { X } from "lucide-react";
import { collection, getDocs, query, orderBy, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const Account = () => {
  const [accountData, setAccountData] = useState({
    accounts: [],
    totalIncome: 0,
    totalExpenses: 0,
    totalBalance: 0
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [newAccount, setNewAccount] = useState({
    name: '',
    income: '',
    expenses: '',
    balance: ''
  });

  const validateAccount = (account) => {
    if (!account.name.trim()) return "Account name is required";
    if (isNaN(account.income) || account.income < 0) return "Invalid income amount";
    if (isNaN(account.expenses) || account.expenses < 0) return "Invalid expenses amount";
    return null;
  };

  useEffect(() => {
    let isMounted = true;
    let isInitialFetch = true;

    const fetchAccountData = async () => {
      try {
        const q = query(collection(db, "userFormData"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        const latestDoc = querySnapshot.docs[0];
        
        if (latestDoc) {
          const data = latestDoc.data();
          
          // Only calculate and set default accounts if there are no existing accounts
          if (!data.accounts || data.accounts.length === 0) {
            // Calculate income from pieChartData
            const totalIncome = Number(data.pieChartData?.Salary || 0) + 
                              Number(data.pieChartData?.Freelance || 0) + 
                              Number(data.pieChartData?.InvestmentIncome || 0);
            
            // Calculate expenses from pieChartData
            const totalExpenses = Number(data.pieChartData?.Rent || 0) + 
                                Number(data.pieChartData?.Food || 0);

            // Create default accounts array
            const accountsArray = [
              {
                name: "Primary Account",
                income: totalIncome * 0.7,
                expenses: totalExpenses * 0.8,
                balance: (totalIncome * 0.7) - (totalExpenses * 0.8)
              },
              {
                name: "Savings Account",
                income: totalIncome * 0.3,
                expenses: totalExpenses * 0.2,
                balance: (totalIncome * 0.3) - (totalExpenses * 0.2)
              }
            ];

            // Update Firestore with default accounts
            await updateDoc(doc(db, "userFormData", latestDoc.id), {
              accounts: accountsArray
            });

            if (isMounted) {
              setAccountData({
                accounts: accountsArray,
                totalIncome: totalIncome,
                totalExpenses: totalExpenses,
                totalBalance: totalIncome - totalExpenses
              });
            }
          } else {
            // Use existing accounts data
            const existingAccounts = data.accounts;
            const totalIncome = existingAccounts.reduce((sum, account) => sum + Number(account.income), 0);
            const totalExpenses = existingAccounts.reduce((sum, account) => sum + Number(account.expenses), 0);

            if (isMounted) {
              setAccountData({
                accounts: existingAccounts,
                totalIncome: totalIncome,
                totalExpenses: totalExpenses,
                totalBalance: totalIncome - totalExpenses
              });
            }
          }
        }
      } catch (error) {
        console.error("Error fetching account data: ", error);
      }
    };

    fetchAccountData();
    
    // Only set up the interval after the initial fetch
    let interval;
    if (!isInitialFetch) {
      interval = setInterval(fetchAccountData, 5000);
    }
    isInitialFetch = false;

    return () => {
      isMounted = false;
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  const handleAddAccount = async () => {
    try {
      const validationError = validateAccount(newAccount);
      if (validationError) {
        alert(validationError);
        return;
      }

      const balance = Number(newAccount.income) - Number(newAccount.expenses);
      const accountToAdd = {
        ...newAccount,
        balance,
        income: Number(newAccount.income),
        expenses: Number(newAccount.expenses)
      };

      const updatedAccounts = [...accountData.accounts, accountToAdd];

      // Update Firestore
      const q = query(collection(db, "userFormData"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const latestDoc = querySnapshot.docs[0];
      
      if (!latestDoc) {
        throw new Error("No existing document found");
      }

      // Update the document with the new accounts array
      await updateDoc(doc(db, "userFormData", latestDoc.id), {
        accounts: updatedAccounts
      });

      // Update local state
      const newTotalIncome = accountData.totalIncome + Number(newAccount.income);
      const newTotalExpenses = accountData.totalExpenses + Number(newAccount.expenses);

      setAccountData(prev => ({
        ...prev,
        accounts: updatedAccounts,
        totalIncome: newTotalIncome,
        totalExpenses: newTotalExpenses,
        totalBalance: newTotalIncome - newTotalExpenses
      }));

      setNewAccount({ name: '', income: '', expenses: '', balance: '' });
      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding account:", error);
      alert(`Failed to add account: ${error.message}`);
    }
  };

  const handleEditAccount = async () => {
    try {
      const balance = Number(editingAccount.income) - Number(editingAccount.expenses);
      const updatedAccounts = accountData.accounts.map(account => 
        account.name === editingAccount.name ? { ...editingAccount, balance } : account
      );

      // Recalculate totals
      const newTotalIncome = updatedAccounts.reduce((sum, account) => sum + Number(account.income), 0);
      const newTotalExpenses = updatedAccounts.reduce((sum, account) => sum + Number(account.expenses), 0);
      const newTotalBalance = newTotalIncome - newTotalExpenses;

      // Update Firestore
      const q = query(collection(db, "userFormData"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const latestDoc = querySnapshot.docs[0];
      
      if (latestDoc) {
        await updateDoc(doc(db, "userFormData", latestDoc.id), {
          accounts: updatedAccounts
        });
      }

      setAccountData(prev => ({
        ...prev,
        accounts: updatedAccounts,
        totalIncome: newTotalIncome,
        totalExpenses: newTotalExpenses,
        totalBalance: newTotalBalance
      }));

      setShowEditModal(false);
      setEditingAccount(null);
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg h-full w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Accounts</h2>
        <Button 
          className="bg-blue-500"
          onClick={() => setShowAddModal(true)}
        >
          Add Account
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4 text-center bg-gray-100 p-4 rounded-lg">
        <div>
          <p className="text-gray-500 text-sm">TOTAL ACCOUNTS</p>
          <p className="text-lg font-bold">{accountData.accounts.length}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">TOTAL INCOME</p>
          <p className="text-lg font-bold">Rs. {accountData.totalIncome.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">TOTAL EXPENSES</p>
          <p className="text-lg font-bold">Rs. {accountData.totalExpenses.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">TOTAL BALANCE</p>
          <p className="text-lg font-bold text-green-600">Rs. {accountData.totalBalance.toLocaleString()}</p>
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
          {accountData.accounts.map((account, index) => (
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

      {/* Add Account Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Account</h3>
              <X className="cursor-pointer" onClick={() => setShowAddModal(false)} />
            </div>
            <Input
              className="mb-3"
              placeholder="Account Name"
              value={newAccount.name}
              onChange={(e) => setNewAccount({...newAccount, name: e.target.value})}
            />
            <Input
              className="mb-3"
              type="number"
              placeholder="Income"
              value={newAccount.income}
              onChange={(e) => setNewAccount({...newAccount, income: e.target.value})}
            />
            <Input
              className="mb-4"
              type="number"
              placeholder="Expenses"
              value={newAccount.expenses}
              onChange={(e) => setNewAccount({...newAccount, expenses: e.target.value})}
            />
            <Button 
              className="w-full bg-blue-500"
              onClick={handleAddAccount}
            >
              Add Account
            </Button>
          </div>
        </div>
      )}

      {/* Edit Account Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit Account</h3>
              <X className="cursor-pointer" onClick={() => setShowEditModal(false)} />
            </div>
            <Input
              className="mb-3"
              placeholder="Account Name"
              value={editingAccount.name}
              onChange={(e) => setEditingAccount({...editingAccount, name: e.target.value})}
            />
            <Input
              className="mb-3"
              type="number"
              placeholder="Income"
              value={editingAccount.income}
              onChange={(e) => setEditingAccount({...editingAccount, income: e.target.value})}
            />
            <Input
              className="mb-4"
              type="number"
              placeholder="Expenses"
              value={editingAccount.expenses}
              onChange={(e) => setEditingAccount({...editingAccount, expenses: e.target.value})}
            />
            <Button 
              className="w-full bg-blue-500"
              onClick={handleEditAccount}
            >
              Save Changes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
