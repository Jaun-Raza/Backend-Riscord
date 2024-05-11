import express from "express";

// Auth Middleware
import { signToken, verifyToken } from '../middlewares/authMiddleware.js'
import { signUp, logIn, getData } from '../controllers/auth.js'
import { generateOtp, checkOtp } from '../controllers/otp.js'

const Router = express.Router();

Router.get('/', (req, res) => { 
    res.send('Hello From Riscord!');
})

Router.route('/auth/sign-up').post(signToken, signUp);
Router.route('/auth/log-in').post(signToken, logIn);
Router.route('/auth/user').get(verifyToken, getData);
Router.route('/auth/generate-otp').post(generateOtp);
Router.route('/auth/check-otp').post(checkOtp);

export default Router