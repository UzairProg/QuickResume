import { PlusCircle, Sparkles, X } from 'lucide-react'
import React from 'react'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SkillsForm({data, onChange}) {
    
    const [skill, setSkill] = React.useState("")

    function updateSkill(){
        console.log("object")
        let skillToAdd = skill.trim()
        if (!skillToAdd) return

        if (data.includes(skillToAdd)) {
            toast.dismiss()
            toast.info("Skill already exists!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
            return
        }

        let newData = [...data]
        newData.push(skillToAdd)
        onChange(newData)
        setSkill("")

        toast.success("Skill Added!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    }
  return (
    <div>
        
        <ToastContainer position="top-center" reverseOrder={false}/>
        <div className='flex flex-col'>
            <h3 className='font-semibold text-lg'>Skills</h3>
            <p className='text-gray-600 text-md'>Add your technical and soft skills</p>
        </div>

        <div className='flex mt-6 items-center justify-between gap-2'>
            <input onKeyDown={(e) => {
    if (e.key === "Enter") {
      updateSkill();
    }}} type="text" className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            placeholder="Enter a skill (eg: React, GENAI, Express, Python, SQL)" value={skill} onChange={(e)=>{setSkill(e.target.value)}}/>
            <button onClick={()=>{updateSkill()}} className='group flex text-white items-center gap-1 bg-blue-600 hover:bg-blue-700 cursor-pointer  rounded-md px-5 py-2 transition-all active:scale-95'>
                <PlusCircle className='size-4 wiggle transition-all duration-200'/>
                <span className='text-sm'>Add</span>
            </button>
        </div>

        {
            data?.length == 0 ? (
              <div className='flex flex-col gap-3 mt-15 justify-center items-center'>
                <Sparkles className='w-15 h-15 text-gray-300'/>
                <p className='text-gray-400 text-center'>No Skills added yet. <br/>Add your skills to showcase your potential!</p>
              </div>
            ) : (
                <div className='mt-4 flex flex-wrap gap-2'>
                    {
                        data.map((skill, idx) => {
                            return(
                                <div key={idx} className='group px-2 py-1 gap-2 flex items-center justify-between bg-purple-400 rounded-2xl transition-all hover:bg-red-500/90 cursor-pointer' onClick={()=>{
                                    const newData = data.filter((_, index) => index !== idx)
                                    onChange(newData)
                                }}>
                                    <span className='text-sm text-white'>{skill}</span>
                                    <X className='size-5 bg-gray-200 rounded-xl p-1 h-min wiggle '/>
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
    </div>
  )
}

export default SkillsForm
