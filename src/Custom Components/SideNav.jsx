import React from 'react'
import { FaSearch, FaHome, FaWallet, FaUser, FaMoneyBillWave, FaRobot, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SideNav = () => {
  return (
    <aside className="w-64 bg-white shadow-md p-5 h-full">
            <h1 className="text-xl font-bold mb-6 flex items-center"><span className="text-blue-500 mr-2">◆</span>FinanceAdvisor</h1>
            <nav>
              <ul>
                <Link to='dashboard' className="mb-4 flex items-center"><FaHome className="mr-2" /> Dashboard</Link>
                <Link to='budget' className="mb-4 flex items-center"><FaWallet className="mr-2" /> Budget</Link>
                <Link to='account' className="mb-4 flex items-center"><FaUser className="mr-2" /> Account</Link>
                <Link to='debts' className="mb-4 flex items-center"><FaMoneyBillWave className="mr-2" /> Debts</Link>
                {/* <Link to='dashboard' className="mb-4 flex items-center"><FaRobot className="mr-2" /> AI Assistant</Link> */}
              </ul>
            </nav>
            <button className="w-full bg-blue-500 text-white py-2 rounded mt-4 flex items-center justify-center">
              <FaPlus className="mr-2" /> Add
            </button>
          </aside>
  )
}

export default SideNav