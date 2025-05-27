import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import { ACCOUNT_TYPE } from "../utils/constants";
import { addToCart } from "../slices/cartSlice";

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        thumbnail: thumbnailImage,
        price: currentPrice,
    } = course;

    const handleAddToCart = () => {
        if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an instructor, you can't buy a course");
            return;
        }
        if (token) {
            dispatch(addToCart(course));
            return;
        }

        setConfirmationModal({
            text1: "You are not logged in",
            text2: "Please login to add to cart",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        });
    };

    const handleShare = () => {
        copy(window.location.href);
        toast.success("Link copied to clipboard");
    };

    return (
        <div className="bg-white rounded-xl border-2 border-gray-300 shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-300 ease-in-out sticky top-6 p-4 sm:p-6">
            <div className="relative rounded-lg overflow-hidden aspect-[16/9] mb-4">
                <img
                    src={thumbnailImage}
                    alt="Course Thumbnail"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <div className="mb-4">
                <p className="text-xl sm:text-2xl font-bold text-blue-600">₹{currentPrice}</p>
            </div>
            <div className="flex flex-col gap-3 mb-6">
                <button
                    onClick={
                        user && course?.studentsEnrolled.includes(user?._id)
                            ? () => navigate("/dashboard/enrolled-courses")
                            : handleBuyCourse
                    }
                    className="bg-blue-600 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-md hover:bg-blue-700 hover:scale-105 transition-all duration-300 ease-in-out"
                >
                    {user && course?.studentsEnrolled.includes(user?._id) ? "Go to Course" : "Buy Now"}
                </button>
                {!course?.studentsEnrolled.includes(user?._id) && (
                    <button
                        onClick={handleAddToCart}
                        className="bg-blue-100 text-blue-600 font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-md hover:bg-blue-200 hover:scale-105 transition-all duration-300 ease-in-out"
                    >
                        Add to Cart
                    </button>
                )}
            </div>
            <div className="text-gray-600 mb-4 text-sm sm:text-base">
                <p className="font-semibold">7-Day Money-Back Guarantee</p>
                <p className="mt-2">This course includes:</p>
                <ul className="list-disc list-inside">
                    <li>Easy-to-follow, well-structured content</li>
                    <li>Access on mobile and desktop</li>
                    <li>Lifetime access to course materials</li>
                </ul>
            </div>
            <div>
                <button
                    onClick={handleShare}
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                >
                    Share this Course
                </button>
            </div>
        </div>
    );
}

export default CourseDetailsCard;

// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import copy from 'copy-to-clipboard';
// import toast from 'react-hot-toast';
// import { ACCOUNT_TYPE } from "../utils/constants"
// import { addToCart } from "../slices/cartSlice"

// function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
//     const { user } = useSelector((state) => state.profile);
//     const { token } = useSelector((state) => state.auth);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const {
//         thumbnail: thumbnailImage,
//         price: currentPrice,
//     } = course;

//     const handleAddToCart = () => {
//         if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
//             toast.error("You are an instructor, you can't buy a course");
//             return;
//         }
//         if (token) {
//             dispatch(addToCart(course));
//             return;
//         }

//         setConfirmationModal({
//             text1: "You are not logged in",
//             text2: "Please login to add to cart",
//             btn1Text: "Login",
//             btn2Text: "Cancel",
//             btn1Handler: () => navigate("/login"),
//             btn2Handler: () => setConfirmationModal(null),
//         })
//     }

//     const handleShare = () => {
//         copy(window.location.href);
//         toast.success("Link copied to clipboard")
//     }

