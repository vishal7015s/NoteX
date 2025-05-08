const express = require("express")
const router = express.Router();


const { auth, isInstructor } = require("../middlewares/auth")
const {
    deleteAccount,
    updateProfileInfo,
  getAllUserDetails,
  updateProfilePicture,
  getEnrolledCourses,
  instructorDashboard,
  //mene kiya
//   updateDisplayPicture,
} = require("../controllers/Profile");

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/delete-account", auth, deleteAccount)
router.put("/update-profile-info", auth, updateProfileInfo)
router.get("/user-details", auth, getAllUserDetails)
router.put("/update-profile-pic", auth, updateProfilePicture)
// router.put("/update-profile-pic", updateProfilePicture)
// Get Enrolled Courses
    // mene kiya
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
// router.put("/updateDisplayPicture", auth, updateDisplayPicture)
// router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)


module.exports = router