import React from 'react'
import SideNav from './SideNav'
import { Outlet,Route } from 'react-router-dom'
import MainContent from './MainContent'


const LandingPage = () => {
  return (
    <div className='h-[100vh] w-[100vw] flex'>
        <SideNav/>

        <Outlet></Outlet>
    </div>
  )
}

export default LandingPage