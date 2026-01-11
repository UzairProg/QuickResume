import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Layout from './pages/Layout.jsx'
import Preview from './pages/Preview.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ResumeBuilder from './pages/ResumeBuilder.jsx'
import Login from './pages/Login.jsx'
import { useDispatch } from 'react-redux'
import { login, setLoading } from "./app/features/authSlice.js";
import api from "./configs/api.js";

const App = () => {

  const dispatch = useDispatch();

  const getUserData = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const { data } = await api.get("/api/users/data", {
          headers: { Authorization: token },
        });

        if (data.user) {
          dispatch(login({ token, user: data.user }));
        }

        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error.message);
    }
  };

  React.useEffect(() => {
    getUserData();
  }, []);
  
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

        <Route path="view/:resumeId" element={<Preview />} />

        <Route path="login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
