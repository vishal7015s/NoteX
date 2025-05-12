const BASE_URL = import.meta.env.VITE_BASE_URL ;

export const authEndPoint = {
  SENDOTP_API : BASE_URL + "auth/sendotp",
  SIGNUP_API : BASE_URL + "auth/signup",
  LOGIN_API : BASE_URL + "auth/login",
  RESETPASSWORDTOKEN_API : BASE_URL + "auth/reset-password-token",
  RESETPASSWORD_API :  BASE_URL + "auth/reset-password",
}

export const studentEndPoint = {
  COURSE_PAYMENT_API : BASE_URL + "payment/capturePayment",
  COURSE_VERIFY_API : BASE_URL + "payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API : BASE_URL + "payment/sendPaymentSuccessEmail",
}

export const courseEndpoints = {
  COURSE_CATEGORIES_API: BASE_URL + "courses/show-all-category",
  COURSE_DETAILS_API : BASE_URL + "courses/getCourseDetails",
  EDIT_COURSE_API: BASE_URL + "courses/editCourse",
  CREATE_COURSE_API:  BASE_URL + "courses/createCourse",
  DELETE_COURSE_API: BASE_URL + "courses/deleteCourse",
  UPDATE_SECTION_API: BASE_URL + "courses/updateSection",
  CREATE_SECTION_API: BASE_URL + "courses/createSection",
  DELETE_SECTION_API: BASE_URL + "courses/deleteSection",
  CREATE_SUBSECTION_API: BASE_URL + "courses/createSubSection",
  DELETE_SUBSECTION_API: BASE_URL + "courses/deleteSubSection",
  UPDATE_SUBSECTION_API: BASE_URL + "courses/updateSubSection",
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "courses/getInstructorCourses",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED: BASE_URL + "courses/getFullCourseDetails",
  CREATE_RATING_API: BASE_URL + "courses/createRating",
  LECTURE_COMPLETION_API: BASE_URL + "courses/updateCourseProgress",
}

export const profileEndpoints = {
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "profile/getEnrolledCourses",
  GET_INSTRUCTOR__DATA_API: BASE_URL + "profile/instructorDashboard",
} 

export const settingsEndPoint = {
  PROFILEPICTURE_API : "",
  UPDATEPROFILE_API : "",
  CHANGEPASSWORD_API : "",
  DELETEACCOUNT_API : "",
}

export const categories = {
  CATEGORIES_API: BASE_URL + "courses/show-all-category",
};

export const catalogData = {
  CATALOGPAGEDATA_API: BASE_URL + "courses/getCategoryPageDetails",
}

export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "courses/getReviews",
}



export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "profile/deleteAccount",
}

