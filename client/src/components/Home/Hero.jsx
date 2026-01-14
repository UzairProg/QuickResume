import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import GetStartedButton from './GetStartedButton.jsx'
import { useSelector } from 'react-redux'

const hero = () => {
    const {user} = useSelector((state) => state.auth);
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
        <>
            <style>
                {`
                    @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

                    *{
                        font-family: "Poppins", sans-serif;
                    }
                    
                    @keyframes float {
                        0%, 100% { transform: translateY(0px) rotate(0deg); }
                        50% { transform: translateY(-20px) rotate(5deg); }
                    }
                    
                    @keyframes gradient-shift {
                        0%, 100% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                    }
                    
                    @keyframes pulse-glow {
                        0%, 100% { opacity: 0.4; }
                        50% { opacity: 0.6; }
                    }
                    
                    .floating-shape {
                        animation: float 8s ease-in-out infinite;
                    }
                    
                    .pulse-shape {
                        animation: pulse-glow 4s ease-in-out infinite;
                    }`
                }
            </style>
            <section className='relative select-none flex flex-col items-center overflow-hidden bg-gradient-to-b from-[#faf5ff] via-[#ede9fe] to-[#ffffff] px-4 py-6' >
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-violet-300/40 to-purple-300/30 rounded-full blur-3xl floating-shape"></div>
                <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-gradient-to-tr from-blue-300/35 to-indigo-300/30 rounded-full blur-3xl floating-shape" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-gradient-to-bl from-fuchsia-300/25 to-pink-300/20 rounded-full blur-3xl floating-shape pulse-shape" style={{animationDelay: '4s'}}></div>
                <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] bg-gradient-to-tl from-cyan-300/20 to-blue-300/15 rounded-full blur-3xl floating-shape" style={{animationDelay: '1s'}}></div>
                
                <nav className="relative z-10 flex items-center justify-between gap-8 bg-white/90 backdrop-blur-xl shadow-xl shadow-violet-500/10 border border-violet-100 rounded-full px-4 md:px-2 py-2.5 w-full max-w-3xl" >
                    <a href="/" className='flex items-center md:pl-3 group'>
                        <img src="/1.svg" alt="logo" width="55" height="50" className='pt-[2px] transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-lg'/>
                    </a>
                    <div className='w-0.5 h-8 bg-gradient-to-b from-transparent via-violet-300 to-transparent hidden md:flex'></div>
                    <div id="menu" className={`max-md:absolute max-md:bg-white/70 max-md:h-[785px] max-md:overflow-hidden max-md:transition-[width] max-md:duration-300 max-md:top-0 max-md:left-0 max-md:flex-col max-md:justify-center max-md:backdrop-blur flex items-center justify-evenly gap-8 z-50 md:gap-10 flex-1 ${mobileOpen ? 'max-md:w-full' : 'max-md:w-0'}`}>
                        <a href="#" onClick={() => setMobileOpen(false)} className="relative text-gray-700 hover:text-violet-600 text-sm font-semibold transition-all duration-300 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-gradient-to-r after:from-violet-600 after:to-purple-600 hover:after:w-full after:transition-all after:duration-300">Home</a>
                        <a href="#features" onClick={() => setMobileOpen(false)} className="relative text-gray-700 hover:text-violet-600 text-sm font-semibold transition-all duration-300 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-gradient-to-r after:from-violet-600 after:to-purple-600 hover:after:w-full after:transition-all after:duration-300">Features</a>
                        <a href="#testimonials" onClick={() => setMobileOpen(false)} className="relative text-gray-700 hover:text-violet-600 text-sm font-semibold transition-all duration-300 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-gradient-to-r after:from-violet-600 after:to-purple-600 hover:after:w-full after:transition-all after:duration-300">Testimonials</a>
                        <a href="#cta" onClick={() => setMobileOpen(false)} className="relative text-gray-700 hover:text-violet-600 text-sm font-semibold transition-all duration-300 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-gradient-to-r after:from-violet-600 after:to-purple-600 hover:after:w-full after:transition-all after:duration-300">Contact</a>
                        {/* <a href="#" onClick={() => setMobileOpen(false)} className="text-gray-600 hover:text-gray-700 text-sm">Contact Us</a> */}

                        <button id="close-menu" onClick={() => setMobileOpen(false)} className="md:hidden bg-gradient-to-br from-violet-600 via-violet-500 to-purple-600 hover:from-violet-700 hover:to-purple-700 active:scale-95 text-white p-2 rounded-xl aspect-square font-medium transition-all shadow-xl shadow-violet-500/50">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex items-center gap-2 md:pr-1">
                        <Link hidden={user} to="/app?state=login" className="hidden md:inline-block bg-gradient-to-r from-violet-600 via-purple-600 to-violet-700 hover:from-violet-700 hover:via-purple-700 hover:to-violet-800 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg shadow-violet-500/40 hover:shadow-xl hover:shadow-violet-600/50 hover:scale-105">
                            Login
                        </Link>

                        <Link hidden={!user} to="/app?state=login" className="hidden md:inline-block bg-gradient-to-r from-violet-600 via-purple-600 to-violet-700 hover:from-violet-700 hover:via-purple-700 hover:to-violet-800 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg shadow-violet-500/40 hover:shadow-xl hover:shadow-violet-600/50 hover:scale-105">
                            Dashboard
                        </Link>


                        <button id="open-menu" onClick={() => setMobileOpen(true)} className="md:hidden text-gray-700 hover:text-violet-600 p-2 rounded-xl aspect-square font-medium transition-all duration-300 hover:bg-gradient-to-br hover:from-violet-50 hover:to-purple-50">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M4 12h16" />
                                <path d="M4 18h16" />
                                <path d="M4 6h16" />
                            </svg>
                        </button>
                    </div>
                </nav>

                <div className="relative z-10 flex flex-wrap items-center justify-center gap-2.5 pl-3 pr-4 py-2 mt-8 rounded-full bg-gradient-to-r from-violet-100/80 via-purple-100/70 to-blue-100/80 backdrop-blur-sm border border-violet-300/60 shadow-lg shadow-violet-200/50">
                    <div className="relative flex size-3.5 items-center justify-center">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping duration-300"></span>
                        <span className="relative inline-flex size-2 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 shadow-lg shadow-emerald-500/50"></span>
                    </div>
                    <p className="text-sm font-semibold bg-gradient-to-r from-violet-800 via-purple-700 to-blue-800 bg-clip-text text-transparent">✨ Try it out yourself!</p>
                </div>

                <h1 className='relative z-10 text-4xl md:text-6xl text-center max-w-4xl mt-6 font-bold leading-tight'>
                    <span className='bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent drop-shadow-sm'>Craft Resumes That</span>
                    <br/>
                    <span className='bg-gradient-to-r from-violet-600 via-fuchsia-600 to-purple-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_3s_ease_infinite] drop-shadow-lg'>Get You Noticed</span>
                </h1>
                <p className="relative z-10 text-base text-gray-700 text-center max-w-2xl mt-4 leading-relaxed">
                    Stand out from the crowd with <span className="font-bold bg-gradient-to-r from-violet-700 to-purple-700 bg-clip-text text-transparent">AI-powered resume building</span>. Get smart suggestions, see changes in real-time, and create job-winning resumes that actually land interviews.
                </p>

                <div className='relative z-10 flex flex-wrap justify-center gap-4 mt-6'>
                    {/* <button className="bg-violet-600 hover:bg-violet-700 text-white text-xs md:text-sm px-6 py-3 rounded-lg transition cursor-pointer">
                        Get Started Now
                    </button> */}
                    <Link to="/app"> <GetStartedButton text="Get Started Now" /> </Link>
                    <a href="#features" className="group bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-violet-700 active:scale-95 transition-all duration-300 text-md flex items-center px-6 py-3.5 gap-2.5 rounded-xl w-max border border-violet-200 shadow-lg hover:shadow-xl hover:shadow-violet-300/30 hover:border-violet-300">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                    <path d="M14.665 1.333 7.332 8.667m7.333-7.334L10 14.666l-2.667-6m7.333-7.333L1.332 6l6 2.667" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-semibold">Explore more</span>
            </a>
                </div>

                <div className='relative z-10 w-full max-w-[800px] h-[2px] mt-8 bg-gradient-to-r from-transparent via-violet-400 to-transparent shadow-lg shadow-violet-300/50'></div>

                <div className='relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 py-8 max-w-[930px] w-full'>
                    <div className='text-center group cursor-default p-3 rounded-2xl transition-all duration-300 hover:bg-gradient-to-br hover:from-violet-50 hover:to-purple-50 hover:shadow-lg hover:shadow-violet-200/50'>
                        <h2 className='font-bold text-2xl md:text-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300'>4</h2>
                        <p className='text-xs md:text-sm text-gray-700 mt-1 font-semibold'>Resume Templates</p>
                    </div>
                    <div className='text-center group cursor-default p-3 rounded-2xl transition-all duration-300 hover:bg-gradient-to-br hover:from-violet-50 hover:to-purple-50 hover:shadow-lg hover:shadow-violet-200/50'>
                        <h2 className='font-bold text-2xl md:text-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300'>&lt;2min</h2>
                        <p className='text-xs md:text-sm text-gray-700 mt-1 font-semibold'>Average Build Time</p>
                    </div>
                    <div className='text-center group cursor-default p-3 rounded-2xl transition-all duration-300 hover:bg-gradient-to-br hover:from-violet-50 hover:to-purple-50 hover:shadow-lg hover:shadow-violet-200/50'>
                        <h2 className='font-bold text-2xl md:text-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300'>AI</h2>
                        <p className='text-xs md:text-sm text-gray-700 mt-1 font-semibold'>Smart Suggestions</p>
                    </div>
                    <div className='text-center group cursor-default p-3 rounded-2xl transition-all duration-300 hover:bg-gradient-to-br hover:from-violet-50 hover:to-purple-50 hover:shadow-lg hover:shadow-violet-200/50'>
                        <h2 className='font-bold text-2xl md:text-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300'>100%</h2>
                        <p className='text-xs md:text-sm text-gray-700 mt-1 font-semibold'>Free to Use</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default hero
