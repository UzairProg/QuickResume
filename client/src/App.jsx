import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Layout from './pages/Layout.jsx'
import Preview from './pages/Preview.jsx'
import Dashboard from './pages/dashboard.jsx'
import ResumeBuilder from './pages/ResumeBuilder.jsx'
import Login from './pages/Login.jsx'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>

        <Route path="app" element={<Layout />}>
          <Route index element={<Dashboard />} /> 
          {/*index-loads only when path exatly matches the path name.. i.e:/app... so .. /app  → Layout + Dashboard 
           why not use path="" ? - because it will match for all subroutes of /app as well like /app/builder etc. so more specific way is to use index
           It’s just the fallback child when nothing else matches.
          */}
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
        </Route>

        {/* 
        Parent route = page frame
        Child route = page content
        <Outlet /> = hole in the frame
        */}

        <Route path="preview/:resumeId" element={<Preview />} />

        <Route path="login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
