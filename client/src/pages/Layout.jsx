import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Login from "./Login.jsx";
import Loader from '../components/Loader/Loader.jsx'
import { useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify';
const Layout = () => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      {user ? (
        <div className="min-h-screen flex flex-col">
          <ToastContainer position="top-center" reverseOrder={false} />
          <Navbar />
          <Outlet />
        </div>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default Layout
