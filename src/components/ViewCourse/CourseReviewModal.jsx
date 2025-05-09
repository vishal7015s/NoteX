// import React, { useEffect } from 'react'
// import { useForm } from 'react-hook-form'
// import { useSelector } from 'react-redux'
// import ReactStars from 'react-stars'
// import IconBtn from '../common/IconBtn'
// import {createRating} from "../../services/operations/courseDetailsAPI"

// function CourseReviewModal({setReviewModal}) {

//   const {user} = useSelector( (state) => state.profile)
//   const {token} = useSelector( (state) => state.auth)
//   const {courseEntireData} = useSelector( (state) => state.viewCourse)

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: {errors},
//   } = useForm();

//   useEffect( () => {
//     setValue("courseExperience", "");
//     setValue("courseRating", 0);
//   },[])

//   const onSubmit = async(data) => {
//     await createRating(
//       {
//         courseId: courseEntireData._id,
//         rating: data.courseRating,
//         review: data.courseExperience,

//       },
//       token
//     );
//     setReviewModal(false);
//   }

//   const  ratingChanged = (newRating) => {
//     setValue("courseRating", newRating);
//   }

//   return (
//     <div>
//       <div>
//         {/* modal header  */}
//         <p>Add Review</p>
//         <button onClick={() => setReviewModal(false)}>
//           Close
//         </button>
//       </div>

//       {/* modal ki body  */}
//       <div> 
//         <div>
//           <img src={user?.image} alt="user image" className='aspect-square w-[50px] rounded-full object-cover'/>
//           <div>
//             <p>{user?.firstName} {user?.lastName}</p>
//             <p>Posting Publicly</p>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className='mt-6 flex flex-col items-center'>
//             <ReactStars 
//             count={5}
//             onChange={ratingChanged}
//             size={24}
//             activeColor="#ffd700"
//             ></ReactStars>

//             <div>
//               <label htmlFor="courseExperience">Add Your Experience*</label>
//               <textarea id="courseExperience" placeholder='Add Your Experience here' {...register("courseExperience", {required: true})} className='form-style min-h-[130px] w-full'></textarea>
//               {
//                 errors.courseExperience && (
//                   <span>
//                     please add your experience
//                   </span>
//                 )
//               }
//             </div>

//             {/* cancel or save button  */}
//             <div>
//               <button onClick={() => setReviewModal(false)}>
//                 Cancel
//               </button>

//               <IconBtn text="Save"></IconBtn>
//             </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default CourseReviewModal




import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import ReactStars from 'react-stars'
import IconBtn from '../common/IconBtn'
import {createRating} from "../../services/operations/courseDetailsAPI"

function CourseReviewModal({setReviewModal}) {

  const {user} = useSelector( (state) => state.profile)
  const {token} = useSelector( (state) => state.auth)
  const {courseEntireData} = useSelector( (state) => state.viewCourse)

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm();

  useEffect( () => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  },[])

  const onSubmit = async(data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    );
    setReviewModal(false);
  }

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating);
  }

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center  bg-opacity-50 backdrop-blur-sm">
      <div className="w-full max-w-[500px]  bg-gray-200 rounded-lg bg-richblack-800 p-6 shadow-lg">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-richblack-600 pb-4">
          <h3 className="text-xl font-semibold text-richblack-5">Add Review</h3>
          <button 
            onClick={() => setReviewModal(false)}
            className="rounded-full p-1 text-richblack-400 hover:bg-richblack-700 hover:text-richblack-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="mt-6"> 
          <div className="flex items-center gap-4">
            <img 
              src={user?.image} 
              alt="user" 
              className="aspect-square w-12 rounded-full object-cover border-2 border-richblack-500"
            />
            <div>
              <p className="text-richblack-5 font-medium">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-richblack-300">Posting Publicly</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <ReactStars 
                count={5}
                onChange={ratingChanged}
                size={30}
                color2="#FFD700"
                half={false}
              />
              <p className="text-sm text-richblack-300">Click to rate</p>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="courseExperience" className="text-sm font-medium text-richblack-5">
                Add Your Experience <span className="text-pink-200">*</span>
              </label>
              <textarea 
                id="courseExperience" 
                placeholder="Share your experience with this course..." 
                {...register("courseExperience", {required: true})} 
                className="form-style min-h-[130px] w-full rounded-lg bg-richblack-700 p-3 text-richblack-5 focus:outline-none focus:ring-1 focus:ring-yellow-50"
              />
              {errors.courseExperience && (
                <span className="text-xs text-pink-200">
                  Please add your experience
                </span>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-2">
              <button 
                onClick={() => setReviewModal(false)}
                type="button"
                className="rounded-md bg-richblack-700 px-4 py-2 text-richblack-5 hover:bg-richblack-600 transition-all duration-200"
              >
                Cancel
              </button>
              <IconBtn 
                text="Save"
                type="submit"
                customClasses="bg-yellow-50 text-richblack-900 hover:bg-yellow-25"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CourseReviewModal