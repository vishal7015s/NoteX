// import { useEffect, useState } from "react";
// import { BsChevronDown } from "react-icons/bs";
// import { IoIosArrowBack } from "react-icons/io";
// import { HiX } from "react-icons/hi";
// import { useSelector } from "react-redux";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import IconBtn from "../common/IconBtn";

// export default function VideoDetailsSlider({ setReviewModal, isSidebarOpen, setIsSidebarOpen }) {
//   const [activeStatus, setActiveStatus] = useState("");
//   const [videoBarActive, setVideoBarActive] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { sectionId, subSectionId } = useParams();

//   const {
//     courseSectionData = [],
//     courseEntireData,
//     totalNoOfLectures = 0,
//     completedLectures = [],
//   } = useSelector((state) => state.viewCourse);

//   useEffect(() => {
//     if (!courseSectionData.length) return;

//     const currentSectionIndex = courseSectionData.findIndex(
//       (section) => section._id === sectionId
//     );

//     if (currentSectionIndex === -1) return;

//     const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
//       (subSection) => subSection._id === subSectionId
//     );

//     const activeSubSectionId =
//       courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;

//     setActiveStatus(courseSectionData[currentSectionIndex]?._id || "");
//     setVideoBarActive(activeSubSectionId || "");
//   }, [courseSectionData, sectionId, subSectionId]);

//   return (
//     <>
//       {/* Mobile Sidebar with Backdrop */}
//       <div
//         className={`fixed inset-0 z-[999] bg-black/50 transition-opacity duration-300 md:hidden ${
//           isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
//         }`}
//         onClick={() => setIsSidebarOpen(false)}
//       />
//       <div
//         className={`fixed top-0 left-0 z-[1000] w-full sm:w-[280px] h-full max-h-[100vh] overflow-y-auto bg-white border-r border-gray-300 transform transition-transform duration-300 md:!translate-x-0 md:static md:w-[320px] md:flex md:flex-col ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         {/* Header Section */}
//         <div className="mx-4 flex flex-col items-start justify-between gap-4 border-b border-gray-300 py-4">
//           <div className="flex w-full items-center justify-between">
//             <button
//               onClick={() => {
//                 navigate("/dashboard/enrolled-courses");
//                 setIsSidebarOpen(false);
//               }}
//               className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-100 p-1 text-blue-600 hover:bg-blue-200 hover:scale-105 transition-all"
//               aria-label="Back to courses"
//             >
//               <IoIosArrowBack size={30} />
//             </button>
//             <button
//               className="md:hidden flex ml-30 items-center justify-center h-8 w-8 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 hover:scale-105 transition-all"
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <HiX size={30} />
//             </button>
//             <IconBtn
//               text="Add Review"
//               customClasses="flex items-center gap-2 rounded-md bg-blue-600 text-black font-medium py-2 px-3 hover:bg-blue-700 hover:scale-105 transition-all text-sm md:ml-auto"
//               onClick={() => {
//                 setReviewModal(true);
//                 setIsSidebarOpen(false);
//               }}
//             />
//           </div>
//           <div className="flex flex-col">
//             <p className="text-lg font-bold text-gray-800">{courseEntireData?.courseName || "Course Name"}</p>
//           </div>
//         </div>

//         {/* Course Sections */}
//         <div className="p-4">
//           {courseSectionData.map((course, index) => (
//             <div
//               className="mt-2 cursor-pointer text-sm text-gray-800"
//               onClick={() => setActiveStatus(course?._id)}
//               key={course?._id || index}
//             >
//               {/* Section Header */}
//               <div className="flex flex-row justify-between bg-gray-100 px-4 py-3 rounded-md hover:bg-gray-200 transition-all">
//                 <div className="w-[70%] font-semibold">{course?.sectionName || "Untitled Section"}</div>
//                 <div className="flex items-center gap-3">
//                   <span
//                     className={`${
//                       activeStatus === course?._id ? "rotate-0" : "rotate-180"
//                     } transition-all duration-500 text-blue-600`}
//                   >
//                     <BsChevronDown />
//                   </span>
//                 </div>
//               </div>

//               {/* Subsection List */}
//               {activeStatus === course?._id && (
//                 <div className="mt-2">
//                   {course?.subSection?.map((topic) => (
//                     <div
//                       className={`flex gap-3 px-4 py-2 rounded-md ${
//                         videoBarActive === topic._id
//                           ? "bg-blue-100 text-blue-600 font-semibold"
//                           : "hover:bg-gray-100"
//                       }`}
//                       key={topic._id}
//                       onClick={() => {
//                         navigate(
//                           `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic._id}`
//                         );
//                         setVideoBarActive(topic._id);
//                         setIsSidebarOpen(false);
//                       }}
//                     >
//                       <input
//                         type="radio"
//                         checked={completedLectures.includes(topic?._id)}
//                         readOnly
//                         className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
//                       />
//                       <span className="text-sm">{topic?.title || "Untitled Topic"}</span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }




