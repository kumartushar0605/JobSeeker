import express from "express"
import {Visitorregister,VisitorLogin,getResume}from '../Controllers/Userr.js'

const routerr = express.Router();


routerr.post("/Register",Visitorregister);
routerr.post("/Login",VisitorLogin);
routerr.get('/resume/:email', getResume);


export default routerr;