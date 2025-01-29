import mongoose from "mongoose";

const connectDB = async ()=>{
    mongoose.connection.on('connected', ()=>console.log("Datbase Connected"));
    await mongoose.connect(`${process.env.MONGODB_URL}/Stage`);

};
export default connectDB;