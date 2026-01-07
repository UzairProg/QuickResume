import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { dummyResumeData } from '../assets/assets';
import { ArrowLeftFromLine, BriefcaseBusiness, ChevronLeft, ChevronRight, FileTextIcon, Folders, GraduationCap, LucideLayoutTemplate, Palette, Sparkles, User } from 'lucide-react';

const ResumeBuilder = () => {

  const navigate = useNavigate();

  const { resumeId } = useParams();
  const [activeSectionIndex, setActiveSectionIndex] = React.useState(2);
  const [removeBackground, setRemoveBackground] = React.useState(false);

  const [resumeData, setResumeData] = React.useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    expirience: [],
    education: [],
    skills: [],
    project: [],
    template: "",
    accent_color: "",
    public: false
  })

  const sections =[
    { id: "personal_info", title: "Personal Info", icon: User },
    { id: "professional_summary", title: "Professional Summary", icon: FileTextIcon },
    { id: "experience", title: "Experience", icon: BriefcaseBusiness },
    { id: "education", title: "Education", icon: GraduationCap },
    { id: "skills", title: "Skills", icon: Sparkles },
    { id: "projects", title: "Projects", icon: Folders },
  ]

  const activeSection = sections[activeSectionIndex];

  const loadExistingResume = async () => {
    const resume = dummyResumeData.find((res) => res._id === resumeId);
    if(resume){
      setResumeData(resume); 
      document.title = `${resume.title} - QuickResume`;
    }
  }

  useEffect(() => {
    loadExistingResume();
  },[])
  return (
    <div className='flex flex-col select-none py-6 px-16'>

      {/* back to home */}
      <div onClick={()=>{
        navigate(`/app`);
      }} className='flex gap-2 items-center text-gray-500 hover:text-gray-700 cursor-pointer transition-color duration-200'>
        <ArrowLeftFromLine className='w-5 h-5 '/> <p className=''>Back to Dashboard</p>
      </div>

      {/* main section */}

      <div className=' flex gap-8 mt-8 rounded-xl overflow-hidden'>
        {/* left part */}
        <div className='relative w-2/5'>
          
          {/* progress bar */}
          <hr className='absolute top-0 right-0 left-0 w-full bg-gray-200 border-none h-1 rounded-full'/>
          <hr className='absolute max-w-full top-0 right-0 left-0 bg-blue-600/80 h-1 rounded border-none' style={{width: `${activeSectionIndex * 100/ (sections.length - 1)}% `}}/>

          {/* buttons and navigation */}
            <div className='flex justify-between w-full mt-5 ml-2 mb-3'>
              {/* left sub part buttons */}
              <div className='flex gap-2'>
                <div className='flex bg-blue-100 py-2 px-3 rounded-md gap-1 border border-transparent hover:border-blue-400 transition-all'>
                  <LucideLayoutTemplate className='w-6 h-5 text-blue-800'/>
                  <p className='text-sm text-blue-800'>Template</p>
                </div>

                <div className='flex bg-purple-100 py-2 px-3 rounded-md gap-1 border border-transparent hover:border-purple-400 transition-all'>
                  <Palette className='w-6 h-5 text-purple-800'/>
                  <p className='text-sm text-purple-800'>Accent</p>
                </div>
              </div>

              {/* right sub part */}
              <div className='flex gap-6 text-gray-500 '>
                {
                  activeSectionIndex !== 0 &&(
                    <div onClick={()=>{
                      if(activeSectionIndex-1 >= 0){
                        setActiveSectionIndex(prev => prev-1)
                        console.log(activeSectionIndex)
                      }
                    }}className='flex items-center hover:cursor-pointer hover:text-gray-700'>
                      <ChevronLeft className='w-5 h-4 '/>
                      <p className=''>Previous</p>
                    </div>
                  )
                }

                <div onClick={()=>{
                  if(activeSectionIndex+1 < sections.length){
                        setActiveSectionIndex(prev => prev+1)
                        console.log(activeSectionIndex)
                      }
                }} className='flex items-center text-gray-500 hover:cursor-pointer hover:text-gray-700'>
                  <p>Next</p>
                  <ChevronRight className='w-5 h-4'/>
                </div>
              </div>

            </div>
        </div>

        {/* right part */}
        <div className='w-3/5 bg-blue-700'>
          hello
        </div>
      </div>

    </div>
  )
}

export default ResumeBuilder
