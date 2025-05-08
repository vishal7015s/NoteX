const Profile = require('../models/Profile');
const User = require('../models/User');
const {uploadImageToCloudinary} = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration")
const Course = require("../models/Course")
require("dotenv").config();

// delete account handler function

exports.deleteAccount = async(req, res) => {
    try{
        const id = req.user.id;

        // find user and delete profile
        const user = await User.findByIdAndDelete(id);

        // find profile and delete
        const profile = await Profile.findByIdAndDelete(user.additionalDetails);

        // TODO bhai ek profile delete hofi to studentenrooled ka count bi km ho skta hai

        return res.status(200).json({
            success: true,
            message: "Account deleted successfully"
        })
    }
    catch(error){
        console.log("Error while deleting account");
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
} 

exports.getAllUserDetails = async(req, res) => {
    try{
        const id = req.user.id;

        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        return res.status(200).json({
            success: true,
            message: "User details fetched successfully",
            userDetails
        })

    }
    catch(error){
        console.log("Error while getting all user details");
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.updateProfilePicture = async(req, res) => {
    try{
        const profilePicture = req.files.profilePicture

        const id = req.user.id;

        const image = await uploadImageToCloudinary(
            profilePicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )

        const updateProfilePicture = await User.findByIdAndUpdate(
            {_id: id},
            {
                image: image.secure_url
            },
            {new: true}
        )

        return res.status(200).json({
            success: true,
            message: "Profile picture updated successfully",
            data:  image.secure_url
        })
    }
    catch(error){
        console.log("Error while updating profile picture");
        return res.status(500).json({
            success: false,
            message: error.message
        })   
    }
}

exports.updateProfileInfo = async(req, res) => {
    try{
        const {firstName, lastName, gender, about, dateOfBirth, contactNumber} = req.body;

        const id = req.user.id;

        const userDetails = await User.findById(id);

        const user = await User.findByIdAndUpdate(
            {_id: id},
            {
                firstName: firstName,
                lastName: lastName
            },
            {new: true}
        );

        await user.save();

        const profile = await Profile.findById(userDetails.additionalDetails);

        profile.gender = gender;
        profile.about = about;
        profile.dateOfBirth = dateOfBirth;
        profile.contactNumber = contactNumber;
        await profile.save();

        const updatedUserDetails = await User.findById(id).populate("additionalDetails").exec();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: updatedUserDetails
        })
    }
    catch(error){
        console.log("Error while updating profile info");
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
    
}




// newly added 

exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      let userDetails = await User.findOne({
        _id: userId,
      })
        .populate({
          path: "courses",
          populate: {
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          },
        })
        .exec()
      userDetails = userDetails.toObject()
      var SubsectionLength = 0
      for (var i = 0; i < userDetails.courses.length; i++) {
        let totalDurationInSeconds = 0
        SubsectionLength = 0
        for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
          totalDurationInSeconds += userDetails.courses[i].courseContent[
            j
          ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
          userDetails.courses[i].totalDuration = convertSecondsToDuration(
            totalDurationInSeconds
          )
          SubsectionLength +=
            userDetails.courses[i].courseContent[j].subSection.length
        }
        // let courseProgressCount = await CourseProgress.findOne({
        //   courseID: userDetails.courses[i]._id,
        //   userId: userId,
        // })
        // courseProgressCount = courseProgressCount?.completedVideos.length
        // if (SubsectionLength === 0) {
        //   userDetails.courses[i].progressPercentage = 100
        // } else {
        //   // To make it up to 2 decimal point
        //   const multiplier = Math.pow(10, 2)
        //   userDetails.courses[i].progressPercentage =
        //     Math.round(
        //       (courseProgressCount / SubsectionLength) * 100 * multiplier
        //     ) / multiplier
        // }
      }
  
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
}

// exports.instructorDashboard = async(req, res) => {
//   try{
//     const courseDetails = await Course.find({instructor: req.user.id});

//     const courseData = courseDetails.map( (course,i) => {
//       const totalStudentEnrolled = course.totalStudentEnrolled.length
//       const totalAmountGenerated = totalStudentEnrolled * course.price

//       const courseDataWithStats = {
//         id: course._id,
//         courseName: course.courseName,
//         courseDescription: course.courseDescription,
//         totalStudentEnrolled,
//         totalAmountGenerated
//       }
//       return courseDataWithStats;
//     })

//     res.status(200).json({courses: courseData})
//   }
//   catch(error){
//     console.log(error)
//     return res.status(500).json({
//       success: false,
//       message: error.message
//     })
//   }
// }

exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id })

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length
      const totalAmountGenerated = totalStudentsEnrolled * course.price

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      }

      return courseDataWithStats
    })

    return res.status(200).json({ courses: courseData })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}