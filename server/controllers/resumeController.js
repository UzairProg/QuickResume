import imageKit from "../config/imageKit.js";
import Resume from "../models/Resume.js";
import FileSystem from "fs";
import fs from "fs";

export const createResume = async (req, res) => {
    try {
        const userId = req.user.id
        // console.log(userId)
        const { title } = req.body;

        const newResume = await Resume.create({
            userId,
            title: title || "Untitled Resume"
        })
        // console.log(newResume, "neweadsalfhkjasb")
        res.status(201).json({
            message: "Resume created successfully",
            resume: newResume
        });
    }
    catch(error){
        // console.error("Error in getUserResume:", error);
        res.status(500).json({message: "Server Error"});
    }
}

// delete resume
export const deleteResume = async (req, res) => {
    try {
        const userId = req.user.id;
        const { resumeId } = req.params;

        const resume = await Resume.findOneAndDelete({ _id: resumeId, userId });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }
        res.status(200).json({ message: "Resume deleted successfully" });
    }
        catch(error){
        // console.error("Error in getUserResume:", error);
        res.status(500).json({message: "Server Error"});
    }
}

// get user resume by id
export const getResumeById = async (req, res) => {
    try{
        const userId = req.user.id;
        const { resumeId } = req.params;
        // console.log(resumeId, "id miliii??")
        const resume = await Resume.findOne({ _id: resumeId, userId });

        if(!resume){
            return res.status(404).json({message: "Resume not found"});
        }

        res.status(200).json({resume});
    }
    catch(error){
        // console.error("Error in getUserResume:", error);
        res.status(500).json({message: "Server Error"});
    }
}

// update resume
export const updateResume = async (req, res) => {
    try{
        const userId = req.user.id;
        const { resumeId, resumeData, removeBackground } = req.body;
        const image = req.file;
        // console.log(resumeData)
        let resumeDataCopy;

        if (typeof resumeData === "string") {
        resumeDataCopy = await JSON.parse(resumeData);
        } else {
        resumeDataCopy = structuredClone(resumeData);
        }

        if(image){
            const imageBufferData = fs.createReadStream(image.path);

            const removeBg = removeBackground === true || removeBackground === 'true' || removeBackground === 'yes' || removeBackground === '1';

            const uploadOptions = {
                file: imageBufferData,
                fileName: 'resume.png',
                folder: 'user-resumes'
            };

            // Apply background removal via ImageKit extension when requested
            if (removeBg) {
                uploadOptions.extensions = [
                    { name: 'remove-bg' }
                ];
            }

            // Optional mild pre-transformation to keep image small
            uploadOptions.transformation = { pre: 'w-300,h-300,fo-face,z-0.75' };

            const response = await imageKit.upload(uploadOptions);

            // Cleanup local temp file from multer
            try { fs.unlinkSync(image.path); } catch (e) { /* ignore */ }

            resumeDataCopy.personal_info.image = response.url;
            resumeDataCopy.personal_info.imageBackgroundRemoved = removeBg;
        }

        const resume = await Resume.findOneAndUpdate(
            { _id: resumeId, userId },
            resumeDataCopy,
            { new: true } 
        );
        if(!resume){
            return res.status(404).json({message: "Resume not found"});
        }

        res.status(200).json({
            message: "Resume updated successfully",
            resume
        });
    }
    catch(error){
        // console.error("Error in getUserResume:", error);
        res.status(500).json({message: "Server Error"});
    }
}

// get resume by id public
export const getPublicResumeById = async (req, res) => {
    try{
        const { resumeId } = req.params;
        const resume = await Resume.findById(resumeId);

        if(!resume){
            return res.status(404).json({message: "Resume not found"});
        }

        if(resume.public === false){
            return res.status(403).json({message: "Resume is private"});
        }

        res.status(200).json({resume});
    }
    catch(error){
        // console.error("Error in getUserResume:", error);
        res.status(500).json({message: "Server Error"});
    }
}

