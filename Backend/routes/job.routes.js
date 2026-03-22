import express from "express"
import isAuthenticated from "../middleware/isAuthenticated.js";
import { getAllJobs, getJobByID, getJobsByUser, post_job } from "../controller/job.contoller.js";


const router = express.Router();


router.post("/post",isAuthenticated,post_job );
router.get("/get",getAllJobs);
router.get("/get/:id",getJobByID);
router.get("/getadminJobs",isAuthenticated,getJobsByUser);


export default router;