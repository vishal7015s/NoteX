const cloudinary = require("cloudinary").v2

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
  const options = { folder }
  if (height) {
    options.height = height
  }
  if (quality) {
    options.quality = quality
  }
  options.resource_type = "auto"
  console.log("OPTIONS", options)
  return await cloudinary.uploader.upload(file.tempFilePath, options)
}


// const cloudinary = require('cloudinary').v2;

// exports.uploadImageToCloudinary = async(file, folder, height, quality) =>{
//     const options = {folder};
//     if(height){
//         options.height = height;
//     }
//     if(quality){
//         options.quality = quality;
//     }
//     options.resource_type = "raw";
//     return await cloudinary.uploader.upload(file.tempFilePath, options);
// }



// // const cloudinary = require('cloudinary').v2;

// // exports.uploadFileToCloudinary = async (file, folder, height, quality) => {
// //   const options = { folder };

// //   if (height) {
// //     options.height = height;
// //     options.crop = "limit"; // optional but safe if resizing
// //   }

// //   if (quality) {
// //     options.quality = quality;
// //   }

// //   // Infer resource type based on file mimetype
// //   const fileType = file.mimetype;

// //   if (fileType.startsWith("image/")) {
// //     options.resource_type = "image";
// //   } else if (fileType.startsWith("video/")) {
// //     options.resource_type = "video";
// //   } else {
// //     options.resource_type = "raw"; // For PDFs and other files
// //   }

// //   return await cloudinary.uploader.upload(file.tempFilePath, options);
// // };

// // utils/cloudinary.js
// const cloudinary = require("cloudinary").v2;

// exports.uploadImageToCloudinary = async (file, folder) => {
//   const options = {
//     folder: folder,
//     resource_type: "auto", // Let Cloudinary automatically detect the file type
//     use_filename: true, // Keep the original filename
//     unique_filename: false,
//     overwrite: true
//   };

//   try {
//     // Check file extension for PDF
//     const fileExtension = file.name.split('.').pop().toLowerCase();
//     if (fileExtension === 'pdf') {
//       options.resource_type = 'raw'; // Treat PDFs as raw files
//     }

//     const result = await cloudinary.uploader.upload(file.tempFilePath, options);
    
//     // For PDFs, we need to modify the URL to force download
//     if (fileExtension === 'pdf') {
//       result.secure_url = result.secure_url.replace('/upload/', '/upload/fl_attachment/');
//     }
    
//     return result;
//   } catch (error) {
//     console.error("Cloudinary upload error:", error);
//     throw error;
//   }
// };








// const uploadImageToCloudinary = async(file, folder, height, quality) =>{
//     const options = {folder};
//     if(height){
//         options.height = height;
//     }
//     if(quality){
//         options.quality = quality;
//     }
//     options.resource_type = "raw";
    
//     return await cloudinary.uploader.upload(file.tempFilePath, options);
// }

// module.exports = { uploadImageToCloudinary };

// // >>>>>>> 66adbf1aa9ed547cd64a1eeda5b04e08a39611a2
