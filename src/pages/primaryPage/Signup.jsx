// import { useState } from "react";
// import { toast } from "react-hot-toast";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {sendOtp} from "../../services/operations/authAPI"
// import {setSignupData} from "../../slices/authSlice"

// // Images (using placeholder URLs)
// const signupImg = "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80";
// const frameImg = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80";

// // Constants
// const ACCOUNT_TYPE = {
//     STUDENT: "Student",
//     INSTRUCTOR: "Instructor",
// };

// // Tab Component
// function Tab({ tabData, field, setField }) {
//     return (
//         <div className="flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max">
//             {tabData.map((tab) => (
//                 <button
//                     key={tab.id}
//                     type="button"
//                     onClick={() => setField(tab.type)}
//                     className={`${field === tab.type
//                         ? "bg-richblack-900 text-richblack-5"
//                         : "bg-transparent text-richblack-200"
//                         } py-2 px-5 rounded-full transition-all duration-200`}
//                 >
//                     {tab.tabName}
//                 </button>
//             ))}
//         </div>
//     );
// }

// // Signup Component
// export function Signup() {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { loading } = useSelector((state) => state.auth);

//     // student or instructor
//     const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

//     const [formData, setFormData] = useState({
//         firstName: "",
//         lastName: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//     });

//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//     const { firstName, lastName, email, password, confirmPassword } = formData;

//     // Handle input fields, when some value changes
//     const handleOnChange = (e) => {
//         setFormData((prevData) => ({
//             ...prevData,
//             [e.target.name]: e.target.value,
//         }));
//     };

    
//     // Handle Form Submission
//     const handleOnSubmit = (e) => {

//         e.preventDefault();

//         if (password !== confirmPassword) {
//             toast.error("Passwords Do Not Match");
//             return;
//         }
//         const signupData = {
//             ...formData,
//             accountType,
//         };
//         console.log("ok")
//         // Setting signup data to state
//         // To be used after otp verification
//         dispatch(setSignupData(signupData));
//         // Send OTP to user for verification
//         dispatch(sendOtp(formData.email, navigate));

//         // Reset
//         setFormData({
//             firstName: "",
//             lastName: "",
//             email: "",
//             password: "",
//             confirmPassword: "",
//         });
//         setAccountType(ACCOUNT_TYPE.STUDENT);
//     };

//     // data to pass to Tab component
//     const tabData = [
//         {
//             id: 1,
//             tabName: "Student",
//             type: ACCOUNT_TYPE.STUDENT,
//         },
//         {
//             id: 2,
//             tabName: "Instructor",
//             type: ACCOUNT_TYPE.INSTRUCTOR,
//         },
//     ];

//     return (
//         <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
//             {loading ? (
//                 <div className="spinner">loading...</div>
//             ) : (
//                 <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
//                     <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
//                         <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
//                             Join the millions learning to code with CodePlay for free
//                         </h1>
//                         <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
//                             <span className="text-richblack-100">Build skills for today, tomorrow, and beyond.</span>{" "}
//                             <span className="font-edu-sa font-bold italic text-blue-100">
//                                 Education to future-proof your career.
//                             </span>
//                         </p>

//                         {/* Tab */}
//                         <Tab tabData={tabData} field={accountType} setField={setAccountType} />

