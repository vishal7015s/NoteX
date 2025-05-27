import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { BigPlayButton, Player } from "video-react";
import { markLectureAsComplete } from "../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../slices/viewCourseSlice";
import IconBtn from "../../components/common/IconBtn";
import "video-react/dist/video-react.css";

// const VideoDetails = () => {
//   const { courseId, sectionId, subSectionId } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const playerRef = useRef(null);
//   const dispatch = useDispatch();
//   const { token } = useSelector((state) => state.auth);
//   const { courseSectionData, courseEntireData, completedLectures } =
//     useSelector((state) => state.viewCourse);

//   const [contentData, setContentData] = useState(null);
//   const [contentType, setContentType] = useState(null); // 'video' or 'pdf'
//   const [videoEnded, setVideoEnded] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const loadContent = () => {
//       if (!courseSectionData.length) return;
      
//       const section = courseSectionData.find(c => c._id === sectionId);
//       if (!section) return;
      
//       const subSection = section.subSection.find(s => s._id === subSectionId);
//       if (!subSection) return;

//       setContentData(subSection);
      
//       // Determine content type
//       const url = subSection.videoUrl || "";
//       if (url.match(/\.pdf$/i)) {
//         setContentType("pdf");
//       } else {
//         setContentType("video");
//       }
      
//       setVideoEnded(false);
//     };

//     loadContent();
//   }, [courseSectionData, sectionId, subSectionId]);

//   // ... (keep all your existing navigation functions)

//   const renderContent = () => {
//     if (!contentData) {
//       return (
//         <div className="flex h-[70vh] w-full items-center justify-center bg-richblack-900 rounded-md">
//           <p>Loading content...</p>
//         </div>
//       );
//     }

//     if (contentType === "pdf") {
//       return (
//         <div className="h-[70vh] w-full bg-richblack-900 rounded-md flex flex-col items-center justify-center p-6 gap-4">
//           <div className="text-8xl">📄</div>
//           <h2 className="text-2xl font-medium text-center">{contentData.title}</h2>
//           <p className="text-richblack-200">PDF Document</p>
          
//           <div className="flex flex-col sm:flex-row gap-4 mt-6">
//             <a
//               href={contentData.videoUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="yellowButton px-6 py-3 rounded-md"
//             >
//               Open PDF
//             </a>
            
//             {!completedLectures.includes(subSectionId) && (
//               <button
//                 onClick={handleLectureCompletion}
//                 disabled={loading}
//                 className="blackButton px-6 py-3"
//               >
//                 {loading ? "Marking..." : "Mark Complete"}
//               </button>
//             )}
//           </div>
//         </div>
//       );
//     }

//     // Default to video player
//     return (
//       <div className="relative w-full aspect-video bg-richblack-900 rounded-md overflow-hidden">
//         <Player
//           ref={playerRef}
//           aspectRatio="16:9"
//           playsInline
//           onEnded={() => setVideoEnded(true)}
//           src={contentData.videoUrl}
//         >
//           <BigPlayButton position="center" />
          
//           {videoEnded && (
//             <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center gap-4">
//               {!completedLectures.includes(subSectionId) && (
//                 <IconBtn
//                   disabled={loading}
//                   onclick={handleLectureCompletion}
//                   text={!loading ? "Mark As Completed" : "Loading..."}
//                 />
//               )}
//               <IconBtn
//                 onclick={() => {
//                   if (playerRef?.current) {
//                     playerRef.current.seek(0);
//                     setVideoEnded(false);
//                   }
//                 }}
//                 text="Rewatch"
//               />
//             </div>
//           )}
//         </Player>
//       </div>
//     );
//   };

//   return (
//     <div className="flex flex-col gap-5 text-white">
//       <h1 className="text-3xl font-semibold">{contentData?.title}</h1>
      
//       {renderContent()}
      
//       {/* Navigation controls */}
//       {/* <div className="flex justify-between mt-4">
//         {() && (
//           <button
//             onClick={goToPrevVideo}
//             disabled={loading}
//             className="blackButton px-4 py-2"
//           >
//             Previous Lecture
//           </button>
//         )}
//         {!isLastVideo() && (
//           <button
//             onClick={goToNextVideo}
//             disabled={loading}
//             className="blackButton px-4 py-2 ml-auto"
//           >
//             Next Lecture
//           </button>
//         )}
//       </div> */}

//       <div className="rounded-md bg-richblack-800 p-6">
//         <h2 className="text-2xl font-semibold mb-4">Description</h2>
//         <p className="text-richblack-50">{contentData?.description || "No description available"}</p>
//       </div>
//     </div>
//   );
// };

// export default VideoDetails;




// import React, { useEffect, useRef, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate, useParams } from "react-router-dom"
// import { useLocation } from "react-router-dom"
// import { BigPlayButton, Player } from "video-react"
// import { markLectureAsComplete } from "../../services/operations/courseDetailsAPI"
// import { updateCompletedLectures } from "../../slices/viewCourseSlice"
// import IconBtn from "../Common/IconBtn"
// import "video-react/dist/video-react.css"

// const VideoDetails = () => {
//   const { courseId, sectionId, subSectionId } = useParams()
//   const navigate = useNavigate()
//   const location = useLocation()
//   const playerRef = useRef(null)
//   const dispatch = useDispatch()
//   const { token } = useSelector((state) => state.auth)
//   const { courseSectionData, courseEntireData, completedLectures } =
//     useSelector((state) => state.viewCourse)

//   const [videoData, setVideoData] = useState([])
//   const [previewSource, setPreviewSource] = useState("")
//   const [videoEnded, setVideoEnded] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [isPdf, setIsPdf] = useState(false)

//   useEffect(() => {
//     const setVideoDetails = async () => {
//       if (!courseSectionData.length) return
//       if (!courseId && !sectionId && !subSectionId) {
//         navigate(`/dashboard/enrolled-courses`)
//       } else {
//         const filteredData = courseSectionData.filter(
//           (course) => course._id === sectionId
//         )
//         const filteredVideoData = filteredData?.[0]?.subSection.filter(
//           (data) => data._id === subSectionId
//         )
        
//         setVideoData(filteredVideoData[0])
        
//         // Check if content is PDF or video
//         if (filteredVideoData[0]?.videoUrl?.match(/\.pdf$/i)) {
//           setIsPdf(true)
//           setPreviewSource(filteredVideoData[0].videoUrl)
//         } else {
//           setIsPdf(false)
//           setPreviewSource(filteredVideoData[0]?.videoUrl || courseEntireData.thumbnail)
//         }
        
