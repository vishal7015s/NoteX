import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from "../slices/viewCourseSlice";
import VideoDetailsSlider from "../components/ViewCourse/VideoDetailsSlider";
import CourseReviewModal from "../components/ViewCourse/CourseReviewModal";
import { HiMenuAlt3 } from "react-icons/hi";
import { RxHamburgerMenu } from "react-icons/rx";


function ViewCourse() {
  const [reviewModal, setReviewModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const setCourseSpecificDetails = async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
      dispatch(setEntireCourseData(courseData.courseDetails));
      dispatch(setCompletedLectures(courseData.setCompletedVideos));
      let lectures = 0;
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length;
      });
      dispatch(setTotalNoOfLectures(lectures));
    };

    setCourseSpecificDetails();
  }, []);

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] bg-gray-100">
      {/* Hamburger Menu for Mobile */}
      <button
        className="md:hidden fixed top-4 left-50 z-[1000] flex items-center justify-center h-10 w-10 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 hover:scale-105 transition-all duration-300"
        onClick={() => setIsSidebarOpen(true)}
      >
        <RxHamburgerMenu size={24} />
      </button>

      {/* Video Sidebar */}
      <VideoDetailsSlider setReviewModal={setReviewModal} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        <div className="mx-auto max-w-[1800px] p-4 lg:p-6">
          <Outlet />
        </div>
      </div>

      {/* Review Modal */}
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </div>
  );
}

export default ViewCourse;




// the real code  
// import React, { useEffect } from 'react'
// import { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { Outlet, useParams } from 'react-router-dom';
// import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
// import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
// import VideoDetailsSlider from "../components/ViewCourse/VideoDetailsSlider"
// import CourseReviewModal from "../components/ViewCourse/CourseReviewModal"

// function ViewCourse() {
//     const [reviewModal, setReviewModal] = useState(false);
//     const {courseId} = useParams();
//     const {token} = useSelector( (state) => state.auth);
//     const dispatch = useDispatch();
    
//     useEffect( () => {
//         const setCourseSpecificDetails = async() => {
//             const courseData = await getFullDetailsOfCourse(courseId, token);
//             dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
//             dispatch(setEntireCourseData(courseData.courseDetails));
//             dispatch(setCompletedLectures(courseData.setCompletedVideos));
//             let lectures = 0;
//             courseData?.courseDetails?.courseContent?.forEach( (sec) => {
//                 lectures += sec.subSection.length
//             })
//             dispatch(setTotalNoOfLectures(lectures));
//         }

//         setCourseSpecificDetails(); 
//     },[]);

//   return (
//     <div className="flex min-h-[calc(100vh-3.5rem)] bg-richblack-900 text-richblack-5">
//       {/* Video Sidebar */}
//       <VideoDetailsSlider setReviewModal={setReviewModal} />
      
//       {/* Main Content Area */}
//       <div className="flex-1 overflow-auto">
//         <div className="mx-auto max-w-[1800px] p-4 lg:p-6">
//           <Outlet />
//         </div>
//       </div>

//       {/* Review Modal */}
//       {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
//     </div>
//   )
// }

// export default ViewCourse



// import React, { useEffect } from 'react'
// import { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { Outlet, useParams } from 'react-router-dom';
// import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
// import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
// import VideoDetailsSlider from "../components/ViewCourse/VideoDetailsSlider"
// import CourseReviewModal from "../components/ViewCourse/CourseReviewModal"

// function ViewCourse() {

//     const [reviewModal, setReviewModal] = useState(false);
//     const {courseId} = useParams();
//     const {token} = useSelector( (state) => state.auth);
//     const dispatch = useDispatch();
    
//     useEffect( () => {
//         const setCourseSpecificDetails = async() => {
//             const courseData = await getFullDetailsOfCourse(courseId, token);
//             dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
//             dispatch(setEntireCourseData(courseData.courseDetails));
//             dispatch(setCompletedLectures(courseData.setCompletedVideos));
//             let lectures = 0;
//             courseData?.courseDetails?.courseContent?.forEach( (sec) => {
//                 lectures += sec.subSection.length
//             })
//             dispatch(setTotalNoOfLectures(lectures));
//         }

//         setCourseSpecificDetails(); 
//     },[]);
//   return (
//     <>
//         <div className='flex flex-row'>
//             <VideoDetailsSlider setReviewModal={setReviewModal}/>

//             <div>
//                 <Outlet></Outlet>
//             </div>
//         </div>

//         {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}
//     </>
//   )
// }

// <<<<<<< HEAD
// export default ViewCourse
// =======
// export default ViewCourse



// import React, { useEffect } from 'react'
// import { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { Outlet, useParams } from 'react-router-dom';
// import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
// import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
// import VideoDetailsSlider from "../components/ViewCourse/VideoDetailsSlider"
// import CourseReviewModal from "../components/ViewCourse/CourseReviewModal"

// function ViewCourse() {
//     const [reviewModal, setReviewModal] = useState(false);
//     const {courseId} = useParams();
//     const {token} = useSelector( (state) => state.auth);
//     const dispatch = useDispatch();
    
//     useEffect( () => {
//         const setCourseSpecificDetails = async() => {
//             const courseData = await getFullDetailsOfCourse(courseId, token);
//             dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
//             dispatch(setEntireCourseData(courseData.courseDetails));
//             dispatch(setCompletedLectures(courseData.setCompletedVideos));
//             let lectures = 0;
//             courseData?.courseDetails?.courseContent?.forEach( (sec) => {
//                 lectures += sec.subSection.length
//             })
//             dispatch(setTotalNoOfLectures(lectures));
//         }

//         setCourseSpecificDetails(); 
//     },[]);

//   return (
//     <div className="flex min-h-[calc(100vh-3.5rem)] bg-richblack-900 text-richblack-5">
//       {/* Video Sidebar */}
//       <VideoDetailsSlider setReviewModal={setReviewModal} />
      
//       {/* Main Content Area */}
//       <div className="flex-1 overflow-auto">
//         <div className="mx-auto max-w-[1800px] p-4 lg:p-6">
//           <Outlet />
//         </div>
//       </div>

//       {/* Review Modal */}
//       {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
//     </div>
//   )
// }

// export default ViewCourse
// >>>>>>> 66adbf1aa9ed547cd64a1eeda5b04e08a39611a2
