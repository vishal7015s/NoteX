// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import {getUserEnrolledCourses} from "../services/operations/profileAPI"
// // import ProgressBar from "@ramonak/react-progress-bar";


// function EnrolledCourses() {

//     const {token} = useSelector( (state) => state.auth)
//     const [enrolledCourses, setEnrolledCourses] = useState(null);

//     const getEnrolledCourses = async() => {
        
//         try{
//             const response = await getUserEnrolledCourses(token);
//             setEnrolledCourses(response);
//         }
//         catch(error){
//             console.log("unable to fetch enrolled courses data");
//             console.log(error.message);
//         }
//     }

//     useEffect( () => {
//         getEnrolledCourses();
//     },[]);

//   return (
//     <div>
//         <div>Enrolled Courses</div>
//         {
//             !enrolledCourses ? (<div>Loading...</div>) : 
//             !enrolledCourses.length ? (<p>You have not enrolled in any course yet</p>) :
//             (
//                 <div>
//                     <div>
//                         <p>Course Name</p>
//                         <p>Durations</p>
//                         <p>Progress</p>
//                     </div>

//                     {/* card shuru hai yaha se  */}
//                     {
//                         enrolledCourses.map( (course, i) => {
//                             return (
//                             <div>
//                                 <div>
//                                     <img src={course.thumbnail} alt='course thumbnail'></img>
//                                     <div> 
//                                         <p>{course.courseName}</p>
//                                         <p>{course.courseDescription}</p>
//                                     </div>
//                                 </div>
//                                 <div>
//                                     {course?.totalDuration}
//                                 </div>

//                                 <div>
//                                     <p>progress: {course.progressPercentage || 0}</p>
//                                     {/* <ProgressBar
//                                         completed={course.progressPercentage || 0}
//                                         height='8px'
//                                         isLabelVisible={false}
//                                     /> */}
//                                 </div>
//                             </div>
//                         )
//                         })
//                     }
//                 </div>
//             )
//         }
//     </div>
//   )
// }

// export default EnrolledCourses



//deepseek 1
// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { getUserEnrolledCourses } from "../services/operations/profileAPI"

// function EnrolledCourses() {
//     const { token } = useSelector((state) => state.auth)
//     const [enrolledCourses, setEnrolledCourses] = useState(null)

//     const getEnrolledCourses = async () => {
//         try {
//             const response = await getUserEnrolledCourses(token)
//             setEnrolledCourses(response)
//         } catch (error) {
//             console.log("Unable to fetch enrolled courses data")
//             console.log(error.message)
//         }
//     }

//     useEffect(() => {
//         getEnrolledCourses()
//     }, [])

//     return (
//         <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//             <div className="max-w-7xl mx-auto">
//                 <h1 className="text-3xl font-bold text-gray-800 mb-6">Enrolled Courses</h1>
                
//                 {!enrolledCourses ? (
//                     <div className="flex justify-center items-center h-64">
//                         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//                     </div>
//                 ) : !enrolledCourses.length ? (
//                     <div className="bg-white rounded-lg shadow p-6 text-center">
//                         <p className="text-gray-600 text-lg">You have not enrolled in any course yet</p>
//                         <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//                             Browse Courses
//                         </button>
//                     </div>
//                 ) : (
//                     <div className="bg-white rounded-lg shadow overflow-hidden">
//                         {/* Table Header */}
//                         <div className="hidden md:grid grid-cols-12 bg-gray-100 p-4 border-b border-gray-200">
//                             <div className="col-span-6 font-medium text-gray-700">Course Name</div>
//                             <div className="col-span-2 font-medium text-gray-700">Duration</div>
//                             <div className="col-span-4 font-medium text-gray-700">Progress</div>
//                         </div>

