import User from '../models/User.js';

export const checkAICredits = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.aiCredits <= 0) {
            return res.status(403).json({ 
                message: "All AI credits used! You have no credits remaining."
            });
        }

        // Deduct 1 credit
        user.aiCredits -= 1;
        await user.save();

        next();
    } catch (error) {
        console.error("Error checking credits:", error);
        res.status(500).json({ message: "Failed to process request" });
    }
};
