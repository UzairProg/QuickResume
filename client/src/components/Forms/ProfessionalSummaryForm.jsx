import { Wand } from 'lucide-react'
import React from 'react'
import api from '../../configs/api'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { updateCredits } from '../../app/features/authSlice'

function ProfessionalSummaryForm({data, onChange}) {

    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const [summary, setSummary] = React.useState(data || "")
    const [loading, setLoading] = React.useState(false)

    const handleEnhance = async () => {
        if (!summary.trim()) {
            toast.info("Add some summary text first");
            return;
        }
        try {
            setLoading(true);
            const { data } = await api.post('/api/ai/enhance-summary', { content: summary }, {
                headers: { Authorization: token }
            });
            if (data?.enhancedSummary) {
                setSummary(data.enhancedSummary);
                onChange(data.enhancedSummary);
                
                // Fetch updated credits from server
                try {
                    const { data: userData } = await api.get('/api/users/data', {
                        headers: { Authorization: token }
                    });
                    if (userData?.user?.aiCredits !== undefined) {
                        dispatch(updateCredits(userData.user.aiCredits));
                    }
                } catch (e) {
                    console.error('Failed to sync credits');
                }
                
                toast.success("Summary enhanced successfully!");
            }
        } catch (error) {
            if (error.response?.status === 403) {
                toast.error("All AI credits used!");
            } else {
                toast.error(error?.response?.data?.message || 'AI enhance failed');
            }
        } finally {
            setLoading(false);
        }
    }

  return (
    <div>
        <div className='flex justify-between w-full  pr-4 items-center'>
            <div className='flex flex-col'>
                <h3 className='font-semibold text-lg'>Professional Summary</h3>
                <p className='text-gray-600 text-md'>Add summary for your resume here</p>
            </div>

            <button onClick={handleEnhance} disabled={loading} className='group bg-gray-200 flex items-center gap-2 h-min py-1 px-2 rounded-md border border-transparent hover:bg-purple-200 hover:border-purple-400 transition-all disabled:opacity-60 disabled:cursor-not-allowed'>
                <Wand className='size-5 text-purple-600 font-extrabold wiggle duration-300 transition-all'/>
                <p className='text-sm text-purple-600'>{loading ? 'Enhancing...' : 'Ai Enhance'}</p>
            </button>
        </div>

        <div>
            <textarea
                className='w-full mt-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600/60 transition-all resize-none'
                rows={5}
                placeholder='Write a brief summary about your professional background, skills, and career goals.'
                onChange={(e)=>{
                    setSummary(e.target.value)
                    onChange(e.target.value)
                }}
                value={summary}
            ></textarea>

        </div>

        <p className='text-sm px-8 text-center text-gray-400'>Tip: Keep it concise (3-4 sentences) and focus on your most relevant achievements and skills.</p>
    </div>
  )
}

export default ProfessionalSummaryForm
