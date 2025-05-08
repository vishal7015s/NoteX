// import React, { useEffect, useState } from 'react'
// import OTPInput from 'react-otp-input';
// import { useDispatch } from 'react-redux';
// import { Navigate, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import {sendOtp} from "../../services/operations/authAPI"
// import {signUp} from "../../services/operations/authAPI"

// function VerifyEmail() {

//     const [otp, Setotp] = useState("");
//     const dispatch = useDispatch();
//     const nevigate = useNavigate();
//     const {signupData, loading} = useSelector( (state) => state.auth);


//     useEffect( () => {
//         if(!signupData){
//             nevigate("/signup");
//         }
//     },[]);

//     const handleOnSubmit = (e) => {
//         e.preventDefault();

//         const {
//             accountType, 
//             firstName,
//             lastName,
//             email,
//             password,
//             confirmPassword,
//         } = signupData

//         dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, nevigate));
//     }
//   return (
//     <div className='flex justify-center'>
//         {
//             loading
//             ? (<div>
//                 loading...
//             </div>)
//             : (<div>
//                 <h1>Verift Email</h1>
//                 <p>A verification code has been sent to you. Enter the code below</p>
//                 <form onSubmit={handleOnSubmit}>
//                     <OTPInput
//                         value={otp}
//                         onChange={Setotp}
//                         numInputs={6}
//                         renderSeparator={<span>-</span>}
//                         renderInput={(props) => <input {...props}  className='bg-yellow-200 text-white-300'/>}
//                     ></OTPInput>
//                     <button type='submit'>
//                         Verify Email
//                     </button>
//                 </form>
//                 <div>
//                     <div>
//                         <Link to="/login">
//                             <p>Back to Login</p>
//                         </Link>
//                     </div>
//                     <button onClick={ () => dispatch(sendOtp(signupData.email, nevigate))}>
//                         Resend it
//                     </button>
//                 </div>
//             </div>)
//         }
//     </div>
//   )
// }

// export default VerifyEmail


import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {sendOtp} from "../../services/operations/authAPI"
import {signUp} from "../../services/operations/authAPI"

function VerifyEmail() {

    const [otp, Setotp] = useState("");
    const dispatch = useDispatch();
    const nevigate = useNavigate();
    const {signupData, loading} = useSelector( (state) => state.auth);


    useEffect( () => {
        if(!signupData){
            nevigate("/signup");
        }
    },[]);

    const handleOnSubmit = (e) => {
        e.preventDefault();

        const {
            accountType, 
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData

        dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, nevigate));
    }
  return (
    <div className='flex justify-center items-center max-h-screen bg-gray-50 p-4'>
        {
            loading
            ? (<div className='text-center'>
                <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto'></div>
                <p className='mt-4 text-lg font-medium text-gray-700'>Loading...</p>
            </div>)
            : (<div className='w-full max-w-md bg-white rounded-lg shadow-md p-8'>
                <h1 className='text-2xl font-bold text-center text-gray-800 mb-2'>Verify Email</h1>
                <p className='text-sm text-gray-600 text-center mb-6'>
                    A verification code has been sent to you. Enter the code below
                </p>
                <form onSubmit={handleOnSubmit} className='mb-6'>
                    <div className='flex justify-center mb-6'>
                        <OTPInput
                            value={otp}
                            onChange={Setotp}
                            numInputs={6}
                            renderSeparator={<span className='mx-1'>-</span>}
                            renderInput={(props) => (
                                <input 
                                    {...props} 
                                    className='w-10 h-10 border-2 border-gray-300 rounded-md text-center focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200'
                                />
                            )}
                        />
                    </div>
                    <button 
                        type='submit'
                        className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200'
                    >
                        Verify Email
                    </button>
                </form>
                <div className='flex flex-col sm:flex-row justify-between items-center'>
                    <div className='mb-4 sm:mb-0'>
                        <Link to="/login" className='text-blue-600 hover:text-blue-800 text-sm font-medium transition duration-200'>
                            Back to Login
                        </Link>
                    </div>
                    <button 
                        onClick={ () => dispatch(sendOtp(signupData.email, nevigate))}
                        className='text-blue-600 hover:text-blue-800 text-sm font-medium transition duration-200'
                    >
                        Resend it
                    </button>
                </div>
            </div>)
        }
    </div>
  )
}

export default VerifyEmail