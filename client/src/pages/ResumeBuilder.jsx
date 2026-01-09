import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { dummyResumeData } from '../assets/assets';
import { ArrowLeftFromLine, BriefcaseBusiness, ChevronLeft, ChevronRight, FileTextIcon, Folders, GraduationCap, LucideLayoutTemplate, Palette, Sparkles, User } from 'lucide-react';
import PersonalInformationForm from '../components/Forms/PersonalInformationForm';
import ResumePreview from '../components/Preview/ResumePreview';
import TemplateSelector from '../components/Selector/templateSelector';
import AccentSelector from '../components/Selector/accentSelector';
import ProfessionalSummaryForm from '../components/Forms/ProfessionalSummaryForm';
import ProfessionalExperienceForm from '../components/Forms/ProfessionalExpirienceForm';
import EducationForm from '../components/Forms/EducationForm';

const ResumeBuilder = () => {

  const navigate = useNavigate();

  const { resumeId } = useParams();
  const [activeSectionIndex, setActiveSectionIndex] = React.useState(0);
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

      <div className=' flex gap-8 mt-4 rounded-xl overflow-hidden'>
        {/* left part */}
        <div className='relative w-2/5 ml-1 border border-gray-200 p-4 rounded-xl max-h-fit'>
          
          {/* progress bar */}
          <hr className='absolute top-0 right-0 left-0 w-full bg-gray-200 border-none h-1 rounded-full'/>
          <hr className='absolute max-w-full top-0 right-0 left-0 bg-blue-600/80 h-1 rounded border-none transition-all duration-500' style={{width: `${activeSectionIndex * 100/ (sections.length - 1)}% `}}/>

          {/* buttons and navigation */}
            <div className='flex justify-between w-full mt-5 ml-2 mb-2'>
              {/* left sub part buttons */}
              <div className='flex gap-2'>
                <TemplateSelector data={resumeData.template} onChange={(tempId) => {
                  setResumeData(prev => ({...prev, template: tempId}))
                }}/>

                <AccentSelector data={resumeData.accent_color} onChange={(color) => {
                  setResumeData(prev => ({...prev, accent_color: color}))
                }}/>
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
                }} className='flex items-center text-gray-500 hover:cursor-pointer hover:text-gray-700' style={{color: activeSectionIndex === sections.length-1 ? "#d1d5dc" : "", cursor: activeSectionIndex === sections.length-1 ? "auto" : "pointer"}}>
                  <p>Next</p>
                  <ChevronRight className='w-5 h-4'/>
                </div>
              </div>

            </div>
            <hr className='text-gray-300'/>
          {/* form content */}
            <div className='mt-5'>
                {
                  <div>
                    {
                      activeSection.id === "personal_info" && (
                    <PersonalInformationForm data={resumeData.personal_info} removeBackground={removeBackground} setRemoveBackground={setRemoveBackground} onChange={(info)=>{
                      setResumeData(prev => ({...prev, personal_info: info}))
                    }}/>
                  )
                    }

                    {
                      activeSection.id === "professional_summary" && (
                        <ProfessionalSummaryForm data={resumeData.professional_summary} onChange={(summary)=>{
                          setResumeData(prev => ({...prev, professional_summary: summary}))
                        }}/>
                      )
                    }

                    {activeSection.id === "experience" && (
                      <ProfessionalExperienceForm data={resumeData.expirience} onChange={(expirience)=>{
                        setResumeData(prev => ({...prev, expirience: expirience}))
                      }}/>
                    )
                    }

                    {activeSection.id === "education" && (
                      <div>
                        <EducationForm data={resumeData.education} onChange={(education)=>{
                          setResumeData(prev => ({...prev, education: education}))
                        }}/>
                      </div>
                    )
                    }

                    {activeSection.id === "skills" && (
                      <div>
                        Skills Form
                      </div>
                    )
                    }

                    {activeSection.id === "projects" && (
                      <div>
                        Projects Form
                      </div>
                    )
                    }



                    
                  </div>
                  
                }
            </div>
        </div>

        {/* right part */}
        <div className='w-3/5 '>
          <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} classes="mx-auto my-4 shadow-lg"/>
        </div>
      </div>

    </div>
  )
}

export default ResumeBuilder
