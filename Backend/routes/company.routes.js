import express from "express";
import { getCompany, getCompanyByID, register_company, updateCompany } from "../controller/company.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { SingleUpload } from "../middleware/multer.js";

const router = express.Router();


router.post("/register",isAuthenticated, register_company);  //cause we are using req.id
router.get("/get",isAuthenticated, getCompany);
router.get("/get/:id", getCompanyByID);   //not checking yaar nahi chaiye itna
router.post("/update/:id",SingleUpload ,updateCompany);



export default router;