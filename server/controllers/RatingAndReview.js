const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const User = require("../models/User");
const { default: mongoose } = require("mongoose");

// create rating

// exports.createRating = async(req, res) => {
//     try{
//         // get user id
//         // fetch data from req ki body
//         // check user enroll or not in course
//         // check user give already reating and review
//         // create rating and review
//         // update course with these rating/review 
//         const userId = req.user.id;

//         const {rating, review, courseId} = req.body;

//         //check user enroll or not
//         const courseDetails = await Course.findOne(
//             {
//                 _id: courseId,
//                 studentsEnrolled: {$elemMatch: {$eq: userId}},
//             }
//         )

//         if(!courseDetails){
//             return res.status(404).json({message: "User not enrolled in this course"});
//         }

//         // check user give already reating and review
//         const alreadyRating = await RatingAndReview.findOne({
//             course: courseId,
//             user: userId,
//         });

//         if(alreadyRating){
//             return res.status(400).json({message: "User has already given rating and review for this course"});
//         }

//         const ratingReview = await RatingAndReview.create({
//             course: courseId,
//             user: userId,
//             rating: rating,
//             review: review,
//         })

//         const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,
//             {
//                 $push: {ratingAndReview: ratingReview._id},
//             },
//             {new: true}
//         )

//         console.log("update course details", updatedCourseDetails);

//         return res.status(200).json({
//             success: true,
//             message: "Rating and review created successfully",
//             data: ratingReview,
//         });
//     }
//     catch(error){
//        console.log("Error in creating rating/review");
//        return res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// }

exports.createRating = async (req, res) => {
    try {
      const userId = req.user.id
      const { rating, review, courseId } = req.body
  
      // Check if the user is enrolled in the course
  
      const courseDetails = await Course.findOne({
        _id: courseId,
        studentsEnrolled: { $elemMatch: { $eq: userId } },
      })
  
      if (!courseDetails) {
        return res.status(404).json({
          success: false,
          message: "Student is not enrolled in this course",
        })
      }
  
      // Check if the user has already reviewed the course
      const alreadyReviewed = await RatingAndReview.findOne({
        user: userId,
        course: courseId,
      })
  
      if (alreadyReviewed) {
        return res.status(403).json({
          success: false,
          message: "Course already reviewed by user",
        })
      }
  
      // Create a new rating and review
      const ratingReview = await RatingAndReview.create({
        rating,
        review,
        course: courseId,
        user: userId,
      })
  
      // Add the rating and review to the course
      await Course.findByIdAndUpdate(courseId, {
        $push: {
          ratingAndReview: ratingReview,
        },
      })
      await courseDetails.save()
  
      return res.status(201).json({
        success: true,
        message: "Rating and review created successfully",
        ratingReview,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }


// get avg rating
exports.getAverageRating = async(req, res) => {
    try{
        // get course id bcoz hum course ki rating nikal rahe hai
        // calculate avg rating
        // return rating

        const courseId = req.body.courseId;

        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: {
                        $avg: "$rating",
                    },
                }
            }
        ])

        if(result.length > 0) {
            return res.status(200).json({
                success: true,
                message: "Average rating retrieved successfully",
                averageRating: result[0].averageRating,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Avg rating is zero no rating is given by an user",
        });
    }
    catch(error){
        console.log("Error in getting avg rating");
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// get all rating

exports.getAllRatingReview = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image", // Specify the fields you want to populate from the "Profile" model
      })
      .populate({
        path: "course",
        select: "courseName", //Specify the fields you want to populate from the "Course" model
      })
      .exec()

    res.status(200).json({
      success: true,
      data: allReviews,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve the rating and review for the course",
      error: error.message,
    })
  }
}