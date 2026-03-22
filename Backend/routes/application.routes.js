import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { getJobAppliedByUser, getUserAppliedJob,applyJob, updateStatus,isApplied } from "../controller/application.controller.js";


const router = express.Router();



router.post("/applyJob/:id",isAuthenticated,applyJob );
router.get("/getJobs",isAuthenticated,getJobAppliedByUser);
router.get("/getUsers/:id",getUserAppliedJob);
router.post("/updateStatus/:id",updateStatus);
router.get("/isApplied/:id",isAuthenticated,isApplied);


export default router;