import React from 'react'
import ModernTemplate from '../templates/ModernTemplate';
import ClassicTemplate from '../templates/ClassicTemplate';
import MinimalTemplate from '../templates/MinimalTemplate';
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
                @page {
                    size: letter;
                    margin: 0;
                }

                @media print {
                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }

                    html, body {
                        width: 8.5in;
                        height: 11in;
                        margin: 0;
                        padding: 0;
                        overflow: hidden;
                    }

                    body * {
                        visibility: hidden;
                    }

                    #resume-preview,
                    #resume-preview * {
                        visibility: visible;
                    }

                    #resume-preview {
                        position: fixed;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        width: 7.5in;
                        height: auto;
                        margin: 0 !important;
                        padding: 0.15in !important;
                        box-sizing: border-box;
                        box-shadow: none !important;
                        border: none !important;
                        background: white;
                        page-break-after: avoid;
                        page-break-before: avoid;
                        page-break-inside: avoid;
                    }

                    /* Default styling for Minimal and Minimal Image (perfect as-is) */
                    #resume-preview[data-template="minimal"] div,
                    #resume-preview[data-template="minimal-image"] div,
                    #resume-preview[data-template="minimal"] header,
                    #resume-preview[data-template="minimal-image"] header,
                    #resume-preview[data-template="minimal"] main,
                    #resume-preview[data-template="minimal-image"] main,
                    #resume-preview[data-template="minimal"] aside,
                    #resume-preview[data-template="minimal-image"] aside {
                        padding: 0.1in !important;
                        margin: 0 !important;
                    }

                    #resume-preview[data-template="minimal-image"] section {
                        margin-bottom: 0.15in !important;
                        margin-top: 0 !important;
                    }

                    #resume-preview[data-template="minimal-image"] h1 {
                        font-size: 1.3rem !important;
                        margin: 0 0 0.08in 0 !important;
                        line-height: 1.2 !important;
                    }

                    #resume-preview[data-template="minimal-image"] h2 {
                        font-size: 0.9rem !important;
                        margin: 0.08in 0 0.05in 0 !important;
                        line-height: 1.2 !important;
                    }

                    #resume-preview[data-template="minimal-image"] h3 {
                        font-size: 0.85rem !important;
                        margin: 0 0 0.03in 0 !important;
                        line-height: 1.2 !important;
                    }

                    #resume-preview[data-template="minimal-image"] p {
                        margin: 0 0 0.05in 0 !important;
                        line-height: 1.3 !important;
                        font-size: 0.8rem !important;
                    }

                    /* AGGRESSIVE compression for Minimal template only */
                    #resume-preview[data-template="minimal"] section {
                        margin-bottom: 0.05in !important;
                        margin-top: 0 !important;
                        padding: 0 !important;
                    }

                    #resume-preview[data-template="minimal"] h1 {
                        font-size: 1rem !important;
                        margin: 0 0 0.02in 0 !important;
                        line-height: 1 !important;
                    }

                    #resume-preview[data-template="minimal"] h2 {
                        font-size: 0.65rem !important;
                        margin: 0.02in 0 0.01in 0 !important;
                        line-height: 1 !important;
                    }

                    #resume-preview[data-template="minimal"] h3 {
                        font-size: 0.65rem !important;
                        margin: 0 !important;
                        line-height: 1 !important;
                    }

                    #resume-preview[data-template="minimal"] p {
                        margin: 0 0 0.02in 0 !important;
                        line-height: 1.05 !important;
                        font-size: 0.65rem !important;
                    }

                    #resume-preview[data-template="minimal"] .space-y-6 > *,
                    #resume-preview[data-template="minimal"] .space-y-4 > * {
                        margin-bottom: 0.03in !important;
                    }

                    #resume-preview[data-template="minimal"] .mb-10 {
                        margin-bottom: 0.04in !important;
                    }

                    #resume-preview[data-template="minimal"] .mb-6 {
                        margin-bottom: 0.02in !important;
                    }

                    #resume-preview[data-template="minimal"] .flex {
                        gap: 0.02in !important;
                    }

                    #resume-preview[data-template="minimal"] > div {
                        padding: 0.05in !important;
                    }

                    /* EXTREME compression for Modern and Classic templates */
                    #resume-preview[data-template="modern"] div,
                    #resume-preview[data-template="classic"] div,
                    #resume-preview[data-template="modern"] header,
                    #resume-preview[data-template="classic"] header,
                    #resume-preview[data-template="modern"] main,
                    #resume-preview[data-template="classic"] main,
                    #resume-preview[data-template="modern"] section,
                    #resume-preview[data-template="classic"] section {
                        padding: 0.03in !important;
                        margin: 0 !important;
                    }

                    #resume-preview[data-template="modern"] h1,
                    #resume-preview[data-template="classic"] h1 {
                        font-size: 1rem !important;
                        margin: 0 0 0.03in 0 !important;
                        line-height: 1 !important;
                    }

                    #resume-preview[data-template="modern"] h2,
                    #resume-preview[data-template="classic"] h2 {
                        font-size: 0.75rem !important;
                        margin: 0.03in 0 0.02in 0 !important;
                        line-height: 1 !important;
                    }

                    #resume-preview[data-template="modern"] h3,
                    #resume-preview[data-template="classic"] h3 {
                        font-size: 0.7rem !important;
                        margin: 0 0 0.01in 0 !important;
                        line-height: 1 !important;
                    }

                    #resume-preview[data-template="modern"] p,
                    #resume-preview[data-template="classic"] p {
                        margin: 0 0 0.02in 0 !important;
                        line-height: 1.1 !important;
                        font-size: 0.65rem !important;
                    }

                    /* Extreme Tailwind overrides for Modern and Classic */
                    #resume-preview[data-template="modern"] .space-y-6 > *,
                    #resume-preview[data-template="classic"] .space-y-6 > *,
                    #resume-preview[data-template="modern"] .space-y-4 > *,
                    #resume-preview[data-template="classic"] .space-y-4 > * {
                        margin-bottom: 0.04in !important;
                    }

                    #resume-preview[data-template="modern"] .space-y-3 > *,
                    #resume-preview[data-template="classic"] .space-y-3 > * {
                        margin-bottom: 0.02in !important;
                    }

                    #resume-preview[data-template="modern"] .mb-8,
                    #resume-preview[data-template="classic"] .mb-8,
                    #resume-preview[data-template="modern"] .mb-10,
                    #resume-preview[data-template="classic"] .mb-10 {
                        margin-bottom: 0.04in !important;
                    }

                    #resume-preview[data-template="modern"] .mb-6,
                    #resume-preview[data-template="classic"] .mb-6,
                    #resume-preview[data-template="modern"] .mb-4,
                    #resume-preview[data-template="classic"] .mb-4 {
                        margin-bottom: 0.02in !important;
                    }

                    #resume-preview[data-template="modern"] .mb-3,
                    #resume-preview[data-template="classic"] .mb-3,
                    #resume-preview[data-template="modern"] .mb-2,
                    #resume-preview[data-template="classic"] .mb-2 {
                        margin-bottom: 0.01in !important;
                    }

                    #resume-preview[data-template="modern"] .pb-2,
                    #resume-preview[data-template="classic"] .pb-2,
                    #resume-preview[data-template="modern"] .pb-6,
                    #resume-preview[data-template="classic"] .pb-6 {
                        padding-bottom: 0.01in !important;
                    }

                    /* General spacing overrides for Minimal and MinimalImage */
                    #resume-preview[data-template="minimal"] .gap-2,
                    #resume-preview[data-template="minimal"] .gap-4,
                    #resume-preview[data-template="minimal"] .gap-6,
                    #resume-preview[data-template="minimal-image"] .gap-2,
                    #resume-preview[data-template="minimal-image"] .gap-4,
                    #resume-preview[data-template="minimal-image"] .gap-6 {
                        gap: 0.05in !important;
                    }

                    /* Extreme gaps for Modern and Classic */
                    #resume-preview[data-template="modern"] .gap-2,
                    #resume-preview[data-template="modern"] .gap-4,
                    #resume-preview[data-template="modern"] .gap-6,
                    #resume-preview[data-template="classic"] .gap-2,
                    #resume-preview[data-template="classic"] .gap-4,
                    #resume-preview[data-template="classic"] .gap-6 {
                        gap: 0.02in !important;
                    }
                }
                `
            }
        </style>
    </div>
  )
}

export default ResumePreview
