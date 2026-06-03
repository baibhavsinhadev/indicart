import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartItems: { type: Object, default: {} }
}, { minimize: false });

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;