const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const {uploadImageToCloudinary} = require('../utils/imageUploader');
const CourseProgress = require("../models/CourseProgress")
const { convertSecondsToDuration } = require("../utils/secToDuration")
require("dotenv").config();


exports.createCourse = async(req, res) => {
    try{
        const {courseName, courseDescription, whatYouWillLearn, price, category,  status,
        } = req.body;

        const thumbnail = req.files.thumbnail;
        // !thumbnail
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        //check for instructor

        /* Course ki entry db me create krte time instructor ki id kyu nikal rahe hai jbki userid he instrucor id hai */
 
        const userId = req.user.id;
        // user id or db call isliy kri instructor ki details lane k liy bcoz course wale field me instrucot ki object id hai
        if (!status || status === undefined) {
          status = "Draft"
        }
        const instructorDetails = await User.findById(userId);

        console.log("Instructor detils", instructorDetails);

        if(!instructorDetails){
            return res.status(404).json({
                success: false,
                message: "instructor details not found"
            })
        }

        //check tag is valid or not
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success: false,
                message: "invalid category"
            })
        }

        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            thumbnail: thumbnailImage.secure_url,
            category: categoryDetails._id,
            instructor: instructorDetails._id,
            status: status,

            // instructor: userId
        })

        console.log("New course created", newCourse);

        //ab hame user ko update krna hai tag/category k andr to courses add karenge but user ko bhi update kkarenge

        //  add the new course to the user schema of instructor

        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {$push: {courses: newCourse._id}},
            {new: true}
        )

        // mn se likh hai
        await Category.findByIdAndUpdate(
            {_id: categoryDetails._id},
            {$push: {course: newCourse._id}},
            {new: true}
        )
        // mn se likha hai

        return res.status(200).json({
            success: true,
            message: "Course created successfully",
            data: newCourse
        })
    }
    catch(error){
        console.log("Error in creating course");
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// get all courses function 

exports.showAllCourses = async(req, res) => {
    try{
        const allCourses = await Course.find({}, {courseName: true, courseDescription: true, price: true, thumbnail:true, instructor:true, ratingAndReview: true, studentsEnrolled: true})
        .populate("instructor").exec();
 
        return res.status(200).json({
            success: true,
            message: "All courses fetched successfully",
            data: allCourses
        })
    }
    catch(error){
        console.log("Error while fetching all courses");
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// exports.getCourseDetails = async(req, res) => {
//     try{

//         const {courseId} = req.body;

//         const courseDetails = await Course.find(
//                         {_id: courseId})
//                         .populate(
//                             {
//                                 path: "instructor",
//                                 populate: {
//                                     path: "additionalDetails",
//                                 },
//                             }
//                         )
//                         // .populate("category")
//                         // .populate("ratingAndReview")
//                         .populate(
//                             {
//                                 path: "courseContent",
//                                 populate: {
//                                     path: "subSection",
//                                 },
//                             }
//                         )
//                         .exec();

//         if(!courseDetails){
//             return res.status(404).json({
//                 success: false,
//                 message: "complete course details not found"
//             })
//         }

//         return res.status(200).json({
//             success: true,
//             message: "Complete course details fetched successfully",
//             data: courseDetails
//         })

//     }
//     catch(error){
//         console.log("Error while fetching complete course details");
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }


exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReview")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          select: "-videoUrl",
        },
      })
      .exec()

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

  

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


// newly added  

exports.editCourse = async (req, res) => {
    try {
      const { courseId } = req.body
      const updates = req.body
      const course = await Course.findById(courseId)
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" })
      }
  
      // If Thumbnail Image is found, update it
      if (req.files) {
        console.log("thumbnail update")
        // const thumbnail = req.files.thumbnailImage
        const thumbnail = req.files.thumbnail;

        // const thumbnailImage = await uploadImageToCloudinary(
        //   thumbnail,
        //   process.env.FOLDER_NAME
        // )
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);


        course.thumbnail = thumbnailImage.secure_url;
      }
  
      // Update only the fields that are present in the request body
      for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
          if (key === "tag" || key === "instructions") {
            course[key] = JSON.parse(updates[key])
          } else {
            course[key] = updates[key]
          }
        }
      }
  
      await course.save()
  
      const updatedCourse = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReview")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      res.json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
}



// new one added 
exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 })

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}


exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentsEnrolled
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}



// new added 
exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.user.id
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReview")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    // let courseProgressCount = await CourseProgress.findOne({
    //   courseID: courseId,
    //   userId: userId,
    // })

    // console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

 

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        // completedVideos: courseProgressCount?.completedVideos
        //   ? courseProgressCount?.completedVideos
        //   : [],
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
