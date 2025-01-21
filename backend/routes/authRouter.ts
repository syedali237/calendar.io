import express from 'express';
const router = express.Router();
import googleLogin from '../controllers/authController.ts';

router.get('/google', googleLogin); 

export default router; 