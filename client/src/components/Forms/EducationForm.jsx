import { GraduationCap, PlusCircle } from 'lucide-react'
import React from 'react'

function EducationForm({data, onChange}) {

    const [education, setEducation] = React.useState([])

   return (
    <div>

        <div className='flex justify-between w-full  pr-4 items-center'>
            <div className='flex flex-col'>
                <h3 className='font-semibold text-lg'>Education</h3>
                <p className='text-gray-600 text-md'>Add your education details</p>
            </div>

            <button className='group bg-gray-200 flex items-center gap-2 h-min py-1 px-2 rounded-md border border-transparent hover:bg-purple-200 hover:border-purple-400 transition-all'>
                <PlusCircle className='size-5 text-purple-600 font-extrabold wiggle duration-300 transition-all'/>
                <p className='text-sm text-purple-600'>Add Education</p>
            </button>
        </div>

        {
            education?.length == 0 ? (
              <div className='flex flex-col gap-3 mt-15 justify-center items-center'>
                <GraduationCap className='w-15 h-15 text-gray-300'/>
                <p className='text-gray-400 text-center'>No education added yet. <br/>Click "Add Education" to get started.</p>
              </div>
            ) :
            (
              <div>

              </div>
            )
        }

    </div>
  )
}

export default EducationForm
