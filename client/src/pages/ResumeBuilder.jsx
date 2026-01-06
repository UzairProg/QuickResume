import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { dummyResumeData } from '../assets/assets';

const ResumeBuilder = () => {

  const { resumeId } = useParams();


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

  const loadExistingResume = async () => {
    const resume = dummyResumeData.find((res) => res._id === resumeId);
    if(resume){
      setResumeData(resume);
    }
  }

  useEffect(() => {
    loadExistingResume();
  },[])
  return (
    <div>
      <h1>Resume Builder page</h1>
    </div>
  )
}

export default ResumeBuilder
