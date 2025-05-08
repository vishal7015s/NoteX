const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const {uploadImageToCloudinary} = require('../utils/imageUploader');
require("dotenv").config();

// exports.createSubSection = async(req, res) => {
//     try{
//         // fetch data fro req body
//         // extract file/video
//         // validate
//         // upload vedio to cloudinary
//         // create sub section
//         // update section with subsection id, push subsection id into section 
//         // return response

//         const {title, description, timeDuration, sectionId} = req.body;

//         const video = req.files.video;

//         if(!title ||!description ||!timeDuration ||!sectionId ||!video){
//             return res.status(400).json({
//                 success: false,
//                 message: "All fields are required"
//             })
//         }

//         const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

//         const subSectionDetails = await SubSection.create({
//             title: title,
//             description: description,
//             timeDuration: timeDuration,
//             videoUrl: uploadDetails.secure_url,
//         })

//         const updatedSection = await Section.findByIdAndUpdate(sectionId,
//             {
//                 $push: { subsections: subSectionDetails._id }
//             },
//             {new: true}
//         ).populate({
//             path: "subSection"
//         }).exec();
//         // TODO: use populate to avoid id while render data dekhe

//         return res.status(200).json({
//             success: true,
//             message: "Subsection created successfully",
//             data: updatedSection
//         })
//     }
//     catch(error){
//         console.log("Error in creating SubSection");
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

// exports.updateSubSection = async(req, res) => {
//     try{
//         const {title, description, timeduration, subSectionId} = req.body;

//         const subSection = await SubSection.findById(subSectionId);

//         if(title !== undefined){
//             subSection.title = title;
//         }
//         if(description!== undefined){
//             subSection.description = description;
//         }
//         if(timeduration!== undefined){
//             subSection.timeDuration = timeduration;
//         }
      
//         if (req.files && req.files.video !== undefined) {
//           const video = req.files.video
//           const uploadDetails = await uploadImageToCloudinary(
//             video,
//             process.env.FOLDER_NAME
//           )
//           subSection.videoUrl = uploadDetails.secure_url
//         }

//         await subSection.save();

//         return res.status(200).json({
//             success: true,
//             message: "Subsection updated successfully",
//             data: subSection
//         })
//     }
//     catch(error){
//         console.log("Error in updating SubSection");
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

// newly added 

exports.updateSubSection = async (req, res) => {
  try {
    const { sectionId, subSectionId, title, description } = req.body
    const subSection = await SubSection.findById(subSectionId)

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      })
    }

    if (title !== undefined) {
      subSection.title = title
    }

    if (description !== undefined) {
      subSection.description = description
    }
    if (req.files && req.files.video !== undefined) {
      const video = req.files.video
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      )
      subSection.videoUrl = uploadDetails.secure_url
      subSection.timeDuration = `${uploadDetails.duration}`
    }

    await subSection.save()

    // find updated section and return it
    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    )

    console.log("updated section", updatedSection)

    return res.json({
      success: true,
      message: "Section updated successfully",
      data: updatedSection,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the section",
    })
  }
}

// exports.deleteSubSection = async(req, res) => {
//     try{
//         // get sub section id
//         // delete
//         // return response

//         const { subSectionId } = req.body;

//         const updated = await SubSection.findByIdAndDelete(subSectionId);

//         return res.status(200).json({
//             success: true,
//             message: "Subsection deleted successfully"
//         })
//     }
//     catch(error){
//         console.log("Error in deleting SubSection");
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }


// newly added 
exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    )
    const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })

    if (!subSection) {
      return res
        .status(404)
        .json({ success: false, message: "SubSection not found" })
    }

    // find updated section and return it
    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    )

    return res.json({
      success: true,
      message: "SubSection deleted successfully",
      data: updatedSection,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the SubSection",
    })
  }
}



exports.createSubSection = async (req, res) => {
    try {
      // Extract necessary information from the request body
      const { sectionId, title, description, timeDuration } = req.body
      const video = req.files.video
  
      // Check if all necessary fields are provided
      if (!sectionId || !title || !description || !video) {
        return res
          .status(404)
          .json({ success: false, message: "All Fields are Required" })
      }
      console.log(video)
  
      // Upload the video file to Cloudinary
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      )
      console.log(uploadDetails)
      // Create a new sub-section with the necessary information
      const SubSectionDetails = await SubSection.create({
        title: title,
        timeDuration: `${uploadDetails.duration}`,
        description: description,
        videoUrl: uploadDetails.secure_url,
      })
  
      // Update the corresponding section with the newly created sub-section
      const updatedSection = await Section.findByIdAndUpdate(
        { _id: sectionId },
        { $push: { subSection: SubSectionDetails._id } },
        { new: true }
      ).populate("subSection")
  
      // Return the updated section in the response
      return res.status(200).json({ success: true, data: updatedSection })
    } catch (error) {
      // Handle any errors that may occur during the process
      console.error("Error creating new sub-section:", error)
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }