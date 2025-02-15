import mongoose from "mongoose";

interface User {
    username: string;
    score: number;
}

// Define Mongoose Schema
const userSchema = new mongoose.Schema<User>({
    username: { type: String, required: true , unique: true },
    score: { type: Number, required: true },
});

// Create model
const UserModel = mongoose.model<User>('User', userSchema, 'users');

export default UserModel;