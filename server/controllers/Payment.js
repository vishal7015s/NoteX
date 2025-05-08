const Course = require("../models/Course");
const mongoose = require("mongoose");
const {instance} = require("../config/razorpay");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const { paymentSuccessEmail } = require("../mail/template/paymentSuccessEmail");
const crypto = require("crypto")


exports.capturePayment = async(req, res) => {
    const {courses} = req.body;
    const userId = req.user.id;

    if(courses.length === 0){
        return res.json({
            sucess: false,
            message: "please provide course id"
        });
    }

    let totalAmount = 0;

    for(const course_id of courses){
        let course;
        try{
            course = await Course.findById(course_id);
            if(!course){
                return res.status(200).json({
                    success: false,
                    message: "could not find the course"
                })
            }

            const uid = new mongoose.Types.ObjectId(userId);

            if(course.studentsEnrolled.includes(uid)){
                return res.status(200).json({
                    success: false,
                    message: "student is already enrolled"
                })
            }

            totalAmount += course.price;
        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    const options = {
        amount: totalAmount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
    }

    try{
        const paymentResponse = await instance.orders.create(options);
        res.json({
            success: true,
            message: paymentResponse,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false, 
            message: "could not intiate the order"
        }); 
    }

}


// exports.verifySignature = async(req, res) => {
//     const razorpay_order_id = req.body?.razorpay_order_id;
//     const razorpay_payment_id = req.body?.razorpay_payment_id;
//     const razorpay__signature = req.body?.razorpay__signature;
//     const courses = req.body?.courses;
//     const userId = req.user.id;

//     if(!razorpay__signature || !razorpay_order_id || razorpay_payment_id || courses || userId){
//         return res.status(200).json({
//             success: false,
//             message: "payment failed"
//         })
//     }

//     let body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto
//     .createHmac("sha256", process.env.RAZORPAY_SECRET)
//     .update(body.toString())
//     .digest("hex");

//     if(expectedSignature === razorpay__signature){
//         // enroll studnt
//         await enrollStudents(courses, userId, res);
//         // return res
//         return res.status(200).json({
//             success: false,
//             message: "payment verified"
//         })
//     }

//     return res.status(200).json({
//         success: false,
//         message: "payment failed"
//     });

// }
exports.verifyPayment = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.courses
  
    const userId = req.user.id
  
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !courses ||
      !userId
    ) {
      return res.status(200).json({ success: false, message: "Payment Failed" })
    }
  
    let body = razorpay_order_id + "|" + razorpay_payment_id
  
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex")
  
    if (expectedSignature === razorpay_signature) {
      await enrollStudents(courses, userId, res)
      return res.status(200).json({ success: true, message: "Payment Verified" })
    }
  
    return res.status(200).json({ success: false, message: "Payment Failed" })
}


const enrollStudents = async(courses, userId, res) => {
    console.log(courses, userId);
    // if(!courses || userId){
    //     return res.status(400).json({
    //         success: false,
    //         message: "please provide data inside enroll fun"
    //     })
    // }

    for(const courseId of courses){
       try{
         // find the course and enroll the student in it
         const enrolledCourse = await Course.findOneAndUpdate(
            {_id: courseId},
            {$push: {studentsEnrolled: userId}},
            {new: true},
        )

        if(!enrolledCourse){
            return res.status(500).json({
                success: false,
                message: "Course not found"
            });
        }

        //find the student and add the course to their list of enrollcourses
        
        const enrolledStudent = await User.findByIdAndUpdate(userId, 
            {$push: {
                courses : courseId
            }},
            {new: true}
        )

        // bache ko mail send kar doc
        const emailResponse = await mailSender(
            enrollStudents.email,
            `Successfully Enrolled into ${enrolledCourse.courseName}`,
            "payment done"
        )
        console.log("mail sent successfully", emailResponse)
       }
       catch(error){
           console.log(error)
           return res.status(500).json({
            success: false,
            message: error.message
           })
       }
    }
}


exports.sendPaymentSuccessEmail = async(req, res) => {
    const {orderId, paymentId, amount} = req.body;

    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId){
        return res.status(400).json({
            success: false,
            message: "please provide all the fields"
        })
    }

    try{
        // student find
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
            paymentSuccessEmail(`${enrolledStudent.firstName}`, amount/100, orderId, paymentId)
        )
    }
    catch(error){
        console.log("error in sending payment success mail", error)
        return res.status(500).json({
            success: false,
            message: "could not send email"
        })
    }
}