//                         {/* Course Cards */}
//                         {enrolledCourses.map((course, i) => (
//                             <div key={i} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors">
//                                 <div className="grid grid-cols-1 md:grid-cols-12 p-4 gap-4">
//                                     {/* Course Thumbnail and Info */}
//                                     <div className="md:col-span-6 flex flex-col md:flex-row gap-4">
//                                         <img 
//                                             src={course.thumbnail} 
//                                             alt="Course thumbnail" 
//                                             className="w-full md:w-40 h-32 object-cover rounded-lg"
//                                         />
//                                         <div>
//                                             <h3 className="font-semibold text-gray-800 text-lg">{course.courseName}</h3>
//                                             <p className="text-gray-600 text-sm mt-1 line-clamp-2">
//                                                 {course.courseDescription}
//                                             </p>
//                                         </div>
//                                     </div>

//                                     {/* Duration */}
//                                     <div className="md:col-span-2 flex items-center">
//                                         <div className="text-gray-700">
//                                             <span className="md:hidden font-medium mr-2">Duration:</span>
//                                             {course?.totalDuration || "N/A"}
//                                         </div>
//                                     </div>

//                                     {/* Progress */}
//                                     <div className="md:col-span-4 flex items-center">
//                                         <div className="w-full">
//                                             <div className="flex justify-between text-sm mb-1">
//                                                 <span className="text-gray-700">
//                                                     <span className="md:hidden font-medium mr-2">Progress:</span>
//                                                     {course.progressPercentage || 0}%
//                                                 </span>
//                                                 <span className="text-gray-500">
//                                                     {course.completedVideos?.length || 0}/{course.totalVideos || 0} videos
//                                                 </span>
//                                             </div>
//                                             <div className="w-full bg-gray-200 rounded-full h-2.5">
//                                                 <div 
//                                                     className="bg-blue-600 h-2.5 rounded-full" 
//                                                     style={{ width: `${course.progressPercentage || 0}%` }}
//                                                 ></div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default EnrolledCourses



// deepseek 2
// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { getUserEnrolledCourses } from "../services/operations/profileAPI"

// function EnrolledCourses() {
//     const { token } = useSelector((state) => state.auth)
//     const [enrolledCourses, setEnrolledCourses] = useState(null)

//     const getEnrolledCourses = async () => {
//         try {
//             const response = await getUserEnrolledCourses(token)
//             setEnrolledCourses(response)
//         } catch (error) {
//             console.log("Unable to fetch enrolled courses data")
//             console.log(error.message)
//         }
//     }

//     useEffect(() => {
//         getEnrolledCourses()
//     }, [])

//     return (
//         <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//             <div className="max-w-7xl mx-auto">
//                 <h1 className="text-3xl font-bold text-gray-800 mb-6">Enrolled Courses</h1>
                
//                 {!enrolledCourses ? (
//                     <div className="flex justify-center items-center h-64">
//                         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//                     </div>
//                 ) : !enrolledCourses.length ? (
//                     <div className="bg-white rounded-xl shadow-md p-6 text-center">
//                         <p className="text-gray-600 text-lg">You have not enrolled in any course yet</p>
//                         <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//                             Browse Courses
//                         </button>
//                     </div>
//                 ) : (
//                     <div className="space-y-4">
//                         {/* Desktop Table Header (hidden on mobile) */}
//                         <div className="hidden md:grid grid-cols-12 bg-gray-100 p-4 rounded-t-lg">
//                             <div className="col-span-6 font-medium text-gray-700">Course Name</div>
//                             <div className="col-span-2 font-medium text-gray-700">Duration</div>
//                             <div className="col-span-4 font-medium text-gray-700">Progress</div>
//                         </div>

//                         {/* Course Cards */}
//                         {enrolledCourses.map((course, i) => (
//                             <div 
//                                 key={i} 
//                                 className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
//                             >
//                                 <div className="p-0 md:p-4">
//                                     {/* Mobile & Desktop Combined Card */}
//                                     <div className="flex flex-col md:grid md:grid-cols-12 gap-4">
//                                         {/* Course Thumbnail - Consistent size for all images */}
//                                         <div className="md:col-span-2 w-full">
//                                             <img 
//                                                 src={course.thumbnail} 
//                                                 alt="Course thumbnail" 
//                                                 className="w-full h-48 md:h-32 object-cover"
//                                             />
//                                         </div>

