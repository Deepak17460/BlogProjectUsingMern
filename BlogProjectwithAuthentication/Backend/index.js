import express from "express";
import dotenv from "dotenv";
import  connection  from "./database/connection.js";
import bodyParser from 'body-parser';
import cors from "cors";

import Router from "./routes/routes.js";


dotenv.config();

const app=express();
app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended: true}));
const PORT=process.env.port||5000;
app.listen(PORT,()=>console.log(`Server is running on PORT ${PORT}`));
app.use('/',Router);

const username=process.env.db_username;
const password=process.env.db_password;
connection(username,password);