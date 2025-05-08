const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
    },
    courseDescription: {
        type: String,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    whatYouWillLearn: {
        type: String,
    },
    courseContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
        }
    ],
    ratingAndReview: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatingAndReview",
        }
    ],
    price: {
        type: Number,
    },
    thumbnail: {
        type: String,   
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    status: {
        type: String,
        enum: ["Draft", "Published"],
      },
    createdAt: { type: Date, default: Date.now },
    studentsEnrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ]
})

module.exports = mongoose.model("Course", courseSchema);