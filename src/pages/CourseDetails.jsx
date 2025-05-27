import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from "../services/operations/studentFeaturesAPI";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import GetAvgRating from "../utils/avgRating";
import Error from "../pages/secondaryPage/Error";
import ConfirmationModal from "../components/common/ConfirmationModal";
import RatingStars from "../components/common/RatingStars";
import { formatDate } from "../services/formatDate";
import CourseDetailsCard from "../components/CourseDetailsCard";
import CourseAccordionBar from "./CourseAccordionBar";

function CourseDetails() {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.profile);
    const { paymentLoading } = useSelector((state) => state.course);
    const navigate = useNavigate();
    const { courseId } = useParams();

    const [confirmationModal, setConfirmationModal] = useState(null);

    const handleBuyCourse = () => {
        if (token) {
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }
        setConfirmationModal({
            text1: "You are not Logged in",
            text2: "Please login to purchase the course",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        });
    };

    const [courseData, setCourseData] = useState(null);

    useEffect(() => {
        const getCourseFullDetails = async () => {
            try {
                const res = await fetchCourseDetails(courseId);
                setCourseData(res);
            } catch (error) {
                console.log("Could not fetch full course details", error);
            }
        };
        getCourseFullDetails();
    }, [courseId]);

    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        const count = GetAvgRating(courseData?.data?.courseDetails?.ratingAndReview);
        setAvgReviewCount(count);
    }, [courseData]);

    const [isActive, setIsActive] = useState([]);
    const handleActive = (id) => {
        setIsActive(
            !isActive.includes(id)
                ? isActive.concat(id)
                : isActive.filter((e) => e !== id)
        );
    };

    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);

    useEffect(() => {
        let lectures = 0;
        courseData?.data?.courseDetails?.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length || 0;
        });
        setTotalNoOfLectures(lectures);
    }, [courseData]);

    if (loading || !courseData) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!courseData.success) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
                <Error />
            </div>
        );
    }

    const {
        _id: course_id,
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReview,
        instructor,
        studentsEnrolled,
        createdAt,
    } = courseData.data?.courseDetails;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-br from-blue-50 to-gray-100 text-gray-800">
            {/* Course Header Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-white p-6 sm:p-8 rounded-xl border-2 border-gray-300 shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-300">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">{courseName}</h1>
                        <p className="text-sm sm:text-base text-gray-600 mb-6">{courseDescription}</p>
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4">
                            <span className="text-blue-600 font-semibold">{avgReviewCount}</span>
                            <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                            <span className="text-sm sm:text-base text-gray-600">{`(${ratingAndReview.length} Reviews)`}</span>
                            <span className="text-sm sm:text-base text-gray-600">{`(${studentsEnrolled.length} Students Enrolled)`}</span>
                        </div>
                        <p className="text-sm sm:text-base mb-2">
                            Created by <span className="font-semibold text-blue-600">{`${instructor.firstName} ${instructor.lastName}`}</span>
                        </p>
                        <div className="flex flex-wrap gap-3 sm:gap-4 text-gray-600 text-sm sm:text-base">
                            <p>Created at {formatDate(createdAt)}</p>
                            <p>| English</p>
                        </div>
                    </div>

                    {/* What You Will Learn Section */}
                    <div className="mt-6 sm:mt-8 bg-white p-6 sm:p-8 rounded-xl border-2 border-gray-300 shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-300">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">What You'll Learn</h2>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{whatYouWillLearn}</p>
                    </div>

                    {/* Course Content Section */}
                    <div className="mt-6 sm:mt-8">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Course Content</h2>
                        <div className="flex flex-wrap justify-between items-center mb-4">
                            <div className="flex flex-wrap gap-3 sm:gap-4 text-gray-600 text-sm sm:text-base">
                                <span>{courseContent.length} Section(s)</span>
                                <span>{totalNoOfLectures} Lecture(s)</span>
                                <span>{courseData?.data?.totalDuration} Total Length</span>
                            </div>
                            <button
                                onClick={() => setIsActive([])}
                                className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                            >
                                Collapse All Sections
                            </button>
                        </div>
                        <div className="space-y-4">
                            {courseContent?.map((course, index) => (
                                <CourseAccordionBar
                                    course={course}
                                    key={index}
                                    isActive={isActive}
                                    handleActive={handleActive}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Author Section */}
                    <div className="mt-6 sm:mt-8 bg-white p-6 sm:p-8 rounded-xl border-2 border-gray-300 shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-300">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Instructor</h2>
                        <div className="flex items-center gap-4">
                            <img
                                src={
                                    instructor.image
                                        ? instructor.image
                                        : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                                }
                                alt="Author"
                                className="h-16 w-16 rounded-full object-cover border-2 border-blue-200"
                            />
                            <p className="text-lg font-semibold text-gray-800">{`${instructor.firstName} ${instructor.lastName}`}</p>
                        </div>
                        <p className="text-sm sm:text-base text-gray-600 mt-2 leading-relaxed">{instructor?.additionalDetails?.about}</p>
                    </div>
                </div>

                {/* Course Details Card */}
                <div className="lg:col-span-1">
                    <CourseDetailsCard
                        course={courseData?.data?.courseDetails}
                        setConfirmationModal={setConfirmationModal}
                        handleBuyCourse={handleBuyCourse}
                    />
                </div>
            </div>

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    );
}

