import React from 'react'
import { Palette, Wand2 } from 'lucide-react';
function AccentSelector({data, onChange}) {

    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [selectColor, setSelectColor] = React.useState(0);
    const colors = [
        { name: 'Blue', value: '#3B82F6' },
        { name: 'Green', value: '#10B981' },
        { name: 'Purple', value: '#8B5CF6' },
        { name: 'Red', value: '#EF4444' },
        { name: 'Indigo', value: '#6366F1' },
        { name: 'Orange', value: '#F97316' },
        { name: 'Yellow', value: '#F59E0B' },
        { name: 'Teal', value: '#14B8A6' },
        { name: 'Pink', value: '#EC4899' },
        { name: 'Black', value: '#222' },
        { name: 'Gray', value: '#6B7280' },
    ];
  return (
    <div className='relative'>
        <div onClick={()=>{
                // console.log("clickes")
                setDropdownOpen(!dropdownOpen)
            }} className='flex bg-purple-100 py-2 px-3 rounded-md gap-1 border border-transparent hover:border-purple-400 transition-all'>
            <Palette className='w-6 h-5 text-purple-800'/>
            <p  className='text-sm text-purple-800'>Accent</p>
        </div>

        {dropdownOpen && (
        <div className='bg-white/40 absolute w-65 px-4 py-3 backdrop-blur-sm mt-2 flex flex-wrap gap-5' >
            {
                colors.map((color, idx) => {
                    return(
                        <div onClick={()=>{
                            setSelectColor(idx)
                            onChange(color.value)
                        }} className='group w-10 flex flex-col items-center gap-1 cursor-pointer transition-all duration-300' key={idx}>
                            <div className='w-10 h-10 rounded-full flex justify-center items-center'
                            style={{backgroundColor: color.value}}
                            > <Wand2 className="size-4 hidden text-white "
                            style={{display: selectColor === idx ? "block" : "none"}}
                            /> </div>
                            <p style={{"--hover-color": color.value}}
                            className="text-gray-800 group-hover:text-[var(--hover-color)] transition-colors"
                            >{color.name}
                            
                            </p>
                        </div>
                    )
                })
            }
        </div>
        )}
    </div>
  )
}

export default AccentSelector
