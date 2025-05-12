const express = require("express")
const router = express.Router();


const { auth, isInstructor } = require("../middlewares/auth")
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  instructorDashboard,
  //mene kiya
//   updateDisplayPicture,
} = require("../controllers/Profile");

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteAccount", auth, deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.get("/user-details", auth, getAllUserDetails)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
// router.put("/update-profile-pic", updateProfilePicture)
// Get Enrolled Courses
    // mene kiya
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
// router.put("/updateDisplayPicture", auth, updateDisplayPicture)
// router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)


module.exports = router