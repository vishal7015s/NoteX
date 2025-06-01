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
            
            // const options = {
            //     expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            //     httpOnly: true,
            // }
            const options = {
                expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
                httpOnly: true,
            };
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

exports.changePassword = async (req, res) => {
    try {
      // Get user data from req.user
      const userDetails = await User.findById(req.user.id)
  
      // Get old password, new password, and confirm new password from req.body
      const { oldPassword, newPassword } = req.body
  
      // Validate old password
      const isPasswordMatch = await bcrypt.compare(
        oldPassword,
        userDetails.password
      )
      if (!isPasswordMatch) {
        // If old password does not match, return a 401 (Unauthorized) error
        return res
          .status(401)
          .json({ success: false, message: "The password is incorrect" })
      }
  
      // Update password
      const encryptedPassword = await bcrypt.hash(newPassword, 10)
      const updatedUserDetails = await User.findByIdAndUpdate(
        req.user.id,
        { password: encryptedPassword },
        { new: true }
      )
  
      // Send notification email
      try {
        const emailResponse = await mailSender(
          updatedUserDetails.email,
          "Password for your account has been updated",
          passwordUpdated(
            updatedUserDetails.email,
            `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
          )
        )
        console.log("Email sent successfully:", emailResponse.response)
      } catch (error) {
        // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
        console.error("Error occurred while sending email:", error)
        return res.status(500).json({
          success: false,
          message: "Error occurred while sending email",
          error: error.message,
        })
      }
  
      // Return success response
      return res
        .status(200)
        .json({ success: true, message: "Password updated successfully" })
    } catch (error) {
      // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while updating password:", error)
      return res.status(500).json({
        success: false,
        message: "Error occurred while updating password",
        error: error.message,
      })
    }
  }