//         setVideoEnded(false)
//       }
//     }

//     setVideoDetails()
//   }, [courseSectionData, courseEntireData, location.pathname, courseId, sectionId, subSectionId, navigate])

//   const isFirstVideo = () => {
//     const currentSectionIndx = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     )

//     const currentSubSectionIndx = courseSectionData[
//       currentSectionIndx
//     ].subSection.findIndex((data) => data._id === subSectionId)

//     return currentSectionIndx === 0 && currentSubSectionIndx === 0
//   }

//   const goToNextVideo = () => {
//     const currentSectionIndx = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     )

//     const noOfSubsections =
//       courseSectionData[currentSectionIndx].subSection.length

//     const currentSubSectionIndx = courseSectionData[
//       currentSectionIndx
//     ].subSection.findIndex((data) => data._id === subSectionId)

//     if (currentSubSectionIndx !== noOfSubsections - 1) {
//       const nextSubSectionId =
//         courseSectionData[currentSectionIndx].subSection[
//           currentSubSectionIndx + 1
//         ]._id
//       navigate(
//         `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
//       )
//     } else if (currentSectionIndx < courseSectionData.length - 1) {
//       const nextSectionId = courseSectionData[currentSectionIndx + 1]._id
//       const nextSubSectionId =
//         courseSectionData[currentSectionIndx + 1].subSection[0]._id
//       navigate(
//         `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
//       )
//     }
//   }

//   const isLastVideo = () => {
//     const currentSectionIndx = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     )

//     const noOfSubsections =
//       courseSectionData[currentSectionIndx].subSection.length

//     const currentSubSectionIndx = courseSectionData[
//       currentSectionIndx
//     ].subSection.findIndex((data) => data._id === subSectionId)

//     return (
//       currentSectionIndx === courseSectionData.length - 1 &&
//       currentSubSectionIndx === noOfSubsections - 1
//     )
//   }

//   const goToPrevVideo = () => {
//     const currentSectionIndx = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     )

//     const currentSubSectionIndx = courseSectionData[
//       currentSectionIndx
//     ].subSection.findIndex((data) => data._id === subSectionId)

//     if (currentSubSectionIndx !== 0) {
//       const prevSubSectionId =
//         courseSectionData[currentSectionIndx].subSection[
//           currentSubSectionIndx - 1
//         ]._id
//       navigate(
//         `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
//       )
//     } else if (currentSectionIndx > 0) {
//       const prevSectionId = courseSectionData[currentSectionIndx - 1]._id
//       const prevSubSectionLength =
//         courseSectionData[currentSectionIndx - 1].subSection.length
//       const prevSubSectionId =
//         courseSectionData[currentSectionIndx - 1].subSection[
//           prevSubSectionLength - 1
//         ]._id
//       navigate(
//         `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
//       )
//     }
//   }

//   const handleLectureCompletion = async () => {
//     setLoading(true)
//     const res = await markLectureAsComplete(
//       { courseId: courseId, subsectionId: subSectionId },
//       token
//     )
//     if (res) {
//       dispatch(updateCompletedLectures(subSectionId))
//     }
//     setLoading(false)
//     setVideoEnded(true)
//   }

//   const renderContentControls = () => (
//     <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
//       {!isFirstVideo() && (
//         <button
//           disabled={loading}
//           onClick={goToPrevVideo}
//           className="blackButton"
//         >
//           Prev
//         </button>
//       )}
//       {!isLastVideo() && (
//         <button
//           disabled={loading}
//           onClick={goToNextVideo}
//           className="blackButton"
//         >
//           Next
//         </button>
//       )}
//     </div>
//   )

//   return (
//     <div className="flex flex-col gap-5 text-white">
//       <h1 className="text-3xl font-semibold">{videoData?.title}</h1>
      
//       {!videoData ? (
//         <div className="flex h-[70vh] w-full items-center justify-center bg-richblack-900 rounded-md">
//           <p>Loading content...</p>
//         </div>
//       ) : isPdf ? (
//         <div className="flex flex-col items-center">
//           <div className="h-[70vh] w-full bg-richblack-900 rounded-md flex flex-col items-center justify-center">
//             <div className="text-8xl mb-6">📄</div>
//             <p className="text-2xl mb-8 text-richblack-50">{videoData?.title}</p>
            
//             <div className="flex gap-4">
//               <a 
//                 href={videoData?.videoUrl} 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 className="yellowButton px-6 py-3 rounded-md text-lg"
//               >
//                 Open PDF
//               </a>
              
//               {!completedLectures.includes(subSectionId) && (
//                 <button
//                   disabled={loading}
//                   onClick={handleLectureCompletion}
//                   className="blackButton px-6 py-3 text-lg"
//                 >
//                   {loading ? "Marking..." : "Mark Complete"}
//                 </button>
//               )}
//             </div>
            
//             {renderContentControls()}
//           </div>
//         </div>
//       ) : (
//         <div className="relative">
//           <Player
//             ref={playerRef}
//             aspectRatio="16:9"
//             playsInline
//             onEnded={() => setVideoEnded(true)}
//             src={videoData?.videoUrl}
//           >
//             <BigPlayButton position="center" />
            
//             {videoEnded && (
//               <div
//                 style={{
//                   backgroundImage: "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
//                 }}
//                 className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
//               >
//                 {!completedLectures.includes(subSectionId) && (
//                   <IconBtn
//                     disabled={loading}
//                     onclick={handleLectureCompletion}
//                     text={!loading ? "Mark As Completed" : "Loading..."}
//                     customClasses="text-xl max-w-max px-4 mx-auto"
//                   />
//                 )}
//                 <IconBtn
//                   disabled={loading}
//                   onclick={() => {
//                     if (playerRef?.current) {
//                       playerRef.current.seek(0)
//                       setVideoEnded(false)
//                     }
//                   }}
//                   text="Rewatch"
//                   customClasses="text-xl max-w-max px-4 mx-auto mt-2"
//                 />
//                 {renderContentControls()}
//               </div>
//             )}
//           </Player>
//         </div>
//       )}

//       <div className="rounded-md bg-richblack-800 p-6">
//         <h2 className="text-2xl font-semibold mb-4">Description</h2>
//         <p className="text-richblack-50">{videoData?.description}</p>
//       </div>
//     </div>
//   )
// }

// export default VideoDetails
// video




// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { BigPlayButton, Player } from "video-react";
// import "video-react/dist/video-react.css";
// import IconBtn from "../common/IconBtn";

