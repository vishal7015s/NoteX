// import { useState } from "react";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";

// // You can replace this with any online image URL
// const loginImage = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
// const frameImage = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

// import {login} from "../../services/operations/authAPI"

// function Login() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const { email, password } = formData;

//   const handleOnChange = (e) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleOnSubmit = (e) => {
//     e.preventDefault();
//     dispatch(login(email, password, navigate))
//   };

//   return (
//     <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
//       {loading
//         ?
//         (
//           <div className="spinner">Loading...</div>
//         )
//         :
//         (
//           <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
//             <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
//               <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
//                 Welcome Back
//               </h1>
//               <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
//                 <span className="text-richblack-100">Build skills for today, tomorrow, and beyond.</span>{" "}
//                 <span className="font-edu-sa font-bold italic text-blue-100">
//                   Education to future-proof your career.
//                 </span>
//               </p>

//               <form onSubmit={handleOnSubmit} className="mt-6 flex w-full flex-col gap-y-4">
//                 <label className="w-full">
//                   <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//                     Email Address <sup className="text-pink-200">*</sup>
//                   </p>
//                   <input
//                     required
//                     type="email"
//                     name="email"
//                     value={email}
//                     onChange={handleOnChange}
//                     placeholder="Enter email address"
//                     className="form-style w-full"
//                   />
//                 </label>
//                 <label className="relative">
//                   <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//                     Password <sup className="text-pink-200">*</sup>
//                   </p>
//                   <input
//                     required
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     value={password}
//                     onChange={handleOnChange}
//                     placeholder="Enter Password"
//                     className="form-style w-full !pr-10"
//                   />
//                   <span
//                     onClick={() => setShowPassword((prev) => !prev)}
//                     className="absolute right-3 top-[38px] z-[10] cursor-pointer"
//                   >
//                     {showPassword ? (
//                       <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
//                     ) : (
//                       <AiOutlineEye fontSize={24} fill="#AFB2BF" />
//                     )}
//                   </span>
//                   <Link to="/forgot-password">
//                     <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
//                       Forgot Password
//                     </p>
//                   </Link>
//                 </label>
//                 <button
//                   type="submit"
//                   className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
//                 >
//                   Sign In
//                 </button>
//               </form>
//             </div>

//             <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
//               <img
//                 src={frameImage}
//                 alt="Pattern"
//                 width={558}
//                 height={504}
//                 loading="lazy"
//               />
//               <img
//                 src={loginImage}
//                 alt="Students"
//                 width={558}
//                 height={504}
//                 loading="lazy"
//                 className="absolute -top-4 right-4 z-10"
//               />
//             </div>
//           </div>
//         )
//       }
//     </div>
//   );
// }

// export default Login;



import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const loginImage = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&w=800&q=80&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.6";

import {login} from "../../services/operations/authAPI"

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate))
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-b from-richblack-900 to-richblack-800 flex items-center justify-center p-4">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-50"></div>
        </div>
      ) : (
        <div className="mx-auto flex w-full max-w-6xl flex-col lg:flex-row gap-8 items-center">
          {/* Image Section - Now appears first on mobile */}
          <div className="w-full lg:w-1/2 h-[250px] sm:h-[350px] lg:h-[450px] rounded-lg overflow-hidden shadow-lg">
            <img
              src={loginImage}
              alt="Students learning"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Form Section */}
          <div className="w-full lg:w-1/2 bg-richblack-800 p-6 md:p-8 rounded-xl shadow-xl border border-richblack-700">
            <h1 className="text-2xl md:text-3xl font-bold text-richblack-5 mb-3">
              Welcome Back
            </h1>
            <p className="text-richblack-200 mb-6 text-sm md:text-base">
              <span>Build skills for today, tomorrow, and beyond.</span>{" "}
              <span className="font-bold italic text-blue-300">
                Education to future-proof your career.
              </span>
            </p>

            <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
              <label className="w-full">
                <p className="mb-2 text-sm font-medium text-richblack-5">
                  Email Address <sup className="text-pink-400">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleOnChange}
                  placeholder="Enter email address"
                  className="w-full px-4 py-3 rounded-lg bg-richblack-700 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </label>
              <label className="relative">
                <p className="mb-2 text-sm font-medium text-richblack-5">
                  Password <sup className="text-pink-400">*</sup>
                </p>
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
                  className="absolute right-3 top-[42px] text-richblack-300 hover:text-richblack-50 transition-colors"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
                <Link to="/forgot-password">
                  <p className="mt-2 text-right text-xs text-blue-300 hover:underline">
                    Forgot Password?
                  </p>
                </Link>
              </label>
              <button
                type="submit"
                className="mt-6 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-richblack-900 font-bold py-3 px-6 shadow-md hover:shadow-lg transition-all duration-300"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;