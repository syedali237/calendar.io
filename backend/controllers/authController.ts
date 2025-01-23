import type { Request, Response } from 'express';
import { setToken, getTokenInfo } from '../utils/googleConfig.ts';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModel from '../models/userModel.ts';

dotenv.config();

const googleLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const code = req.query.code as string;
    const tokens = await setToken(code);
    const accessToken = tokens.access_token!;
    const tokenInfo = await getTokenInfo(accessToken);
    console.log("Granted Scopes:", tokenInfo.scopes);
    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
    );

    const { email, name, picture } = userRes.data;

    let user = await UserModel.findOne({ email });
    if (!user) {
      user = await UserModel.create({ name, email, image: picture });
    }

    const token = jwt.sign(
      { _id: user._id, email },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_TIMEOUT! }
    );

    res.status(200).json({
      message: "User logged in successfully",
      token,
      user,
      googleAccessToken: accessToken,
    });
  } catch (error: any) {
    console.error("Error during Google login:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export default googleLogin;
