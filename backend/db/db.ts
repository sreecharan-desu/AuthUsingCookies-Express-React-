import mongoose from "mongoose";import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
    try {
        console.log("Trying to connect to DB . . .")
        if (await mongoose.connect(process.env.MONGO_URI || '')) {
            console.log("Successfully connected to DB")
        }else{
            throw new Error()
        }
    } catch (e) {
        console.log("Error connecting DB Please try again")
    }
}

const userSchema = new mongoose.Schema({
    username : String,
    email : String,
    password : String
})


export const User = mongoose.model("User",userSchema);
connectDB();