// const { default: mongoose } = require("mongoose");
// const {instance} = require("../config/razorpay");
// const Course = require("../models/Course");
// const User = require("../models/User");
// const mailSender = require("../utils/mailSender");
// // pending course enrolledmen template

// // capture the payment and initiate the razorpay order

// exports.capturePayment = async(req, res) => {
//     try{
//         // get course id and user id
//         // validate the id
//         // user already pay or not
//         // create order and return response

//         const {course_id} = req.body;
//         const userId = req.body.id;

//         if(!course_id){
//             return res.status(400).json({
//                 success: false,
//                 message: "course id nhi mili bhai"
//             });
//         }

//         let course;
//         try{
//             course = await Course.findById(course_id);
//             if(!course){
//                 return res.status(404).json({
//                     success: false,
//                     message: "Course not found"
//                 });
//             }
//             // already pay or not
//             const uid = new mongoose.Types.ObjectId(userId)
//             if(course.studentsEnrolled.includes(uid)){
//                 return res.status(200).json({
//                     success: false,
//                     message: "User already enrolled in this course"
//                 })
//             }
//         }
//         catch(error){
//             return res.status(404).json({
//                 success: false,
//                 message: "Course not found"
//             }); 
//         }

//         // create order
//         const amount = course.price;
//         const currency = "INR"; 

//         const options = {
//             amount: amount * 100,
//             currency,
//             receipt: Math.random(Date.now()).toString(),
//             notes: {
//                 courseId: course_id,
//                 userId,
//             }
//         }

//         try{
//             const paymentResponse = await instance.orders.create(options);
//             console.log(paymentResponse);

//             return res.status(200).json({
//                 success: true,
//                 message: "Payment captured successfully",
//                 courseName: course.courseName,
//                 courseDescription: course.courseDescription,
//                 thumbnail: course.thumbnail,
//                 orderId: paymentResponse.id,
//                 amount: paymentResponse.amount,
//                 currency: paymentResponse.currency,
//             })
//         }
//         catch(error){
//             return res.status(404).json({
//                 success: false,
//                 message: "Failed to create order"
//             })
//         }


//     }   
//     catch(error){
//         console.log("Error in capturing the payment")
//         return res.status(500).json({
//             success: false,
//             message: "Failed to capture payment"
//         })
//     }
// }


// // verify signature of razorpay and server

// exports.verifySignature = async(req, res) => {
//     try{
//         const webhookSecret = "123456789";

//         const signature = req.headers["x-razorpay-signature"]; 

//         const shasum = crypto.createHmac("sha256", webhookSecret);
//         shasum.update(JSON.stringify(req.body));
//         const digest = shasum.digest("hex");

//         if(digest === signature){
//             // verify success

//             const {userId, courseId} = req.body.payload.payment.entity.notes;

//         try{
//             // find the course and enroll the student in it 
//             const enrolledCourse = await Course.findOneAndUpdate(
//                 {_id: courseId},
//                 {
//                     $push: {
//                         studentsEnrolled: userId,
//                     }
//                 },
//                 {new: true}
//             );

//             if(!enrolledCourse){
//                 return res.status(500).json({
//                     success: false,
//                     message: "Course not found"
//                 })
//             }

//             console.log(enrolledCourse);

//             // find the student and add course to the field of enrolled course

//             const enrolledStudent = await User.findOneAndUpdate(
//                 {_id: userId},
//                 {
//                     $push: {
//                         courses: courseId,
//                     }
//                 },
//                 {new: true}
//             );

//             // confirmation mail send
//             const emailResponse = await mailSender(
//                                 enrolledStudent.email,
//                                 "Congratulations from svcian.",
//                                 "Congratulations you are onboarded into new course."

//             );

//             console.log("mail sent successfully", emailResponse);

//             return res.status(200).json({
//                 success: true,
//                 message: "Payment is authorised/ Webhook verified successfully and course enrolled successfully"
//             })
//         }
//         catch(error){
//             console.log("payment successful but error in fullfill the action")
//         }
//         }
//         else{
//             // verify failed
//             return res.status(401).json({
//                 success: false,
//                 message: "Webhook signature verification failed"
//             })
//         }
//     }
//     catch(error){
//         console.log("Error in verifying the signature")
//         return res.status(500).json({
//             success: false,
//             message: "Failed to verify signature"
//         })
//     }
// }