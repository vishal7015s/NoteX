// import React, { useEffect, useState } from "react";
// import ReactStars from "react-stars";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, FreeMode } from "swiper/modules"; // Updated import path
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/autoplay"; // Added autoplay CSS
// import { FaStar } from "react-icons/fa";
// import { apiConnector } from "../services/apiConnector";
// import { ratingsEndpoints } from "../services/apis";

// function ReviewSlider() {
//   const [reviews, setReviews] = useState([]);
//   const truncateWords = 15;

//   useEffect(() => {
//     (async () => {
//       try {
//         const { data } = await apiConnector(
//           "GET",
//           ratingsEndpoints.REVIEWS_DETAILS_API
//         );
//         if (data?.success) {
//           setReviews(data?.data || []);
//         }
//       } catch (error) {
//         console.error("Error fetching reviews:", error);
//       }
//     })();
//   }, []);

//   return (
//     <div className="text-white">
//       <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
//         <Swiper
//           slidesPerView={4}
//           spaceBetween={25}
//           loop={true}
//           freeMode={true}
//           autoplay={{
//             delay: 2500,
//             disableOnInteraction: false,
//             pauseOnMouseEnter: true, // Added for better UX
//           }}
//           modules={[FreeMode, Autoplay]} // Removed Pagination since it's not used
//           className="w-[50vw]"
//           breakpoints={{
//             // Responsive breakpoints
//             320: {
//               slidesPerView: 1,
//             },
//             640: {
//               slidesPerView: 2,
//             },
//             1024: {
//               slidesPerView: 3,
//             },
//             1280: {
//               slidesPerView: 4,
//             },
//           }}
//         >
//           {reviews.map((review, i) => (
//             <SwiperSlide key={i}>
//               <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25">
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={
//                       review?.user?.image ||
//                       `https://api.dicebear.com/5.x/initials/svg?seed=${
//                         review?.user?.firstName || "User"
//                       } ${review?.user?.lastName || ""}`
//                     }
//                     alt={`${review?.user?.firstName || "User"} ${
//                       review?.user?.lastName || ""
//                     }`}
//                     className="h-9 w-9 rounded-full object-cover"
//                   />
//                   <div className="flex flex-col">
//                     <h1 className="font-semibold text-richblack-5">
//                       {`${review?.user?.firstName || "User"} ${
//                         review?.user?.lastName || ""
//                       }`}
//                     </h1>
//                     <h2 className="text-[12px] font-medium text-richblack-500">
//                       {review?.course?.courseName || "Course"}
//                     </h2>
//                   </div>
//                 </div>
//                 <p className="font-medium text-richblack-25">
//                   {review?.review?.split(" ").length > truncateWords
//                     ? `${review.review
//                         .split(" ")
//                         .slice(0, truncateWords)
//                         .join(" ")}...`
//                     : review?.review || "No review text"}
//                 </p>
//                 <div className="flex items-center gap-2">
//                   <h3 className="font-semibold text-yellow-100">
//                     {(review?.rating || 0).toFixed(1)}
//                   </h3>
//                   <ReactStars
//                     count={5}
//                     value={review?.rating || 0}
//                     size={20}
//                     edit={false}
//                     activeColor="#ffd700"
//                     emptyIcon={<FaStar />}
//                     fullIcon={<FaStar />}
//                   />
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// }

// export default ReviewSlider;




import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import { FaStar } from "react-icons/fa";
import { apiConnector } from "../services/apiConnector";
import { ratingsEndpoints } from "../services/apis";

function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        );
        if (data?.success) {
          setReviews(data?.data || []);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    })();
  }, []);

  return (
    <div className="bg-richblack-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-center text-richblack-5 mb-12">
          What Our Students Say
        </h2>
        
        <div className="relative">
          <Swiper
            slidesPerView={1}
            spaceBetween={24}
            loop={true}
            freeMode={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[FreeMode, Autoplay]}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
            className="!py-4"
          >
            {reviews.map((review, i) => (
              <SwiperSlide key={i}>
                <div className="flex flex-col h-full bg-richblack-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-richblack-700 hover:border-yellow-50/20">
                  {/* User Info */}
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={
                        review?.user?.image ||
                        `https://api.dicebear.com/5.x/initials/svg?seed=${
                          review?.user?.firstName || "User"
                        } ${review?.user?.lastName || ""}`
                      }
                      alt={`${review?.user?.firstName || "User"} ${
                        review?.user?.lastName || ""
                      }`}
                      className="h-12 w-12 rounded-full object-cover border-2 border-yellow-50"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-richblack-5 truncate">
                        {`${review?.user?.firstName || "User"} ${
                          review?.user?.lastName || ""
                        }`}
                      </h3>
                      <p className="text-sm text-richblack-300 truncate">
                        {review?.course?.courseName || "Course"}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex-shrink-0">
                      <span className="text-lg font-bold text-yellow-50">
                        {(review?.rating || 0).toFixed(1)}
                      </span>
                    </div>
                    <ReactStars
                      count={5}
                      value={review?.rating || 0}
                      size={20}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar className="text-richblack-400" />}
                      fullIcon={<FaStar className="text-yellow-400" />}
                    />
                  </div>

                  {/* Review Text */}
                  <div className="flex-1">
                    <p className="text-richblack-100 line-clamp-4">
                      {review?.review?.split(" ").length > truncateWords
                        ? `${review.review
                            .split(" ")
                            .slice(0, truncateWords)
                            .join(" ")}...`
                        : review?.review || "No review text"}
                    </p>
                  </div>

                  {/* Read More Button (if truncated) */}
                  {review?.review?.split(" ").length > truncateWords && (
                    <button className="mt-3 text-sm font-medium text-yellow-50 hover:text-yellow-100 transition-colors self-start">
                      Read more
                    </button>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows (custom implementation if needed) */}
          <div className="hidden md:flex justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 z-10 pointer-events-none">
            {/* <button className="pointer-events-auto bg-richblack-700 hover:bg-richblack-600 text-white p-2 rounded-full shadow-lg transition-all">
              &larr;
            </button>
            <button className="pointer-events-auto bg-richblack-700 hover:bg-richblack-600 text-white p-2 rounded-full shadow-lg transition-all">
              &rarr;
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewSlider;  