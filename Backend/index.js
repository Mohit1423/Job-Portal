import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import userRoutes from "./routes/user.routes.js";
import companyRoutes from "./routes/company.routes.js";
import jobRoutes from "./routes/job.routes.js";
import applicationRoutes from "./routes/application.routes.js";

const app = express();
const port= process.env.PORT || 3000;
const corsOptions = {
    origin: "http://localhost:5173",
    credentials:true,

}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions)); 




//api's
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/company",companyRoutes);
app.use("/api/v1/job",jobRoutes);
app.use("/api/v1/application",applicationRoutes);


app.listen(port,()=>{
    connectDB()
    console.log(`Server is running on port ${port}`)
    
})