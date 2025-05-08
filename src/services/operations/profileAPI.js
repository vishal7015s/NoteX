import { toast } from "react-hot-toast"
import { setLoading, setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { profileEndpoints } from "../apis"

const {GET_INSTRUCTOR__DATA_API} = profileEndpoints;
// import GET_INSTRUCTOR__DATA_API} from "../apis"

// export async function getUserEnrolledCourses(token) {
//     const toastId = toast.loading("Loading...")
//     let result = []
//     try {
//       const response = await apiConnector(
//         "GET",
//         profileEndpoints.GET_USER_ENROLLED_COURSES_API,
//         null,
//         {
//           Authorization: `Bearer ${token}`,
//         }
//       )
//       console.log("okk")

   
  
//       if (!response.data.success) {
//         throw new Error(response.data.message)
//       }
//       result = response.data.data
//     } catch (error) {
//       console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
//       console.log(error.message);
//       // toast.error("Could Not Get Enrolled Courses")
//     }
//     toast.dismiss(toastId)
//     return result
//   }



export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      profileEndpoints.GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorisation: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.data;
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error);
    if (error.response?.status === 403) {
      toast.error("Access denied. Please login again.");
      // You might want to dispatch a logout action here
    } else {
      toast.error("Could Not Get Enrolled Courses");
    }
  } finally {
    toast.dismiss(toastId);
  }
  return result;
}

export async function getInstructorData(token){
  const toastId = toast.loading("Loading...");
  let result = [];
  try{
    const response = await apiConnector("GET",GET_INSTRUCTOR__DATA_API , null, {
      Authorisation: `Bearer ${token}`,
    })

    console.log("get instructor data api", response);
    result = response?.data?.courses
  }
  catch(error){
    console.log(error)
    console.log("GET INSTRUCTOR API ERROR...");
    toast.error("could not get instructor data")
  }
  toast.dismiss(toastId);
  return result
}