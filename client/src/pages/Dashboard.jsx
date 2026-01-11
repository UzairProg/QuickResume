import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { BadgePlus, FileUp, Trash, Pencil, FileUser, CircleX, Heading1    } from 'lucide-react'
import { dummyResumeData } from '../assets/assets';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from '../configs/api';
import { useSelector } from 'react-redux';

const Dashboard = () => { 
  const navigate = useNavigate();
  const colors = [
  '#3B82F6', // Vibrant Blue
  '#1E40AF', // Deep Royal Blue
  '#0EA5E9', // Sky Blue
  '#6366F1', // Indigo
  '#8B5CF6', // Purple-Blue
  '#0284C7', // Ocean Blue
  '#475569', // Slate Gray
  '#64748B', // Cool Gray
  ];

  const [allResumes, setAllResumes] = React.useState([]);
  const [createNew, setCreateNew] = React.useState(false);
  const [uploadNew, setUploadNew] = React.useState(false);
  const [resumeTitle, setResumeTitle] = React.useState("");
  const [resumeFile, setResumeFile] = React.useState(null);

  const [deleteResume, setDeleteResume] = React.useState(false)
  const [editResume, setEditResume] = React.useState(false)

  const [editTitle, setEditTitle] = React.useState("")

  const [selectedResume, setSelectedResume] = React.useState(null);

  const { user, token } = useSelector((state) => state.auth);

  function fetchResumes() {
    setAllResumes(dummyResumeData)
  }

  function handleDeleteResume(idx) {
    // console.log(e)
    let cpyResume = [...allResumes]
    cpyResume.splice(idx, 1);
    setAllResumes(cpyResume)
  }

  function handleSubmit(e){
    
    try {
      e.preventDefault();
    if(!resumeTitle){
      toast.dismiss();
      toast.warn("Please enter a title for the resume", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    } 

      const newResume = api.post("/api/resumes/create", {
        title: resumeTitle,
      }, {
        headers: { Authorization: token },
      });
      setAllResumes(...allResumes, newResume);
      setCreateNew(false);
      setResumeTitle("");
      navigate(`builder/${newResume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message, {
        position: "top-center",
        autoClose: 5000,
      });
    }
  }

  function handleUpload(e){
    e.preventDefault();
    if(!resumeTitle){
      toast.dismiss();
      toast.warn("Please enter a title for the resume", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    } 

    if(!resumeFile){
      toast.dismiss();
      toast.warn("Please Upload an existing resume", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    } 
    navigate(`builder/:res123`);
    return;
  }

  function handleEditTitle(e){
    e.preventDefault();
    if(!editTitle){
      toast.dismiss();
      toast.warn("Please enter a title for the resume", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    let cpyResume = [...allResumes]
    cpyResume[selectedResume].title = editTitle;
    setAllResumes(cpyResume);
    setEditResume(false);
    setEditTitle("");
  }


  useEffect(() => {
    fetchResumes();
  }, []); // empty dependency array to run only once on mount.. means it will run when component loads

  return (
    <div className='min-w-full min-h-screen ml-20 mt-10 select-none'>
      <ToastContainer />

      <div className='flex gap-10 border-b border-dashed border-gray-400 w-fit mb-10 py-6'>
        <div>
            <div className='group h-50 w-40 border border-dashed bg-white flex flex-col items-center justify-center gap-4 rounded-lg cursor-pointer hover:shadow-lg transition'
            onClick={()=>{
                  setCreateNew(true)
          }}>
              <BadgePlus className='w-20 h-10 group-hover:text-blue-700 group-hover:rotate-90 transition-all duration-400'/> 
            <h2 className='group-hover:text-blue-700 group-hover:font-semibold transition-all duration-400'>Create Resume</h2>
            </div> 
          </div> 

          <div>
            <div onClick={()=>{
              setUploadNew(true)
            }} className='group h-50 w-40 border border-dashed bg-white flex flex-col items-center justify-center gap-4 rounded-lg cursor-pointer hover:shadow-lg transition'>
            <FileUp className='w-20 h-10 group-hover:text-blue-700 group-hover:-translate-y-1 transition-all duration-400'/> 
            <h2 className='group-hover:text-blue-700 group-hover:font-semibold transition-all duration-400'>Upload Resume</h2>
            </div> 
            
          </div> 
      </div>
      
      <div className=' max-w-[80%] gap-10 flex flex-wrap shrink-0'>
        {
          allResumes.map(function (resume, idx){
            const cardColor = colors[idx % colors.length]
            return(
              <div
                className={`group w-40 h-50 flex flex-col justify-between py-2 rounded-lg hover:shadow-lg cursor-pointer transition-all`}
                style={{ backgroundColor: cardColor + '90' }} // adding 20 for opacity
                key={idx}
                onClick={()=>{
                  navigate(`builder/${resume._id}`);
                }}
              >
                {/* edit and delete */}
                <div className='flex flex-row-reverse gap-2 px-2 transition-all opacity-0 group-hover:opacity-100 duration-300'> 
                  <Trash className='w-6 hover:bg-red-400/80 px-1 rounded transition-colors duration-200' onClick={(e)=>{
                    e.stopPropagation(); // stop bubbling of event.. clicking delete and div is getting clicked
                    setSelectedResume(idx)
                    setDeleteResume(true)
                  }}/>
                  <Pencil className='w-6 hover:bg-gray-200/80 px-1 rounded transition-colors duration-200' onClick={(e)=>{
                    e.stopPropagation();
                    setSelectedResume(idx)
                    setEditResume(true)
                  }}/>
                </div>

                {/* file edit icon with name*/}
                <div className='flex flex-col gap-1 pt-4'>
                  <FileUser className='w-10 h-9 mx-auto text-white group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-1 transition-all duration-300'/>
                  <h2 className='text-sm text-center text-white group-hover:scale-105 transition-all font-semibold line-clamp-1'>{resume.title}</h2>
                </div>

                {/* updated on */}
                <p className='text-center text-white text-xs mt-4'>
                Updated on: {new Date(resume.updatedAt).toLocaleDateString('en-GB', { 
                  day: '2-digit', 
                  month: '2-digit', 
                  year: '2-digit' 
                  })}
                </p>

              </div>
            )
          })
        }
      </div>

      {createNew && (
        <div className='fixed inset-0 bg-black/30 backdrop-blur-sm flex flex-col items-center justify-center gap-4'>
            <CircleX onClick={()=>{
              setCreateNew(false);
            }}className='h-10 w-8 hover:text-red-500 hover:-rotate-25 hover:scale-105 transition-all duration-300'/>
          <div className=''>
            <h2 className='text-2xl font-bold text-gray-800'>Create New Resume</h2>
          </div>

          <form className="flex items-center justify-center gap-3 max-w-md w-full">
            <div onChange={(e)=>{
              setResumeTitle(e.target.value);
              console.log(resumeTitle)
            }}className="flex items-center w-3/4 border gap-2 bg-white text-white/90 border-gray-500/30 h-12 rounded-full overflow-hidden">
                <input value={resumeTitle} type="title" placeholder="Enter Resume Title" className="w-full h-full pl-6 outline-none text-sm placeholder-gray-500 bg-transparent text-black" required />
            </div>
          </form>
            <button onClick={handleSubmit} type="submit" className="bg-blue-500 active:scale-95 transition w-56 h-10 rounded-full text-sm text-white cursor-pointer">Create Resume</button>
        </div>
      )}

      {uploadNew && (
        <div className='fixed inset-0 bg-black/30 backdrop-blur-sm flex flex-col items-center justify-center gap-4'>
            <CircleX onClick={()=>{
              setUploadNew(false);
            }}className='h-10 w-8 hover:text-red-500 hover:-rotate-25 hover:scale-105 transition-all duration-300'/>
          <div className=''>
            <h2 className='text-2xl font-bold text-gray-800'>Upload Resume</h2>
          </div>

          <form className="flex flex-col items-center gap-3 max-w-md w-full ">

              {
                !resumeFile ? (<label htmlFor="resumeInput" className="border bg-white rounded-md text-sm w-80 border-indigo-600/60 p-8 flex flex-col items-center gap-4  cursor-pointer hover:border-indigo-500 transition">
                <FileUp className="w-10 h-10 text-blue-600"/>
                <p className="text-gray-500">Drag & drop your files here</p>
                <p className="text-gray-400">Or <span className="text-indigo-500 underline">click</span> to upload</p>
                <input id="resumeInput" type="file" className="hidden" accept='.pdf' onChange={(e)=>{
                  if (e.target.files[0].type !== "application/pdf") {
                    toast.dismiss();
                    toast.error("Only PDF files are allowed", {
                      position: "top-center",
                      autoClose: 5000,
                  })
                  return;
                  }
                  setResumeFile(e.target.files[0])
                  toast.success("File Uploaded Successfully", {
                      position: "top-center",
                      autoClose: 4000,
                  })
                }}/>
              </label>) : (
                <div className='group relative border bg-white rounded-md text-sm w-80 border-indigo-600/60 p-8 flex flex-col items-center gap-4  cursor-pointer hover:border-indigo-500 transition'>
                  <Trash className='absolute right-4 top-3 w-8 h-8 opacity-0 group-hover:opacity-100 hover:text-red-600 hover:bg-gray-300 p-2 rounded-2xl transition-all duration-200' onClick={()=>{
                    setResumeFile(null)

                  }}/>
                  <FileUser className="w-10 h-10 text-blue-600"/>
                  {resumeFile?.name}
                </div>
              )
              }
              

            <div onChange={(e)=>{
              setResumeTitle(e.target.value);
              console.log(resumeTitle)
            }}className="flex items-center w-3/4 border gap-2 bg-white text-white/90 border-gray-500/30 h-12 rounded-full overflow-hidden">
              
                <input value={resumeTitle} type="title" placeholder="Enter Resume Title" className="w-full h-full pl-6 outline-none text-sm placeholder-gray-500 bg-transparent text-black" required />
            </div>
          </form>
            <button onClick={handleUpload} type="submit" className="bg-blue-500 active:scale-95 transition w-56 h-10 rounded-full text-sm text-white cursor-pointer">Upload Resume</button>
        </div>
      )}

      {
        deleteResume && (
                  <div className='fixed top-0 left-0 h-screen w-full bg-gray-200/40' onClick={(e)=>{
                    
                    if(e.target === e.currentTarget){
                      setDeleteResume(false)
                      return;
                    }
                  }}>
                    <div className="fixed top-1/3 left-1/8 md:left-1/3 flex flex-col items-center bg- backdrop-blur-2xl shadow-md rounded-xl py-6 px-5 md:w-[460px] w-[370px] border border-gray-200">
            <div className="flex items-center justify-center p-4 bg-red-100 rounded-full">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.875 5.75h1.917m0 0h15.333m-15.333 0v13.417a1.917 1.917 0 0 0 1.916 1.916h9.584a1.917 1.917 0 0 0 1.916-1.916V5.75m-10.541 0V3.833a1.917 1.917 0 0 1 1.916-1.916h3.834a1.917 1.917 0 0 1 1.916 1.916V5.75m-5.75 4.792v5.75m3.834-5.75v5.75" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <h2 className="text-gray-900 font-semibold mt-4 text-xl">Are you sure?</h2>
            <p className="text-sm text-gray-600 mt-2 text-center">
                Do you really want to continue? This action<br />cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-4 mt-5 w-full">
                <button onClick={()=>{
                  setDeleteResume(false)
                  setSelectedResume(null)
                }} type="button" className="w-full md:w-36 h-10 rounded-md border border-gray-300 bg-white text-gray-600 font-medium text-sm hover:bg-gray-100 active:scale-95 transition">
                    Cancel
                </button>
                <button onClick={()=>{
                  handleDeleteResume(selectedResume)
                  setDeleteResume(false)
                  setSelectedResume(null)
                  toast.success("Resume deleted successfully", {
                    position: "top-center",
                    autoClose: 3000,
                  })
                }} type="button" className="w-full md:w-36 h-10 rounded-md text-white bg-red-600 font-medium text-sm hover:bg-red-700 active:scale-95 transition">
                    Confirm
                </button>
            </div>
        </div>
                  </div>
        )
      }

      {
        editResume && (
          <div className='fixed top-0 left-0 bg-gray-300/20 backdrop-blur-xs flex justify-center items-center h-screen w-full' onClick={(e)=>{
            if(e.target === e.currentTarget){
              setEditResume(false)
              return;
            }
          }}>

            <div className='bg-gray-200/80 rounded-xl p-10 flex flex-col items-center justify-center gap-4'>
            <CircleX onClick={()=>{
              setEditResume(false);
            }}className='h-10 w-8 hover:text-red-500 hover:-rotate-25 hover:scale-105 transition-all duration-300'/>
          <div className=''>
            <h2 className='text-2xl font-bold text-gray-800'>Edit Resume Title</h2>
          </div>

          <form className="flex items-center justify-center gap-3 max-w-md w-full">
            <div onChange={(e)=>{
              setEditTitle(e.target.value);
              // console.log(resumeTitle)
            }}className="flex items-center w-full border gap-2 bg-white text-white/90 border-gray-500/30 h-12 rounded-full overflow-hidden">
                <input value={editTitle} type="title" placeholder="Enter Resume Title" className="w-full h-full pl-6 outline-none text-sm placeholder-gray-500 bg-transparent text-black" required />
            </div>
            <button onClick={(e)=>handleEditTitle(e)} type="submit" className="bg-blue-500 active:scale-95 transition w-56 h-10 rounded-full text-sm text-white cursor-pointer">Edit Resume</button>
          </form>
        </div>

          </div>
        )
      }

    </div>
  )
}

export default Dashboard
