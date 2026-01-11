import mongoose from "mongoose";
import bcrytp from "bcrypt";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    },
    email: {
    type: String,
    required: true,
    unique: true,
    },
    password: {
    type: String,
    // required: true,
    },
    avatar: {
    type: String,
    default: null,
    },
    authProvider: {
    type: String,
    enum: ["local", "google"],
    default: "local",
    },
    aiCredits: {
    type: Number,
    default: 2,
    }
    
}, { timestamps: true });

UserSchema.methods.comparePassword = function(password) {
    return bcrytp.compareSync(password, this.password);
}   


const User = mongoose.model("User", UserSchema);

export default User;