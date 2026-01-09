import React from 'react'
import { Sparkles, PlusCircle, Trash2} from 'lucide-react'

function ProjectForm({data, onChange}) {

    function addProject(){
        const newData = [...data, {
            name: "",
            type: "",
            description: "",

        }]

        onChange(newData)
    }

    function updateProject(idx, key, value){
        const newData = [...data]
        newData[idx][key] = value
        onChange(newData)
    }

    function deleteProject(idx){
        const newData = [...data]
        newData.splice(idx, 1)
        onChange(newData)
    }

  return (
    <div>
      <div className='flex justify-between w-full  pr-4 items-center'>
            <div className='flex flex-col'>
                <h3 className='font-semibold text-lg'>Projects</h3>
                <p className='text-gray-600 text-md'>Add your projects</p>
            </div>

            <button onClick={()=>{
                addProject();
                }} className='group active:scale-96 bg-gray-200 flex items-center gap-2 h-min py-1 px-2 rounded-md border border-transparent hover:bg-blue-200 hover:border-blue-400 transition-all'>
                <PlusCircle className='size-5 text-blue-600 font-extrabold wiggle duration-300 transition-all'/>
                <p className='text-sm text-blue-600'>Add Project</p>
            </button>
        </div>

        {
            data?.length == 0 ? (
              <div className='flex flex-col gap-3 mt-15 justify-center items-center'>
                <Sparkles className='w-15 h-15 text-gray-300'/>
                <p className='text-gray-400 text-center'>No Projects added yet. <br/>Click "Add Projects" to showcase your work!</p>
              </div>
            ) :
            (
              <div>
                {
                  data?.map((project, idx) =>{
                    return(
                      <div className='p-3 border border-gray-200 rounded-lg mt-4' key={idx}>
                        <div className='flex justify-between'>
                          <h3>Project #{idx+1}</h3>
                          <Trash2 className='w-4 text-red-500 cursor-pointer hover:text-red-700' onClick={()=>{deleteProject(idx)}}/>
                        </div>

                        <div className='flex flex-col px-2 gap-2 mt-2'>
                          <input type="text" value={project.name || ""} placeholder='Project Name' onChange={(e)=>{
                            updateProject(idx, "name", e.target.value)
                          }}
                          className='border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600 rounded-md mt-2'/>

                          <input type="text" value={project.type || ""} placeholder="Project Name" onChange={(e)=>{
                            updateProject(idx, "type", e.target.value)
                          }}
                          className='border border-gray-300 p-2 active:outline-none rounded-md mt-2 focus:outline-none focus:ring-1 focus:ring-blue-600'/>
                          
                          <textarea 
                          value={project.description} onChange={(e)=>{updateProject(idx, "description", e.target.value)}}
                          rows={3} placeholder='Describe your Project....' className='focus:outline-none p-2 focus:ring-1 focus:ring-blue-600 rounded-md resize-none border border-gray-300'>

                          </textarea>
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

export default ProjectForm
