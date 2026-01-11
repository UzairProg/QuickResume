import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

function Navbar() {

  // const [name, setName] = React.useState("User");
  const { user, aiCredits } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div className='border-b border-gray-200 shadow-md px-15 h-18 w-full flex items-center justify-between py-8'>
        <Link to="/" className="" title="Go to home">
            <img src="/1.svg" alt="logo" width="60"/> 
        </Link>

        <p className='text-xl'>
          Welcome, <span className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 bg-clip-text text-transparent animate-pulse font-semibold capitalize">{user?.name}</span>
        </p>

        <div className='flex items-center gap-4'>
            {/* AI Credits Display */}
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-full">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-semibold text-indigo-700">
                    {aiCredits} AI Credits
                </span>
            </div>

            <div onClick={()=>{
                localStorage.clear();
                sessionStorage.clear();
                navigate("/");
                window.location.reload();
            }} className='px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-full text-sm cursor-pointer'>
                Logout
            </div>
        </div>
    </div>
  )
}
export default Navbar