// const VideoDetails = () => {
//   const { courseId, sectionId, subSectionId } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const playerRef = useRef(null);
//   const dispatch = useDispatch();
//   const { token } = useSelector((state) => state.auth);
//   const { courseSectionData = [], courseEntireData, completedLectures = [] } =
//     useSelector((state) => state.viewCourse);

//   const [videoData, setVideoData] = useState(null);
//   const [previewSource, setPreviewSource] = useState("");
//   const [videoEnded, setVideoEnded] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const setVideoDetails = async () => {
//       if (!courseSectionData.length) return;
//       if (!courseId || !sectionId || !subSectionId) {
//         navigate("/dashboard/enrolled-courses");
//         return;
//       }

//       const filteredData = courseSectionData.find(
//         (course) => course._id === sectionId
//       );

//       const filteredVideoData = filteredData?.subSection?.find(
//         (data) => data._id === subSectionId
//       );

//       setVideoData(filteredVideoData || null);
//       setPreviewSource(courseEntireData?.thumbnail || "");
//       setVideoEnded(false);
//     };

//     setVideoDetails();
//   }, [courseSectionData, courseEntireData, location.pathname, courseId, sectionId, subSectionId, navigate]);

//   const isFirstVideo = () => {
//     if (!courseSectionData.length) return false;

//     const currentSectionIndex = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     );
//     if (currentSectionIndex === -1) return false;

//     const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
//       (data) => data._id === subSectionId
//     );

//     return currentSectionIndex === 0 && currentSubSectionIndex === 0;
//   };

//   const isLastVideo = () => {
//     if (!courseSectionData.length) return false;

//     const currentSectionIndex = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     );
//     if (currentSectionIndex === -1) return false;

//     const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
//       (data) => data._id === subSectionId
//     );

//     return (
//       currentSectionIndex === courseSectionData.length - 1 &&
//       currentSubSectionIndex === courseSectionData[currentSectionIndex]?.subSection?.length - 1
//     );
//   };

//   const goToNextVideo = () => {
//     const currentSectionIndex = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     );
//     if (currentSectionIndex === -1) return;

//     const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
//       (data) => data._id === subSectionId
//     );

//     if (currentSubSectionIndex < courseSectionData[currentSectionIndex]?.subSection?.length - 1) {
//       const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id;
//       navigate(
//         `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
//       );
//     } 
//     else if (currentSectionIndex < courseSectionData.length - 1) {
//       const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
//       const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id;
//       navigate(
//         `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
//       );
//     }
//   };

//   const goToPrevVideo = () => {
//     const currentSectionIndex = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     );
//     if (currentSectionIndex === -1) return;

//     const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
//       (data) => data._id === subSectionId
//     );

//     if (currentSubSectionIndex > 0) {
//       const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id;
//       navigate(
//         `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
//       );
//     } 
//     else if (currentSectionIndex > 0) {
//       const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
//       const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length;
//       const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]._id;
//       navigate(
//         `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
//       );
//     }
//   };

//   // Check if current content is PDF
//   const isPdf = videoData?.videoUrl?.endsWith(".pdf");

//   return (
//     <div className="mx-auto w-full max-w-[1800px] px-4 py-6">
//       {/* Video/PDF Player Section */}
//       <div className="mb-8 rounded-xl bg-richblack-800 shadow-[0_0_20px_0_rgba(0,0,0,0.3)]">
//         {!videoData?.videoUrl ? (
//           <div className="flex aspect-video items-center justify-center rounded-t-xl bg-richblack-900">
//             <img
//               src={previewSource}
//               alt="Preview"
//               className="h-full w-full rounded-t-xl object-cover"
//             />
//           </div>
//         ) : isPdf ? (
//           // PDF Viewer
//           <div className="flex aspect-video flex-col items-center justify-center rounded-t-xl bg-richblack-900 p-4">
//             <iframe
//               src={`https://docs.google.com/viewer?url=${encodeURIComponent(
//                 videoData.videoUrl
//               )}&embedded=true`}
//               className="h-full w-full"
//               title="PDF Preview"
//             />
//             <a
//               href={videoData.videoUrl}
//               download
//               className="mt-4 inline-block rounded-lg bg-yellow-50 px-6 py-2 text-richblack-900 hover:scale-95 transition-all duration-200"
//             >
//               Download PDF
//             </a>
//           </div>
//         ) : (
//           // Video Player
//           <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
//             <Player
//               ref={playerRef}
//               aspectRatio="16:9"
//               playsInline
//               onEnded={() => setVideoEnded(true)}
//               src={videoData.videoUrl}
//               className="video-player"
//             >
//               <BigPlayButton position="center" className="big-play-button-hover" />
              
//               {videoEnded && (
//                 <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-t from-richblack-900 via-richblack-800/70 to-transparent p-4 text-center">
//                   <div className="flex flex-col items-center gap-4">
//                     <IconBtn
//                       disabled={loading}
//                       onClick={() => {
//                         playerRef.current?.seek(0);
//                         playerRef.current.play();
//                         setVideoEnded(false);
//                       }}
//                       text="Rewatch"
//                       customClasses="rounded-lg px-6 py-2 bg-yellow-300 hover:scale-95 transition-all duration-200 disabled:opacity-60"
//                     />
//                     <div className="mt-4 flex flex-wrap justify-center gap-4">
//                       {!isFirstVideo() && (
//                         <button
//                           disabled={loading}
//                           onClick={goToPrevVideo}
//                           className="rounded-lg px-6 py-2 bg-yellow-300 hover:scale-95 transition-all duration-200 disabled:opacity-60"
//                         >
//                           Previous Lecture
//                         </button>
//                       )}
//                       {!isLastVideo() && (
//                         <button
//                           disabled={loading}
//                           onClick={goToNextVideo}
//                           className="rounded-lg px-6 py-2 bg-yellow-300 hover:scale-95 transition-all duration-200 disabled:opacity-60"
//                         >
//                           Next Lecture
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </Player>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VideoDetails;





// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { BigPlayButton, Player } from "video-react";
// import "video-react/dist/video-react.css";
// import { Document, Page, pdfjs } from 'react-pdf';
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
// import 'react-pdf/dist/esm/Page/TextLayer.css';

// // Configure PDF.js worker
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// const VideoDetails = () => {
//   const { courseId, sectionId, subSectionId } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const playerRef = useRef(null);
//   const dispatch = useDispatch();
//   const { token } = useSelector((state) => state.auth);
//   const { courseSectionData = [], courseEntireData, completedLectures = [] } =
//     useSelector((state) => state.viewCourse);

