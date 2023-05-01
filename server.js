import express  from "express"; //express server
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js";
import morgan from "morgan";
//import 
// app configure
connectDB();
const app = express();
dotenv.config();
app.use(morgan('combined'))
app.use(express.json());

app.use('/api/v1/auth/',authRoutes);

app.get('',(req, res) => {
    res.send({msg:"welcome node js"})
});

const port = process.env.PORT   

app.listen(port ,()=>{
    console.log(`your application is mode is ${process.env.MODE} runing on port ${port}`);
});