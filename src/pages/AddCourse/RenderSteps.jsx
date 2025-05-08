// import React from 'react'
// import { useSelector } from 'react-redux'
// import CourseInformationForm from "./CourseInformationForm/CourseInformationForm"
// import CourseBuilderForm from "./CourseBuilderForm/CourseBuilderForm"
// import { FaCheck } from "react-icons/fa";


// function RenderSteps() {

//   const {step} = useSelector( (state) => state.course);

//   const steps = [
//     {
//       id: 1,
//       title: "Course Information",
//     },
//     {
//       id: 2,
//       title: "Course Builder",
//     },
//     {
//       id: 3,
//       title: "Publish", 
//     },
//   ]
  
//   return (
//     <>
//       <div>
//         {
//           steps.map( (item, index) => (
//             <>
//               <div>
//                 <div className={`${step === item.id ? "bg-yellow-900 border-yellow-50" :"border-richblack-700 bg-richblack-800 text-richblack-300"}`}>
//                     {
//                       step > item.id ? (<FaCheck></FaCheck>) : (item.id)
//                     }
//                 </div>
//               </div>
//               {/* Add code for <dashes / */}

//             </>
//           ))
//         }
//       </div>

//       <div>
//         {
//           steps.map( (item) => (
//             <>
//               <div>
//                 <p>{item.title}</p>
//               </div>
//             </>
//           ))
//         }
//       </div>

//       {step === 1 && <CourseInformationForm/>}
//       {step === 2 && <CourseBuilderForm/>}
//       {/* {step === 3 && <PublishForm/>} */}
//     </>
//   )
// }

// export default RenderSteps







// import { FaCheck } from "react-icons/fa"
// import { useSelector } from "react-redux"

// import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"
// import CourseInformationForm from "./CourseInformation/CourseInformationForm"
// import PublishCourse from "./PublishCourse"

// export default function RenderSteps() {
//   const { step } = useSelector((state) => state.course)

//   const steps = [
//     {
//       id: 1,
//       title: "Course Information",
//     },
//     {
//       id: 2,
//       title: "Course Builder",
//     },
//     {
//       id: 3,
//       title: "Publish",
//     },
//   ]

//   return (
//     <>
//       <div className="relative mb-2 flex w-full justify-center">
//         {steps.map((item) => (
//           <div>
//             <div
//               className="flex flex-col items-center "
//               key={item.id}
//             >
//               <button
//                 className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
//                   step === item.id
//                     ? "border-yellow-50 bg-yellow-900 text-yellow-50"
//                     : "border-richblack-700 bg-richblack-800 text-richblack-300"
//                 } ${step > item.id && "bg-yellow-50 text-yellow-50"}} `}
//               >
//                 {step > item.id ? (
//                   <FaCheck className="font-bold text-richblack-900" />
//                 ) : (
//                   item.id
//                 )}
//               </button>
              
//             </div>
//             {item.id !== steps.length && (
//               <>
//                 <div
//                   className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${
//                   step > item.id  ? "border-yellow-50" : "border-richblack-500"
//                 } `}
//                 ></div>
//               </>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="relative mb-16 flex w-full select-none justify-between">
//         {steps.map((item) => (
//           <>
//             <div
//               className="flex min-w-[130px] flex-col items-center gap-y-2"
//               key={item.id}
//             >
              
//               <p
//                 className={`text-sm ${
//                   step >= item.id ? "text-richblack-5" : "text-richblack-500"
//                 }`}
//               >
//                 {item.title}
//               </p>
//             </div>
            
//           </>
//         ))}
//       </div>
//       {/* Render specific component based on current step */}
//       {step === 1 && <CourseInformationForm />}
//       {step === 2 && <CourseBuilderForm />}
//       {step === 3 && <PublishCourse />}
//     </>
//   )
// }





// temp 

import { FaCheck } from "react-icons/fa"
import { useSelector } from "react-redux"

import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"
import CourseInformationForm from "./CourseInformation/CourseInformationForm"
import PublishCourse from "./PublishCourse/index"

export default function RenderSteps() {
  const { step } = useSelector((state) => state.course)

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ]

  return (
    <>
      <div className="relative mb-2 flex w-full justify-center">
        {steps.map((item) => (
          <div key={`step-${item.id}`} className="flex items-center">
            <div className="flex flex-col items-center">
              <button
                className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
                  step === item.id
                    ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                    : "border-richblack-700 bg-richblack-800 text-richblack-300"
                } ${step > item.id && "bg-yellow-50 text-yellow-50"}} `}
              >
                {step > item.id ? (
                  <FaCheck className="font-bold text-richblack-900" />
                ) : (
                  item.id
                )}
              </button>
            </div>
            {item.id !== steps.length && (
              <div
                className={`h-[calc(34px/2)] w-[33%] border-dashed border-b-2 ${
                  step > item.id ? "border-yellow-50" : "border-richblack-500"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      <div className="relative mb-16 flex w-full select-none justify-between">
        {steps.map((item) => (
          <div
            key={`title-${item.id}`}
            className="flex min-w-[130px] flex-col items-center gap-y-2"
          >
            <p
              className={`text-sm ${
                step >= item.id ? "text-richblack-5" : "text-richblack-500"
              }`}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>
      {/* Render specific component based on current step */}
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </>
  )
}