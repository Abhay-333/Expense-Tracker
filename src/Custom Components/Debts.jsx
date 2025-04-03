import React from "react";

const Debts = () => {
  const debts = [
    { title: "Home loan", amount: 1000000, emi: 1200, timeLeft: "30 years" },
    { title: "Personal Loan", amount: 200000, emi: 3000, timeLeft: "5 years" },
    { title: "Car loan", amount: 500000, emi: 5000, timeLeft: "5 years" },
    { title: "Credit Card", bill: 40000, deadline: "Monthend" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center h-full w-full">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 grid grid-cols-2 gap-4">
          {debts.map((debt, index) => (
            <div key={index} className="p-4 bg-white shadow-md rounded-lg">
              <h3 className="text-lg font-bold">{debt.title}</h3>
              <p className="text-gray-600">
                {debt.amount
                  ? `Total amount: ${debt.amount.toLocaleString()}`
                  : `Bill: ${debt.bill.toLocaleString()}`}
              </p>
              {debt.emi && (
                <p className="text-gray-600">
                  EMI: {debt.emi.toLocaleString()}
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
          <h3 className="text-2xl font-bold italic">Total EMI: 49,200</h3>
          <h3 className="text-2xl font-bold italic mt-4">
            Salary Percentage: 51%
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Debts;
