const mongoose = require("mongoose");
const mailSender = require('../utils/mailSender');
const sendOTP = require("../mail/template/sendOTP");

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    otp: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300 // 5 minutes
    }
})

// create a function soul intent send verifaction email

async function sendVerificationEmail(email, otp) {
    try{
        const mailResponse = await mailSender(email, `${otp} Verification Email from NoteX.com.`, sendOTP(otp));
        console.log("mail sent successfully", mailResponse);
    }
    catch(error){
        console.log("Error in sendVerificationEmail")
        console.error(error);
    }
}

OTPSchema.pre("save", async function(next){
    await sendVerificationEmail(this.email, this.otp);
    next();
})

module.exports = mongoose.model("OTP", OTPSchema);