// the real code 
// import { useEffect, useState } from "react";
// import { BsChevronDown } from "react-icons/bs";
// import { IoIosArrowBack } from "react-icons/io";
// import { useSelector } from "react-redux";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import IconBtn from "../common/IconBtn";

// export default function VideoDetailsSlider({ setReviewModal }) {
//   const [activeStatus, setActiveStatus] = useState("");
//   const [videoBarActive, setVideoBarActive] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { sectionId, subSectionId } = useParams();

//   const {
//     courseSectionData = [],
//     courseEntireData,
//     totalNoOfLectures = 0,
//     completedLectures = [],
//   } = useSelector((state) => state.viewCourse);

//   useEffect(() => {
//     if (!courseSectionData.length) return;

//     const currentSectionIndex = courseSectionData.findIndex(
//       (section) => section._id === sectionId
//     );

//     if (currentSectionIndex === -1) return;

//     const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
//       (subSection) => subSection._id === subSectionId
//     );

//     const activeSubSectionId =
//       courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;

//     setActiveStatus(courseSectionData[currentSectionIndex]?._id || "");
//     setVideoBarActive(activeSubSectionId || "");
//   }, [courseSectionData, sectionId, subSectionId]);

//   return (
//     <div className="hidden md:flex h-[calc(100vh-3.5rem)] w-[320px] flex-col border-r border-richblack-700 bg-richblack-800">
//       {/* Header Section */}
//       <div className="mx-5 flex flex-col items-start justify-between gap-4 border-b border-richblack-600 py-5">
//         <div className="flex w-full items-center justify-between">
//           <button
//             onClick={() => navigate("/dashboard/enrolled-courses")}
//             className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90 transition-all"
//             aria-label="Back to courses"
//           >
//             <IoIosArrowBack size={30} />
//           </button>
//           <IconBtn
//             text="Add Review"
//             customClasses="ml-auto"
//             onClick={() => setReviewModal(true)}
//           />
//         </div>
//         <div className="flex flex-col">
//           <p className="text-xl font-bold">{courseEntireData?.courseName || "Course Name"}</p>
//         </div>
//       </div>

//       {/* Course Sections */}
//       <div className="h-[calc(100vh-10rem)] overflow-y-auto">
//         {courseSectionData.map((course, index) => (
//           <div
//             className="mt-2 cursor-pointer text-sm text-richblack-5"
//             onClick={() => setActiveStatus(course?._id)}
//             key={course?._id || index}
//           >
//             {/* Section Header */}
//             <div className="flex flex-row justify-between bg-richblack-700 px-5 py-4 hover:bg-richblack-600 transition-all">
//               <div className="w-[70%] font-semibold">
//                 {course?.sectionName || "Untitled Section"}
//               </div>
//               <div className="flex items-center gap-3">
//                 <span
//                   className={`${
//                     activeStatus === course?._id ? "rotate-0" : "rotate-180"
//                   } transition-all duration-500`}
//                 >
//                   <BsChevronDown />
//                 </span>
//               </div>
//             </div>

//             {/* Subsection List */}
//             {activeStatus === course?._id && (
//               <div className="transition-[height] duration-500 ease-in-out">
//                 {course?.subSection?.map((topic) => (
//                   <div
//                     className={`flex gap-3 px-5 py-3 ${
//                       videoBarActive === topic._id
//                         ? "bg-yellow-200 font-semibold text-richblack-900"
//                         : "hover:bg-richblack-900"
//                     }`}
//                     key={topic._id}
//                     onClick={() => {
//                       navigate(
//                         `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
//                       );
//                       setVideoBarActive(topic._id);
//                     }}
//                   >
//                     <input
//                       type="radio"
//                       checked={completedLectures.includes(topic?._id)}
//                       readOnly
//                       className="h-5 w-5 rounded border-richblack-300 text-yellow-50 focus:ring-yellow-50"
//                     />
//                     <span>{topic?.title || "Untitled Topic"}</span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import IconBtn from "../common/IconBtn"
// import { IoIosArrowUp } from "react-icons/io";


// function VideoDetailsSlider({setReviewModal}) {

//     const [activeStatus, setActiveStatus] = useState("");
//     const [videobarActive, setVideobarActive] = useState("");
//     const navigate = useNavigate();
//     const location = useLocation();
//     const {sectionId, subSectionId} = useParams();
//     const {
//         courseSectionData,
//         courseEntireData,
//         totalNoOflectures,
//         completedLectures,
//     } = useSelector( (state) => state.viewCourse);

//     useEffect( () => {
//       ;( () => {
//         if(!courseSectionData.length){
//           return; 
//         }
//         const currentSectionIndex = courseSectionData.findIndex(
//           (data) => data._id === sectionId
//         )

//         const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
//           (data) => data._id === subSectionId
//         )

//         const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;

//         // set current section here
//         setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);

//         // set current sub section here
//         setVideobarActive(activeSubSectionId);
//       })()
//     },[courseSectionData, courseEntireData, location.pathname])
    
//   return (
//     <>
//       <div>
//           {/* for buttons and headings */}
//           <div>
//             {/* for buttons */}
//             <div>
//                 <div onClick={() => {navigate("/dashboard/enrolled-courses")}}>
//                   Back
//                 </div>

//                 <div>
//                   <IconBtn
//                   text="Add Review" 
//                   onClick={() => setReviewModal(true)}
//                   />
//                 </div>
//             </div>
//             {/* for heading or title  */}
//             <div>
//                 <p>{courseEntireData?.courseName}</p>
//                 <p>{completedLectures?.length} / {totalNoOflectures}</p>
//             </div>
//           </div>
//         {/* for section and subsection only */}
//         <div>
//           {
//             courseSectionData.map( (course, index) => (
//               <div onClick={() => setActiveStatus(course?._id)} key={index}> 
//                {/* section */}

//                 <div>
//                     <div>
//                       {course?.sectionName}
//                     </div>
//                     <IoIosArrowUp />
//                 </div>

//                 {/* sub section  */}
//                 <div>
//                   {
//                     activeStatus === course?._id && (
//                       <div> 
//                          {
//                           course.subSection.map( (topic, index) => (
//                             <div className={`flex gap-x-3 p-5 ${
//                               videobarActive === topic._id 
//                               ? "bg-yellow-300 text-richblack-900" 
//                               : "bg-black-700 text-white-400" 
//                             }`} key={index} onClick={() => {navigate(`/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`) ,setVideobarActive(topic?._id)}}>
//                               <input type='checkbox' checked={completedLectures.includes(topic?._id)}></input>
//                               <span>
//                                 {topic.title}
//                               </span>
//                             </div>
//                           ))
//                          } 
//                       </div>
//                     )
//                   }
//                 </div>
               
//               </div>
//             ))
//           }
//         </div>
//       </div>
//     </>
//   ) 
// }

// export default VideoDetailsSlider


// <<<<<<< HEAD
// =======

import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconBtn from "../common/IconBtn";

export default function VideoDetailsSlider({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();

  const {
    courseSectionData = [],
    courseEntireData,
    totalNoOfLectures = 0,
    completedLectures = [],
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    if (!courseSectionData.length) return;

    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );

    if (currentSectionIndex === -1) return;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
      (subSection) => subSection._id === subSectionId
    );

    const activeSubSectionId =
      courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;

    setActiveStatus(courseSectionData[currentSectionIndex]?._id || "");
    setVideoBarActive(activeSubSectionId || "");
  }, [courseSectionData, sectionId, subSectionId]);

  return (
    <div className="hidden md:flex h-[calc(100vh-3.5rem)] w-[320px] flex-col border-r border-richblack-700 bg-richblack-800">
      {/* Header Section */}
      <div className="mx-5 flex flex-col items-start justify-between gap-4 border-b border-richblack-600 py-5">
        <div className="flex w-full items-center justify-between">
          <button
            onClick={() => navigate("/dashboard/enrolled-courses")}
            className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90 transition-all"
            aria-label="Back to courses"
          >
            <IoIosArrowBack size={30} />
          </button>
          <IconBtn
            text="Add Review"
            customClasses="ml-auto"
            onClick={() => setReviewModal(true)}
          />
        </div>
        <div className="flex flex-col">
          <p className="text-xl font-bold">{courseEntireData?.courseName || "Course Name"}</p>
          <p className="text-sm text-richblack-300">
            {completedLectures.length} of {totalNoOfLectures} lectures completed
          </p>
        </div>
      </div>

      {/* Course Sections */}
      <div className="h-[calc(100vh-10rem)] overflow-y-auto">
        {courseSectionData.map((course, index) => (
          <div
            className="mt-2 cursor-pointer text-sm text-richblack-5"
            onClick={() => setActiveStatus(course?._id)}
            key={course?._id || index}
          >
            {/* Section Header */}
            <div className="flex flex-row justify-between bg-richblack-700 px-5 py-4 hover:bg-richblack-600 transition-all">
              <div className="w-[70%] font-semibold">
                {course?.sectionName || "Untitled Section"}
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`${
                    activeStatus === course?._id ? "rotate-0" : "rotate-180"
                  } transition-all duration-500`}
                >
                  <BsChevronDown />
                </span>
              </div>
            </div>

            {/* Subsection List */}
            {activeStatus === course?._id && (
              <div className="transition-[height] duration-500 ease-in-out">
                {course?.subSection?.map((topic) => (
                  <div
                    className={`flex gap-3 px-5 py-3 ${
                      videoBarActive === topic._id
                        ? "bg-yellow-200 font-semibold text-richblack-900"
                        : "hover:bg-richblack-900"
                    }`}
                    key={topic._id}
                    onClick={() => {
                      navigate(
                        `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                      );
                      setVideoBarActive(topic._id);
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures.includes(topic?._id)}
                      readOnly
                      className="h-5 w-5 rounded border-richblack-300 text-yellow-50 focus:ring-yellow-50"
                    />
                    <span>{topic?.title || "Untitled Topic"}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
// >>>>>>> 66adbf1aa9ed547cd64a1eeda5b04e08a39611a2
