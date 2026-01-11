import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from "../configs/api.js";
import { login } from "../app/features/authSlice.js";
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from "react-redux";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../configs/firebase.js";
const Login = () => {
  
  const navigate = useNavigate();
  const query = new URLSearchParams(window.location.search);
  const urlState = query.get("state");

  const provider = new GoogleAuthProvider();

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const { data } = await api.post("/api/users/google-auth", {
        email: user.email,
        name: user.displayName,
        avatar: user.photoURL,
      });

      dispatch(login({ token: data.token, user: data.user }));
      localStorage.setItem("token", data.token);
      toast.success(data.message, {autoClose: 1500});
      
      // Navigate to dashboard after successful login
      setTimeout(() => {
        navigate("/app");
      }, 1500);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message, {autoClose: 2000});
    }
  };

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

      dispatch(login({ token: data.token, user: data.user }));

      localStorage.setItem("token", data.token);
      
      toast.success(data.message, {autoClose: 1500});
      
      // Navigate to dashboard after successful login
      setTimeout(() => {
        navigate("/app");
      }, 1500);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };


return (
        <div className="flex items-center justify-center w-full px-4 min-h-screen">
            <ToastContainer position="top-center" reverseOrder={false} />
            <form className="flex w-full flex-col max-w-96">
        
                <Link to="/" className="group fixed left-10 top-10" title="Go to home">
                    <img src="/1.svg" alt="logo" className='-translate-x-2 h-30 wiggle'/>
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
                            <div className="mt-4">
                    <label className="font-medium">Name</label>
                    <input
                        placeholder="Please enter your name"
                        className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFromData}
                    />
                </div>
                        </>
                    ):
                    null
                }
        
                <div className="mt-4">
                    <label className="font-medium">Email</label>
                    <input
                        placeholder="Please enter your email"
                        className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFromData}
                    />
                </div>

                <div className="mt-4">
                    <label className="font-medium">Password</label>
                    <input
                        placeholder="Please enter your password"
                        className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
                        required
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleFromData}
                    />
                </div>
        
                <button
                    onClick={handleSubmit}
                    type="submit"
                    className="mt-6 py-3 w-full cursor-pointer rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-medium shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                >
                    {state === "login" ? "Login" : "Sign up"}
                </button>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-4 text-gray-500 font-medium">Or</span>
                    </div>
                </div>

                <button
                    onClick={loginWithGoogle}
                    type="button"
                    className="w-full flex items-center justify-center gap-3 rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:border-gray-400 hover:shadow-md active:scale-[0.98] group"
                >
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        className="h-5 w-5 transition-transform group-hover:scale-110"
                    />
                    <span>Continue with Google</span>
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
