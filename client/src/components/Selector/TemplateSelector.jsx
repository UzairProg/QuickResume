import React from 'react'
import { LucideLayoutTemplate, LucideTicketCheck } from 'lucide-react';

function TemplateSelector({data, onChange}) {

    const [isDropDownOpen, setIsDropDownOpen] = React.useState(false)
    const [selected, setSelected] = React.useState(0)
    const templates = [
        { id: 'classic', name: 'Classic', description: 'A traditional resume layout with clear sections and headings.' },
        { id: 'modern', name: 'Modern', description: 'A sleek and contemporary design with bold typography and clean lines.' },
        { id: 'minimal', name: 'Minimal', description: 'A simple and elegant template focusing on content with ample white space.' },
        { id: 'minimal-image', name: 'Minimal with Image', description: 'A minimal design that includes a profile image for a personal touch.' },
    ];

  return (
    <div className='relative z-10'>
        <div onClick={()=>{
            setIsDropDownOpen(!isDropDownOpen)
        }}className='flex min-w-fit bg-blue-100 py-2 px-3 rounded-md gap-1 border border-transparent hover:border-blue-400 transition-all'>
            <LucideLayoutTemplate className={`w-6 h-5 text-blue-800 transition-all duration-300 ${isDropDownOpen ? "-rotate-90" : ""}`}/>
            <p className='text-sm text-blue-800'
            >Template</p>
        </div>

        {/* drop down */}
        {
            isDropDownOpen && (
                <div className='absolute bg-white/40 backdrop-blur-sm px-4 py-4 overflow-hidden flex flex-col gap-2 top-full w-90 mt-2'>
                    {
                        templates.map((template, idx) => {
                            return(
                                <div onClick={()=>{
                                    setSelected(idx)
                                    onChange(template.id)
                                    setIsDropDownOpen(false)
                                }} className='relative transition-all border rounded-lg border-gray-300 px-2 py-2 gap-2 flex flex-col hover:bg-gray-200/80 hover:border-gray-400'
                                style={{backgroundColor: selected === idx ? "rgba(59, 130, 246, 0.2)" : "", borderColor: selected === idx ? "rgb(96, 165, 250)" : ""}}
                                key={template.id}
                                >
                                    <h3 className='font-semibold'>{template.name}</h3>
                                    <p className='p-2 bg-blue-100/40 rounded-sm text-sm'>{template.description}</p>
                                    <LucideTicketCheck className='absolute right-2 top-2 text-blue-400 hidden'
                                    style={{display: selected === idx ? "block" : "none"}}
                                    />
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

export default TemplateSelector
