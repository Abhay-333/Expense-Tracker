import React, { useState, useEffect } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.config';

const Debts = () => {
  const [debtData, setDebtData] = useState({
    debts: [],
    totalEMI: 0,
    salaryPercentage: 0
  });

  useEffect(() => {
    const fetchDebtData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "userFormData"));
        const latestDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
        
        if (latestDoc) {
          const data = latestDoc.data();
          
          // Calculate monthly salary from pieChartData
          const monthlySalary = Number(data.pieChartData.Salary);
          
          // Create debts array with sample data (you can modify this based on your needs)
          const debtsArray = [
            {
              title: "Home loan",
              amount: monthlySalary * 12 * 5, // Example: 5 years of salary
              emi: monthlySalary * 0.3, // 30% of monthly salary
              timeLeft: "20 years"
            },
            {
              title: "Car loan",
              amount: monthlySalary * 12, // Example: 1 year of salary
              emi: monthlySalary * 0.15, // 15% of monthly salary
              timeLeft: "5 years"
            },
            {
              title: "Personal Loan",
              amount: monthlySalary * 6, // Example: 6 months of salary
              emi: monthlySalary * 0.1, // 10% of monthly salary
              timeLeft: "3 years"
            },
            {
              title: "Credit Card",
              bill: monthlySalary * 0.2, // 20% of monthly salary
              deadline: "Month end"
            }
          ];

          const totalMonthlyEMI = debtsArray.reduce((total, debt) => 
            total + (debt.emi || 0), 0);

          setDebtData({
            debts: debtsArray,
            totalEMI: totalMonthlyEMI,
            salaryPercentage: Math.round((totalMonthlyEMI / monthlySalary) * 100)
          });
        }
      } catch (error) {
        console.error("Error fetching debt data: ", error);
      }
    };

    fetchDebtData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center h-full w-full">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 grid grid-cols-2 gap-4">
          {debtData.debts.map((debt, index) => (
            <div key={index} className="p-4 bg-white shadow-md rounded-lg">
              <h3 className="text-lg font-bold">{debt.title}</h3>
              <p className="text-gray-600">
                {debt.amount
                  ? `Total amount: Rs. ${debt.amount.toLocaleString()}`
                  : `Bill: Rs. ${debt.bill.toLocaleString()}`}
              </p>
              {debt.emi && (
                <p className="text-gray-600">
                  EMI: Rs. {debt.emi.toLocaleString()}
                </p>
              )}
              {debt.timeLeft && (
                <p className="text-blue-600">Time left: {debt.timeLeft}</p>
              )}
              {debt.deadline && (
                <p className="text-gray-600">Deadline: {debt.deadline}</p>
              )}
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="p-6 bg-gray-200 shadow-md rounded-lg flex flex-col justify-center">
          <h3 className="text-2xl font-bold italic">
            Total EMI: Rs. {debtData.totalEMI.toLocaleString()}
          </h3>
          <h3 className="text-2xl font-bold italic mt-4">
            Salary Percentage: {debtData.salaryPercentage}%
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Debts;