//                         {/* Form */}
//                         <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4 mt-6">
//                             <div className="flex gap-x-4">
//                                 <label className="w-full">
//                                     <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//                                         First Name <sup className="text-pink-200">*</sup>
//                                     </p>
//                                     <input
//                                         required
//                                         type="text"
//                                         name="firstName"
//                                         value={firstName}
//                                         onChange={handleOnChange}
//                                         placeholder="Enter first name"
//                                         className="w-full rounded-lg bg-richblack-700 p-3 text-richblack-5 border-b border-richblack-200 focus:outline-none"
//                                     />
//                                 </label>
//                                 <label className="w-full">
//                                     <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//                                         Last Name <sup className="text-pink-200">*</sup>
//                                     </p>
//                                     <input
//                                         required
//                                         type="text"
//                                         name="lastName"
//                                         value={lastName}
//                                         onChange={handleOnChange}
//                                         placeholder="Enter last name"
//                                         className="w-full rounded-lg bg-richblack-700 p-3 text-richblack-5 border-b border-richblack-200 focus:outline-none"
//                                     />
//                                 </label>
//                             </div>
//                             <label className="w-full">
//                                 <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//                                     Email Address <sup className="text-pink-200">*</sup>
//                                 </p>
//                                 <input
//                                     required
//                                     type="email"
//                                     name="email"
//                                     value={email}
//                                     onChange={handleOnChange}
//                                     placeholder="Enter email address"
//                                     className="w-full rounded-lg bg-richblack-700 p-3 text-richblack-5 border-b border-richblack-200 focus:outline-none"
//                                 />
//                             </label>
//                             <div className="flex gap-x-4">
//                                 <label className="relative w-full">
//                                     <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//                                         Create Password <sup className="text-pink-200">*</sup>
//                                     </p>
//                                     <input
//                                         required
//                                         type={showPassword ? "text" : "password"}
//                                         name="password"
//                                         value={password}
//                                         onChange={handleOnChange}
//                                         placeholder="Enter Password"
//                                         className="w-full rounded-lg bg-richblack-700 p-3 text-richblack-5 border-b border-richblack-200 focus:outline-none !pr-10"
//                                     />
//                                     <span
//                                         onClick={() => setShowPassword((prev) => !prev)}
//                                         className="absolute right-3 top-[38px] z-[10] cursor-pointer"
//                                     >
//                                         {showPassword ? (
//                                             <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
//                                         ) : (
//                                             <AiOutlineEye fontSize={24} fill="#AFB2BF" />
//                                         )}
//                                     </span>
//                                 </label>
//                                 <label className="relative w-full">
//                                     <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//                                         Confirm Password <sup className="text-pink-200">*</sup>
//                                     </p>
//                                     <input
//                                         required
//                                         type={showConfirmPassword ? "text" : "password"}
//                                         name="confirmPassword"
//                                         value={confirmPassword}
//                                         onChange={handleOnChange}
//                                         placeholder="Confirm Password"
//                                         className="w-full rounded-lg bg-richblack-700 p-3 text-richblack-5 border-b border-richblack-200 focus:outline-none !pr-10"
//                                     />
//                                     <span
//                                         onClick={() => setShowConfirmPassword((prev) => !prev)}
//                                         className="absolute right-3 top-[38px] z-[10] cursor-pointer"
//                                     >
//                                         {showConfirmPassword ? (
//                                             <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
//                                         ) : (
//                                             <AiOutlineEye fontSize={24} fill="#AFB2BF" />
//                                         )}
//                                     </span>
//                                 </label>
//                             </div>
//                             <button
//                                 type="submit"
//                                 className="mt-6 rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900 hover:bg-yellow-100 transition-all duration-200"
//                             >
//                                 Create Account
//                             </button>
//                         </form>
//                     </div>

//                     <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
//                         <img
//                             src={frameImg}
//                             alt="Pattern"
//                             width={558}
//                             height={504}
//                             loading="lazy"
//                             className="rounded-lg"
//                         />
//                         <img
//                             src={signupImg}
//                             alt="Students"
//                             width={558}
//                             height={504}
//                             loading="lazy"
//                             className="absolute -top-4 right-4 z-10 rounded-lg shadow-xl"
//                         />
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Signup;




import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../../services/operations/authAPI";
import { setSignupData } from "../../slices/authSlice";

const signupImg = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80";

const ACCOUNT_TYPE = {
  STUDENT: "Student",
  INSTRUCTOR: "Instructor",
};

