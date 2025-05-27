import { useSelector } from "react-redux";

import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart);
  const { paymentLoading } = useSelector((state) => state.course);

  if (paymentLoading)
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="mb-6 sm:mb-8 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 animate-fade-in">
          Cart
        </h1>
        <p className="border-b border-gray-300 pb-2 text-sm sm:text-base font-semibold text-gray-600 animate-fade-in">
          {totalItems} Courses in Cart
        </p>
        {total > 0 ? (
          <div className="mt-4 sm:mt-6 flex flex-col gap-y-4 sm:gap-y-6 lg:flex-row lg:gap-x-8 lg:gap-y-0 animate-fade-in">
            <div className="flex-1">
              <RenderCartCourses />
            </div>
            <div className="w-full lg:w-[400px]">
              <RenderTotalAmount />
            </div>
          </div>
        ) : (
          <p className="mt-8 sm:mt-12 text-center text-lg sm:text-xl lg:text-2xl text-gray-600 font-medium animate-fade-in">
            Your cart is empty
          </p>
        )}
      </div>
    </div>
  );
}


// import { useSelector } from "react-redux"

// import RenderCartCourses from "./RenderCartCourses"
// import RenderTotalAmount from "./RenderTotalAmount"

// export default function Cart() {
//   const { total, totalItems } = useSelector((state) => state.cart)
//   const { paymentLoading } = useSelector((state) => state.course)

//   if (paymentLoading)
//     return (
//       <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
//       </div>
//     )

//   return (
//     <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
//       <div className="max-w-[1200px] mx-auto">
//         <h1 className="mb-8 text-2xl sm:text-3xl font-bold text-gray-800 animate-fade-in">
//           Cart
//         </h1>
//         <p className="border-b border-gray-300 pb-2 text-md sm:text-base font-semibold text-black-500 animate-fade-in">
//           {totalItems} Courses in Cart
//         </p>
//         {total > 0 ? (
//           <div className="mt-6 flex flex-col gap-y-6 lg:flex-row lg:gap-x-10 animate-fade-in">
//             <div className="flex-1">
//               <RenderCartCourses />
//             </div>
//             <div className="w-full lg:w-auto">
//               <RenderTotalAmount />
//             </div>
//           </div>
//         ) : (
//           <p className="mt-12 text-center text-xl sm:text-2xl text-gray-600 font-medium animate-fade-in">
//             Your cart is empty
//           </p>
//         )}
//       </div>
//     </div>
//   )
// }




// import { useSelector } from "react-redux"

// import RenderCartCourses from "./RenderCartCourses"
// import RenderTotalAmount from "./RenderTotalAmount"

// export default function Cart() {
//   const { total, totalItems } = useSelector((state) => state.cart)
//   const { paymentLoading } = useSelector((state) => state.course)

//   if (paymentLoading)
//     return (
//       <div className="flex h-screen items-center justify-center">
//         <div className="spinner"></div>
//       </div>
//     )

//   return (
//     <>
//       <h1 className="mb-14 text-3xl font-medium text-richblack-5">Cart</h1>
//       <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
//         {totalItems} Courses in Cart
//       </p>
//       {total > 0 ? (
//         <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
//           <RenderCartCourses />
//           <RenderTotalAmount />
//         </div>
//       ) : (
//         <p className="mt-14 text-center text-3xl text-richblack-100">
//           Your cart is empty
//         </p>
//       )}
//     </>
//   )
// }
