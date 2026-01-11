import ai from "../config/ai.js";
import Resume from "../models/Resume.js";

export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { content } = req.body;

        if (!content || content.trim() === "") {
            return res.status(400).json({ message: "Content is required" });
        }

        const response = await ai.chat.completions.create({
            model: process.env.MODEL_NAME,
            messages: [
                { role: "system", content: "You are a professional resume writer. your task is to enhance the professional summay, the summary should be in 1-2 sentence highlighting the skills, ats friendly. just text no options or anything else" },
                {
                    role: "user",
                    content: `Enhance the following professional summary for a resume:\n\n${content}`,
                },
            ],
        });
        const enhancedSummary = response.choices[0].message.content;

        res.status(200).json({ enhancedSummary });
    } catch (error) {
        console.error("Error in enhanceProfessionalSummary:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// job description enhancer
export const enhanceJobDescription = async (req, res) => {
    try {
        const { content } = req.body;
        if (!content || content.trim() === "") {
            return res.status(400).json({ message: "Content is required" });
        }
        const response = await ai.chat.completions.create({
            model: process.env.MODEL_NAME,
            messages: [
                { role: "system", content: "You are a professional resume writer. your task is to enhance the job description, the description should be in 1-2 sentences highlighting the key responsibilities and achievements, ats friendly. just text no options or anything else" },
                {
                    role: "user",
                    content: `Enhance the following job description for a resume:\n\n${content}`,
                },
            ],
        });
        const enhancedDescription = response.choices[0].message.content;
        res.status(200).json({ enhancedDescription });
    } catch (error) {
        console.error("Error in enhanceJobDescription:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// upload resume and extract text using AI
export const extractTextFromResume = async (req, res) => {
    try {
        const { resumeText, title } = req.body;

        if (!resumeText || resumeText.trim() === "") {
            return res.status(400).json({ message: "Resume text is required" });
        }

        const SYSTEM_PROMPT = `You are a professional resume parser. your task is to extract the exact following data is JSON format.
        {
            professional_summary: {
            type: String,
            default: ""
            },
            skills: [{
                type: String
            }],
            personal_info: {
                image: { type: String, default: "" },
                full_name: { type: String, default: "" },
                profession: { type: String, default: "" },
                email: { type: String, default: "" },
                phone: { type: String, default: "" },
                location: { type: String, default: "" },
                linkedin: { type: String, default: "" },
                website: { type: String, default: "" }
            },
            expierence: [{
                company: { type: String, default: "" },
                position: { type: String, default: "" },
                start_date: { type: String, default: "" },
                end_data: { type: String, default: ""},
                description: { type: String, default: ""},
                is_current: { type: Boolean, default: ""},
            }],
            project: [{
                name: { type: String, default: "" },
                type: { type: String, default: "" },
                description: { type: String, default: "" }
            }],
            education: [{
                institution: { type: String, default: "" },
                degree: { type: String, default: "" },
                field: { type: String, default: "" },
                graduation_date: { type: String, default: "" },
                gpa: { type: String, default: "" }
            }]
        }
        `;

        const response = await ai.chat.completions.create({
            model: process.env.MODEL_NAME,
            messages: [
                { role: "system", content: "You are a professional resume parser. your task is to extract key information from the resume text provided. Extract the following sections: Personal Info, Professional Summary, Work Experience, Education, Skills, Certifications, Projects. Format the extracted information in JSON format with the section names as keys." },
                {
                    role: "user",
                    content: `Extract the following resume text into JSON format:\n\n${resumeText}`,
                },
            ],response_format: {
                type: "json_object",
            },
        });
        const extractedData = response.choices[0].message.content;
        const parsedData = JSON.parse(extractedData);

        const newResume = await Resume.create({
            userId: req.user.id,
            title: title || "Untitled Resume",
            ...parsedData
        });
        res.status(200).json({ message: "Resume uploaded and text extracted successfully", resume: newResume });
    } catch (error) {
        console.error("Error in extractTextFromResume:", error);
        res.status(500).json({ message: "Server Error" });
    }
};