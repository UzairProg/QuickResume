import User from "../models/User.js";
import Resume from "../models/Resume.js";
import bcrytp from "bcrypt";
import jwt from "jsonwebtoken";

// Generate JWT Token
const generateToken = (userId) => {
    const token = jwt.sign({id: userId}, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
    return token;
}

// Register User
export const registerUser = async (req, res) => {
    try{
        const {name, email, password} = req.body;

        if(req.body.some((field) => field.trim() === "")){
            return res.status(400).json({message: "All fields are required"});
        }
    // Check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        const hashedPassword = await bcrytp.hash(password, 10); 

        const newUser = User.create({
            name: name.trim(),
            email: email.trim(),
            password: hashedPassword
        })

        generateToken(newUser._id);

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            },
            token
        });

    }
    catch(error){
        console.error("Error in registerUser:", error);
        res.status(500).json({message: "Server Error"});
    }
}

// Login User
export const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(req.body.some((field) => field.trim() === "")){
            return res.status(400).json({message: "All fields are required"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid email or password"});
        }
        const isPasswordValid = user.comparePassword(password);
        if(!isPasswordValid){
            return res.status(400).json({message: "Invalid email or password"});
        }

        const token = generateToken(user._id);

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token
        });
    }
    catch(error){
        console.error("Error in loginUser:", error);
        res.status(500).json({message: "Server Error"});
    }   
}

// Get User Profile 
export const getUserProfile = async (req, res) => {
    try{
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({user});
    }
    catch(error){
        console.error("Error in getUserProfile:", error);
        res.status(500).json({message: "Server Error"});
    }
}

// get user resume
export const getUserResume = async (req, res) => {
    try{
        const userId = req.user.id;
        const resumes = await Resume.find({user: userId});
        res.status(200).json({resumes});
    }
    catch(error){
        console.error("Error in getUserResume:", error);
        res.status(500).json({message: "Server Error"});
    }
}

