import { BriefcaseBusiness, PlusCircle, Trash2, Wand } from 'lucide-react'
import React from 'react'

function ProfessionalExperienceForm({data = [], onChange}) {

  function addExperience(){
    const newExperience = [...data, {
      position: "",
      company: "",
      start_date: "",
      end_date: "",
      is_current: false,
      description: ""
    }];
    onChange(newExperience);
  }

  function deleteExperience(index){
    const newExperience = data.filter((_, idx) => idx !== index);
    onChange(newExperience);
  }

  function updateExperience(index, field, value){
    const newExperience = [...data];
    newExperience[index][field] = value;
    onChange(newExperience);
  }

  return (
    <div>

        <div className='flex justify-between w-full  pr-4 items-center'>
            <div className='flex flex-col'>
                <h3 className='font-semibold text-lg'>Professional Experience</h3>
                <p className='text-gray-600 text-md'>Add your job experience</p>
            </div>

            <button onClick={()=>{
                  // console.log("clicled")
                  addExperience();
                }} className='group active:scale-96 bg-gray-200 flex items-center gap-2 h-min py-1 px-2 rounded-md border border-transparent hover:bg-blue-200 hover:border-blue-400 transition-all'>
                <PlusCircle className='size-5 text-blue-600 font-extrabold wiggle duration-300 transition-all'/>
                <p className='text-sm text-blue-600'>Add Experience</p>
            </button>
        </div>

        {Array.isArray(data) ? (
            data?.length === 0 ? (
              <div className='flex flex-col gap-3 mt-15 justify-center items-center'>
                <BriefcaseBusiness className='w-15 h-15 text-gray-300'/>
                <p onClick={()=>{addExperience()}}
                className='text-gray-400 text-center'>No work experience added yet. <br/>Click "Add Experience" to get started.</p>
              </div>
            ) :
            (
              <div>
                {
                  data?.map((exp, idx) =>{
                    return(
                      <div className='p-3 border border-gray-200 rounded-lg mt-4' key={idx}>
                        <div className='flex justify-between'>
                          <h3>Experience #{idx+1}</h3>
                          <Trash2 className='w-4 text-red-500 cursor-pointer hover:text-red-700' onClick={()=>{deleteExperience(idx)}}/>
                        </div>

                        <div className='grid grid-cols-2 px-2 gap-2 mt-2'>
                          <input type="text" value={exp.company || ""} placeholder='Company Name' onChange={(e)=>{
                            updateExperience(idx, "company", e.target.value)
                          }}
                          className='border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600 rounded-md mt-2'/>

                          <input type="text" value={exp.position || ""} placeholder='Job Title' onChange={(e)=>{
                            updateExperience(idx, "position", e.target.value)
                          }}
                          className='border border-gray-300 p-2 active:outline-none rounded-md mt-2 focus:outline-none focus:ring-1 focus:ring-blue-600'/>

                          <input type="month" value={exp.start_date} onChange={(e)=>{
                            updateExperience(idx, "start_date", e.target.value)
                          }}
                          className='border border-gray-300 p-2 active:outline-none rounded-md mt-2 focus:outline-none focus:ring-1 focus:ring-blue-600'/>

                          <input type="month" value={exp.end_date} onChange={(e)=>{
                            updateExperience(idx, "end_date", e.target.value)
                          }}
                          disabled={exp.is_current}
                          className='border disabled:bg-gray-200/80 border-gray-300 p-2 active:outline-none rounded-md mt-2 focus:outline-none focus:ring-1 focus:ring-blue-600'/>
                          
                        </div>

                        <label className='flex items-center gap-2 mt-2 ml-2'>
                          <input type="checkbox" checked={exp.is_current || false} onChange={(e)=>{
                            updateExperience(idx, "is_current", e.target.checked ? true : false)
                          }}
                          className='w-3 h-3 rounded-full'/>
                          <span className='text-sm text-gray-800'>Currently working here</span>
                        </label>
                          
                        <div className='px-2 flex flex-col mt-2 gap-2'>
                          <div className='flex justify-between items-center'>
                            <h3>Job Description</h3>
                            <button className='group bg-gray-200 flex items-center gap-2 h-min py-1 px-2 rounded-md border border-transparent hover:bg-purple-200 hover:border-purple-400 transition-all'>
                                <Wand className='size-4 text-purple-600 font-extrabold wiggle duration-300 transition-all'/>
                                <p className='text-xs text-purple-600 font-semibold  group-hover:font-bold'>Ai Enhance</p>
                            </button>
                          </div>
                          
                          <textarea rows={4} placeholder='Describe your key responsibilities and contibutions...'
                          value={exp.description} onChange={(e)=>{updateExperience(idx, "description", e.target.value)}}
                          className='w-full focus:ring-blue-500 focus:ring-1 rounded-lg p-2 resize-none focus:outline-none border border-gray-400'></textarea>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            )
        ) : null}

    </div>
  )
}

export default ProfessionalExperienceForm