//                                         {/* Course Info */}
//                                         <div className="md:col-span-4 p-4 md:p-0">
//                                             <h3 className="font-bold text-xl text-gray-800 mb-1">{course.courseName}</h3>
//                                             <p className="text-gray-600 text-sm line-clamp-2">
//                                                 {course.courseDescription}
//                                             </p>
//                                         </div>

//                                         {/* Duration - Hidden on mobile or shown differently */}
//                                         <div className="md:col-span-2 px-4 pb-4 md:flex md:items-center">
//                                             <div className="flex items-center">
//                                                 <span className="md:hidden font-semibold mr-2 text-gray-700">Duration:</span>
//                                                 <span className="text-gray-700">{course?.totalDuration || "N/A"}</span>
//                                             </div>
//                                         </div>

//                                         {/* Progress Bar */}
//                                         <div className="md:col-span-4 px-4 pb-4 md:flex md:items-center">
//                                             <div className="w-full">
//                                                 <div className="flex justify-between text-sm mb-1">
//                                                     <span className="font-semibold text-gray-700">
//                                                         <span className="md:hidden">Progress: </span>
//                                                         {course.progressPercentage || 0}%
//                                                     </span>
//                                                     <span className="text-gray-500">
//                                                         {course.completedVideos?.length || 0}/{course.totalVideos || 0} videos
//                                                     </span>
//                                                 </div>
//                                                 <div className="w-full bg-gray-200 rounded-full h-3">
//                                                     <div 
//                                                         className="bg-blue-600 h-3 rounded-full" 
//                                                         style={{ width: `${course.progressPercentage || 0}%` }}
//                                                     ></div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default EnrolledCourses

// deepsek 3
// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { getUserEnrolledCourses } from "../services/operations/profileAPI"

// function EnrolledCourses() {
//     const { token } = useSelector((state) => state.auth)
//     const [enrolledCourses, setEnrolledCourses] = useState(null)

//     const getEnrolledCourses = async () => {
//         try {
//             const response = await getUserEnrolledCourses(token)
//             setEnrolledCourses(response)
//         } catch (error) {
//             console.log("Unable to fetch enrolled courses data")
//             console.log(error.message)
//         }
//     }

//     useEffect(() => {
//         getEnrolledCourses()
//     }, [])

//     return (
//         <div className="min-h-screen bg-gray-50 p-0 md:p-8">
//             <div className="max-w-7xl mx-auto">
//                 <h1 className="text-3xl font-bold text-gray-800 mb-6 px-4 md:px-0">Enrolled Courses</h1>
                
//                 {!enrolledCourses ? (
//                     <div className="flex justify-center items-center h-64">
//                         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//                     </div>
//                 ) : !enrolledCourses.length ? (
//                     <div className="bg-white rounded-xl shadow-md p-6 text-center mx-4 md:mx-0">
//                         <p className="text-gray-600 text-lg">You have not enrolled in any course yet</p>
//                         <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//                             Browse Courses
//                         </button>
//                     </div>
//                 ) : (
//                     <div className="space-y-4 md:space-y-0">
//                         {/* Desktop Table Header (hidden on mobile) */}
//                         <div className="hidden md:grid grid-cols-12 bg-gray-100 p-4 rounded-t-lg">
//                             <div className="col-span-6 font-medium text-gray-700">Course Name</div>
//                             <div className="col-span-2 font-medium text-gray-700">Duration</div>
//                             <div className="col-span-4 font-medium text-gray-700">Progress</div>
//                         </div>

