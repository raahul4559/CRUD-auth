import mongoose from "mongoose";

const connectDB = async()=>{
   try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`MongoDB connected successfully DBHOST ${connectionInstance.connection.host}`);
   } catch (error) {
    console.log("Mongodb failed to connect", error);
   }
}

export{
    connectDB,
}