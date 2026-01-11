import React from 'react';
import { useParams } from 'react-router-dom';
import ResumePreview from '../components/Preview/ResumePreview';
import Loader from '../components/Loader/Loader';
import api from '../configs/api';

const Preview = () => {
  const {resumeId} = useParams();

  const [isLoading, setIsLoading] = React.useState(true);
  const [resumeData, setResumeData] = React.useState(null);

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

  const loadResume = async () => {
    setIsLoading(true);

    // Try local dummy first (dev fallback)
    const local = dummyResumeData.find(resume => resume._id === resumeId);
    if (local) {
      setResumeData(local);
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await api.get(`/api/resumes/public/${resumeId}`);
      if (data?.resume) {
        const mapped = mapFromServer(data.resume);
        setResumeData(mapped);
      } else {
        setResumeData(null);
      }
    } catch (error) {
      console.error('Error loading resume preview:', error?.response?.data || error.message);
      setResumeData(null);
    } finally {
      setIsLoading(false);
    }
  }
  React.useEffect(() => {
    loadResume();
    console.log(resumeId)
  }, []);

{

  return resumeData ? (
    <div>
      <ResumePreview data={resumeData} template={resumeData.template || "classic"} accentColor={resumeData.accent_color || resumeData.accentColor} classes='py-4 bg-white'/>
    </div>
  ) : (
    <div>
      {
        isLoading ? (
          <div className='flex justify-center items-center h-screen'>
              <Loader />
          </div>
        ) : (
          <div className='flex h-screen w-full justify-center items-center bg-black'>

        <div className="flex flex-col items-center justify-center text-sm max-md:px-4 py-20">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                404 Not Found
            </h1>
            <div className="h-px w-80 rounded bg-gradient-to-r from-gray-400 to-gray-800 my-5 md:my-7"></div>
            <p className="md:text-xl text-gray-400 max-w-lg text-center">
                The page you are looking for does not exist or has been moved.
            </p>
            <a href="/" className="group flex items-center gap-1 bg-white hover:bg-gray-200 px-7 py-2.5 text-gray-800 rounded-full mt-10 font-medium active:scale-95 transition-all">
                Back to Home
                <svg className="group-hover:translate-x-0.5 transition" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.583 11h12.833m0 0L11 4.584M17.416 11 11 17.417" stroke="#1E1E1E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
        </div>

          </div>
        )
      }
    </div>
  )
}
}
export default Preview