//   const [videoData, setVideoData] = useState(null);
//   const [previewSource, setPreviewSource] = useState("");
//   const [videoEnded, setVideoEnded] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);

//   // Set video data on mount or route change
//   useEffect(() => {
//     const setVideoDetails = async () => {
//       if (!courseSectionData.length) return;
//       if (!courseId || !sectionId || !subSectionId) {
//         navigate("/dashboard/enrolled-courses");
//         return;
//       }

//       const filteredData = courseSectionData.find(
//         (course) => course._id === sectionId
//       );

//       const filteredVideoData = filteredData?.subSection?.find(
//         (data) => data._id === subSectionId
//       );

//       setVideoData(filteredVideoData || null);
//       setPreviewSource(courseEntireData?.thumbnail || "");
//       setVideoEnded(false);
//       setPageNumber(1); // Reset page number when content changes
//     };

//     setVideoDetails();
//   }, [courseSectionData, courseEntireData, location.pathname, courseId, sectionId, subSectionId, navigate]);

//   function onDocumentLoadSuccess({ numPages }) {
//     setNumPages(numPages);
//   }

//   function changePage(offset) {
//     setPageNumber(prevPageNumber => prevPageNumber + offset);
//   }

//   function previousPage() {
//     changePage(-1);
//   }

//   function nextPage() {
//     changePage(1);
//   }

//   // Check if current content is a PDF
//   const isPDF = () => {
//     return videoData?.videoUrl?.toLowerCase().endsWith('.pdf');
//   };

//   // Check if current lecture is the first video
//   const isFirstVideo = () => {
//     if (!courseSectionData.length) return false;

//     const currentSectionIndex = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     );
//     if (currentSectionIndex === -1) return false;

//     const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
//       (data) => data._id === subSectionId
//     );

//     return currentSectionIndex === 0 && currentSubSectionIndex === 0;
//   };

//   // Check if current lecture is the last video
//   const isLastVideo = () => {
//     if (!courseSectionData.length) return false;

//     const currentSectionIndex = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     );
//     if (currentSectionIndex === -1) return false;

//     const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
//       (data) => data._id === subSectionId
//     );

//     return (
//       currentSectionIndex === courseSectionData.length - 1 &&
//       currentSubSectionIndex === courseSectionData[currentSectionIndex]?.subSection?.length - 1
//     );
//   };

//   // Navigate to next video
//   const goToNextVideo = () => {
//     const currentSectionIndex = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     );
//     if (currentSectionIndex === -1) return;

//     const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
//       (data) => data._id === subSectionId
//     );

//     // If not last subsection in current section
//     if (currentSubSectionIndex < courseSectionData[currentSectionIndex]?.subSection?.length - 1) {
//       const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id;
//       navigate(
//         `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
//       );
//     } 
//     // If last subsection but not last section
//     else if (currentSectionIndex < courseSectionData.length - 1) {
//       const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
//       const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id;
//       navigate(
//         `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
//       );
//     }
//   };

//   // Navigate to previous video
//   const goToPrevVideo = () => {
//     const currentSectionIndex = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     );
//     if (currentSectionIndex === -1) return;

//     const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
//       (data) => data._id === subSectionId
//     );

//     // If not first subsection in current section
//     if (currentSubSectionIndex > 0) {
//       const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id;
//       navigate(
//         `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
//       );
//     } 
//     // If first subsection but not first section
//     else if (currentSectionIndex > 0) {
//       const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
//       const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length;
//       const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]._id;
//       navigate(
//         `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
//       );
//     }
//   };

//   return (
//     <div className="flex flex-col gap-5 text-white p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
//       <div className="relative w-full h-0 pb-[56.25%] rounded-xl overflow-hidden bg-gray-800 shadow-lg">
//         {!videoData?.videoUrl ? (
//           <img
//             src={previewSource}
//             alt="Preview"
//             className="absolute inset-0 h-full w-full object-cover"
//           />
//         ) : isPDF() ? (
//           <div className="absolute inset-0 h-full w-full bg-white overflow-auto">
//             <Document
//               file={videoData.videoUrl}
//               onLoadSuccess={onDocumentLoadSuccess}
//               loading={<div className="text-black p-4">Loading PDF...</div>}
//               error={<div className="text-black p-4">Failed to load PDF.</div>}
//             >
//               <Page 
//                 pageNumber={pageNumber} 
//                 width={800}
//                 renderTextLayer={false}
//                 renderAnnotationLayer={false}
//                 className="mx-auto"
//               />
//             </Document>
//             {numPages > 1 && (
//               <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 bg-gray-800 p-2">
//                 <button
//                   onClick={previousPage}
//                   disabled={pageNumber <= 1}
//                   className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
//                 >
//                   Previous Page
//                 </button>
//                 <span className="text-white self-center">
//                   Page {pageNumber} of {numPages}
//                 </span>
//                 <button
//                   onClick={nextPage}
//                   disabled={pageNumber >= numPages}
//                   className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
//                 >
//                   Next Page
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <Player
//             ref={playerRef}
//             aspectRatio="16:9"
//             playsInline
//             onEnded={() => setVideoEnded(true)}
//             src={videoData.videoUrl}
//             className="absolute inset-0 h-full w-full"
//           >
//             <BigPlayButton position="center" />
            
//             {/* Video End Overlay */}
//             {videoEnded && (
//               <div
//                 style={{
//                   backgroundImage: "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
//                 }}
//                 className="absolute inset-0 z-[100] flex flex-col items-center justify-center gap-4 p-4"
//               >
//                 <IconBtn
//                   disabled={loading}
//                   onClick={() => {
//                     playerRef.current?.seek(0);
//                     playerRef.current.play();
//                     setVideoEnded(false);
//                   }}
//                   text="Rewatch"
//                   customClasses="text-xl px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
//                 />
//                 <div className="flex gap-4 mt-4">
//                   {!isFirstVideo() && (
//                     <button
//                       disabled={loading}
//                       onClick={goToPrevVideo}
//                       className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200 text-lg font-medium"
//                     >
//                       Previous
//                     </button>
//                   )}
//                   {!isLastVideo() && (
//                     <button
//                       disabled={loading}
//                       onClick={goToNextVideo}
//                       className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 text-lg font-medium"
//                     >
//                       Next
//                     </button>
//                   )}
//                 </div>
//               </div>
//             )}
//           </Player>
//         )}
//       </div>

//       <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
//         <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
//           {videoData?.title || "Untitled Content"}
//         </h1>
//         <p className="text-gray-300 text-lg leading-relaxed">
//           {videoData?.description || "No description available"}
//         </p>
//       </div>

