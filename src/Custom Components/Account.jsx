import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.config';

const Account = () => {
  const [accountData, setAccountData] = useState({
    accounts: [],
    totalIncome: 0,
    totalExpenses: 0,
    totalBalance: 0
  });

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "userFormData"));
        const latestDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
        
        if (latestDoc) {
          const data = latestDoc.data();
          
          // Calculate income from pieChartData
          const totalIncome = Number(data.pieChartData.Salary) + 
                            Number(data.pieChartData.Freelance) + 
                            Number(data.pieChartData.InvestmentIncome);
          
          // Calculate expenses from pieChartData
          const totalExpenses = Number(data.pieChartData.Rent) + 
                              Number(data.pieChartData.Food);

          // Create accounts array
          const accountsArray = [
            {
              name: "Primary Account",
              income: totalIncome * 0.7, // 70% of income goes to primary account
              expenses: totalExpenses * 0.8, // 80% of expenses from primary account
              balance: (totalIncome * 0.7) - (totalExpenses * 0.8)
            },
            {
              name: "Savings Account",
              income: totalIncome * 0.3, // 30% of income goes to savings
              expenses: totalExpenses * 0.2, // 20% of expenses from savings
              balance: (totalIncome * 0.3) - (totalExpenses * 0.2)
            }
          ];

          setAccountData({
            accounts: accountsArray,
            totalIncome: totalIncome,
            totalExpenses: totalExpenses,
            totalBalance: totalIncome - totalExpenses
          });
        }
      } catch (error) {
        console.error("Error fetching account data: ", error);
      }
    };

    fetchAccountData();
  }, []);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg h-full w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Accounts</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Add Account</button>
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
    </div>
  );
};

export default Account;
