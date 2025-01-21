import type { Request, Response } from 'express';
import { oauth2client } from "../utils/googleConfig.ts";
import axios from 'axios';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import UserModel from '../models/userModel.ts';

const googleLogin = async (req : Request, res : Response) : Promise<void> => {
    console.log("Received query parameters:", req.query);
    const code = req.query.code as string;
    console.log("Code received from frontend:", code);
    try {
        const googleRes = await oauth2client.getToken(code);
        oauth2client.setCredentials(googleRes.tokens);
        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );
        const {email, name, picture} = userRes.data;
        // console.log(userRes.data);
        
        let user = await UserModel.findOne({email});
        if (!user) {
            user = await UserModel.create({name, email, image: picture});
        } 
        const {_id} = user;
        if (!process.env.JWT_SECRET || !process.env.JWT_TIMEOUT) {
            throw new Error("JWT_SECRET or JWT_TIMEOUT is not defined in environment variables");
        }
        const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TIMEOUT });
        res.status(200).json({
            message: "User logged in successfully",
            token,
            user
        });
    } catch (error : any) {
        res.status(500).json({message:"Internal Server Error", error: error.message});
    }
}

export default googleLogin; 