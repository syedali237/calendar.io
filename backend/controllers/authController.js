import { oauth2client } from "../utils/googleConfig.js";
import axios from 'axios';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import UserModel from '../models/userModel.js';

const googleLogin = async (req, res) => {
    console.log("Received query parameters:", req.query);
    const { code } = req.query;
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
        const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TIMEOUT });
        return res.status(200).json({
            message: "User logged in successfully",
            token,
            user
        });
    } catch (error) {
        res.status(500).json({message:"Internal Server Error", error: error.message});
    }
}

export default googleLogin; 