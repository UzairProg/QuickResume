import React from 'react'
import ModernTemplate from '../templates/ModernTemplate.jsx';
import ClassicTemplate from '../templates/ClassicTemplate.jsx';
import MinimalTemplate from '../templates/MinimalTemplate.jsx';
import MinimalImageTemplate from '../templates/MinimalImageTemplate.jsx';

function ResumePreview({data, template, accentColor, classes = ""}) {

    const renderTemplate = () => {
        switch (template) {
            case 'modern':
                return <ModernTemplate data={data} accentColor={accentColor} />;          
            case 'minimal':
                return <MinimalTemplate data={data} accentColor={accentColor} />;
            case 'minimal-image':
                return <MinimalImageTemplate data={data} accentColor={accentColor} />;
            default:
                return <ClassicTemplate data={data} accentColor={accentColor} />;
        }
    }
  return (
    <div className='w-full bg-gray-100 '>
        <div id="resume-preview" data-template={template} className={"border border-gray-200 print:shadow-none print:border-none" + classes}>
            {renderTemplate()}
        </div> 

        <style jsx>
            {
                `
                @media print {
                    #resume-preview {
                        page-break-inside: avoid !important;
                    }
                }
                `
            }
        </style>
    </div>
  )
}

export default ResumePreview
