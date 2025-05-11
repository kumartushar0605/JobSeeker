import express from "express"
import { ResumePost} from "../Controllers/Userr.js";
const router = express.Router();

router.post("/resume",ResumePost);




export default router;