//       <div className="flex justify-between items-center bg-gray-800 rounded-xl p-4 shadow-lg">
//         {!isFirstVideo() && (
//           <button
//             disabled={loading}
//             onClick={goToPrevVideo}
//             className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
//             </svg>
//             Previous {isPDF() ? "Document" : "Lesson"}
//           </button>
//         )}
//         {!isLastVideo() && (
//           <button
//             disabled={loading}
//             onClick={goToNextVideo}
//             className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 ml-auto"
//           >
//             Next {isPDF() ? "Document" : "Lesson"}
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//             </svg>
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VideoDetails;



// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { BigPlayButton, Player } from "video-react";
// import "video-react/dist/video-react.css";
// import IconBtn from "../common/IconBtn";

// const VideoDetails = () => {
//   // State and hooks initialization
//   const { courseId, sectionId, subSectionId } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const playerRef = useRef(null);
//   const dispatch = useDispatch();
  
//   // Redux state
//   const { token } = useSelector((state) => state.auth);
//   const { courseSectionData = [], courseEntireData, completedLectures = [] } =
//     useSelector((state) => state.viewCourse);

//   // Component state
//   const [videoData, setVideoData] = useState(null);
//   const [previewSource, setPreviewSource] = useState("");
//   const [videoEnded, setVideoEnded] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [pdfError, setPdfError] = useState(false);

//   // Set video details when params or data changes
//   useEffect(() => {
//     const setVideoDetails = async () => {
//       if (!courseSectionData.length) return;
//       if (!courseId || !sectionId || !subSectionId) {
//         navigate("/dashboard/enrolled-courses");
//         return;
//       }

//       const filteredData = courseSectionData.find(
//         (course) => course._id === sectionId
//       );

//       const filteredVideoData = filteredData?.subSection?.find(
//         (data) => data._id === subSectionId
//       );

//       setVideoData(filteredVideoData || null);
//       setPreviewSource(courseEntireData?.thumbnail || "");
//       setVideoEnded(false);
//       setPdfError(false);
//     };

//     setVideoDetails();
//   }, [courseSectionData, courseEntireData, location.pathname, courseId, sectionId, subSectionId, navigate]);

//   // Check if current lecture is the first one
//   const isFirstVideo = () => {
//     if (!courseSectionData.length) return false;

//     const currentSectionIndex = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     );
//     if (currentSectionIndex === -1) return false;

//     const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
//       (data) => data._id === subSectionId
//     );

//     return currentSectionIndex === 0 && currentSubSectionIndex === 0;
//   };

//   // Check if current lecture is the last one
//   const isLastVideo = () => {
//     if (!courseSectionData.length) return false;

//     const currentSectionIndex = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     );
//     if (currentSectionIndex === -1) return false;

//     const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
//       (data) => data._id === subSectionId
//     );

//     return (
//       currentSectionIndex === courseSectionData.length - 1 &&
//       currentSubSectionIndex === courseSectionData[currentSectionIndex]?.subSection?.length - 1
//     );
//   };

//   // Navigate to next video
//   const goToNextVideo = () => {
//     const currentSectionIndex = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     );
//     if (currentSectionIndex === -1) return;

//     const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
//       (data) => data._id === subSectionId
//     );

//     if (currentSubSectionIndex < courseSectionData[currentSectionIndex]?.subSection?.length - 1) {
//       const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id;
//       navigate(
//         `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
//       );
//     } 
//     else if (currentSectionIndex < courseSectionData.length - 1) {
//       const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
//       const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id;
//       navigate(
//         `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
//       );
//     }
//   };

//   // Navigate to previous video
//   const goToPrevVideo = () => {
//     const currentSectionIndex = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     );
//     if (currentSectionIndex === -1) return;

//     const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
//       (data) => data._id === subSectionId
//     );

//     if (currentSubSectionIndex > 0) {
//       const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id;
//       navigate(
//         `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
//       );
//     } 
//     else if (currentSectionIndex > 0) {
//       const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
//       const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length;
//       const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]._id;
//       navigate(
//         `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
//       );
//     }
//   };

//   // Check if current content is PDF
//   const isPdf = videoData?.videoUrl?.endsWith(".pdf");

//   // Handle PDF loading error
//   const handlePdfError = () => {
//     setPdfError(true);
//   };

//   return (
//     <div className="mx-auto w-full max-w-[1800px] px-4 py-6">
//       {/* Video/PDF Player Section */}
//       <div className="mb-8 rounded-xl bg-richblack-800 shadow-[0_0_20px_0_rgba(0,0,0,0.3)]">
//         {!videoData?.videoUrl ? (
//           <div className="flex aspect-video items-center justify-center rounded-t-xl bg-richblack-900">
//             <img
//               src={previewSource}
//               alt="Preview"
//               className="h-full w-full rounded-t-xl object-cover"
//             />
//           </div>
//         ) : isPdf ? (
//           // PDF Viewer
//           <div className="flex aspect-video flex-col items-center justify-center rounded-t-xl bg-richblack-900 p-4">
//             {pdfError ? (
//               <div className="text-center text-richblack-100">
//                 <p className="mb-4">Could not load PDF preview</p>
//                 <a
//                   href={videoData.videoUrl}
//                   download
//                   className="inline-block rounded-lg bg-yellow-50 px-6 py-2 text-richblack-900 hover:scale-95 transition-all duration-200"
//                 >
//                   Download PDF
//                 </a>
//               </div>
//             ) : (
//               <>
//                 <iframe
//                   src={`https://docs.google.com/gview?url=${encodeURIComponent(
//                     videoData.videoUrl
//                   )}&embedded=true`}
//                   className="h-full w-full"
//                   title="PDF Preview"
//                   onError={handlePdfError}
//                   loading="lazy"
//                 />
//                 <div className="mt-4 flex gap-4">
//                   <a
//                     href={videoData.videoUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="rounded-lg bg-yellow-50 px-6 py-2 text-richblack-900 hover:scale-95 transition-all duration-200"
//                   >
//                     Open Full PDF
//                   </a>
//                   <a
//                     href={videoData.videoUrl}
//                     download
//                     className="rounded-lg bg-richblack-600 px-6 py-2 text-yellow-50 hover:scale-95 transition-all duration-200"
//                   >
//                     Download PDF
//                   </a>
//                 </div>
//               </>
//             )}
//           </div>
//         ) : (
//           // Video Player
//           <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
//             <Player
//               ref={playerRef}
//               aspectRatio="16:9"
//               playsInline
//               onEnded={() => setVideoEnded(true)}
//               src={videoData.videoUrl}
//               className="video-player"
//             >
//               <BigPlayButton position="center" className="big-play-button-hover" />
              
