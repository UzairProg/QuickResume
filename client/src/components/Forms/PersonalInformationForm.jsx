import { BriefcaseBusiness, Globe2, Linkedin, Mail, MapPin, Phone, User, UserRoundPen  } from 'lucide-react'
import React from 'react'

function PersonalInformationForm({data, onChange, removeBackground, setRemoveBackground}) {

    function handleChange(field, value){
        onChange({...data, [field] : value}) // what it does is it takes the previous data and updates only the field that is changed
    }

    const fields = [
        { label: "Full Name", key: "full_name", type: "text", placeholder: "Enter your full name", icon: User, required: true },
        { label: "Email", key: "email", type: "email", placeholder: "Enter your email address", icon: Mail, required: true },
        { label: "Phone Number", key: "phone", type: "text", placeholder: "Enter your phone number", icon: Phone },
        { label: "Location", key: "location", type: "text", placeholder: "Enter your location", icon: MapPin },
        { label: "Profession", key: "profession", type: "text", placeholder: "Enter your profession", icon: BriefcaseBusiness },
        { label: "LinkedIn", key: "linkedin", type: "url", placeholder: "Enter your LinkedIn profile URL", icon: Linkedin },
        { label: "website", key: "website", type: "url", placeholder: "Enter your personal website URL", icon: Globe2 },
    ]
    
  return (
    <div>
        <h3 className='font-semibold text-lg'>Personal Information</h3>
        <p className='text-gray-600 text-md'>Get Started with the personal information</p>

        <div className='flex items-center gap-2 mt-4'>
            <label>
            {
                data?.image ? (
                    <img src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)} alt="user_img" 
                    className='w-16 h-16 ml-1 rounded-full border-2 border-transparent hover:border-gray-300 object-cover cursor-pointer transition-colors'
                    />
                ): (
                    <div className='group flex items-center gap-2 ml-2 hover:cursor-pointer '>
                        <UserRoundPen className='transition-colors w-11 h-11 group-hover:text-gray-700 text-gray-400 border pl-2 pr-1 py-2 rounded-full text-center'/>
                        <p className='transition-colors text-gray-500 group-hover:text-gray-700'>Upload user image</p>
                    </div>
                )
            }
            <input type="file" accept='image/jpeg, image/png' className='hidden' onChange={(e)=>{handleChange("image", e.target.files[0])}}/>
            </label>
            {
                typeof data.image === 'object' && (
                    <div className='flex items-start flex-col gap-1'>
                        <p className='text-sm font-medium text-gray-700'>Remove Background</p>
                        <label className='relative inline-flex items-center cursor-pointer'>
                            <input type="checkbox" checked={removeBackground} onChange={(e)=>{setRemoveBackground(e.target.checked)}} className='sr-only peer'/>
                            <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                )
            }
        </div>
        <div className='mt-6 space-y-5'>
            {
                fields.map((field) => {
                    const Icon = field.icon;
                    return(
                        <div key={field.key} className='flex flex-col gap-2'>
                            <label className='flex gap-2 items-center font-medium text-gray-700 text-sm'>
                                <Icon className='size-4 text-blue-600'/>
                                {field.label}
                                {field.required && <span className='text-red-500'>*</span>}
                            </label>
                            <input 
                                type={field.type} 
                                value={data[field.key] || ""} 
                                onChange={(e)=>{
                                    handleChange(field.key, e.target.value)
                                }} 
                                placeholder={`Enter your ${field.label.toLocaleLowerCase()}`} 
                                required={field?.required}
                                className='px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                            />
                        </div>
                        
                    )
                })
            }
        </div>
    </div>
  )
}

export default PersonalInformationForm
