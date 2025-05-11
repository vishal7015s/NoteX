import { useEffect, useState } from "react"
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
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 animate-fade-in">
          Enrolled Courses
        </h1>
        {!enrolledCourses ? (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
          </div>
        ) : !enrolledCourses.length ? (
          <p className="grid min-h-[10vh] place-items-center text-gray-600 text-base sm:text-lg font-medium animate-fade-in">
            You have not enrolled in any course yet.
          </p>
        ) : (
          <div className="my-6 sm:my-8 animate-fade-in space-y-4">
            {/* Headings */}
            <div className="flex rounded-t-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md sticky top-0 z-10">
              <p className="w-[60%] sm:w-[45%] px-3 sm:px-5 py-2 sm:py-3 font-semibold text-sm sm:text-base">Course Name</p>
              <p className="hidden sm:block w-1/4 px-2 sm:px-3 py-2 sm:py-3 font-semibold text-sm sm:text-base">Duration</p>
              <p className="hidden sm:block flex-1 px-2 sm:px-3 py-2 sm:py-3 font-semibold text-sm sm:text-base">Progress</p>
            </div>
            {/* Course Rows */}
            {enrolledCourses.map((course, i, arr) => (
              <div
                className={`flex flex-col sm:flex-row items-start sm:items-center bg-white border border-gray-200 rounded-lg mb-4 shadow-sm hover:bg-gray-50 transition-all duration-300 min-h-[80px] sm:min-h-[100px]`}
                key={i}
              >
                <div
                  className="flex w-full sm:w-[45%] cursor-pointer items-center gap-4 sm:gap-6 px-3 sm:px-5 py-3 sm:py-4"
                  onClick={() => {
                    navigate(
                      `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                    )
                  }}
                >
                  <img
                    src={course.thumbnail}
                    alt="course_img"
                    className="h-12 w-12 sm:h-16 sm:w-16 rounded-lg object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="flex flex-col gap-1 sm:gap-2 max-w-xs">
                    <p className="font-semibold text-gray-800 text-sm sm:text-base">{course.courseName}</p>
                    <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                      {course.courseDescription.length > 50
                        ? `${course.courseDescription.slice(0, 50)}...`
                        : course.courseDescription}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:block w-1/4 px-2 sm:px-3 py-3 sm:py-4 text-gray-700 text-sm sm:text-base">
                  {course?.totalDuration}
                </div>
                <div className="hidden sm:block flex w-full sm:w-1/5 flex-col gap-2 px-3 sm:px-2 py-3 sm:py-4">
                  <p className="text-sm text-gray-700">Progress: {course.progressPercentage || 0}%</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 rounded-full h-2 transition-all duration-300"
                      style={{ width: `${course.progressPercentage || 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


// import { useEffect, useState } from "react"
// // import ProgressBar from "@ramonak/react-progress-bar"
// import { BiDotsVerticalRounded } from "react-icons/bi"
// import { useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"

// import { getUserEnrolledCourses } from "../services/operations/profileAPI"

// export default function EnrolledCourses() {
//   const { token } = useSelector((state) => state.auth)
//   const navigate = useNavigate()

//   const [enrolledCourses, setEnrolledCourses] = useState(null)

//   useEffect(() => {
//     ;(async () => {
//       try {
//         const res = await getUserEnrolledCourses(token) // Getting all the published and the drafted courses

//         // Filtering the published course out
//         const filterPublishCourse = res.filter((ele) => ele.status !== "Draft")
//         // console.log(
//         //   "Viewing all the couse that is Published",
//         //   filterPublishCourse
//         // )

//         setEnrolledCourses(filterPublishCourse)
//       } catch (error) {
//         console.log("Could not fetch enrolled courses.")
//       }
//     })()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   return (
//     <>
//       <div className="text-3xl text-richblack-50">Enrolled Courses</div>
//       {!enrolledCourses ? (
//         <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
//           <div className="spinner"></div>
//         </div>
//       ) : !enrolledCourses.length ? (
//         <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
//           You have not enrolled in any course yet.
//           {/* TODO: Modify this Empty State */}
//         </p>
//       ) : (
//         <div className="my-8 text-richblack-5">
//           {/* Headings */}
//           <div className="flex rounded-t-lg bg-richblack-500 ">
//             <p className="w-[45%] px-5 py-3">Course Name</p>
//             <p className="w-1/4 px-2 py-3">Duration</p>
//             <p className="flex-1 px-2 py-3">Progress</p>
//           </div>
//           {/* Course Names */}
//           {enrolledCourses.map((course, i, arr) => (
//             <div
//               className={`flex items-center border border-richblack-700 ${
//                 i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
//               }`}
//               key={i}
//             >
//               <div
//                 className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
//                 onClick={() => {
//                   navigate(
//                     `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
//                   )
//                 }}
//               >
//                 <img
//                   src={course.thumbnail}
//                   alt="course_img"
//                   className="h-14 w-14 rounded-lg object-cover"
//                 />
//                 <div className="flex max-w-xs flex-col gap-2">
//                   <p className="font-semibold">{course.courseName}</p>
//                   <p className="text-xs text-richblack-300">
//                     {course.courseDescription.length > 50
//                       ? `${course.courseDescription.slice(0, 50)}...`
//                       : course.courseDescription}
//                   </p>
//                 </div>
//               </div>
//               <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div>
//               <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
//                 <p>Progress: {course.progressPercentage || 0}%</p>
//                 {/* <ProgressBar
//                   completed={course.progressPercentage || 0}
//                   height="8px"
//                   isLabelVisible={false}
//                 /> */}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </>
//   )
// }