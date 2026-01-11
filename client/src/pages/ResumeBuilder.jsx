import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftFromLine, BriefcaseBusiness, ChevronLeft, ChevronRight, Eye, EyeClosed, FileDown, FileTextIcon, Folders, GraduationCap, LucideLayoutTemplate, Palette, Share2, Sparkles, User } from 'lucide-react';
import PersonalInformationForm from '../components/Forms/PersonalInformationForm';
import ResumePreview from '../components/Preview/ResumePreview.jsx';
import TemplateSelector from '../components/Selector/templateSelector.jsx';
import AccentSelector from '../components/Selector/accentSelector.jsx';
import ProfessionalSummaryForm from '../components/Forms/ProfessionalSummaryForm.jsx';
import ProfessionalExperienceForm from '../components/Forms/ProfessionalExperienceForm.jsx';
import EducationForm from '../components/Forms/EducationForm.jsx';
import ProjectForm from '../components/Forms/ProjectForm.jsx';
import SkillsForm from '../components/Forms/SkillsForm.jsx';
import { toast, ToastContainer } from 'react-toastify';
import api from '../configs/api';
import { useSelector } from 'react-redux';
// import { set } from 'mongoose';

const ResumeBuilder = () => {

  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.auth);

  const { resumeId } = useParams();
  const [activeSectionIndex, setActiveSectionIndex] = React.useState(0);
  const [removeBackground, setRemoveBackground] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [resumeData, setResumeData] = React.useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    skills: [],
    project: [],
    template: "",
    accent_color: "blue",
    public: false
  })

  const sections =[
    { id: "personal_info", title: "Personal Info", icon: User },
    { id: "professional_summary", title: "Professional Summary", icon: FileTextIcon },
    { id: "experience", title: "Experience", icon: BriefcaseBusiness },
    { id: "education", title: "Education", icon: GraduationCap },
    { id: "projects", title: "Projects", icon: Folders },
    { id: "skills", title: "Skills", icon: Sparkles },
  ]

  const activeSection = sections[activeSectionIndex];

  const loadExistingResume = async () => {
    // const {data} = await api.post(`api/resumes/get/${resumeId}`, {
    //     headers: { Authorization: token },
    //   });
      const {data} = await api.get(`api/resumes/get/${resumeId}`, {
        headers: { Authorization: token },
      });
    if(data){
      const mapped = mapFromServer(data.resume);
      setResumeData(mapped);
      // Set removeBackground state from persisted data
      setRemoveBackground(mapped.personal_info?.imageBackgroundRemoved || false);
      document.title = `${data.resume.title} - QuickResume`;
    }
  }

  const mapToServer = (client) => {
    const mapped = { ...client };
    // map accent color
    mapped.accentColor = client.accent_color;
    delete mapped.accent_color;
    // map experience -> expierence and fix end_date key
    if (Array.isArray(client.experience)) {
      mapped.expierence = client.experience.map((e) => ({
        ...e,
        end_data: e.end_date,
      }));
      delete mapped.experience;
    }
    // ensure template/public/title stay
    return mapped;
  };

  const mapFromServer = (server) => {
    const mapped = { ...server };
    mapped.accent_color = server.accentColor ?? server.accent_color;
    delete mapped.accentColor;
    if (Array.isArray(server.expierence)) {
      mapped.experience = server.expierence.map((e) => ({
        ...e,
        end_date: e.end_data ?? e.end_date,
      }));
      delete mapped.expierence;
    }
    return mapped;
  };

  const buildServerPayload = (rawData) => {
    const base = {
      ...rawData,
      personal_info: { ...rawData.personal_info },
    };

    // Remove File object before JSON cloning
    if (typeof base.personal_info?.image === "object") {
      delete base.personal_info.image;
    }

    // Store the removeBackground state
    base.personal_info.imageBackgroundRemoved = removeBackground;

    // JSON clone to avoid cloning unsupported objects like events
    const jsonSafe = JSON.parse(JSON.stringify(base));

    return mapToServer(jsonSafe);
  };

  const coerceData = (arg) => {
    // Ignore click events
    if (arg && arg.target) return undefined;
    return arg;
  };

  const handleSave = async (nextData) => {
    setIsLoading(true);

    try {
      const source = coerceData(nextData) ?? resumeData;
      const serverPayload = buildServerPayload(source);

      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify(serverPayload));
      if (removeBackground) formData.append("removeBackground", "yes");
      if (source?.personal_info && typeof source.personal_info.image === "object") {
        formData.append("image", source.personal_info.image);
      }

      const { data } = await api.put("/api/resumes/update", formData, {
        headers: { Authorization: token },
      });

      const mapped = mapFromServer(data.resume);
      setResumeData(mapped);
      toast.success(data.message);
    } catch (error) {
      // console.error("Error saving resume:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleTogglePublic = async () => {
    const nextPublic = !resumeData.public;
    const updated = { ...resumeData, public: nextPublic };
    setResumeData(updated);
    await handleSave(updated);
    toast.dismiss();
    toast.success(`Resume is now ${nextPublic ? "Public" : "Private"}`);
  };

  useEffect(() => {
    loadExistingResume();
  },[])

  const handleShare = () => {
    const frontendUrl = window.location.href.split('/app')[0];
    const resumeUrl = frontendUrl + '/view/' + resumeId

    if(navigator.share){
      navigator.share({url: resumeUrl, text: "Check out my resume!"})
    }else{
      alert("Sharing not supported in this browser. Please copy the link: " + resumeUrl)
    }
  }

  const downloadResume = () => {
    window.print();
  }

  return (
    <div className='flex flex-col select-none py-6 px-16'>
      <ToastContainer />
      
      {/* back to home */}
      <div onClick={()=>{
        navigate(`/app`);
      }} className='flex gap-2 items-center text-gray-500 hover:text-gray-700 cursor-pointer transition-color duration-200'>
        <ArrowLeftFromLine className='w-5 h-5 '/> <p className=''>Back to Dashboard</p>
      </div>

      {/* main section */}

      <div className=' flex gap-8 mt-4 rounded-xl '>
        {/* left part */}
        <div className='relative w-2/5 ml-1 border border-gray-200 p-4 rounded-xl max-h-fit'>
          
          {/* progress bar */}
          <hr className='absolute top-0 right-0 left-0 w-full bg-gray-200 border-none h-1 rounded-full'/>
          <hr className='absolute max-w-full top-0 right-0 left-0 bg-blue-600/80 h-1 rounded border-none transition-all duration-500' style={{width: `${activeSectionIndex * 100/ (sections.length - 1)}% `}}/>

          {/* buttons and navigation */}
            <div className='flex justify-between w-full mt-5 ml-2 mb-2'>
              {/* left sub part buttons */}
              <div className='flex gap-2 h-full'>
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
                        // console.log(activeSectionIndex)
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
                        // console.log(activeSectionIndex)
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
                      <ProfessionalExperienceForm data={resumeData.experience} onChange={(experience)=>{
                        setResumeData(prev => ({...prev, experience: experience}))
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
                        <SkillsForm data={resumeData.skills} onChange={(skills)=>{
                          setResumeData(prev => ({...prev, skills: skills}))
                        }}/>
                      </div>
                    )
                    }

                    {activeSection.id === "projects" && (
                      <div>
                        <ProjectForm data={resumeData.project} onChange={(projects)=>{
                          setResumeData(prev => ({...prev, project: projects}))
                        }}/>
                      </div>
                    )
                    }
                  </div>
                  
                }

                <button onClick={() => handleSave()} type="button" disabled={isLoading} className='border border-gray-300 hover:bg-blue-700/85 mt-8 active:scale-98 ml-2 px-4 py-2 text-white rounded-md bg-blue-600/90 disabled:opacity-60 disabled:cursor-not-allowed'>
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
            </div>
            
        </div>

        {/* right part */}
        <div className='w-3/5 relative '>
          <div className='absolute flex flex-row-reverse right-5 -top-6 gap-4' >

            <button onClick={downloadResume} className='px-3 group h-min py-1 flex items-center justify-center bg-purple-200 rounded-sm gap-1.5 ring-1 hover:ring-2 transition-all ring-purple-500'>
              <FileDown className='w-5 h-6 wiggle group-hover:text-purple-800'/>
              <span className='text-sm '>Download</span>
            </button>

            <button onClick={handleTogglePublic} className='px-3 group h-min py-1 flex items-center justify-center bg-blue-200 rounded-sm gap-1.5 ring-1 hover:ring-2 transition-all ring-blue-500'>
              <EyeClosed className={`w-5 h-6 wiggle group-hover:text-blue-800 ${resumeData.public ? "hidden" : ""}`}/>
              <Eye className={`w-5 h-6 wiggle group-hover:text-blue-800 ${resumeData.public ? "" : "hidden"}`}/>
              <span className={`text-sm ${resumeData.public ? "" : "hidden"}`}>Public</span>
              <span className={`text-sm ${resumeData.public ? "hidden" : ""}`}>Private</span>
            </button>

            

            {
              resumeData.public && (
                <button onClick={handleShare}className='px-3 group h-min py-1 flex items-center justify-center bg-green-200 rounded-sm gap-1.5 ring-1 hover:ring-2 transition-all ring-green-500'>
                  <Share2 className='w-5 h-6 wiggle group-hover:text-green-800'/>
                  <span className='text-sm '>Share</span>
                </button>
              )
            }
          </div>
          <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} classes="mx-auto my-4 shadow-lg"/>
        </div>
      </div>

            {/* styling for printing perfectly !ignore the style code.. above is the resume builder code*/}

            <style jsx>
        {
          `
          @media print {
            @page {
              margin: 0;
              padding: 0;
              size: A4;
            }
            
            body, html {
              margin: 0 !important;
              padding: 0 !important;
            }
            
            /* Hide everything except resume content */
            .flex.gap-2.items-center,
            .absolute.flex.flex-row-reverse,
            .w-2\\/5,
            hr {
              display: none !important;
            }
            
            /* Remove top padding from main container */
            .flex.flex-col.select-none {
              padding: 0 !important;
              margin: 0 !important;
            }
            
            /* Remove gap and spacing */
            .flex.gap-8.mt-4 {
              gap: 0 !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            
            /* Full width resume */
            .w-3\\/5 {
              width: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            
            /* Resume container */
            .w-full.bg-gray-100 {
              width: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
              background: white !important;
            }
            
            /* Resume preview */
            #resume-preview {
              width: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
              box-shadow: none !important;
              border: none !important;
              page-break-inside: avoid !important;
            }
            
            /* Remove margins from wrapper */
            .mx-auto.my-4.shadow-lg {
              margin: 0 !important;
              box-shadow: none !important;
              padding: 0 !important;
            }
            
            /* Compress Modern, Classic, and Minimal templates for single page */
            div[data-template="modern"] .p-8 {
              padding: 0.75rem !important;
            }
            
            div[data-template="modern"] header {
              padding: 1rem !important;
            }
            
            div[data-template="modern"] h2 {
              font-size: 1.25rem !important;
              margin-bottom: 0.75rem !important;
            }
            
            div[data-template="modern"] section {
              margin-bottom: 1rem !important;
            }
            
            div[data-template="modern"] .space-y-6 {
              gap: 1rem !important;
            }
            
            /* Classic template compression */
            div[data-template="classic"] {
              padding: 0.75rem !important;
            }
            
            div[data-template="classic"] header {
              margin-bottom: 0.75rem !important;
              padding-bottom: 0.5rem !important;
            }
            
            div[data-template="classic"] h2 {
              font-size: 1.1rem !important;
              margin-bottom: 0.5rem !important;
            }
            
            div[data-template="classic"] section {
              margin-bottom: 0.75rem !important;
            }
            
            /* Minimal template compression */
            div[data-template="minimal"] {
              padding: 0.75rem !important;
            }
            
            div[data-template="minimal"] header {
              margin-bottom: 0.75rem !important;
            }
            
            div[data-template="minimal"] h1 {
              font-size: 2.5rem !important;
              margin-bottom: 0.5rem !important;
            }
            
            div[data-template="minimal"] h2 {
              font-size: 1rem !important;
              margin-bottom: 0.5rem !important;
            }
            
            div[data-template="minimal"] section {
              margin-bottom: 0.75rem !important;
            }
            
            div[data-template="minimal"] .space-y-6 {
              gap: 0.75rem !important;
            }
          }
          `
        }
      </style>
    </div>

    
  )
}

export default ResumeBuilder
