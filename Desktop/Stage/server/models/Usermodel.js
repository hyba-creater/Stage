import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
    role: { type: String, enum: ['admin', 'employee'], default: 'employee' }
})
const UserModel = mongoose.models['user'] || mongoose.model('user', userSchema);
export default UserModel;