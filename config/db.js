import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://developers:developers@cluster0.dx55pmt.mongodb.net/ecommrce");
        console.log(`Mongoose connced ${conn.connection.host}`);
    } catch (error) {
        console.log(`Mongoose error : ${error}`)
    }
}
export default connectDB;