export default CourseDetails;


// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { buyCourse } from "../services/operations/studentFeaturesAPI"
// import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
// import GetAvgRating from "../utils/avgRating"
// import Error from "../pages/secondaryPage/Error"
// import ConfirmationModal from "../components/common/ConfirmationModal"
// import RatingStars from "../components/common/RatingStars"
// import { formatDate } from "../services/formatDate"
// import CourseDetailsCard from "../components/CourseDetailsCard"
// import CourseAccordionBar from "./CourseAccordionBar"

// function CourseDetails() {
//     const { user } = useSelector((state) => state.profile);
//     const { token } = useSelector((state) => state.auth);
//     const dispatch = useDispatch();
//     const { loading } = useSelector((state) => state.profile)
//     const { paymentLoading } = useSelector((state) => state.course);
//     const navigate = useNavigate();
//     const { courseId } = useParams();

//     const [confirmationModal, setConfirmationModal] = useState(null);

//     const handleBuyCourse = () => {
//         if (token) {
//             buyCourse(token, [courseId], user, navigate, dispatch);
//             return;
//         }
//         setConfirmationModal({
//             text1: "You are not Logged in",
//             text2: "Please login to purchase the course",
//             btn1Text: "Login",
//             btn2Text: "Cancel",
//             btn1Handler: () => navigate("/login"),
//             btn2Handler: () => setConfirmationModal(null)
//         })
//     }

//     const [courseData, setCourseData] = useState(null);

//     useEffect(() => {
//         const getCourseFullDetails = async () => {
//             try {
//                 const res = await fetchCourseDetails(courseId);
//                 setCourseData(res);
//             }
//             catch (error) {
//                 console.log(error);
//                 console.log("Could not fetch full course details")
//             }
//         }
//         getCourseFullDetails();
//     }, [courseId])

//     const [avgReviewCount, setAvgReviewCount] = useState(0);

//     useEffect(() => {
//         const count = GetAvgRating(courseData?.data?.courseDetails?.ratingAndReview);
//         setAvgReviewCount(count);
//     }, [courseData])

//     const [isActive, setIsActive] = useState(Array(0));
//     const handleActive = (id) => {
//         setIsActive(
//         !isActive.includes(id)
//             ? isActive.concat(id)
//             : isActive.filter((e) => e != id)
//         )}

//     const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);

//     useEffect(() => {
//         let lectures = 0;
//         courseData?.data?.courseDetails?.courseContent?.forEach((sec) => {
//             lectures += sec.subSection.length || 0
//         })
//         setTotalNoOfLectures(lectures);
//     }, [courseData])

//     if (loading || !courseData) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <p className="text-2xl text-gray-600">Loading...</p>
//             </div>
//         )
//     }

//     if (!courseData.success) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <Error />
//             </div>
//         )
//     }

//     const {
//         _id: course_id,
//         courseName,
//         courseDescription,
//         thumbnail,
//         price,
//         whatYouWillLearn,
//         courseContent,
//         ratingAndReview,
//         instructor,
//         studentsEnrolled,
//         createdAt,
//     } = courseData.data?.courseDetails

