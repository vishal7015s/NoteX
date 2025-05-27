import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { updateProfile } from "../../services/operations/SettingsAPI";
import IconBtn from "../../components/common/IconBtn";

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const submitProfileForm = async (data) => {
    try {
      await dispatch(updateProfile(token, data));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitProfileForm)}>
      <div className="bg-white border-2 border-gray-300 rounded-xl shadow-md transition-all duration-300 p-4 sm:p-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-6">
          Profile Information
        </h2>
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="flex flex-col gap-2 sm:w-[48%]">
              <label htmlFor="firstName" className="text-sm font-medium text-gray-600">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName}
              />
              {errors.firstName && (
                <span className="text-xs text-red-600">Please enter your first name.</span>
              )}
            </div>
            <div className="flex flex-col gap-2 sm:w-[48%]">
              <label htmlFor="lastName" className="text-sm font-medium text-gray-600">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter last name"
                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
                {...register("lastName", { required: true })}
                defaultValue={user?.lastName}
              />
              {errors.lastName && (
                <span className="text-xs text-red-600">Please enter your last name.</span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="flex flex-col gap-2 sm:w-[48%]">
              <label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-600">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your date of birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of birth cannot be in the future.",
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <span className="text-xs text-red-600">{errors.dateOfBirth.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-2 sm:w-[48%]">
              <label htmlFor="gender" className="text-sm font-medium text-gray-600">
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              >
                {genders.map((ele, i) => (
                  <option key={i} value={ele}>
                    {ele}
                  </option>
                ))}
              </select>
              {errors.gender && (
                <span className="text-xs text-red-600">Please select your gender.</span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="flex flex-col gap-2 sm:w-[48%]">
              <label htmlFor="contactNumber" className="text-sm font-medium text-gray-600">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                placeholder="Enter contact number"
                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
                {...register("contactNumber", {
                  required: {
                    value: true,
                    message: "Please enter your contact number.",
                  },
                  maxLength: { value: 12, message: "Invalid contact number" },
                  minLength: { value: 10, message: "Invalid contact number" },
                })}
                defaultValue={user?.additionalDetails?.contactNumber}
              />
              {errors.contactNumber && (
                <span className="text-xs text-red-600">{errors.contactNumber.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-2 sm:w-[48%]">
              <label htmlFor="about" className="text-sm font-medium text-gray-600">
                About
              </label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder="Enter bio details"
                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
                {...register("about", { required: true })}
                defaultValue={user?.additionalDetails?.about}
              />
              {errors.about && (
                <span className="text-xs text-red-600">Please enter your about details.</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 sm:gap-3 mt-4 sm:mt-6">
          <button
            type="button"
            onClick={() => navigate("/dashboard/my-profile")}
            className="rounded-md bg-blue-100 text-blue-600 font-medium py-2 px-4 sm:px-5 hover:bg-blue-200 hover:scale-105 transition-all duration-300 text-sm sm:text-base"
          >
            Cancel
          </button>
          <IconBtn
            type="submit"
            text={isSubmitting ? "Saving..." : "Save"}
            disabled={isSubmitting}
            customClasses="flex items-center gap-2 rounded-md bg-blue-600 text-white font-medium py-2 px-4 sm:px-5 hover:bg-blue-700 hover:scale-105 transition-all duration-300 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting && (
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
            )}
          </IconBtn>
        </div>
      </div>
    </form>
  );
}



// the real code 
// import { useForm } from "react-hook-form"
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"

// import { updateProfile } from "../../services/operations/SettingsAPI"
// import IconBtn from "../../components/common/IconBtn"

// const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

// export default function EditProfile() {
//   const { user } = useSelector((state) => state.profile)
//   const { token } = useSelector((state) => state.auth)
//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm()

//   const submitProfileForm = async (data) => {
//     // console.log("Form Data - ", data)
//     try {
//       dispatch(updateProfile(token, data))
//     } catch (error) {
//       console.log("ERROR MESSAGE - ", error.message)
//     }
//   }
//   return (
//     <>
//       <form onSubmit={handleSubmit(submitProfileForm)}>
//         {/* Profile Information */}
//         <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
//           <h2 className="text-lg font-semibold text-richblack-5">
//             Profile Information
//           </h2>
//           <div className="flex flex-col gap-5 lg:flex-row">
//             <div className="flex flex-col gap-2 lg:w-[48%]">
//               <label htmlFor="firstName" className="lable-style">
//                 First Name
//               </label>
//               <input
//                 type="text"
//                 name="firstName"
//                 id="firstName"
//                 placeholder="Enter first name"
//                 className="form-style"
//                 {...register("firstName", { required: true })}
//                 defaultValue={user?.firstName}
//               />
//               {errors.firstName && (
//                 <span className="-mt-1 text-[12px] text-yellow-100">
//                   Please enter your first name.
//                 </span>
//               )}
//             </div>
//             <div className="flex flex-col gap-2 lg:w-[48%]">
//               <label htmlFor="lastName" className="lable-style">
//                 Last Name
//               </label>
//               <input
//                 type="text"
//                 name="lastName"
//                 id="lastName"
//                 placeholder="Enter first name"
//                 className="form-style"
//                 {...register("lastName", { required: true })}
//                 defaultValue={user?.lastName}
//               />
//               {errors.lastName && (
//                 <span className="-mt-1 text-[12px] text-yellow-100">
//                   Please enter your last name.
//                 </span>
//               )}
//             </div>
//           </div>

//           <div className="flex flex-col gap-5 lg:flex-row">
//             <div className="flex flex-col gap-2 lg:w-[48%]">
//               <label htmlFor="dateOfBirth" className="lable-style">
//                 Date of Birth
//               </label>
//               <input
//                 type="date"
//                 name="dateOfBirth"
//                 id="dateOfBirth"
//                 className="form-style"
//                 {...register("dateOfBirth", {
//                   required: {
//                     value: true,
//                     message: "Please enter your Date of Birth.",
//                   },
//                   max: {
//                     value: new Date().toISOString().split("T")[0],
//                     message: "Date of Birth cannot be in the future.",
//                   },
//                 })}
//                 defaultValue={user?.additionalDetails?.dateOfBirth}
//               />
//               {errors.dateOfBirth && (
//                 <span className="-mt-1 text-[12px] text-yellow-100">
//                   {errors.dateOfBirth.message}
//                 </span>
//               )}
//             </div>
//             <div className="flex flex-col gap-2 lg:w-[48%]">
//               <label htmlFor="gender" className="lable-style">
//                 Gender
//               </label>
//               <select
//                 type="text"
//                 name="gender"
//                 id="gender"
//                 className="form-style"
//                 {...register("gender", { required: true })}
//                 defaultValue={user?.additionalDetails?.gender}
//               >
//                 {genders.map((ele, i) => {
//                   return (
//                     <option key={i} value={ele}>
//                       {ele}
//                     </option>
//                   )
//                 })}
//               </select>
//               {errors.gender && (
//                 <span className="-mt-1 text-[12px] text-yellow-100">
//                   Please enter your Date of Birth.
//                 </span>
//               )}
//             </div>
//           </div>

//           <div className="flex flex-col gap-5 lg:flex-row">
//             <div className="flex flex-col gap-2 lg:w-[48%]">
//               <label htmlFor="contactNumber" className="lable-style">
//                 Contact Number
//               </label>
//               <input
//                 type="tel"
//                 name="contactNumber"
//                 id="contactNumber"
//                 placeholder="Enter Contact Number"
//                 className="form-style"
//                 {...register("contactNumber", {
//                   required: {
//                     value: true,
//                     message: "Please enter your Contact Number.",
//                   },
//                   maxLength: { value: 12, message: "Invalid Contact Number" },
//                   minLength: { value: 10, message: "Invalid Contact Number" },
//                 })}
//                 defaultValue={user?.additionalDetails?.contactNumber}
//               />
//               {errors.contactNumber && (
//                 <span className="-mt-1 text-[12px] text-yellow-100">
//                   {errors.contactNumber.message}
//                 </span>
//               )}
//             </div>
//             <div className="flex flex-col gap-2 lg:w-[48%]">
//               <label htmlFor="about" className="lable-style">
//                 About
//               </label>
//               <input
//                 type="text"
//                 name="about"
//                 id="about"
//                 placeholder="Enter Bio Details"
//                 className="form-style"
//                 {...register("about", { required: true })}
//                 defaultValue={user?.additionalDetails?.about}
//               />
//               {errors.about && (
//                 <span className="-mt-1 text-[12px] text-yellow-100">
//                   Please enter your About.
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-end gap-2">
//           <button
//             onClick={() => {
//               navigate("/dashboard/my-profile")
//             }}
//             className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
//           >
//             Cancel
//           </button>
//           <IconBtn type="submit" text="Save" />
//         </div>
//       </form>
//     </>
//   )
// }