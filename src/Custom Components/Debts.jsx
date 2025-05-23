import React, { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
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
        const q = query(collection(db, "userFormData"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        const latestDoc = querySnapshot.docs[0];
        if (latestDoc) {
          const data = latestDoc.data();
          setDebtData(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDebtData();
    const interval = setInterval(fetchDebtData, 5000);
    return () => clearInterval(interval);
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
