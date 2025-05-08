// import React, { useEffect, useRef, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useLocation, useNavigate, useParams } from 'react-router-dom'
// import { Player } from 'video-react';
// // import '~video-react/dist/video-react.css'; // import css
// import "video-react/dist/video-react.css";
// import {AiFillPlayCircle} from "react-icons/ai"
// import IconBtn from '../common/IconBtn';

// function VideoDetails() {

//   const {courseId, sectionId, subSectionId} = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const playerRef = useRef();
//   const {token} = useSelector( (state) => state.auth);
//   const {courseSectionData, courseEntireData, completedLectures, updateCompletedLectures} = useSelector( (state) => state.viewCourse);

//   const [videoData, setVideoData] = useState([]);
//   const [videoEnded, setVideoEnded] = useState(false); 
//   const [loading, setLoading] = useState(false);

//   useEffect( () => {
//     const setVideoSpecificDetails = async() => {
//       if(!courseSectionData.length){
//         return;
//       }
//       if(!courseId && !sectionId && !subSectionId){
//         navigate("/dashboard/enrolled-courses");
//       }
//       else{
//         const filteredData = courseSectionData.filter(
//           (course) => course._id === sectionId   
//         )

//         const filteredVideoData = filteredData?.[0].subSection.filter(
//           (data) => data._id === subSectionId
//         )

//         setVideoData(filteredVideoData[0]);
//         setVideoEnded(false);
//       }
//     }
//     setVideoSpecificDetails();
//   },[courseSectionData, courseEntireData, location.pathname])

//   const isFirstVideo = () => {
//     const currentSectionIndex = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     )

//     const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
//       (data) => data._id === subSectionId
//     )

//     if(currentSectionIndex === 0 && currentSubSectionIndex === 0){
//       return true;
//     }
//     else{
//       return false;
//     }
//   }

//   const isLastVideo = () => {
//     const currentSectionIndex = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     )

//     const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

//     const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
//       (data) => data._id === subSectionId
//     )

//     if(currentSectionIndex === courseSectionData.length-1 && 
//       currentSubSectionIndex === noOfSubSections-1){
//         return truel
//     }
//     else{
//       return false;
//     }
//   }

//   const goToNextVideo = () => {
//     const currentSectionIndex = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     )

//     const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

//     const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
//       (data) => data._id === subSectionId
//     )

//     if(currentSubSectionIndex !== noOfSubSections - 1){
//       const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSectionIndex + 1]._id;
//       navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
//     }
//     else{
//       const nextSectionId = courseSectionData[currentSectionIndex+1]._id;
//       const nextSubSectionId = courseSectionData[currentSectionIndex+1].subSection[0]._id;  
//       navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
//     }
//   }

//   const goToPrevVideo = () => {
//     const currentSectionIndex = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     )

//     const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

//     const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
//       (data) => data._id === subSectionId
//     )

//     if(currentSubSectionIndex != 0){
//       const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex-1];
//       navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`);

//     }
//     else{
//       const prevSectionId = courseSectionData[currentSectionIndex-1]._id;
//       const prevSubSectionLength = courseSectionData[currentSectionIndex-1].subSection.length; 
//       const prevSubSectionId = courseSectionData[currentSectionIndex-1].subSection[prevSubSectionLength-1]._id;  
//       navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`);
//     }
//   }

//   const handleLectureCompletion = async() => {
//     setLoading(true);

//     const res = await markLectureAsComplete({courseId: courseId, subSectionId: subSectionId}, token);
//     if(res){
//       dispatch(updateCompletedLectures(subSectionId));
//     }

//     setLoading(false);
//   }

//   return (
//     <div>
//         {
//           !videoData ? (<div>
//             No Data Found
//           </div>) : (
//             <Player
//               ref = {playerRef}
//               aspectRatio = "16:9"
//               playsInline
//               onEnded={() => setVideoEnded(true)}
//               src={videoData?.videoUrl}
//               >
//               <AiFillPlayCircle/>

//               {
//                 videoEnded && (
//                   <div>
//                       {
//                         !completedLectures.includes(subSectionId) && (
//                           <IconBtn disabled={loading} onClick={() => {handleLectureCompletion()}}
//                           text={!loading ? "Mark As Completed" : "Loading..."}/>
//                         )
//                       }

//                       <IconBtn disabled={loading} onClick={() => {
//                         if(playerRef?.current){
//                           playerRef.current?.seek(0);
//                           setVideoEnded(false);
//                         }
//                       }} text="Rewatch"></IconBtn>

//                       <div>
//                         {
//                           !isFirstVideo() && (
//                             <button disabled={loading} onClick={goToPrevVideo}>
//                               Prev
//                             </button>
//                           )
//                         }

