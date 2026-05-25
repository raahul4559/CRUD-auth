import { Router } from "express";
import { changeCurrentPassword,
     forgotPassword, 
     getCurrentUser, 
     loginUser, 
     logoutUser, 
     refreshAcessToken, 
     registerUser, 
     resendEmailVerification, 
     resetPassword, 
     updateAccountDetails, 
     verifyEmail } 
     from "../controllers/user.controllers.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";



const router = Router();


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/refresh-token").post(refreshAcessToken)
router.route("/verify-email/:token").get(verifyEmail)
router.route("/resend-verify-email/:token").get(resendEmailVerification)

// secured routes

router.route("/logout").get(verifyJWT, logoutUser)
router.route("/forgot-password").post(verifyJWT,forgotPassword)
router.route("/change-password").post(verifyJWT,changeCurrentPassword)
router.route("/reset-password").post(verifyJWT,resetPassword)
router.route("/current-user").get(verifyJWT,getCurrentUser)
router.route("/update-account").patch(verifyJWT,updateAccountDetails)



export default router;