function Tab({ tabData, field, setField }) {
  return (
    <div className="flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max shadow-md">
      {tabData.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => setField(tab.type)}
          className={`${field === tab.type
            ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-md"
            : "bg-transparent text-richblack-200 hover:text-richblack-50"
            } py-2 px-5 rounded-full transition-all duration-300 font-medium text-sm`}
        >
          {tab.tabName}
        </button>
      ))}
    </div>
  );
}

export function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }
    const signupData = {
      ...formData,
      accountType,
    };
    dispatch(setSignupData(signupData));
    dispatch(sendOtp(formData.email, navigate));
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setAccountType(ACCOUNT_TYPE.STUDENT);
  };

  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-b from-richblack-900 to-richblack-800 flex items-center justify-center p-4 md:p-8">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-50"></div>
        </div>
      ) : (
        <div className="max-w-7xl w-full flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Mobile Image (shown first) */}
          <div className="lg:hidden relative h-[300px] w-full rounded-xl overflow-hidden shadow-md mb-6">
            <img
              src={signupImg}
              alt="Students learning"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-richblack-900 to-transparent text-white">
              <h2 className="text-lg font-bold mb-1">Start Your Journey Today</h2>
              <p className="text-richblack-100 text-xs">
                Join our vibrant learning community
              </p>
            </div>
          </div>

          {/* Left Column - Form */}
          <div className="bg-richblack-800 p-6 md:p-8 rounded-2xl shadow-xl border border-richblack-700">
            <h1 className="text-2xl md:text-3xl font-bold text-richblack-5 mb-2">
              Join the millions learning to code with NoteX
            </h1>
            <p className="text-richblack-100 mb-6 md:mb-8 text-sm md:text-base">
              <span>Build skills for today, tomorrow, and beyond.</span>{" "}
              <span className="font-bold italic text-blue-300">
                Education to future-proof your career.
              </span>
            </p>

            <Tab tabData={tabData} field={accountType} setField={setAccountType} />

            <form onSubmit={handleOnSubmit} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="block text-sm font-medium text-richblack-100 mb-1">
                    First Name <span className="text-pink-400">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={handleOnChange}
                    placeholder="Enter first name"
                    className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg bg-richblack-700 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-richblack-100 mb-1">
                    Last Name <span className="text-pink-400">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={handleOnChange}
                    placeholder="Enter last name"
                    className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg bg-richblack-700 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-richblack-100 mb-1">
                  Email Address <span className="text-pink-400">*</span>
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleOnChange}
                  placeholder="Enter email address"
                  className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg bg-richblack-700 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-richblack-100 mb-1">
                    Create Password <span className="text-pink-400">*</span>
                  </label>
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                    placeholder="Enter Password"
                    className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg bg-richblack-700 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-[34px] md:top-[38px] text-richblack-300 hover:text-richblack-50 transition-colors"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={18} />
                    ) : (
                      <AiOutlineEye size={18} />
                    )}
                  </button>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-richblack-100 mb-1">
                    Confirm Password <span className="text-pink-400">*</span>
                  </label>
                  <input
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleOnChange}
                    placeholder="Confirm Password"
                    className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg bg-richblack-700 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-[34px] md:top-[38px] text-richblack-300 hover:text-richblack-50 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <AiOutlineEyeInvisible size={18} />
                    ) : (
                      <AiOutlineEye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-richblack-900 font-bold py-2 md:py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mt-2 text-sm md:text-base"
              >
                Create Account
              </button>
            </form>
          </div>

          {/* Desktop Image (right side) */}
          <div className="hidden lg:block relative h-[500px] w-full rounded-2xl overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-t from-richblack-900 to-transparent z-10"></div>
            <img
              src={signupImg}
              alt="Students learning"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-8 left-8 z-20 text-white">
              <h2 className="text-2xl font-bold mb-2">Start Your Journey Today</h2>
              <p className="text-richblack-100 max-w-md">
                Join thousands of students and instructors in our vibrant learning community.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;