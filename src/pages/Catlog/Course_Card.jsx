import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RatingStars from "../../components/common/RatingStars";
import GetAvgRating from "../../utils/avgRating";

function Course_Card({ course, Height }) {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReview);
    setAvgReviewCount(count);
  }, [course]);

  return (
    <Link to={`/courses/${course._id}`}>
      <div className="bg-white  rounded-xl border-2 border-gray-300 shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-300 ease-in-out transform hover:scale-105">
        <div className="relative rounded-t-xl overflow-hidden">
          <img
            src={course?.thumbnail}
            alt="Course thumbnail"
            className={`${Height} w-full object-cover`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <p className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
            {course?.courseName}
          </p>
          <p className="text-sm text-gray-600">
            {course?.firstName || "Instructor Name"}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-blue-600 font-medium">{avgReviewCount || 0}</span>
            <RatingStars Review_Count={avgReviewCount} />
            <span className="text-sm text-gray-500">
              ({course?.ratingAndReview?.length} Ratings)
            </span>
          </div>
          <p className="text-lg font-bold text-blue-600">₹{course?.price}</p>
        </div>
      </div>
    </Link>
  );
}

export default Course_Card;


// import React, { useEffect, useState } from "react"
// // Icons
// import { FaRegStar, FaStar } from "react-icons/fa"
// // import ReactStars from "react-rating-stars-component"
// import { Link } from "react-router-dom"

// import GetAvgRating from "../../utils/avgRating"
// import RatingStars from "../../components/common/RatingStars"

// function Course_Card({ course, Height }) {
//   // const avgReviewCount = GetAvgRating(course.ratingAndReviews)
//   // console.log(course.ratingAndReviews)
//   const [avgReviewCount, setAvgReviewCount] = useState(0)
//   useEffect(() => {
//     const count = GetAvgRating(course.ratingAndReview)
//     setAvgReviewCount(count)
//   }, [course])
//   // console.log("count............", avgReviewCount)


//   return (
//     <>
//       <Link to={`/courses/${course._id}`}>
//         <div className="">
//           <div className="rounded-lg">
//             <img
//               src={course?.thumbnail}
//               alt="course thumnail"
//               className={`${Height} w-full rounded-xl object-cover `}
//             />
//           </div>
//           <div className="flex flex-col gap-2 px-1 py-3">
//             <p className="text-xl text-richblack-5">{course?.courseName}</p>
//             <p className="text-sm text-richblack-50">
//               {course?.firstName}
//             </p>
//             <div className="flex items-center gap-2">
//               <span className="text-yellow-5">{avgReviewCount || 0}</span>
            
//               <RatingStars Review_Count={avgReviewCount} />
//               <span className="text-richblack-400">
//                 {course?.ratingAndReview?.length} Ratings
//               </span>
//             </div>
//             <p className="text-xl text-richblack-5">Rs. {course?.price}</p>
//           </div>
//         </div>
//       </Link>
//     </>
//   )
// }

// export default Course_Card



// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import RatingStars from "../../components/common/RatingStars"
// import GetAvgRating from "../../utils/avgRating"
// function Course_Card({course, Height}) {


//     const [avgReviewCount, setAvgReviewCount] = useState(0);

//     useEffect( () => {
//         const count = GetAvgRating(course.ratingAndReview)
//         setAvgReviewCount(count);
//     },[])

//   return (
//     <div>
//         <Link to={`/courses/${course._id}`}>
//             <div>
//                 <div>
//                     <img src={course.thumbnail} alt='course thumbnail' className={`${Height} w-full rounded-xl object-cover`}></img>
//                 </div>
//                 <div>
//                     <p>{course.courseName}</p>
//                     <p>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
//                     <div className='flex gap-x-5'>
//                         <span>{avgReviewCount || 0}</span>
//                         <RatingStars Review_Count={avgReviewCount}/>
//                         <span>{course.ratingAndReview.length} Ratings</span>
//                     </div>
//                     <p>{course.price}</p>
//                 </div>
//             </div>
//         </Link>
//     </div>
//   )
// }

// export default Course_Card