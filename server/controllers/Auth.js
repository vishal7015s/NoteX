const User = require('../models/User');
const OTP = require('../models/OTP');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const Profile  = require('../models/Profile');
const jwt = require('jsonwebtoken');
const mailSender = require("../utils/mailSender")
require("dotenv").config();

exports.sendotp = async (req, res) => {
    
    try{
        const {email} = req.body;

        const checkUserPresent = await User.findOne({email});

        if(checkUserPresent){
        return res.json({
            success: false,
            message: "User Already Registered please login"
        })
        }

        //generate otp 
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialCharacters: false,
            specialChars: false,
            numericDigits: true
        })
        console.log("otp generated successfully", otp);

        const otpPayload = {email, otp};

        //create an entry for otp in db
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);
        
        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp
        })

    }
    catch(error){
        console.log("error while generating and sending otp");
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

exports.signUp = async(req, res) => {
    try{
        // data fetch kar lo req ki body me se
        // validate kar lo
        // password match kar lo
        // check user already exist or not
        // find most recent otp for user
        // validate otp
        // password hash
        // entry create an db

        const {firstName, lastName, email, password, confirmPassword, accountType, otp} = req.body;
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(200).json({
                success: false,
                message: "All fields are required"
            })
        }
        if(password !== confirmPassword){
            return res.status(200).json({
                success: false,
                message: "Password and Confirm Password do not match"
            })
        }

        const existingUser = await User.findOne({email}); 
        if(existingUser){
            return res.json({
                success: false,
                message: "User already registered please login"
            });
        }

        const recentOTP = await OTP.findOne({email}).sort({createdAt: -1}).limit(1);
        console.log("recent otp is",recentOTP);

        if(recentOTP.length == 0){
            return res.status(400).json({
                success: false,
                message: "No otp found for this user"
            })
        }else if(otp !== recentOTP.otp){
            return res.status(400).json({
                success: false,
                message: "Invalid OTP" 
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        })

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
        })

        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            user
        }) 

    } 
    catch(error){
        console.log("Error while signup");
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.login = async(req, res) => {
    try{
        // get data from req ki body
        // validate
        // check user exist or not
        // generate jwt, after checking password
        // create cookie and send response

        const {email, password} = req.body;
        if(!email ||!password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(200).json({
                success: false,
                message: "Email is not registered Please sign up."
            })
        }

        if(await bcrypt.compare(password, user.password)){
            const payload = {
                id: user._id,
                email: user.email,
                accountType: user.accountType
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET,{
                expiresIn: "8h",

            })

            user.token = token;
            user.password = undefined;

            //generate cookie
            
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                message: "User logged in successfully",
                token,
                user
            })
        }
        else{
            console.log("Error in password matching")
            return res.status(200).json({
                success: false,
                message: "Invalid password try again or forgot password"
            })
        }
    }
    catch(error){
        console.log("Error while login");
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.changePassword = async(req, res) => {
    try{
        const {currentPassword, newPassword, confirmNewPassword,email} = req.body;
        if(!currentPassword || !newPassword || !confirmNewPassword){
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            })
        }
        if(newPassword !== confirmNewPassword){
            return res.status(403).json({
                success: false,
                message: "Passwords and confirm password do not match"
            })
        }

        const hashedPassword = bcrypt.hash(newPassword, 10);

        await User.findOneAndUpdate({email: email},
            {password: hashedPassword},
            {new: true}
        )

        return res.status(200).json({
            success: true,
            message: "Password changed successfully"
        })
        
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
