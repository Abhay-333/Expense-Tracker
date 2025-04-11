import React from 'react'
import { FaSearch, FaHome, FaWallet, FaUser, FaMoneyBillWave, FaRobot, FaSignOutAlt, FaFileAlt, FaNewspaper } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase.config';
import { signOut } from 'firebase/auth';

const SideNav = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <aside className="w-64 bg-white shadow-md p-5 h-full">
      <h1 className="text-xl font-bold mb-6 flex items-center">
        <span className="text-blue-500 mr-2">◆</span>FinanceAdvisor
      </h1>
      <nav>
        <ul>
          <Link to='dashboard' className="mb-4 flex items-center">
            <FaHome className="mr-2" /> Dashboard
          </Link>
          <Link to='budget' className="mb-4 flex items-center">
            <FaWallet className="mr-2" /> Budget
          </Link>
          <Link to='account' className="mb-4 flex items-center">
            <FaUser className="mr-2" /> Account
          </Link>
          <Link to='debts' className="mb-4 flex items-center">
            <FaMoneyBillWave className="mr-2" /> Debts
          </Link>
          <Link to='ai' className="mb-4 flex items-center">
            <FaRobot className="mr-2" /> AI Assistant
          </Link>
          <Link to='/userform' className="mb-4 flex items-center">
            <FaFileAlt className="mr-2" /> Update Form
          </Link>
          <Link to='news' className="mb-4 flex items-center">
            <FaNewspaper className="mr-2" /> News
          </Link>
        </ul>
      </nav>
      <button 
        onClick={handleLogout}
        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded mt-4 flex items-center justify-center transition-colors"
      >
        <FaSignOutAlt className="mr-2" /> Log Out
      </button>
    </aside>
  )
}

export default SideNav
