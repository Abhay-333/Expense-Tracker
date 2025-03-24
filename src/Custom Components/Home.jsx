import React from 'react'
import landingPage from '../resources/landing page.png'
import logo from '../resources/logo.png'
const Home = () => {
  return (
    <main className='w-[100%] h-[100vh] bg-red-400'>
        <div className="parent w-[100%] h-[100vh] flex items-center justify-center">
            <div className="left w-[60%] h-[85%] bg-blue-400">
                <div className="logoSide">
                    <img src={logo} alt="" />
                    <h1>Finance Advisor</h1>
                </div>
            </div>
            <div className="right w-[100%] h-[85%] bg-green-400">
                <img className='w-full h-full' src={landingPage} alt="" />
            </div>
        </div>
    </main>
  )
}

export default Home