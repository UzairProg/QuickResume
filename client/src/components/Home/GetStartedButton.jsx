import React from 'react'

const GetStartedButton = (props) => {
  return (
        <>
            <style>{`
                .button-wrapper::before {
                    animation: spin-gradient 4s linear infinite;
                }
            
                @keyframes spin-gradient {
                    from {
                        transform: rotate(0deg);
                    }
            
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
            <div className="relative inline-block p-0.5 rounded-xl overflow-hidden hover:scale-105 transition duration-300 active:scale-90 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500 before:via-blue-400 before:to-blue-500 button-wrapper shadow-lg">
  <button className="relative z-10 bg-gradient-to-br from-blue-50 to-white text-blue-700 rounded-xl px-8 py-3 font-semibold text-sm hover:from-blue-100 hover:to-blue-50 transition-all duration-200 shadow-sm hover:shadow-md border border-blue-200 hover:border-blue-300">
    {props.text}
  </button>
</div>
        </>
    )
}

export default GetStartedButton