//               {videoEnded && (
//                 <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-t from-richblack-900 via-richblack-800/70 to-transparent p-4 text-center">
//                   <div className="flex flex-col items-center gap-4">
//                     <IconBtn
//                       disabled={loading}
//                       onClick={() => {
//                         playerRef.current?.seek(0);
//                         playerRef.current.play();
//                         setVideoEnded(false);
//                       }}
//                       text="Rewatch"
//                       customClasses="rounded-lg px-6 py-2 bg-yellow-300 hover:scale-95 transition-all duration-200 disabled:opacity-60"
//                     />
//                     <div className="mt-4 flex flex-wrap justify-center gap-4">
//                       {!isFirstVideo() && (
//                         <button
//                           disabled={loading}
//                           onClick={goToPrevVideo}
//                           className="rounded-lg px-6 py-2 bg-yellow-300 hover:scale-95 transition-all duration-200 disabled:opacity-60"
//                         >
//                           Previous Lecture
//                         </button>
//                       )}
//                       {!isLastVideo() && (
//                         <button
//                           disabled={loading}
//                           onClick={goToNextVideo}
//                           className="rounded-lg px-6 py-2 bg-yellow-300 hover:scale-95 transition-all duration-200 disabled:opacity-60"
//                         >
//                           Next Lecture
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </Player>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VideoDetails;


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


// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { BigPlayButton, Player } from "video-react";
// import "video-react/dist/video-react.css";

// import { markLectureAsComplete } from "../../services/operations/courseDetailsAPI";
// import { updateCompletedLectures } from "../../slices/viewCourseSlice";
// import IconBtn from "../common/IconBtn";

// const VideoDetails = () => {
//   const { courseId, sectionId, subSectionId } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const playerRef = useRef(null);
//   const dispatch = useDispatch();
//   const { token } = useSelector((state) => state.auth);
//   const { courseSectionData = [], courseEntireData, completedLectures = [] } =
//     useSelector((state) => state.viewCourse);

//   const [videoData, setVideoData] = useState(null);
//   const [previewSource, setPreviewSource] = useState("");
//   const [videoEnded, setVideoEnded] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Set video data on mount or route change
//   useEffect(() => {
//     const setVideoDetails = async () => {
//       if (!courseSectionData.length) return;
//       if (!courseId || !sectionId || !subSectionId) {
//         navigate("/dashboard/enrolled-courses");
//         return;
//       }

//       const filteredData = courseSectionData.find(
//         (course) => course._id === sectionId
//       );

//       const filteredVideoData = filteredData?.subSection?.find(
//         (data) => data._id === subSectionId
//       );

//       setVideoData(filteredVideoData || null);
//       setPreviewSource(courseEntireData?.thumbnail || "");
//       setVideoEnded(false);
//     };

//     setVideoDetails();
//   }, [courseSectionData, courseEntireData, location.pathname, courseId, sectionId, subSectionId, navigate]);

//   // Check if current lecture is the first video
//   const isFirstVideo = () => {
//     if (!courseSectionData.length) return false;

//     const currentSectionIndex = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     );
//     if (currentSectionIndex === -1) return false;

//     const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
//       (data) => data._id === subSectionId
//     );

//     return currentSectionIndex === 0 && currentSubSectionIndex === 0;
//   };

//   // Check if current lecture is the last video
//   const isLastVideo = () => {
//     if (!courseSectionData.length) return false;

//     const currentSectionIndex = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     );
//     if (currentSectionIndex === -1) return false;

//     const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
//       (data) => data._id === subSectionId
//     );

//     return (
//       currentSectionIndex === courseSectionData.length - 1 &&
//       currentSubSectionIndex === courseSectionData[currentSectionIndex]?.subSection?.length - 1
//     );
//   };

//   // Navigate to next video
//   const goToNextVideo = () => {
//     const currentSectionIndex = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     );
//     if (currentSectionIndex === -1) return;

//     const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
//       (data) => data._id === subSectionId
//     );

//     // If not last subsection in current section
//     if (currentSubSectionIndex < courseSectionData[currentSectionIndex]?.subSection?.length - 1) {
//       const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id;
//       navigate(
//         `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
//       );
//     } 
//     // If last subsection but not last section
//     else if (currentSectionIndex < courseSectionData.length - 1) {
//       const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
//       const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id;
//       navigate(
//         `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
//       );
//     }
//   };

//   // Navigate to previous video
//   const goToPrevVideo = () => {
//     const currentSectionIndex = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     );
//     if (currentSectionIndex === -1) return;

//     const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
//       (data) => data._id === subSectionId
//     );

//     // If not first subsection in current section
//     if (currentSubSectionIndex > 0) {
//       const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id;
//       navigate(
//         `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
//       );
//     } 
//     // If first subsection but not first section
//     else if (currentSectionIndex > 0) {
//       const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
//       const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length;
//       const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]._id;
//       navigate(
//         `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
//       );
//     }
//   };

//   // const handleLectureCompletion = async () => {
//   //   if (!courseId || !subSectionId) return;
    
//   //   setLoading(true);
//   //   const res = await markLectureAsComplete(
//   //     { courseId, subsectionId: subSectionId },
//   //     token
//   //   );
//   //   if (res) {
//   //     dispatch(updateCompletedLectures(subSectionId));
//   //   }
//   //   setLoading(false);
//   // };

//   return (
//     <div className="flex flex-col gap-5 text-white">
//       {!videoData?.videoUrl ? (
//         <img
//           src={previewSource}
//           alt="Preview"
//           className="h-full w-full rounded-md object-cover"
//         />
//       ) : (
//         <Player
//           ref={playerRef}
//           aspectRatio="16:9"
//           playsInline
//           onEnded={() => setVideoEnded(true)}
//           src={videoData.videoUrl}
//         >
//           <BigPlayButton position="center" />
          
