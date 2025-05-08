const Section = require('../models/Section');
const Course = require('../models/Course');
const SubSection = require("../models/SubSection")

exports.createSection = async(req, res) => {
    try{
        // fetch data from req ki body
        // validate the data
        // create section
        // add section in course schema 
        // return response

        const {sectionName, courseId} = req.body;

        if(!sectionName || !courseId){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const newSection = await Section.create({sectionName});

        // update course with these section , add section id in course schema
        // bhai islo pad lena ek baar

        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,
            {
                $push: {
                    courseContent: newSection._id,
                }
            },
            {new: true}
        )
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        }).exec(); 

        // console.log(updatedCourseDetails)

        // yaha pe hw hai ki me populate kese use kru ki section or subsection dhono ki id ko populate kese kru
        // populate: ["courseContent"]
        // return response

        return res.status(200).json({
            success: true,
            message: "Section created successfully",
            updatedCourseDetails
        })


    }
    catch(error){
        console.log("Error while creating section");
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// 

// newly added
exports.updateSection = async (req, res) => {
    try {
      const { sectionName, sectionId, courseId } = req.body
      const section = await Section.findByIdAndUpdate(
        sectionId,
        { sectionName },
        { new: true }
      )
      const course = await Course.findById(courseId)
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
      console.log(course)
      res.status(200).json({
        success: true,
        message: section,
        data: course,
      })
    } catch (error) {
      console.error("Error updating section:", error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }
  







// exports.deleteSection = async(req, res) => {
//     try{
//         // get section id
//         // use find by id and delete
//         // return response

//         const {sectionId} = req.body;

//         await Section.findByIdAndDelete(sectionId);

//         // tumne yaha pe section delete tho kar diya but course schema k ander section ki objectid to abhi bhi hai waha pe bhi

//         return res.status(200).json({
//             success: true,
//             message: "Section deleted successfully"
//         })
//     }
//     catch(error){
//         console.log("Error while deleting section");
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }


// newly added 

exports.deleteSection = async (req, res) => {
    try {
      const { sectionId, courseId } = req.body
      await Course.findByIdAndUpdate(courseId, {
        $pull: {
          courseContent: sectionId,
        },
      })
      const section = await Section.findById(sectionId)
      console.log(sectionId, courseId)
      if (!section) {
        return res.status(404).json({
          success: false,
          message: "Section not found",
        })
      }
      // Delete the associated subsections
      await SubSection.deleteMany({ _id: { $in: section.subSection } })
  
      await Section.findByIdAndDelete(sectionId)
  
      // find the updated course and return it
      const course = await Course.findById(courseId)
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      res.status(200).json({
        success: true,
        message: "Section deleted",
        data: course,
      })
    } catch (error) {
      console.error("Error deleting section:", error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }