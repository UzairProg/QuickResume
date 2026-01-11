import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import api from "../configs/api";
import { login } from "../app/features/authSlice";
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from "react-redux";
const Login = () => {
  
  const query = new URLSearchParams(window.location.search);
  const urlState = query.get("state");

  const [state, setState] = React.useState(urlState || "login");

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    name: ""
  });

  const dispatch = useDispatch();

  function handleFromData(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // console.log(formData)
  }

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(`/api/users/${state}`, formData);

      dispatch(login(data));

      localStorage.setItem("token", data.token);
        console.log("sssobject")
        toast.success(data.message, {autoClose: 1500});
    //   toast.success("Logged in successfully");
    } catch (error) {
      toast(error?.response?.data?.message || error.message);
    }
  };


return (
        <div className="flex items-center justify-center w-full px-4 min-h-screen">
            <ToastContainer position="top-center" reverseOrder={false} />
            <form className="flex w-full flex-col max-w-96">
        
                <Link to="/" className="mb-8" title="Go to home">
                    <img src="/1.svg" alt="logo" height="100" width="80" className='-translate-x-2'/>
                </Link>
        
                <h2 className="text-4xl font-medium text-gray-900">{state === "login" ? "Login" : "Sign up"}</h2>

                <p className="mt-2 text-base text-gray-500/90">
                    {state === "login"
                        ? "Please enter your email and password to login."
                        : "Please enter email and password to signUp."}
                </p>

                {
                    state === "signup" ? (
                        <>
                            <div className="mt-4" onChange={(e)=>{handleFromData(e)}}>
                    <label className="font-medium">Name</label>
                    <input
                        placeholder="Please enter your name"
                        className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
                        required
                        type="name"
                        name="name"
                        value={formData.name}
                    />
                </div>
                        </>
                    ):
                    null
                }
        
                <div className="mt-4" onChange={(e)=>{handleFromData(e)}}>
                    <label className="font-medium">Email</label>
                    <input
                        placeholder="Please enter your email"
                        className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                    />
                </div>
        
                <div className="mt-4" onChange={(e)=>{handleFromData(e)}}>
                    <label className="font-medium">Password</label>
                    <input
                        placeholder="Please enter your password"
                        className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
                        required
                        type="password"
                        name="password"
                        value={formData.password}
                    />
                </div>
        
                <button
                    onClick={handleSubmit}
                    type="submit"
                    className="mt-4 py-3 w-full cursor-pointer rounded-md bg-indigo-600 text-white transition hover:bg-indigo-700"
                >
                    {state === "login" ? "Login" : "Sign up"}
                </button>
                <p className='text-center py-8'>
                    {state === "login" ? (
                        <>
                            Don't have an account?{' '}
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setState("signup");
                                }}
                                className='text-indigo-600 hover:underline cursor-pointer'
                            >
                                Sign up
                            </a>
                        </>
                    ) : (
                        <>
                            Already have an account?{' '}
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setState("login");
                                }}
                                className='text-indigo-600 hover:underline cursor-pointer'
                            >
                                Log in
                            </a>
                        </>
                    )}
                </p>
            </form>
        </div>
    );
}

export default Login
