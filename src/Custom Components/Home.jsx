import React from 'react'
import landingPage from '../resources/landing page.png'
import logo from '../resources/logo.png'
import { useNavigate } from 'react-router-dom';
  

const Home = () => {
  const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/dashboard');
      };
    return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col justify-center p-16">
        <h1 className="text-5xl font-bold mb-6">Empower your finances, simply your life</h1>
        <p className="text-gray-600 mb-8">Track expenses, achieve financial goals, and save taxes.</p>
        <button 
          className="bg-blue-500 text-white py-3 px-8 rounded-lg text-xl" 
          onClick={handleGetStarted}
        >
          Get started
        </button>
      </div>

      <div className="w-[100%]">
        <img 
          src={landingPage} 
          alt="Finance Illustration" 
          className="w-full h-full  object-center" 
        />
      </div>
    </div>
  )
}

export default Home