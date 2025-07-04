import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"
import { resetCart } from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { authEndPoint } from "../apis"

// export function sendOtp(email, navigate) {
//     return async (dispatch) => {
//       const toastId = toast.loading("Loading...")
//       dispatch(setLoading(true))
//       try {
//         const response = await apiConnector("POST", authEndPoint.SENDOTP_API, {
//           email,
//           checkUserPresent: true,
//         })
//         console.log("SENDOTP API RESPONSE............", response)
  
//         console.log(response.data.success)
  
//         if (!response.data.success) {
//           throw new Error(response.data.message)
//         }
  
//         toast.success("OTP Sent Successfully")
//         navigate("/verify-email")
//       } catch (error) {
//         console.log(error.message)
//         console.log("SENDOTP API ERROR............", error)
//         toast.error("Could Not Send OTP")
//       }
//       dispatch(setLoading(false))
//       toast.dismiss(toastId)
//     }
// }

export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
  ) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", authEndPoint.SIGNUP_API, {
          accountType,
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          otp,
        })
  
        console.log("SIGNUP API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Signup Successful")
        navigate("/login")
      } catch (error) {
        console.log("SIGNUP API ERROR............", error)
        toast.error("Signup Failed")
        navigate("/signup")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
}

export function login(email, password, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", authEndPoint.LOGIN_API, {
          email,
          password,
        })
  
        console.log("LOGIN API RESPONSEEE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("Login Successful")
        dispatch(setToken(response.data.token))
        const userImage = response.data?.user?.image
          ? response.data.user.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
        dispatch(setUser({ ...response.data.user, image: userImage }))
        localStorage.setItem("token", JSON.stringify(response.data.token))
        localStorage.setItem("user", JSON.stringify(response.data.user))
        navigate("/dashboard/my-profile")
      } 
      catch (error) {
        toast.error(error.message);
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
}

export function getPasswordResetToken(email, setEmailSent){
    return async(dispatch) => {
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST", authEndPoint.RESETPASSWORDTOKEN_API, {email})
            console.log("reset password token response...", response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("Reset Email Sent");
            setEmailSent(true);
        }
        catch(error){
          toast.error(error.message);
        }   
        dispatch(setLoading(false));
    }
}

export function resetPassword(password, confirmPassword, token, navigate){
    return async(dispatch) => {
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST", authEndPoint.RESETPASSWORD_API, {password, confirmPassword, token});
            console.log("reset password response", response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("Password has been reset Successful");
            navigate("/login");
            // TODO: Redirect to login page
        }
        catch(error){
            console.error("Error in resetPassword", error);
            toast.error("Failed to reset password");
        }
        dispatch(setLoading(false));
    }
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}



export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", authEndPoint.SENDOTP_API, {
        email,
        // checkUserPresent: true,
      })
      console.log("SENDOTP API EEEEE............", response)

      console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error(error.message);
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}