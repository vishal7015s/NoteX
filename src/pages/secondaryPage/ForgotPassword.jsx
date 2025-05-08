// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Link } from 'react-router-dom';
// import { getPasswordResetToken } from '../../services/operations/authAPI';
// function ForgotPassword() {

//     const [emailSent, setEmailSent] = useState(false);
//     const [email, setEmail] = useState("");
//     const {loading} = useSelector( (state) => state.auth);

//     const dispatch = useDispatch();

//     const handleOnSubmit = (e) => {
//         e.preventDefault();
//         dispatch(getPasswordResetToken(email, setEmailSent));
//     }

//   return (
//     <div>
//         {
//             loading ?
//              (
//                 <div>Loading...</div>
//              ) :
//              (<div>
//                 <h1>
//                     {
//                         !emailSent ? "Reset Your Password" : "Check Your Email"
//                     }
//                 </h1>
//                 <p>
//                     {
//                         !emailSent ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : `We have sent the reset email to ${email}`
//                     }
//                 </p>
//                 <form onSubmit={handleOnSubmit}>
//                     {
//                         !emailSent && (
//                             <label>
//                                 <p>Email Address*</p>
//                                 <input required
//                                     type="email"
//                                     name='email'
//                                     value={email}
//                                     onChange={ (e) => setEmail(e.target.value)}
//                                     placeholder="Please enter your email" ></input>
//                                     {/* <input>
//                                         required
//                                         type="email"
//                                         name='email'
//                                         value={email}
//                                         onChange={ (e) => setEmail(e.target.value)}
//                                         placeholder="Please enter your email"
//                                     </input> */}
//                             </label>
//                         )
//                     }

//                     <button type='submit'>
//                         {
//                             !emailSent? "Reset Password" : "Send Email"
//                         }
//                     </button>
//                 </form>
//                 <div>
//                     <Link to="/login">
//                         <p>Back to Login</p>
//                     </Link>
//                 </div>
//              </div>)
//         }
//     </div>
//   )
// }

// export default ForgotPassword


import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../../services/operations/authAPI';

function ForgotPassword() {
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const {loading} = useSelector( (state) => state.auth);
    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent));
    }

    return (
        <div className="max-h-[calc(100vh-3.5rem)] bg-gradient-to-b from-richblack-900 to-richblack-800 flex items-center justify-center p-4 md:p-8">
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-50"></div>
                </div>
            ) : (
                <div className="w-full max-w-md bg-richblack-800 p-6 md:p-8 rounded-xl shadow-xl border border-richblack-700">
                    <h1 className="text-2xl md:text-3xl font-bold text-richblack-5 mb-3 text-center">
                        {!emailSent ? "Reset Your Password" : "Check Your Email"}
                    </h1>
                    <p className="text-richblack-100 mb-6 text-center text-sm md:text-base">
                        {!emailSent 
                            ? "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email we can try account recovery" 
                            : `We have sent the reset email to ${email}`
                        }
                    </p>

                    <form onSubmit={handleOnSubmit} className="space-y-6">
                        {!emailSent && (
                            <label className="block">
                                <p className="mb-2 text-sm font-medium text-richblack-5">
                                    Email Address <span className="text-pink-400">*</span>
                                </p>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Please enter your email"
                                    className="w-full px-4 py-3 rounded-lg bg-richblack-700 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                            </label>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-richblack-900 font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            {!emailSent ? "Reset Password" : "Resend Email"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link to="/login">
                            <p className="text-blue-300 hover:text-blue-400 transition-colors text-sm md:text-base">
                                ← Back to Login
                            </p>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ForgotPassword