//     return (
//         <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
//             <img
//                 src={thumbnailImage}
//                 alt="Course Thumbnail"
//                 className="w-full h-48 object-cover rounded-md mb-4"
//             />
//             <div className="mb-4">
//                 <p className="text-2xl font-bold text-gray-900">₹{currentPrice}</p>
//             </div>
//             <div className="flex flex-col gap-3 mb-6">
//                 <button
//                     onClick={
//                         user && course?.studentsEnrolled.includes(user?._id)
//                             ? () => navigate("/dashboard/enrolled-courses")
//                             : handleBuyCourse
//                     }
//                     className="bg-yellow-400 text-gray-900 font-semibold py-3 px-6 rounded-md hover:bg-yellow-500 transition-colors"
//                 >
//                     {user && course?.studentsEnrolled.includes(user?._id) ? "Go to Course" : "Buy Now"}
//                 </button>
//                 {!course?.studentsEnrolled.includes(user?._id) && (
//                     <button
//                         onClick={handleAddToCart}
//                         className="bg-gray-800 text-white font-semibold py-3 px-6 rounded-md hover:bg-gray-900 transition-colors"
//                     >
//                         Add to Cart
//                     </button>
//                 )}
//             </div>
//             <div className="text-gray-600 mb-4">
//                 <p className="text-sm font-semibold">7-Day Money-Back Guarantee</p>
//                 <p className="text-sm mt-2">This course includes:</p>
//                 <ul className="list-disc list-inside text-sm">
//                     <li>Easy-to-follow, well-structured content</li>
//                     <li>Access on mobile and desktop</li>
//                     <li>Lifetime access to course materials</li>
//                 </ul>
//             </div>
//             <div>
//                 <button
//                     onClick={handleShare}
//                     className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
//                 >
//                     Share this Course
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default CourseDetailsCard


// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import copy from 'copy-to-clipboard';
// import toast from 'react-hot-toast';
// import {ACCOUNT_TYPE} from "../utils/constants"
// import { addToCart } from "../slices/cartSlice"

// function CourseDetailsCard({course, setConfirmationModal, handleBuyCourse}) {

//   const {user} = useSelector( (state) => state.profile);
//   const {token} = useSelector( (state) => state.auth);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const {
//     thumbnail : thumbnailImage,
//     price : currentPrice,
//   } = course;

//   const handleAddToCart = () => {
//     if(user && user?.accountType == ACCOUNT_TYPE.INSTRUCTOR) {
//       toast.error("You are an instructor, you can't buy course");
//       return;
//     }
//     if(token){
//       dispatch(addToCart(course));
//       return;
//     }

//     setConfirmationModal({
//       text1: "You are not logged in",
//       text2: "please login to add to cart",
//       btn1Text: "Login",
//       btn2Text: "Cancel",
//       btn1Handler: () => navigate("/login"),
//       btn2Handler: () => setConfirmationModal(null),
//     })

//   }

//   const handleShare = () => {
//     copy(window.location.href);
//     toast.success("Link copied to clipboard")
//   }

//   return (
//     <div>
//       <img src={thumbnailImage} alt='course img' className='max-h-[300px] min-h-[180px] w-[400px] rounded-xl'></img>
//       <div>
//         Rs. {currentPrice}
//       </div>
//       <div className='flex flex-col gap-y-6'>
//         <button onClick={
//           user && course?.studentsEnrolled.includes(user?._id) ? () => navigate("/dashboard/enrolled-courses") : handleBuyCourse 
//         } className='bg-yellow-200 w-fit text-richblack-300'>
//           {
//             user && course?.studentsEnrolled.includes(user?._id) ? "Go to course" : "Buy Now"
//           }
//         </button>

//         {
//           (!course?.studentsEnrolled.includes(user?._id)) && (
//             <button onClick={
//               handleAddToCart
//             } className='bg-yellow-200 w-fit text-richblack-300'>
//               Add to Cart
//             </button>
//           )
//         }
//       </div>

//       <div>
//         <p>7 Day Money-Back Guarantee</p>
//         <p>
//           This Course Includes:
//           easy learning well structured course
//         </p>
//       </div>

//       <div>
//         <button onClick={handleShare}>Share</button>
//       </div>
//     </div>
//   )
// }

// export default CourseDetailsCard