//           {/* Video End Overlay */}
//           {videoEnded && (
//             <div
//               style={{
//                 backgroundImage: "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
//               }}
//               className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
//             >
//               {/* {!completedLectures.includes(subSectionId) && (
//                 <IconBtn
//                   disabled={loading}
//                   onclick={handleLectureCompletion}
//                   text={!loading ? "Mark As Completed" : "Loading..."}
//                   customClasses="text-xl max-w-max px-4 mx-auto"
//                 />
//               )} */}
//               <IconBtn
//                 disabled={loading}
//                 onClick={() => {
//                   playerRef.current?.seek(0);
//                   playerRef.current.play();   // Auto-play the video  
//                   setVideoEnded(false);
//                 }}
//                 text="Rewatch"
//                 customClasses="text-xl max-w-max px-4 mx-auto mt-2"
//               />
//               <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
//                 {!isFirstVideo() && (
//                   <button
//                     disabled={loading}
//                     onClick={goToPrevVideo}
//                     className="blackButton"
//                   >
//                     Prev
//                   </button>
//                 )}
//                 {!isLastVideo() && (
//                   <button
//                     disabled={loading}
//                     onClick={goToNextVideo}
//                     className="blackButton"
//                   >
//                     Next
//                   </button>
//                 )}
//               </div>
//             </div>
//           )}
//         </Player>
//       )}
//       <h1 className="mt-4 text-3xl font-semibold">{videoData?.title || "Untitled Video"}</h1>
//       <p className="pt-2 pb-6">{videoData?.description || "No description available"}</p>
//     </div>
//   );
// };

// export default VideoDetails;

















// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { BigPlayButton, Player } from "video-react";
// import "video-react/dist/video-react.css";
// import IconBtn from "../common/IconBtn";

// const VideoDetails = () => {
//   const { courseId, sectionId, subSectionId } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const playerRef = useRef(null);
//   const dispatch = useDispatch();
//   const { token } = useSelector((state) => state.auth);
//   const { courseSectionData = [], courseEntireData, completedLectures = [] } =
//     useSelector((state) => state.viewCourse);

//   const [videoData, setVideoData] = useState(null);
//   const [previewSource, setPreviewSource] = useState("");
//   const [videoEnded, setVideoEnded] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const setVideoDetails = async () => {
//       if (!courseSectionData.length) return;
//       if (!courseId || !sectionId || !subSectionId) {
//         navigate("/dashboard/enrolled-courses");
//         return;
//       }

//       const filteredData = courseSectionData.find(
//         (course) => course._id === sectionId
//       );

//       const filteredVideoData = filteredData?.subSection?.find(
//         (data) => data._id === subSectionId
//       );

//       setVideoData(filteredVideoData || null);
//       setPreviewSource(courseEntireData?.thumbnail || "");
//       setVideoEnded(false);
//     };

//     setVideoDetails();
//   }, [courseSectionData, courseEntireData, location.pathname, courseId, sectionId, subSectionId, navigate]);

//   const isFirstVideo = () => {
//     if (!courseSectionData.length) return false;

//     const currentSectionIndex = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     );
//     if (currentSectionIndex === -1) return false;

//     const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
//       (data) => data._id === subSectionId
//     );

//     return currentSectionIndex === 0 && currentSubSectionIndex === 0;
//   };

//   const isLastVideo = () => {
//     if (!courseSectionData.length) return false;

//     const currentSectionIndex = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     );
//     if (currentSectionIndex === -1) return false;

//     const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
//       (data) => data._id === subSectionId
//     );

//     return (
//       currentSectionIndex === courseSectionData.length - 1 &&
//       currentSubSectionIndex === courseSectionData[currentSectionIndex]?.subSection?.length - 1
//     );
//   };

//   const goToNextVideo = () => {
//     const currentSectionIndex = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     );
//     if (currentSectionIndex === -1) return;

//     const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
//       (data) => data._id === subSectionId
//     );

//     if (currentSubSectionIndex < courseSectionData[currentSectionIndex]?.subSection?.length - 1) {
//       const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id;
//       navigate(
//         `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
//       );
//     } 
//     else if (currentSectionIndex < courseSectionData.length - 1) {
//       const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
//       const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id;
//       navigate(
//         `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
//       );
//     }
//   };

//   const goToPrevVideo = () => {
//     const currentSectionIndex = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     );
//     if (currentSectionIndex === -1) return;

//     const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
//       (data) => data._id === subSectionId
//     );

//     if (currentSubSectionIndex > 0) {
//       const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id;
//       navigate(
//         `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
//       );
//     } 
//     else if (currentSectionIndex > 0) {
//       const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
//       const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length;
//       const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]._id;
//       navigate(
//         `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
//       );
//     }
//   };

//   console.log("ye raha url",VideoDetails.videoUrl)

//   return (
//     <div className="mx-auto w-full max-w-[1800px] px-4 py-6">
//       {/* Video Player Section */}
//       <div className="mb-8 rounded-xl bg-richblack-800 shadow-[0_0_20px_0_rgba(0,0,0,0.3)]">
//         {!videoData?.videoUrl ? (
//           <div className="flex aspect-video items-center justify-center rounded-t-xl bg-richblack-900">
//             <img
//               src={previewSource}
//               alt="Preview"
//               className="h-full w-full rounded-t-xl object-cover"
//             />
//           </div>
//         ) : (
//           <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
//             <Player
//               ref={playerRef}
//               aspectRatio="16:9"
//               playsInline
//               onEnded={() => setVideoEnded(true)}
//               src={videoData.videoUrl}
//               className="video-player"
//             >
//               <BigPlayButton position="center" className="big-play-button-hover" />
              
//               {videoEnded && (
//                 <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-t from-richblack-900 via-richblack-800/70 to-transparent p-4 text-center">
//                   <div className="flex flex-col items-center gap-4">
//                     <IconBtn
//                       disabled={loading}
//                       onClick={() => {
//                         playerRef.current?.seek(0);
//                         playerRef.current.play();
//                         setVideoEnded(false);
//                       }}
//                       text="Rewatch"
//                       customClasses="rounded-lg  px-6 py-2 bg-yellow-300  hover:scale-95 transition-all duration-200 disabled:opacity-60"
//                     />
//                     <div className="mt-4 flex flex-wrap justify-center gap-4">
//                       {!isFirstVideo() && (
//                         <button
//                           disabled={loading}
//                           onClick={goToPrevVideo}
//                           className="rounded-lg  px-6 py-2 bg-yellow-300  hover:scale-95 transition-all duration-200 disabled:opacity-60"
//                         >
//                           Previous Lecture
//                         </button>
//                       )}
//                       {!isLastVideo() && (
//                         <button
//                           disabled={loading}
//                           onClick={goToNextVideo}
//                           className="rounded-lg  px-6 py-2 bg-yellow-300  hover:scale-95 transition-all duration-200 disabled:opacity-60"
//                         >
//                           Next Lecture
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </Player>
//           </div>
//         )}
//       </div>

