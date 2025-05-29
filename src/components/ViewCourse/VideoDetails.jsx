
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import IconBtn from "../common/IconBtn";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { courseSectionData = [], courseEntireData, completedLectures = [] } =
    useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState(null);
  const [previewSource, setPreviewSource] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pdfError, setPdfError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Could not load content. Please try again later.");
  const [fileType, setFileType] = useState("unknown");

  // File type determination based on URL
  const determineFileType = (url) => {
    if (!url || typeof url !== "string") return "unknown";

    const lowerUrl = url.toLowerCase();

    if (lowerUrl.endsWith(".pdf")) return "pdf";

    if (
      lowerUrl.endsWith(".mp4") ||
      lowerUrl.endsWith(".webm") ||
      lowerUrl.endsWith(".ogg")
    ) {
      return "video";
    }

    if (lowerUrl.includes("cloudinary.com")) {
      if (lowerUrl.includes("/video/")) return "video";
      if (lowerUrl.includes("/raw/")) {
        // Fallback for /raw/: check the extension or assume PDF
        if (
          lowerUrl.endsWith(".mp4") ||
          lowerUrl.endsWith(".webm") ||
          lowerUrl.endsWith(".ogg")
        ) {
          return "video";
        }
        return "pdf";
      }
    }

    return "unknown";
  };

  // Transform Cloudinary URL for video playback
  const transformCloudinaryUrl = (url, type) => {
    if (!url || typeof url !== "string") return "";

    if (!url.includes("cloudinary.com")) return url;

    if (type === "video") {
      let transformed = url;
      if (url.includes("/raw/")) {
        transformed = url.replace("/raw/", "/video/");
      }
      if (
        !transformed.endsWith(".mp4") &&
        !transformed.endsWith(".webm") &&
        !transformed.endsWith(".ogg")
      ) {
        transformed += ".mp4";
      }
      return transformed;
    }

    return url;
  };

  // Verify file type by checking Content-Type header
  const verifyFileType = async (url) => {
    if (!url) return "unknown";

    try {
      const response = await fetch(url, { method: "HEAD" });
      if (!response.ok) {
        setErrorMessage(`File not found (Error ${response.status}). Please contact support. URL: ${url}`);
        return "unknown";
      }

      const contentType = response.headers.get("content-type");
      console.log("Content-Type Header:", contentType);
      if (contentType?.includes("video")) return "video";
      if (contentType?.includes("pdf")) return "pdf";
      return "unknown";
    } catch (error) {
      setErrorMessage(`Failed to verify file: ${error.message}. URL: ${url}`);
      return "unknown";
    }
  };

  // Set video details and determine file type
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

      console.log("Video Data:", filteredVideoData);
      console.log("Video URL:", filteredVideoData?.videoUrl);

      setVideoData(filteredVideoData || null);
      setPreviewSource(courseEntireData?.thumbnail || "");
      setVideoEnded(false);
      setPdfError(false);
      setVideoError(false);
      setErrorMessage("Could not load content. Please try again later.");

      // Determine file type
      if (filteredVideoData?.videoUrl) {
        let detectedType = determineFileType(filteredVideoData.videoUrl);
        console.log("Initial File Type:", detectedType);

        const verifiedType = await verifyFileType(filteredVideoData.videoUrl);
        console.log("Verified File Type:", verifiedType);

        // Use verified type if not "unknown", otherwise fall back to detected type
        if (verifiedType !== "unknown") {
          detectedType = verifiedType;
        }

        setFileType(detectedType);
        console.log("Final File Type:", detectedType);
      } else {
        setFileType("unknown");
      }
    };

    setVideoDetails();
  }, [courseSectionData, courseEntireData, location.pathname, courseId, sectionId, subSectionId, navigate]);

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
    } else if (currentSectionIndex < courseSectionData.length - 1) {
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id;
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    }
  };

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
    } else if (currentSectionIndex > 0) {
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length;
      const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]._id;
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      );
    }
  };

  const handlePdfError = () => {
    setPdfError(true);
  };

  const transformedUrl = transformCloudinaryUrl(videoData?.videoUrl, fileType);

  return (
    <div className="mx-auto w-full max-w-[1800px] px-4 py-6">
      <div className="mb-8 rounded-xl bg-richblack-800 shadow-[0_0_20px_0_rgba(0,0,0,0.3)]">
        {!videoData || !videoData?.videoUrl ? (
          <div className="flex aspect-video items-center justify-center rounded-t-xl bg-richblack-900">
            {previewSource ? (
              <img
                src={previewSource}
                alt="Preview"
                className="h-full w-full rounded-t-xl object-cover"
                onError={() => setPreviewSource("")}
              />
            ) : (
              <p className="text-center text-richblack-100">
                Loading content...
              </p>
            )}
          </div>
        ) : fileType === "pdf" ? (
          <div className="flex aspect-video flex-col items-center justify-center rounded-t-xl bg-richblack-900 p-4">
            {pdfError ? (
              <div className="text-center text-richblack-100">
                <p className="mb-4">Could not load PDF preview</p>
                <a
                  href={videoData.videoUrl}
                  download="lecture.pdf"
                  className="inline-block rounded-lg bg-yellow-50 px-6 py-2 text-richblack-900 hover:scale-95 transition-all duration-200"
                >
                  Download PDF
                </a>
              </div>
            ) : (
              <iframe
                src={`https://docs.google.com/gview?url=${encodeURIComponent(
                  videoData.videoUrl
                )}&embedded=true`}
                className="h-full w-full"
                title="PDF Preview"
                onError={handlePdfError}
                loading="lazy"
              />
            )}
          </div>
        ) : fileType === "video" ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
            {videoError ? (
              <div className="flex aspect-video items-center justify-center rounded-t-xl bg-richblack-900">
                <p className="text-center text-richblack-100">
                  {errorMessage}
                </p>
              </div>
            ) : (
              <video
                controls
                playsInline
                onEnded={() => setVideoEnded(true)}
                onError={() => setVideoError(true)}
                src={transformedUrl}
                className="h-full w-full"
              >
                Your browser does not support the video tag.
              </video>
            )}
            {videoEnded && !videoError && (
              <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-t from-richblack-900 via-richblack-800/70 to-transparent p-4 text-center">
                <div className="flex flex-col items-center gap-4">
                  <IconBtn
                    disabled={loading}
                    onClick={() => {
                      const videoElement = document.querySelector("video");
                      if (videoElement) {
                        videoElement.currentTime = 0;
                        videoElement.play();
                        setVideoEnded(false);
                      }
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
          </div>
        ) : (
          <div className="flex aspect-video items-center justify-center rounded-t-xl bg-richblack-900">
            <p className="text-center text-richblack-100">
              Unsupported file type. {errorMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoDetails;


// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { BigPlayButton, Player } from "video-react";
// import { markLectureAsComplete } from "../../services/operations/courseDetailsAPI";
// import { updateCompletedLectures } from "../../slices/viewCourseSlice";
// import IconBtn from "../../components/common/IconBtn";
// import "video-react/dist/video-react.css";

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
// // >>>>>>> 66adbf1aa9ed547cd64a1eeda5b04e08a39611a2
