import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { changePassword } from "../../services/operations/SettingsAPI";
import IconBtn from "../common/IconBtn";

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const submitPasswordForm = async (data) => {
    try {
      await changePassword(token, data);
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitPasswordForm)}>
      <div className="bg-white border-2 border-gray-300 rounded-xl shadow-md  transition-all duration-300 p-4 sm:p-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-6">
          Update Password
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <div className="relative flex flex-col gap-2 sm:w-[48%]">
            <label htmlFor="oldPassword" className="text-sm font-medium text-gray-600">
              Current Password
            </label>
            <input
              type={showOldPassword ? "text" : "password"}
              name="oldPassword"
              id="oldPassword"
              placeholder="Enter current password"
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
              {...register("oldPassword", { required: true })}
            />
            <span
              onClick={() => setShowOldPassword((prev) => !prev)}
              className="absolute right-3 top-[calc(70%-12px)] z-10 cursor-pointer text-blue-600 hover:scale-110 transition-transform duration-300"
            >
              {showOldPassword ? (
                <AiOutlineEyeInvisible size={24} />
              ) : (
                <AiOutlineEye size={24} />
              )}
            </span>
            {errors.oldPassword && (
              <span className="text-xs text-red-600">Please enter your current password.</span>
            )}
          </div>
          <div className="relative flex flex-col gap-2 sm:w-[48%]">
            <label htmlFor="newPassword" className="text-sm font-medium text-gray-600">
              New Password
            </label>
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              id="newPassword"
              placeholder="Enter new password"
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
              {...register("newPassword", {
                required: true,
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long.",
                },
              })}
            />
            <span
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute right-3 top-[calc(70%-12px)] z-10 cursor-pointer text-blue-600 hover:scale-110 transition-transform duration-300"
            >
              {showNewPassword ? (
                <AiOutlineEyeInvisible size={24} />
              ) : (
                <AiOutlineEye size={24} />
              )}
            </span>
            {errors.newPassword && (
              <span className="text-xs text-red-600">{errors.newPassword.message}</span>
            )}
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
            text={isSubmitting ? "Updating..." : "Update"}
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
// import React, { useState } from "react"
// import { useForm } from "react-hook-form"
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
// import { useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"

// import { changePassword } from "../../services/operations/SettingsAPI"
// import IconBtn from "../common/IconBtn"

// export default function UpdatePassword() {
//   const { token } = useSelector((state) => state.auth)
//   const navigate = useNavigate()

//   const [showOldPassword, setShowOldPassword] = useState(false)
//   const [showNewPassword, setShowNewPassword] = useState(false)

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm()

//   const submitPasswordForm = async (data) => {
//     // console.log("password Data - ", data)
//     try {
//       await changePassword(token, data)
//     } catch (error) {
//       console.log("ERROR MESSAGE - ", error.message)
//     }
//   }

//   return (
//     <>
//       <form onSubmit={handleSubmit(submitPasswordForm)}>
//         <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
//           <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
//           <div className="flex flex-col gap-5 lg:flex-row">
//             <div className="relative flex flex-col gap-2 lg:w-[48%]">
//               <label htmlFor="oldPassword" className="lable-style">
//                 Current Password
//               </label>
//               <input
//                 type={showOldPassword ? "text" : "password"}
//                 name="oldPassword"
//                 id="oldPassword"
//                 placeholder="Enter Current Password"
//                 className="form-style"
//                 {...register("oldPassword", { required: true })}
//               />
//               <span
//                 onClick={() => setShowOldPassword((prev) => !prev)}
//                 className="absolute right-3 top-[38px] z-[10] cursor-pointer"
//               >
//                 {showOldPassword ? (
//                   <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
//                 ) : (
//                   <AiOutlineEye fontSize={24} fill="#AFB2BF" />
//                 )}
//               </span>
//               {errors.oldPassword && (
//                 <span className="-mt-1 text-[12px] text-yellow-100">
//                   Please enter your Current Password.
//                 </span>
//               )}
//             </div>
//             <div className="relative flex flex-col gap-2 lg:w-[48%]">
//               <label htmlFor="newPassword" className="lable-style">
//                 New Password
//               </label>
//               <input
//                 type={showNewPassword ? "text" : "password"}
//                 name="newPassword"
//                 id="newPassword"
//                 placeholder="Enter New Password"
//                 className="form-style"
//                 {...register("newPassword", { required: true })}
//               />
//               <span
//                 onClick={() => setShowNewPassword((prev) => !prev)}
//                 className="absolute right-3 top-[38px] z-[10] cursor-pointer"
//               >
//                 {showNewPassword ? (
//                   <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
//                 ) : (
//                   <AiOutlineEye fontSize={24} fill="#AFB2BF" />
//                 )}
//               </span>
//               {errors.newPassword && (
//                 <span className="-mt-1 text-[12px] text-yellow-100">
//                   Please enter your New Password.
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
//           <IconBtn type="submit" text="Update" />
//         </div>
//       </form>
//     </>
//   )
// }