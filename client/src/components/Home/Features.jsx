import React from 'react'

function Features() {
  const featuresData = [
        {
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500 size-8 mt-4"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>),
            title: "Fast Resume Creation",
            description: "Create and update resumes quickly with a simple, guided builder.",
        },
        {
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500 size-8 mt-4"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg>),
            title: "Clean & Professional Design",
            description: "Structured layouts focused on clarity and readability.    ",
        },
        {
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500 size-8 mt-4"><path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z"/><rect x="3" y="14" width="7" height="7" rx="1"/><circle cx="17.5" cy="17.5" r="3.5"/></svg>),
            title: "Easy Customization",
            description: "Edit sections and styling without breaking the layout.",
        },
        {
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500 size-8 mt-4"><path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z"/><rect x="3" y="14" width="7" height="7" rx="1"/><circle cx="17.5" cy="17.5" r="3.5"/></svg>),
            title: "Real-time Preview",
            description: "See changes instantly while editing your resume.",
        },
        {
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500 size-8 mt-4"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>),
            title: "Secure & Persistent",
            description: "Save resumes to your account and continue editing anytime.",
        }
    ];
    return (
        <div className='mt-2 mb-10 flex flex-col items-center flex-wrap max-w-6xl mx-auto' id="features"> 
            <div className="flex items-center justify-center gap-2 text-sm text-blue-800 bg-blue-400/10 border border-indigo-200 rounded-full px-5 py-3 w-40 text-center">
            <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1.613 8.2a.62.62 0 0 1-.553-.341.59.59 0 0 1 .076-.637l6.048-6.118a.31.31 0 0 1 .375-.069c.061.033.11.084.137.147a.3.3 0 0 1 .014.197L6.537 4.991a.59.59 0 0 0 .07.552.61.61 0 0 0 .504.257h4.276a.62.62 0 0 1 .553.341.59.59 0 0 1-.076.637l-6.048 6.119a.31.31 0 0 1-.375.067.295.295 0 0 1-.15-.344l1.172-3.61a.59.59 0 0 0-.07-.553.61.61 0 0 0-.504-.257z"
                    stroke="#1E4BAF" strokeMiterlimit="5.759" strokeLinecap="round" />
            </svg>
            <span>Fast & Simple</span>
            </div>
            <div class="text-center">
                {/* <p class="text-center font-medium text-blue-600 px-10 py-1.5 rounded-full bg-blue-50 border border-blue-200 w-max mx-auto">Features</p> */}
                <h2 class="text-3xl font-semibold text-center mx-auto my-4 text-gray-900">Build your resume</h2>
                <p class="text-xl text-gray-600 max-w-5xl mx-auto">
                    Our streamlined process helps you create a professional resume in minutes with intelligent AI-powered tools and features.
                </p>
            </div>
            <div class="flex flex-wrap items-center justify-center gap-6 md:gap-4 mt-10 px-6">
                {featuresData.map((feature, index) => (
                    <div key={index} className={`hover:-translate-y-0.5 transition duration-300 ${(index === 1 || index === 3) ? 'p-px rounded-[13px] bg-gradient-to-br from-[#3b82f6] to-[#2563eb]' : 'p-px rounded-[13px] bg-gradient-to-br from-[#e44eff] to-[#270446]'}`}>
                        <div className="p-6 h-58 rounded-xl space-y-4 border border-blue-100 bg-white max-w-80 w-full shadow-sm">
                            {feature.icon}
                            <h3 className="text-base font-medium text-gray-900">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 pb-4">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Features