//       {/* Video Info Section */}
//       {/* <div className="rounded-xl bg-richblack-800 p-6 shadow-[0_0_20px_0_rgba(0,0,0,0.3)]">
//         <div className="flex flex-wrap items-start justify-between gap-4">
//           <div className="flex-1 min-w-[300px]">
//             <h1 className="mb-2 text-3xl font-bold text-richblack-5">
//               {videoData?.title || "Untitled Video"}
//             </h1>
//             <p className="text-lg text-richblack-100">
//               {videoData?.description || "No description available"}
//             </p>
//           </div>
//           <div className="flex items-center gap-4">
//             <div className="rounded-full bg-richblack-700 p-3">
//               <span className="text-yellow-50">
//                 {completedLectures.length} / {courseSectionData.reduce((acc, section) => acc + section.subSection.length, 0)} lectures
//               </span>
//             </div>
//           </div>
//         </div>
//       </div> */}

//       {/* Progress Section
//       <div className="mt-6 rounded-xl bg-richblack-800 p-6 shadow-[0_0_20px_0_rgba(0,0,0,0.3)]">
//         <h2 className="mb-4 text-xl font-semibold text-richblack-5">Course Progress</h2>
//         <div className="h-3 w-full rounded-full bg-richblack-700">
//           <div 
//             className="h-3 rounded-full bg-yellow-50 transition-all duration-500" 
//             style={{
//               width: `${(completedLectures.length / courseSectionData.reduce((acc, section) => acc + section.subSection.length, 0)) * 100}%`
//             }}
//           ></div>
//         </div>
//         <p className="mt-2 text-right text-richblack-100">
//           {Math.round((completedLectures.length / courseSectionData.reduce((acc, section) => acc + section.subSection.length, 0)) * 100)}% Complete
//         </p>
//       </div> */}
//     </div>
//   );
// };

// <<<<<<< HEAD
// export default VideoDetails;
// =======
// export default VideoDetails;




// // import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { BigPlayButton, Player } from "video-react";
// import "video-react/dist/video-react.css";
// import IconBtn from "../common/IconBtn";

const VideoDetails = () => {
  // State and hooks initialization
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const playerRef = useRef(null);
  const dispatch = useDispatch();
  
  // Redux state
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData = [], courseEntireData, completedLectures = [] } =
    useSelector((state) => state.viewCourse);

  // Component state
  const [videoData, setVideoData] = useState(null);
  const [previewSource, setPreviewSource] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pdfError, setPdfError] = useState(false);

  // Set video details when params or data changes
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
      setPdfError(false);
    };

    setVideoDetails();
  }, [courseSectionData, courseEntireData, location.pathname, courseId, sectionId, subSectionId, navigate]);

  // Check if current lecture is the first one
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

  // Check if current lecture is the last one
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

    if (currentSubSectionIndex < courseSectionData[currentSectionIndex]?.subSection?.length - 1) {
      const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } 
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

    if (currentSubSectionIndex > 0) {
      const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );
    } 
    else if (currentSectionIndex > 0) {
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length;
      const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]._id;
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      );
    }
  };

  // Check if current content is PDF
  const isPdf = videoData?.videoUrl?.endsWith(".pdf");

  // Handle PDF loading error
  const handlePdfError = () => {
    setPdfError(true);
  };

  return (
    <div className="mx-auto w-full max-w-[1800px] px-4 py-6">
      {/* Video/PDF Player Section */}
      <div className="mb-8 rounded-xl bg-richblack-800 shadow-[0_0_20px_0_rgba(0,0,0,0.3)]">
        {!videoData?.videoUrl ? (
          <div className="flex aspect-video items-center justify-center rounded-t-xl bg-richblack-900">
            <img
              src={previewSource}
              alt="Preview"
              className="h-full w-full rounded-t-xl object-cover"
            />
          </div>
        ) : isPdf ? (
          // PDF Viewer
          <div className="flex aspect-video flex-col items-center justify-center rounded-t-xl bg-richblack-900 p-4">
            {pdfError ? (
              <div className="text-center text-richblack-100">
                <p className="mb-4">Could not load PDF preview</p>
                <a
                  href={videoData.videoUrl}
                  download
                  className="inline-block rounded-lg bg-yellow-50 px-6 py-2 text-richblack-900 hover:scale-95 transition-all duration-200"
                >
                  Download PDF
                </a>
              </div>
            ) : (
              <>
                <iframe
                  src={`https://docs.google.com/gview?url=${encodeURIComponent(
                    videoData.videoUrl
                  )}&embedded=true`}
                  className="h-full w-full"
                  title="PDF Preview"
                  onError={handlePdfError}
                  loading="lazy"
                />
                <div className="mt-4 flex gap-4">
                  <a
                    href={videoData.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-yellow-50 px-6 py-2 text-richblack-900 hover:scale-95 transition-all duration-200"
                  >
                    Open Full PDF
                  </a>
                  <a
                    href={videoData.videoUrl}
                    download
                    className="rounded-lg bg-richblack-600 px-6 py-2 text-yellow-50 hover:scale-95 transition-all duration-200"
                  >
                    Download PDF
                  </a>
                </div>
              </>
            )}
          </div>
        ) : (
          // Video Player
          <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
            <Player
              ref={playerRef}
              aspectRatio="16:9"
              playsInline
              onEnded={() => setVideoEnded(true)}
              src={videoData.videoUrl}
              className="video-player"
            >
              <BigPlayButton position="center" className="big-play-button-hover" />
              
              {videoEnded && (
                <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-t from-richblack-900 via-richblack-800/70 to-transparent p-4 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <IconBtn
                      disabled={loading}
                      onClick={() => {
                        playerRef.current?.seek(0);
                        playerRef.current.play();
                        setVideoEnded(false);
                      }}
                      text="Rewatch"
                      customClasses="rounded-lg px-6 py-2 bg-yellow-300 hover:scale-95 transition-all duration-200 disabled:opacity-60"
                    />
                    <div className="mt-4 flex flex-wrap justify-center gap-4">
                      {!isFirstVideo() && (
                        <button
                          disabled={loading}
                          onClick={goToPrevVideo}
                          className="rounded-lg px-6 py-2 bg-yellow-300 hover:scale-95 transition-all duration-200 disabled:opacity-60"
                        >
                          Previous Lecture
                        </button>
                      )}
                      {!isLastVideo() && (
                        <button
                          disabled={loading}
                          onClick={goToNextVideo}
                          className="rounded-lg px-6 py-2 bg-yellow-300 hover:scale-95 transition-all duration-200 disabled:opacity-60"
                        >
                          Next Lecture
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Player>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoDetails;
// >>>>>>> 66adbf1aa9ed547cd64a1eeda5b04e08a39611a2
