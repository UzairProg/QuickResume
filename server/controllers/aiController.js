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

        // Strict JSON-only schema instruction matching the server model fields
        const SYSTEM_PROMPT = `You are a professional resume parser. Return a STRICT JSON object ONLY.
Do not include comments, explanations, markdown, or trailing commas.
Keys and types must match exactly this schema (use empty strings or false when unknown):
{
  "professional_summary": "",
  "skills": [""],
  "personal_info": {
    "image": "",
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "expierence": [{
    "company": "",
    "position": "",
    "start_date": "",
    "end_data": "",
    "description": "",
    "is_current": false
  }],
  "project": [{
    "name": "",
    "type": "",
    "description": ""
  }],
  "education": [{
    "institution": "",
    "degree": "",
    "field": "",
    "graduation_date": "",
    "gpa": ""
  }]
}`;

        const response = await ai.chat.completions.create({
            model: process.env.MODEL_NAME,
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                {
                    role: "user",
                    content: `Extract the following resume text into JSON format:\n\n${resumeText}`,
                },
            ],
            response_format: { type: "json_object" },
        });

        const raw = response?.choices?.[0]?.message?.content ?? "";

        // Safe JSON parse with fallback to extracting the first JSON object block
        const safeParse = (text) => {
            try {
                return JSON.parse(text);
            } catch (_) {
                const start = text.indexOf("{");
                const end = text.lastIndexOf("}");
                if (start !== -1 && end !== -1 && end > start) {
                    const candidate = text.slice(start, end + 1);
                    try {
                        return JSON.parse(candidate);
                    } catch (_) {
                        return null;
                    }
                }
                return null;
            }
        };

        const parsedData = safeParse(raw);
        if (!parsedData || typeof parsedData !== "object") {
            return res.status(502).json({ message: "AI returned invalid JSON. Please try again." });
        }

        // Normalize types and ensure required keys exist
        const normalize = (d) => {
            const str = (v) => (typeof v === "string" ? v : "");
            const bool = (v) => (typeof v === "boolean" ? v : false);
            const arr = (v) => (Array.isArray(v) ? v : []);

            return {
                professional_summary: str(d.professional_summary),
                skills: arr(d.skills).map((s) => str(s)).filter((s) => s !== ""),
                personal_info: {
                    image: str(d?.personal_info?.image),
                    full_name: str(d?.personal_info?.full_name),
                    profession: str(d?.personal_info?.profession),
                    email: str(d?.personal_info?.email),
                    phone: str(d?.personal_info?.phone),
                    location: str(d?.personal_info?.location),
                    linkedin: str(d?.personal_info?.linkedin),
                    website: str(d?.personal_info?.website),
                },
                expierence: arr(d.expierence).map((e) => ({
                    company: str(e?.company),
                    position: str(e?.position),
                    start_date: str(e?.start_date),
                    end_data: str(e?.end_data),
                    description: str(e?.description),
                    is_current: bool(e?.is_current),
                })),
                project: arr(d.project).map((p) => ({
                    name: str(p?.name),
                    type: str(p?.type),
                    description: str(p?.description),
                })),
                education: arr(d.education).map((ed) => ({
                    institution: str(ed?.institution),
                    degree: str(ed?.degree),
                    field: str(ed?.field),
                    graduation_date: str(ed?.graduation_date),
                    gpa: str(ed?.gpa),
                })),
            };
        };

        const normalized = normalize(parsedData);

        const newResume = await Resume.create({
            userId: req.user.id,
            title: title || "Untitled Resume",
            ...normalized,
        });

        res.status(200).json({ message: "Resume uploaded and text extracted successfully", resume: newResume });
    } catch (error) {
        console.error("Error in extractTextFromResume:", error);
        res.status(500).json({ message: "Server Error" });
    }
};