//     return (
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             {/* Course Header Section with Gradient */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                 <div className="lg:col-span-2">
//                     <div className="bg-gradient-to-b from-gray-700 to-indigo-500 text-white p-8 rounded-lg shadow-lg">
//                         <h1 className="text-3xl sm:text-4xl font-bold mb-4">{courseName}</h1>
//                         <p className="text-lg text-gray-100 mb-6">{courseDescription}</p>
//                         <div className="flex flex-wrap items-center gap-4 mb-4">
//                             <span className="text-yellow-300 font-semibold">{avgReviewCount}</span>
//                             <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
//                             <span className="text-gray-100">{`(${ratingAndReview.length} Reviews)`}</span>
//                             <span className="text-gray-100">{`(${studentsEnrolled.length} Students Enrolled)`}</span>
//                         </div>
//                         <p className="text-lg mb-2">
//                             Created by <span className="font-semibold">{`${instructor.firstName} ${instructor.lastName}`}</span>
//                         </p>
//                         <div className="flex flex-wrap gap-4 text-gray-100">
//                             <p>Created at {formatDate(createdAt)}</p>
//                             <p>| English</p>
//                         </div>
//                     </div>

//                     {/* What You Will Learn Section */}
//                     <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
//                         <h2 className="text-2xl font-semibold mb-4">What You'll Learn</h2>
//                         <p className="text-gray-700 leading-relaxed">{whatYouWillLearn}</p>
//                     </div>

//                     {/* Course Content Section */}
//                     <div className="mt-8">
//                         <h2 className="text-2xl font-semibold mb-4">Course Content</h2>
//                         <div className="flex flex-wrap justify-between items-center mb-4">
//                             <div className="flex flex-wrap gap-4 text-gray-600">
//                                 <span>{courseContent.length} Section(s)</span>
//                                 <span>{totalNoOfLectures} Lecture(s)</span>
//                                 <span>{courseData?.data?.totalDuration} Total Length</span>
//                             </div>
//                             <button
//                                 onClick={() => setIsActive([])}
//                                 className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
//                             >
//                                 Collapse All Sections
//                             </button>
//                         </div>
//                         <div className="space-y-4">
//                             {courseContent?.map((course, index) => (
//                                 <CourseAccordionBar
//                                     course={course}
//                                     key={index}
//                                     isActive={isActive}
//                                     handleActive={handleActive}
//                                 />
//                             ))}
//                         </div>
//                     </div>

//                     {/* Author Section */}
//                     <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
//                         <h2 className="text-2xl font-semibold mb-4">Instructor</h2>
//                         <div className="flex items-center gap-4">
//                             <img
//                                 src={
//                                     instructor.image
//                                         ? instructor.image
//                                         : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
//                                 }
//                                 alt="Author"
//                                 className="h-16 w-16 rounded-full object-cover"
//                             />
//                             <p className="text-lg font-semibold">{`${instructor.firstName} ${instructor.lastName}`}</p>
//                         </div>
//                         <p className="text-gray-600 mt-2 leading-relaxed">{instructor?.additionalDetails?.about}</p>
//                     </div>
//                 </div>

//                 {/* Course Details Card */}
//                 <div className="lg:col-span-1">
//                     <CourseDetailsCard
//                         course={courseData?.data?.courseDetails}
//                         setConfirmationModal={setConfirmationModal}
//                         handleBuyCourse={handleBuyCourse}
//                     />
//                 </div>
//             </div>

//             {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
//         </div>
//     )
// }

// export default CourseDetails




// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { buyCourse } from "../services/operations/studentFeaturesAPI"
// import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
// import GetAvgRating from "../utils/avgRating"
// import Error from "../pages/secondaryPage/Error"
// import confirmationModal from "../components/common/ConfirmationModal"
// import RatingStars from "../components/common/RatingStars"
// import { formatDate } from "../services/formatDate"
// import CourseDetailsCard from "../components/CourseDetailsCard"
// import CourseAccordionBar from "./CourseAccordionBar"


// function CourseDetails() {

//     const { user } = useSelector((state) => state.profile);
//     const { token } = useSelector((state) => state.auth);
//     const dispatch = useDispatch();
//     const { loading } = useSelector((state) => state.profile)
//     const { paymentLoading } = useSelector((state) => state.course);
//     const navigate = useNavigate();
//     const { courseId } = useParams();

//     const [confirmationModal, setConfirmationModal] = useState(null);

//     const handleBuyCourse = () => {
//         if (token) {
//             buyCourse(token, [courseId], user, navigate, dispatch);
//             return;
//         }
//         setConfirmationModal({
//             text1: "You are not Logged in",
//             text2: "please login to purchase the course",
//             btn1Text: "Login",
//             btn2Text: "Cancel",
//             btn1Handler: () => navigate("/login"),
//             btn2Handler: () => setConfirmationModal(null)
//         })
//     }

//     const [courseData, setCourseData] = useState(null);

//     useEffect(() => {
//         const getCourseFullDetails = async () => {
//             try {
//                 const res = await fetchCourseDetails(courseId);
//                 console.log("RE IS ", res);
//                 setCourseData(res);
//             }
//             catch (error) {
//                 console.log(error);
//                 console.log("could not fetch full course details")
//             }
//         }
//         getCourseFullDetails();
//     }, [courseId])

//     const [avgReviewCount, setAvgReviewCount] = useState(0);

//     useEffect(() => {
//         const count = GetAvgRating(courseData?.data?.courseDetails?.ratingAndReview);
//         setAvgReviewCount(count);
//     }, [courseData])

//     const [isActive, setIsActive] = useState(Array(0));
//     const handleActive = (id) => {
//         setIsActive(
//             !isActive.includes(id)
//                 ? isActive.concat(id)
//                 : isActive.filter((e) => e != id)
//         )
//     }

//     const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);

//     useEffect(() => {
//         let lectures = 0;
//         courseData?.data?.courseDetails?.courseContent?.forEach((sec) => {
//             lectures += sec.subSection.length || 0
//         })
//         setTotalNoOfLectures(lectures);
//     }, [courseData])

//     if (loading || !courseData) {
//         return (
//             <div>
//                 Loading....
//             </div>
//         )
//     }

//     if (!courseData.success) {
//         return (
//             <div>
//                 <Error></Error>
//             </div>
//         )
//     }


//     const {
//         _id: course_id,
//         courseName,
//         courseDescription,
//         thumbnail,
//         price,
//         whatYouWillLearn,
//         courseContent,
//         ratingAndReview,
//         instructor,
//         studentsEnrolled,
//         createdAt,
//     } = courseData.data?.courseDetails

//     return (
//         // <div className='flex items-center' onClick={handleBuyCourse}>
//         //     <button className='bg-yelloe-200 p-6 mt-10'>
//         //         Buy Now
//         //     </button>
//         // </div>

//         <div className='flex flex-col gap-x-9'>

//             <div className='relative flex flex-col justify-start p-7'>
//                 <p>{courseName}</p>
//                 <p>{courseDescription}</p>
//                 <div className='flex gap-x-3'>
//                     <span>{avgReviewCount}</span>
//                     <RatingStars Review_Count={avgReviewCount} Star_Size={24}></RatingStars>
//                     <span>{`(${ratingAndReview.length} Reviews)`}</span>
//                     <span>{`(${studentsEnrolled.length} students enrolled)`}</span>
//                 </div>

//                 <div>
//                     {/* <p>Created By {`${firstName}`}</p> */}
//                     Created By {`${instructor.firstName} ${instructor.lastName}`}

//                 </div>

//                 <div className='flex gap-x-3'>
//                     <p>
//                         Created At {formatDate(createdAt)}
//                     </p>
//                     <p>
//                         {"|"} English
//                     </p>
//                 </div>

//                 <div>
//                     <CourseDetailsCard
//                         course={courseData?.data?.courseDetails}
//                         setConfirmationModal={setConfirmationModal}
//                         handleBuyCourse={handleBuyCourse}
//                     />
//                 </div>
//             </div>

//             <div>
//                 <p>What you will learn</p>
//                 <div>
//                     {whatYouWillLearn}
//                 </div>
//             </div>


//             <div>
//                 <div>
//                     <p>Course Content: </p>
//                 </div>

//                 <div className='flex gap-x-3 justify-between'>
//                     <div>
//                         <span>
//                             {courseContent.length} section(s)
//                         </span>
//                         <span>
//                             {totalNoOfLectures} lectures
//                         </span>
//                         <span>
//                             {courseData?.data?.totalDuration} total length
//                         </span>
//                     </div>

//                     <div>
//                         <button
//                             onClick={() => setIsActive([])}
//                         >
//                             Collapse all Sections
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Course Details Accordion */}
//             <div className="py-4">
//                 {courseContent?.map((course, index) => (
//                     <CourseAccordionBar
//                         course={course}
//                         key={index}
//                         isActive={isActive}
//                         handleActive={handleActive}
//                     />
//                 ))}
//             </div>

//             {/* Author Details */}
//             <div className="mb-12 py-4">
//                 <p className="text-[28px] font-semibold">Author</p>
//                 <div className="flex items-center gap-4 py-4">
//                     <img
//                         src={
//                             instructor.image
//                                 ? instructor.image
//                                 : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
//                         }
//                         alt="Author"
//                         className="h-14 w-14 rounded-full object-cover"
//                     />
//                     <p className="text-lg">{`${instructor.firstName} ${instructor.lastName}`}</p>
//                 </div>
//                 <p className="text-richblack-50">
//                     {instructor?.additionalDetails?.about}
//                 </p>
//             </div>

//             {confirmationModal && <confirmationModal modalData={confirmationModal} />}
//         </div>
//     )
// }

// export default CourseDetails