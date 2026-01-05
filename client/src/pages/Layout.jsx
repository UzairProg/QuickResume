import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'

const Layout = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <Outlet /> {/* used to render child routes, subroutes will be displayed here */}
    </div>
  )
}

export default Layout
