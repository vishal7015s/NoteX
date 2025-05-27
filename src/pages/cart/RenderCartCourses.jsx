import { FaStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import ReactStars from "react-stars";
import { useDispatch, useSelector } from "react-redux";

import { removeFromCart } from "../../slices/cartSlice";

export default function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-1 flex-col space-y-4 sm:space-y-6">
      {cart.map((course) => (
        <div
          key={course._id}
          className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between bg-white border-2 border-gray-300 rounded-xl shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-300 p-3 sm:p-4"
        >
          <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-4">
            <div className="relative rounded-lg overflow-hidden aspect-[16/9] h-40 sm:h-32 w-full sm:w-48">
              <img
                src={course?.thumbnail}
                alt={course?.courseName}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <div className="flex flex-col space-y-1 sm:space-y-2 flex-1">
              <p className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-2">
                {course?.courseName}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                {course?.category?.name}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-blue-600 font-medium">{course?.ratingAndReviews?.length ? 4.5 : 0}</span>
                <ReactStars
                  count={5}
                  value={course?.ratingAndReviews?.length ? 4.5 : 0}
                  size={16}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                />
                <span className="text-xs sm:text-sm text-gray-500">
                  ({course?.ratingAndReviews?.length} Ratings)
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between w-full sm:w-auto mt-3 sm:mt-0 sm:ml-4 gap-3 sm:gap-4">
            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="flex items-center gap-x-1 sm:gap-x-2 rounded-md bg-blue-100 text-blue-600 font-medium py-1 sm:py-2 px-2 sm:px-3 hover:bg-red-100 hover:text-red-600 transition-all duration-300 text-xs sm:text-sm"
            >
              <RiDeleteBin6Line />
              <span>Remove</span>
            </button>
            <p className="text-base sm:text-lg font-semibold text-blue-600">
              ₹{course?.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// import { FaStar } from "react-icons/fa"
// import { RiDeleteBin6Line } from "react-icons/ri"
// import ReactStars from "react-stars"
// import { useDispatch, useSelector } from "react-redux"

// import { removeFromCart } from "../../slices/cartSlice"

// export default function RenderCartCourses() {
//   const { cart } = useSelector((state) => state.cart)
//   const dispatch = useDispatch()
//   return (
//     <div className="flex flex-1 flex-col space-y-4">
//       {cart.map((course, indx) => (
//         <div
//           key={course._id}
//           className="flex flex-col w-full items-start justify-between bg-white border border-gray-200 rounded-lg shadow-md p-4 hover:bg-gray-50 active:bg-gray-100 transition-all duration-300 mb-4"
//         >
//           <div className="flex flex-col w-full gap-4">
//             <img
//               src={course?.thumbnail}
//               alt={course?.courseName}
//               className=" w-full rounded-md object-cover hover:scale-105 transition-transform duration-300"
//             />
//             <div className="flex flex-col space-y-2 w-full">
//               <p className="text-base font-semibold text-gray-800">
//                 {course?.courseName}
//               </p>
//               <p className="text-sm text-gray-500">
//                 {course?.category?.name}
//               </p>
//               <div className="flex items-center gap-2">
//                 <span className="text-black-500 font-medium">4.5</span>
//                 <ReactStars
//                   count={5}
//                   value={course?.ratingAndReviews?.length}
//                   size={18}
//                   edit={false}
//                   activeColor="#ffd700"
//                   emptyIcon={<FaStar />}
//                   fullIcon={<FaStar />}
//                 />
//                 <span className="text-sm text-gray-500">
//                   {course?.ratingAndReviews?.length} Ratings
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-row items-center justify-between w-full mt-4 ">
//             <button
//               onClick={() => dispatch(removeFromCart(course._id))}
//               className="flex items-center gap-x-2 rounded-md bg-gray-500 py-2 px-3 text-white hover:bg-red-600 transition-all duration-300 text-sm"
//             >
//               <RiDeleteBin6Line />
//               <span>Remove</span>
//             </button>
//             <p className="text-lg font-medium text-black-500">
//               ₹ {course?.price}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }


// import { FaStar } from "react-icons/fa"
// import { RiDeleteBin6Line } from "react-icons/ri"
// // import ReactStars from "react-rating-stars-component"
// import ReactStars from "react-stars"
// import { useDispatch, useSelector } from "react-redux"

// import { removeFromCart } from "../../slices/cartSlice"

// export default function RenderCartCourses() {
//   const { cart } = useSelector((state) => state.cart)
//   const dispatch = useDispatch()
//   return (
//     <div className="flex flex-1 flex-col">
//       {cart.map((course, indx) => (
//         <div
//           key={course._id}
//           className={`flex w-full flex-wrap items-start justify-between gap-6 ${
//             indx !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"
//           } ${indx !== 0 && "mt-6"} `}
//         >
//           <div className="flex flex-1 flex-col gap-4 xl:flex-row">
//             <img
//               src={course?.thumbnail}
//               alt={course?.courseName}
//               className="h-[148px] w-[220px] rounded-lg object-cover"
//             />
//             <div className="flex flex-col space-y-1">
//               <p className="text-lg font-medium text-richblack-5">
//                 {course?.courseName}
//               </p>
//               <p className="text-sm text-richblack-300">
//                 {course?.category?.name}
//               </p>
//               <div className="flex items-center gap-2">
//                 <span className="text-yellow-5">4.5</span>
//                 <ReactStars
//                   count={5}
//                   value={course?.ratingAndReviews?.length}
//                   size={20}
//                   edit={false}
//                   activeColor="#ffd700"
//                   emptyIcon={<FaStar />}
//                   fullIcon={<FaStar />}
//                 />
//                 <span className="text-richblack-400">
//                   {course?.ratingAndReviews?.length} Ratings
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col items-end space-y-2">
//             <button
//               onClick={() => dispatch(removeFromCart(course._id))}
//               className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
//             >
//               <RiDeleteBin6Line />
//               <span>Remove</span>
//             </button>
//             <p className="mb-6 text-3xl font-medium text-yellow-100">
//               ₹ {course?.price}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }