// const Tag = require('../models/Tag');
const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  try {

    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      })
    }

    const categoryDetails = await Category.create({
      name: name,
      description: description
    });

    console.log("finally category created", categoryDetails);

    return res.status(200).json({
      success: true,
      message: "Category created successfully",
      category: categoryDetails
    })
  }
  catch (error) {
    console.log("Error in creating category");
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

exports.showAllCategory = async (req, res) => {
  try {
    const allCategory = await Category.find({}, { name: true, description: true });

    return res.status(200).json({
      success: true,
      message: "All category fetched successfully",
      data: allCategory
    })
  }
  catch (error) {
    console.log("Error in showing all category");
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// exports.categoryPageDetails = async(req, res) => {
//     try{
//         // get category id
//         // get courses for specific category id
//         // validate

//         // get courses for different category
//         // top selling courses

//         const {categoryId} = req.body;

//         const selectedCategory = await Category.findById(categoryId)
//         .populate("courses").exec();

//         if(! selectedCategory){
//             return res.status(404).json({
//                 success: false,
//                 message: "category data not found"
//             })
//         }

//         const differentCategories = await Category.find({
//             // isme categoryId aayega ya fir ye niche wala testing time check
//             _id: { $ne: selectedCategory._id }
//         }) .populate("courses").exec();

//         if(!differentCategories){
//             return res.status(404).json({
//                 success: false,
//                 message: "different category data not found"
//             })
//         }

//         // top selling courses data hw

//         return res.status(200).json({
//             success: true,
//             message: "Category page details fetched successfully",
//             selectedCategory: selectedCategory,
//             differentCategories: differentCategories,
//         })

//     }
//     catch(error){
//         console.log("Error in category page details");
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

// hw diya tha 
exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body

    console.log("ye lo", categoryId);
    // Get courses for the specified category
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "course",
        match: { status: "Published" },
        populate: "ratingAndReview",
      })
      .exec()

    console.log("SELECTED COURSE DAta", selectedCategory)
    // Handle the case when the category is not found
    if (!selectedCategory) {
      console.log("Category not found.")
      return res
        .status(404)
        .json({ success: false, message: "Category not found" })
    }
    // Handle the case when there are no courses
    console.log("dddddd category", selectedCategory )
    if (selectedCategory.course.length === 0) {
      console.log("No courses found for the selected category.")
      return res.status(404).json({
        success: false,
        message: "errrrrrrr"
      })
    }

    // Get courses for other categories
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    })
    let differentCategory = await Category.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        ._id
    )
      .populate({
        path: "course",
        match: { status: "Published" },
      })
      .exec()
    console.log()
    // Get top-selling courses across all categories
    const allCategories = await Category.find()
      .populate({
        path: "course",
        match: { status: "Published" },
        populate: {
          path: "instructor",
        }
      })
      .exec()
    const allCourses = allCategories.flatMap((category) => category.course)
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10)

    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}