const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require('bcrypt');
const crypto = require('crypto');

exports.resetPasswordToken = async(req, res) => {
    try{
        const {email} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(200).json({message: "Email not Registered"});
        }

        const token = crypto.randomUUID();

        //add token to user and set expiry time

        const updatedDetails = await User.findOneAndUpdate(
                                        {email},
                                        {
                                            token: token,
                                            resetPasswordExpires: Date.now() + 5*60*1000,
                                        },
                                        {new: true}
                                    );

        const url = `https://notex-server-trq8.onrender.com/update-password/${token}`

        await mailSender(email, "password reset link", `password reset link : ${url}`);

        return res.status(200).json({
            success: true,
            message: "Reset password link sent successfully"
        })
    }   
    catch(error){
        console.log("Error while sent reset password link");
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.resetPassword = async(req, res) => {
    try{
        const {password, confirmPassword, token} = req.body;
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Passwords and confirm password do not match"
            })
        }
        const userDetails = await User.findOne({token: token})
        if(!userDetails){
            return res.status(404).json({message: "Token is invalid"})
        }

        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(403).json({
                success: false,
                message: "Token expired, please generate a new one"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.findOneAndUpdate({token: token}, {password: hashedPassword}, {new: true});
        
        return res.status(200).json({
            success: true,
            message: "Password updated successfully"
        })
    }
    catch(error){
        console.log("error while reset password");
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}