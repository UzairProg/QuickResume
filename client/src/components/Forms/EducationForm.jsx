import { GraduationCap, PlusCircle, Trash2 } from 'lucide-react'
import React from 'react'

function EducationForm({data, onChange}) {

  function addEducation(){
    let newData = [...data, {
      institution: "",
      degree: "",
      field: "",
      graduation_date: "",
      gpa: ""
    }];

    onChange(newData)
  }

  function updateEducation(index, key, value){
    let newData = [...data];
    newData[index][key] = value
    onChange(newData)
  }

  function deleteEducation(idx){
    let newData = [...data];
    newData.splice(idx,1)
    onChange(newData)
  }

   return (
    <div>

        <div className='flex justify-between w-full  pr-4 items-center'>
            <div className='flex flex-col'>
                <h3 className='font-semibold text-lg'>Education</h3>
                <p className='text-gray-600 text-md'>Add your education details</p>
            </div>

            <button onClick={()=>{
                addEducation();
                }} className='group active:scale-96 bg-gray-200 flex items-center gap-2 h-min py-1 px-2 rounded-md border border-transparent hover:bg-blue-200 hover:border-blue-400 transition-all'>
                <PlusCircle className='size-5 text-blue-600 font-extrabold wiggle duration-300 transition-all'/>
                <p className='text-sm text-blue-600'>Add Education</p>
            </button>
        </div>

        {
            data?.length == 0 ? (
              <div className='flex flex-col gap-3 mt-15 justify-center items-center'>
                <GraduationCap className='w-15 h-15 text-gray-300'/>
                <p className='text-gray-400 text-center'>No education added yet. <br/>Click "Add Education" to get started.</p>
              </div>
            ) :
            (
              <div>
                {
                  data?.map((edu, idx) =>{
                    return(
                      <div className='p-3 border border-gray-200 rounded-lg mt-4' key={idx}>
                        <div className='flex justify-between'>
                          <h3>Education #{idx+1}</h3>
                          <Trash2 className='w-4 text-red-500 cursor-pointer hover:text-red-700' onClick={()=>{deleteEducation(idx)}}/>
                        </div>

                        <div className='grid grid-cols-2 px-2 gap-2 mt-2'>
                          <input type="text" value={edu.institution || ""} placeholder='Institution Name' onChange={(e)=>{
                            updateEducation(idx, "institution", e.target.value)
                          }}
                          className='border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600 rounded-md mt-2'/>

                          <input type="text" value={edu.degree || ""} placeholder="Degree (eg: Bachelor's, Master's)" onChange={(e)=>{
                            updateEducation(idx, "degree", e.target.value)
                          }}
                          className='border border-gray-300 p-2 active:outline-none rounded-md mt-2 focus:outline-none focus:ring-1 focus:ring-blue-600'/>

                          <input type="text" value={edu.field || ""} placeholder='Field of Study' onChange={(e)=>{
                            updateEducation(idx, "field", e.target.value)
                          }}
                          className='border border-gray-300 p-2 active:outline-none rounded-md mt-2 focus:outline-none focus:ring-1 focus:ring-blue-600'/>

                          <input type="month" value={edu.graduation_date} onChange={(e)=>{
                            updateEducation(idx, "graduation_date", e.target.value)
                          }}
                          className='border disabled:bg-gray-200/80 border-gray-300 p-2 active:outline-none rounded-md mt-2 focus:outline-none focus:ring-1 focus:ring-blue-600'/>
                          
                          <input type="text" value={edu.gpa || ""} placeholder='GPA (optional)' onChange={(e)=>{
                            updateEducation(idx, "gpa", e.target.value)
                          }}
                          className='border border-gray-300 p-2 active:outline-none rounded-md mt-2 focus:outline-none focus:ring-1 focus:ring-blue-600'/>
                        </div>
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

export default EducationForm
