import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { buyCourse } from "../../services/operations/studentFeaturesAPI";
import IconBtn from "../../components/common/IconBtn";

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id);
    buyCourse(token, courses, user, navigate, dispatch);
  };

  return (
    <div className="w-full max-w-[400px] mx-auto rounded-xl border-2 border-gray-300 bg-white p-4 sm:p-6 shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-300">
      <p className="mb-1 text-sm sm:text-base font-medium text-gray-600">Total:</p>
      <p className="mb-4 text-lg sm:text-xl font-semibold text-blue-600">₹{total}</p>
      <IconBtn
        text="Buy Now"
        onClick={handleBuyCourse}
        customClasses="w-full justify-center bg-blue-600 text-black font-semibold py-2 sm:py-3 rounded-md hover:bg-blue-700 hover:scale-105 transition-all duration-300 text-sm sm:text-base"
      />
    </div>
  );
}


// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"

// import { buyCourse } from "../../services/operations/studentFeaturesAPI"
// import IconBtn from "../../components/common/IconBtn"

// export default function RenderTotalAmount() {
//   const { total, cart } = useSelector((state) => state.cart)
//   const { token } = useSelector((state) => state.auth)
//   const { user } = useSelector((state) => state.profile)
//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   const handleBuyCourse = () => {
//     console.log("hello ")
//     const courses = cart.map((course) => course._id)
//     buyCourse(token, courses, user, navigate, dispatch)
//   }

//   return (
//     <div className="w-full max-w-[400px] mx-auto rounded-lg border border-gray-200 bg-white p-4 shadow-md">
//       <p className="mb-1 text-sm font-medium text-gray-500">Total:</p>
//       <p className="mb-4 text-xl font-medium text-black-500">₹ {total}</p>
//       <IconBtn
//         text="Buy Now"
//         onClick={handleBuyCourse}
//         customClasses="w-full justify-center bg-blue-500 text-black border  hover:bg-blue-600 transition-all duration-300 rounded-md py-2 text-sm"
//       />
//     </div>
//   )
// }



// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"

// import  {buyCourse}  from "../../services/operations/studentFeaturesAPI"
// import IconBtn from "../../components/common/IconBtn"

// export default function RenderTotalAmount() {
//   const { total, cart } = useSelector((state) => state.cart)
//   const { token } = useSelector((state) => state.auth)
//   const { user } = useSelector((state) => state.profile)
//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   const handleBuyCourse = () => {
//     console.log("hello ")
//     const courses = cart.map((course) => course._id)
//     buyCourse(token, courses, user, navigate, dispatch)
//   }

//   return (
//     <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
//       <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
//       <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {total}</p>
//       <IconBtn
//         text="Buy Now"
//         // onclick={handleBuyCourse}
//         onClick={handleBuyCourse}
//         customClasses="w-full justify-center"
//       />
//     </div>
//   )
// }