//                         {/* Course Cards */}
//                         {enrolledCourses.map((course, i) => (
//                             <div 
//                                 key={i} 
//                                 className="bg-white rounded-none md:rounded-xl shadow-sm md:shadow-md overflow-hidden hover:shadow-lg transition-shadow"
//                             >
//                                 {/* Full-width image for mobile */}
//                                 <div className="md:hidden w-screen -mx-4">
//                                     <img 
//                                         src={course.thumbnail} 
//                                         alt="Course thumbnail" 
//                                         className="w-full h-48 object-cover border border-gray-100"
//                                     />
//                                 </div>

//                                 <div className="p-4 md:p-4">
//                                     <div className="flex flex-col md:grid md:grid-cols-12 gap-4">
//                                         {/* Thumbnail for desktop (hidden on mobile) */}
//                                         <div className="hidden md:block md:col-span-2">
//                                             <img 
//                                                 src={course.thumbnail} 
//                                                 alt="Course thumbnail" 
//                                                 className="w-full h-32 object-cover rounded-lg border border-gray-200"
//                                             />
//                                         </div>

//                                         {/* Course Info */}
//                                         <div className="md:col-span-4">
//                                             <h3 className="font-bold text-xl text-gray-800 mb-1">{course.courseName}</h3>
//                                             <p className="text-gray-600 text-sm line-clamp-2">
//                                                 {course.courseDescription}
//                                             </p>
//                                         </div>

//                                         {/* Duration */}
//                                         <div className="md:col-span-2 flex items-center">
//                                             <div className="flex items-center">
//                                                 <span className="md:hidden font-semibold mr-2 text-gray-700">Duration:</span>
//                                                 <span className="text-gray-700">{course?.totalDuration || "N/A"}</span>
//                                             </div>
//                                         </div>

//                                         {/* Progress Bar */}
//                                         <div className="md:col-span-4">
//                                             <div className="w-full">
//                                                 <div className="flex justify-between text-sm mb-1">
//                                                     <span className="font-semibold text-gray-700">
//                                                         <span className="md:hidden">Progress: </span>
//                                                         {course.progressPercentage || 0}%
//                                                     </span>
//                                                     <span className="text-gray-500">
//                                                         {course.completedVideos?.length || 0}/{course.totalVideos || 0} videos
//                                                     </span>
//                                                 </div>
//                                                 <div className="w-full bg-gray-200 rounded-full h-3">
//                                                     <div 
//                                                         className="bg-blue-600 h-3 rounded-full" 
//                                                         style={{ width: `${course.progressPercentage || 0}%` }}
//                                                     ></div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default EnrolledCourses

import { useEffect, useState } from "react"
// import ProgressBar from "@ramonak/react-progress-bar"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getUserEnrolledCourses } from "../services/operations/profileAPI"

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await getUserEnrolledCourses(token) // Getting all the published and the drafted courses

        // Filtering the published course out
        const filterPublishCourse = res.filter((ele) => ele.status !== "Draft")
        // console.log(
        //   "Viewing all the couse that is Published",
        //   filterPublishCourse
        // )

        setEnrolledCourses(filterPublishCourse)
      } catch (error) {
        console.log("Could not fetch enrolled courses.")
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="text-3xl text-richblack-50">Enrolled Courses</div>
      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
          You have not enrolled in any course yet.
          {/* TODO: Modify this Empty State */}
        </p>
      ) : (
        <div className="my-8 text-richblack-5">
          {/* Headings */}
          <div className="flex rounded-t-lg bg-richblack-500 ">
            <p className="w-[45%] px-5 py-3">Course Name</p>
            <p className="w-1/4 px-2 py-3">Duration</p>
            <p className="flex-1 px-2 py-3">Progress</p>
          </div>
          {/* Course Names */}
          {enrolledCourses.map((course, i, arr) => (
            <div
              className={`flex items-center border border-richblack-700 ${
                i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              }`}
              key={i}
            >
              <div
                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  )
                }}
              >
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold">{course.courseName}</p>
                  <p className="text-xs text-richblack-300">
                    {course.courseDescription.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>
                </div>
              </div>
              <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div>
              <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                <p>Progress: {course.progressPercentage || 0}%</p>
                {/* <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                /> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}