//                         {
//                           !isLastVideo() && (
//                             <button disabled={loading} onClick={goToNextVideo}>
//                               Next
//                             </button>
//                           )
//                         }
//                       </div>
//                     </div>
//                 )
//               }


              
//             </Player>
//           )
//         }

//         <h1>
//           {videoData?.title}
//         </h1>
//         <p>
//           {videoData?.description}
//         </p>
//     </div>
//   )
// }

// export default VideoDetails


import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { BigPlayButton, Player } from "video-react";
import "video-react/dist/video-react.css";

import { markLectureAsComplete } from "../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../slices/viewCourseSlice";
import IconBtn from "../common/IconBtn";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const playerRef = useRef(null);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData = [], courseEntireData, completedLectures = [] } =
    useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState(null);
  const [previewSource, setPreviewSource] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  // Set video data on mount or route change
  useEffect(() => {
    const setVideoDetails = async () => {
      if (!courseSectionData.length) return;
      if (!courseId || !sectionId || !subSectionId) {
        navigate("/dashboard/enrolled-courses");
        return;
      }

      const filteredData = courseSectionData.find(
        (course) => course._id === sectionId
      );

      const filteredVideoData = filteredData?.subSection?.find(
        (data) => data._id === subSectionId
      );

      setVideoData(filteredVideoData || null);
      setPreviewSource(courseEntireData?.thumbnail || "");
      setVideoEnded(false);
    };

    setVideoDetails();
  }, [courseSectionData, courseEntireData, location.pathname, courseId, sectionId, subSectionId, navigate]);

  // Check if current lecture is the first video
  const isFirstVideo = () => {
    if (!courseSectionData.length) return false;

    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    if (currentSectionIndex === -1) return false;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
      (data) => data._id === subSectionId
    );

    return currentSectionIndex === 0 && currentSubSectionIndex === 0;
  };

  // Check if current lecture is the last video
  const isLastVideo = () => {
    if (!courseSectionData.length) return false;

    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    if (currentSectionIndex === -1) return false;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
      (data) => data._id === subSectionId
    );

    return (
      currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === courseSectionData[currentSectionIndex]?.subSection?.length - 1
    );
  };

  // Navigate to next video
  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    if (currentSectionIndex === -1) return;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
      (data) => data._id === subSectionId
    );

    // If not last subsection in current section
    if (currentSubSectionIndex < courseSectionData[currentSectionIndex]?.subSection?.length - 1) {
      const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } 
    // If last subsection but not last section
    else if (currentSectionIndex < courseSectionData.length - 1) {
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id;
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    }
  };

  // Navigate to previous video
  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    if (currentSectionIndex === -1) return;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
      (data) => data._id === subSectionId
    );

    // If not first subsection in current section
    if (currentSubSectionIndex > 0) {
      const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );
    } 
    // If first subsection but not first section
    else if (currentSectionIndex > 0) {
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length;
      const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]._id;
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      );
    }
  };

  // const handleLectureCompletion = async () => {
  //   if (!courseId || !subSectionId) return;
    
  //   setLoading(true);
  //   const res = await markLectureAsComplete(
  //     { courseId, subsectionId: subSectionId },
  //     token
  //   );
  //   if (res) {
  //     dispatch(updateCompletedLectures(subSectionId));
  //   }
  //   setLoading(false);
  // };

  return (
    <div className="flex flex-col gap-5 text-white">
      {!videoData?.videoUrl ? (
        <img
          src={previewSource}
          alt="Preview"
          className="h-full w-full rounded-md object-cover"
        />
      ) : (
        <Player
          ref={playerRef}
          aspectRatio="16:9"
          playsInline
          onEnded={() => setVideoEnded(true)}
          src={videoData.videoUrl}
        >
          <BigPlayButton position="center" />
          
          {/* Video End Overlay */}
          {videoEnded && (
            <div
              style={{
                backgroundImage: "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
              }}
              className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
            >
              {/* {!completedLectures.includes(subSectionId) && (
                <IconBtn
                  disabled={loading}
                  onclick={handleLectureCompletion}
                  text={!loading ? "Mark As Completed" : "Loading..."}
                  customClasses="text-xl max-w-max px-4 mx-auto"
                />
              )} */}
              <IconBtn
                disabled={loading}
                onClick={() => {
                  playerRef.current?.seek(0);
                  playerRef.current.play();   // Auto-play the video  
                  setVideoEnded(false);
                }}
                text="Rewatch"
                customClasses="text-xl max-w-max px-4 mx-auto mt-2"
              />
              <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToPrevVideo}
                    className="blackButton"
                  >
                    Prev
                  </button>
                )}
                {!isLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className="blackButton"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </Player>
      )}
      fnjngvfsvn sn
      <h1 className="mt-4 text-3xl font-semibold">{videoData?.title || "Untitled Video"}</h1>
      <p className="pt-2 pb-6">{videoData?.description || "No description available"}</p>
    </div>
  );
};

export default VideoDetails;