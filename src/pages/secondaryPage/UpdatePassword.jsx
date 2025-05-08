// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useLocation } from 'react-router-dom';
// import { IoMdEyeOff } from "react-icons/io";
// import { IoEye } from "react-icons/io5";
// import { resetPassword } from '../../services/operations/authAPI';


// function UpdatePassword() {

//     const [formData, setFormData] = useState({
//         password:"",
//         confirmPassword:"",
//     })
//     const dispatch = useDispatch();
//     const location = useLocation();
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const {loading} = useSelector( (state) => state.auth);

//     const handleOnChange = (e) => {
//         setFormData( (e) => (
//             {
//                 ...prevData,
//                 [e.target.name] : e.target.value,
//             }
//         ))
//     }

//     const handOnSubmit = (e) => {
//         e.preventDefault();
//         const token = location.pathname.split('/').at(-1);
//         // dispatch(resetPassword(password, confirmPassword, token));
//         dispatch(resetPassword(password, confirmPassword, token, nevigate));
//     }

//   return (
//     <div>
//         {
//             loading ? 
//             (
//                 <div>Loading....</div>
//             ) :
//             (
//                 <div>
//                     <h1>Choose New Password</h1>
//                     <p>Almost done. Enter your new password and youre all set.</p>
//                     <form onSubmit={handOnSubmit}>
//                         <label>
//                             <p>New Password*</p>
//                             <input
//                             required
//                             type={showPassword ? "text" : "password"}
//                             name='password'
//                             value={password}
//                             onChange={handleOnChange}
//                             placeholder='Enter Password'
//                             />
//                             <span onClick={() => setShowPassword( (prev) => !prev)}>
//                                 {
//                                     showPassword 
//                                     ?  <IoEye fontSize={24}/>
//                                     : <IoMdEyeOff fontSize={24}/>
//                                 }
//                             </span>
//                         </label>

//                         <label>
//                             <p>Confirm New Password*</p>
//                             <input
//                             required
//                             type={showConfirmPassword ? "text" : "password"}
//                             name='confirmPassword'
//                             value={confirmPassword}
//                             onChange={handleOnChange}
//                             placeholder='Enter Confirm Password'
//                             />
//                             <span onClick={() => setShowConfirmPassword( (prev) => !prev)}>
//                                 {
//                                     showPassword 
//                                     ?  <IoEye fontSize={24}/>
//                                     : <IoMdEyeOff fontSize={24}/>
//                                 }
//                             </span>
//                         </label>

//                         <button type='submit'>
//                             Reset Password
//                         </button>

//                     </form>

//                     <div>
//                         <Link to="/login">
//                             <p>Back to Login</p>
//                         </Link>
//                     </div>

//                 </div>
//             )
//         }
//     </div>
//   )
// }

// export default UpdatePassword






// import { useState } from "react"
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
// import { BiArrowBack } from "react-icons/bi"
// import { useDispatch, useSelector } from "react-redux"
// import { Link, useLocation, useNavigate } from "react-router-dom"

// import { resetPassword } from "../../services/operations/authAPI"

// function UpdatePassword() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { loading } = useSelector((state) => state.auth)
//   const [formData, setFormData] = useState({
//     password: "",
//     confirmPassword: "",
//   })

//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)

//   const { password, confirmPassword } = formData

//   const handleOnChange = (e) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [e.target.name]: e.target.value,
//     }))
//   }

//   const handleOnSubmit = (e) => {
//     e.preventDefault();
//     const token = location.pathname.split("/").at(-1);
//     dispatch(resetPassword(password, confirmPassword, token, navigate));
//   }

//   return (
//     <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
//       {loading ? (
//         <div className="spinner"></div>
//       ) : (
//         <div className="max-w-[500px] p-4 lg:p-8">
//           <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
//             Choose new password
//           </h1>
//           <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
//             Almost done. Enter your new password and youre all set.
//           </p>
//           <form onSubmit={handleOnSubmit}>
//             <label className="relative">
//               <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//                 New Password <sup className="text-pink-200">*</sup>
//               </p>
//               <input
//                 required
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={password}
//                 onChange={handleOnChange}
//                 placeholder="Enter Password"
//                 className="form-style w-full !pr-10"
//               />
//               <span
//                 onClick={() => setShowPassword((prev) => !prev)}
//                 className="absolute right-3 top-[38px] z-[10] cursor-pointer"
//               >
//                 {showPassword ? (
//                   <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
//                 ) : (
//                   <AiOutlineEye fontSize={24} fill="#AFB2BF" />
//                 )}
//               </span>
//             </label>
//             <label className="relative mt-3 block">
//               <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//                 Confirm New Password <sup className="text-pink-200">*</sup>
//               </p>
//               <input
//                 required
//                 type={showConfirmPassword ? "text" : "password"}
//                 name="confirmPassword"
//                 value={confirmPassword}
//                 onChange={handleOnChange}
//                 placeholder="Confirm Password"
//                 className="form-style w-full !pr-10"
//               />
//               <span
//                 onClick={() => setShowConfirmPassword((prev) => !prev)}
//                 className="absolute right-3 top-[38px] z-[10] cursor-pointer"
//               >
//                 {showConfirmPassword ? (
//                   <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
//                 ) : (
//                   <AiOutlineEye fontSize={24} fill="#AFB2BF" />
//                 )}
//               </span>
//             </label>

//             <button
//               type="submit"
//               className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
//             >
//               Reset Password
//             </button>
//           </form>
//           <div className="mt-6 flex items-center justify-between">
//             <Link to="/login">
//               <p className="flex items-center gap-x-2 text-richblack-5">
//                 <BiArrowBack /> Back To Login
//               </p>
//             </Link>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default UpdatePassword


import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { resetPassword } from "../../services/operations/authAPI"

function UpdatePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { password, confirmPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token, navigate));
  }

  return (
    <div className="max-h-[calc(100vh-3.5rem)] bg-gradient-to-b from-richblack-900 to-richblack-800 flex items-center justify-center p-4 md:p-8">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-50"></div>
        </div>
      ) : (
        <div className="w-full max-w-md bg-richblack-800 p-6 md:p-8 rounded-xl shadow-xl border border-richblack-700">
          <h1 className="text-2xl md:text-3xl font-bold text-richblack-5 mb-3">
            Choose New Password
          </h1>
          <p className="text-richblack-100 mb-6 text-sm md:text-base">
            Almost done. Enter your new password and you're all set.
          </p>
          
          <form onSubmit={handleOnSubmit} className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-richblack-5 mb-1">
                New Password <span className="text-pink-400">*</span>
              </label>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                className="w-full px-4 py-3 rounded-lg bg-richblack-700 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] text-richblack-300 hover:text-richblack-50 transition-colors"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-richblack-5 mb-1">
                Confirm Password <span className="text-pink-400">*</span>
              </label>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                className="w-full px-4 py-3 rounded-lg bg-richblack-700 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] text-richblack-300 hover:text-richblack-50 transition-colors"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-richblack-900 font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mt-4"
            >
              Reset Password
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login">
              <p className="text-blue-300 hover:text-blue-50 transition-colors flex items-center justify-center gap-2">
                <BiArrowBack /> Back to Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdatePassword