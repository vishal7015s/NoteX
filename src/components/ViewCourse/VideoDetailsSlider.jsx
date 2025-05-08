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

  // Set active section and subsection on load/route change
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
    <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
      {/* Header Section */}
      <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
        <div className="flex w-full items-center justify-between">
          <button
            onClick={() => navigate("/dashboard/enrolled-courses")}
            className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
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
          <p>{courseEntireData?.courseName || "Course Name"}</p>
          {/* <p className="text-sm font-semibold text-richblack-500">
            {completedLectures.length} / {totalNoOfLectures}
          </p> */}
        </div>
      </div>

      {/* Course Sections & Subsections */}
      <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
        {courseSectionData.map((course, index) => (
          <div
            className="mt-2 cursor-pointer text-sm text-richblack-5"
            onClick={() => setActiveStatus(course?._id)}
            key={course?._id || index}
          >
            {/* Section Header */}
            <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
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
                    className={`flex gap-3 px-5 py-2 ${
                      videoBarActive === topic._id
                        ? "bg-yellow-200 font-semibold text-richblack-800"
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
                      type="radio"
                      checked={completedLectures.includes(topic?._id)}
                      readOnly
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