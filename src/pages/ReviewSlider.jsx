import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { FaStar } from "react-icons/fa";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
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

  // Component for each review card with glow, tilt, and animations
  const ReviewCard = ({ review, index }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smoothly animate the glow position using useSpring for a natural feel
    const springX = useSpring(x, { stiffness: 100, damping: 20 });
    const springY = useSpring(y, { stiffness: 100, damping: 20 });

    // Transform mouse position into tilt angles
    const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
    const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);

    const handleMouseMove = (event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const normalizedX = (mouseX - centerX) / centerX;
      const normalizedY = (mouseY - centerY) / centerY;
      x.set(mouseX);
      y.set(mouseY);
      rotateX.set(normalizedY);
      rotateY.set(normalizedX);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
      rotateX.set(0);
      rotateY.set(0);
    };

    return (
      <motion.div
        className="flex flex-col h-full bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-yellow-500/30 relative overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
        whileHover={{ scale: 1.03 }}
        style={{ rotateX, rotateY, perspective: 1000 }}
      >
        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle 120px at ${springX}px ${springY}px, rgba(255,165,0,0.25), rgba(59,130,246,0.25), transparent)`,
            opacity: 0,
          }}
          whileHover={{
            opacity: [0.8, 0.4, 0.8],
            transition: { duration: 1.2, repeat: Infinity },
          }}
        />

        {/* User Info */}
        <div className="flex items-center gap-4 mb-4 relative z-10">
          <motion.img
            src={
              review?.user?.image ||
              `https://api.dicebear.com/7.x/initials/svg?seed=${
                review?.user?.firstName || "User"
              } ${review?.user?.lastName || ""}`
            }
            loading="lazy"
            alt={`${review?.user?.firstName || "User"} ${
              review?.user?.lastName || ""
            }`}
            className="h-14 w-14 rounded-full object-cover border-2 border-yellow-500/50 shadow-sm"
            whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
          />
          <div className="flex-1 min-w-0">
            <motion.h3
              className="text-lg font-semibold text-white truncate"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {`${review?.user?.firstName || "User"} ${
                review?.user?.lastName || ""
              }`}
            </motion.h3>
            <motion.p
              className="text-sm text-gray-400 truncate"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {review?.course?.courseName || "Course"}
            </motion.p>
          </div>
        </div>

        {/* Rating */}
        <motion.div
          className="flex items-center gap-3 mb-4 relative z-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <span className="text-lg font-bold text-yellow-400">
            {(review?.rating || 0).toFixed(1)}
          </span>
          <ReactStars
            count={5}
            value={review?.rating || 0}
            size={22}
            edit={false}
            activeColor="#ffd700"
            emptyIcon={<FaStar className="text-gray-600" />}
            fullIcon={<FaStar className="text-yellow-400" />}
          />
        </motion.div>

        {/* Review Text */}
        <motion.div
          className="flex-1 relative z-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-gray-200 text-sm leading-relaxed line-clamp-4">
            {review?.review?.split(" ").length > truncateWords
              ? `${review.review
                  .split(" ")
                  .slice(0, truncateWords)
                  .join(" ")}...`
              : review?.review || "No review text"}
          </p>
        </motion.div>

        {/* Read More Button */}
        {review?.review?.split(" ").length > truncateWords && (
          <motion.button
            className="mt-4 text-sm font-medium text-yellow-400 hover:text-yellow-300 transition-colors duration-200 self-start relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ x: 5 }}
          >
            Read more
          </motion.button>
        )}
      </motion.div>
    );
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="mx-auto max-w-7xl relative">
        {/* Decorative background elements */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute top-0 left-10 w-48 h-48 bg-orange-500/25 rounded-full filter blur-2xl"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 right-10 w-48 h-48 bg-blue-500/25 rounded-full filter blur-2xl"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          />
        </div>

        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-400 mb-12 tracking-tight relative group"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
        >
          Hear From Our Learners
          {/* Underline effect on hover */}
          <span className="absolute left-1/2 bottom-0 -translate-x-1/2 h-1 w-0 bg-gradient-to-r from-orange-400 to-blue-400 rounded-full transition-all duration-500 group-hover:w-1/3" />
        </motion.h2>

        <div className="relative">
          <Swiper
            slidesPerView={1}
            spaceBetween={24}
            loop={true}
            freeMode={true}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[FreeMode, Autoplay, Navigation]}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className="!py-8"
          >
            {reviews.map((review, i) => (
              <SwiperSlide key={i}>
                <ReviewCard review={review} index={i} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default ReviewSlider;


// import React, { useEffect, useState } from "react";
// import ReactStars from "react-stars";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, FreeMode, Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/navigation";
// import "swiper/css/autoplay";
// import { FaStar, FaQuoteLeft } from "react-icons/fa";
// import { apiConnector } from "../services/apiConnector";
// import { ratingsEndpoints } from "../services/apis";

// function ReviewSlider() {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const truncateWords = 25;

//   useEffect(() => {
//     const fetchReviews = async () => {
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
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReviews();
//   }, []);

//   // Skeleton loader
//   if (loading) {
//     return (
//       <div className="bg-richblack-900 py-16 px-4 sm:px-6 lg:px-8">
//         <div className="mx-auto max-w-7xl">
//           <div className="h-12 w-64 bg-richblack-800 rounded-lg mx-auto mb-12 animate-pulse"></div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[...Array(3)].map((_, i) => (
//               <div key={i} className="bg-richblack-800 p-6 rounded-xl h-64 animate-pulse">
//                 <div className="flex items-center gap-4 mb-4">
//                   <div className="h-12 w-12 rounded-full bg-richblack-700"></div>
//                   <div className="flex-1 space-y-2">
//                     <div className="h-4 w-3/4 bg-richblack-700 rounded"></div>
//                     <div className="h-3 w-1/2 bg-richblack-700 rounded"></div>
//                   </div>
//                 </div>
//                 <div className="h-4 w-1/4 bg-richblack-700 rounded mb-4"></div>
//                 <div className="space-y-2">
//                   <div className="h-3 w-full bg-richblack-700 rounded"></div>
//                   <div className="h-3 w-5/6 bg-richblack-700 rounded"></div>
//                   <div className="h-3 w-4/6 bg-richblack-700 rounded"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-richblack-900 py-16 px-4 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-7xl">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-4xl font-bold text-richblack-5 mb-4">
//             Voices of Success
//           </h2>
//           <p className="text-lg text-richblack-300 max-w-2xl mx-auto">
//             Hear from our students who transformed their careers with NoteX
//           </p>
//         </div>
        
//         <div className="relative">
//           <Swiper
//             slidesPerView={1}
//             spaceBetween={32}
//             loop={true}
//             freeMode={true}
//             autoplay={{
//               delay: 5000,
//               disableOnInteraction: false,
//               pauseOnMouseEnter: true,
//             }}
//             navigation={{
//               nextEl: ".review-swiper-button-next",
//               prevEl: ".review-swiper-button-prev",
//             }}
//             modules={[FreeMode, Autoplay, Navigation]}
//             breakpoints={{
//               640: {
//                 slidesPerView: 1.5,
//                 spaceBetween: 24,
//               },
//               768: {
//                 slidesPerView: 2,
//                 spaceBetween: 24,
//               },
//               1024: {
//                 slidesPerView: 3,
//                 spaceBetween: 32,
//               },
//               1280: {
//                 slidesPerView: 3,
//                 spaceBetween: 32,
//               },
//             }}
//             className="!pb-12"
//           >
//             {reviews.map((review, i) => (
//               <SwiperSlide key={i}>
//                 <div className="flex flex-col h-full bg-gradient-to-b from-richblack-800 to-richblack-700 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-richblack-600 hover:border-yellow-50/30 group">
//                   {/* Quote icon */}
//                   <FaQuoteLeft className="text-yellow-50 opacity-20 text-4xl mb-4 group-hover:opacity-30 transition-opacity" />
                  
//                   {/* Rating */}
//                   <div className="flex items-center gap-2 mb-4">
//                     <ReactStars
//                       count={5}
//                       value={review?.rating || 0}
//                       size={20}
//                       edit={false}
//                       activeColor="#ffd700"
//                       emptyIcon={<FaStar className="text-richblack-400" />}
//                       fullIcon={<FaStar className="text-yellow-400" />}
//                     />
//                     <span className="text-lg font-bold text-yellow-50">
//                       {(review?.rating || 0).toFixed(1)}
//                     </span>
//                   </div>

//                   {/* Review Text */}
//                   <div className="flex-1 mb-6">
//                     <p className="text-richblack-100 line-clamp-5 text-lg leading-relaxed">
//                       {review?.review?.split(" ").length > truncateWords
//                         ? `${review.review
//                             .split(" ")
//                             .slice(0, truncateWords)
//                             .join(" ")}...`
//                         : review?.review || "No review text"}
//                     </p>
//                   </div>

//                   {/* User Info */}
//                   <div className="flex items-center gap-4 pt-4 border-t border-richblack-600">
//                     <img
//                       src={
//                         review?.user?.image ||
//                         `https://api.dicebear.com/5.x/initials/svg?seed=${
//                           review?.user?.firstName || "User"
//                         } ${review?.user?.lastName || ""}&backgroundType=gradientLinear&fontWeight=500`
//                       }
//                       alt={`${review?.user?.firstName || "User"} ${
//                         review?.user?.lastName || ""
//                       }`}
//                       className="h-14 w-14 rounded-full object-cover border-2 border-yellow-50/50 group-hover:border-yellow-50 transition-all"
//                     />
//                     <div className="flex-1 min-w-0">
//                       <h3 className="font-semibold text-richblack-5 text-lg truncate">
//                         {`${review?.user?.firstName || "User"} ${
//                           review?.user?.lastName || ""
//                         }`}
//                       </h3>
//                       <p className="text-richblack-300 truncate">
//                         {review?.course?.courseName || "StudyNotion Student"}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>

//           {/* Custom Navigation */}
//           <div className="flex justify-center gap-4 mt-8">
//             <button className="review-swiper-button-prev bg-richblack-800 hover:bg-richblack-700 text-yellow-50 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//             </button>
//             <button className="review-swiper-button-next bg-richblack-800 hover:bg-richblack-700 text-yellow-50 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ReviewSlider;


// import React, { useEffect, useState } from "react";
// import ReactStars from "react-stars";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, FreeMode, Navigation, EffectFade } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/navigation";
// import "swiper/css/autoplay";
// import "swiper/css/effect-fade";
// import { FaStar, FaQuoteLeft } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { apiConnector } from "../services/apiConnector";
// import { ratingsEndpoints } from "../services/apis";

// function ReviewSlider() {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const truncateWords = 25;

//   useEffect(() => {
//     const fetchReviews = async () => {
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
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReviews();
//   }, []);

//   // Skeleton loader
//   if (loading) {
//     return (
//       <div className="bg-gradient-to-b from-richblack-900 to-richblack-800 py-20 px-4 sm:px-6 lg:px-8">
//         <div className="mx-auto max-w-7xl">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="text-center mb-16"
//           >
//             <div className="h-12 w-64 bg-richblack-800 rounded-lg mx-auto mb-4 animate-pulse"></div>
//             <div className="h-4 w-80 bg-richblack-800 rounded mx-auto animate-pulse"></div>
//           </motion.div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[...Array(3)].map((_, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: i * 0.1 }}
//                 className="bg-richblack-800 p-6 rounded-xl h-80 animate-pulse"
//               >
//                 <div className="flex items-center gap-4 mb-4">
//                   <div className="h-12 w-12 rounded-full bg-richblack-700"></div>
//                   <div className="flex-1 space-y-2">
//                     <div className="h-4 w-3/4 bg-richblack-700 rounded"></div>
//                     <div className="h-3 w-1/2 bg-richblack-700 rounded"></div>
//                   </div>
//                 </div>
//                 <div className="h-4 w-1/4 bg-richblack-700 rounded mb-4"></div>
//                 <div className="space-y-2">
//                   <div className="h-3 w-full bg-richblack-700 rounded"></div>
//                   <div className="h-3 w-5/6 bg-richblack-700 rounded"></div>
//                   <div className="h-3 w-4/6 bg-richblack-700 rounded"></div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gradient-to-b from-richblack-900 to-richblack-800 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
//       <div className="mx-auto max-w-7xl">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-3xl md:text-4xl font-bold text-richblack-5 mb-4">
//             <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
//               Success Stories
//             </span>
//           </h2>
//           <p className="text-lg text-richblack-300 max-w-2xl mx-auto">
//             Hear from our students who transformed their careers with StudyNotion
//           </p>
//         </motion.div>
        
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 0.8, delay: 0.3 }}
//           viewport={{ once: true }}
//           className="relative"
//         >
//           <Swiper
//             slidesPerView={1}
//             spaceBetween={32}
//             loop={true}
//             freeMode={true}
//             autoplay={{
//               delay: 5000,
//               disableOnInteraction: false,
//               pauseOnMouseEnter: true,
//             }}
//             navigation={{
//               nextEl: ".review-swiper-button-next",
//               prevEl: ".review-swiper-button-prev",
//             }}
//             modules={[FreeMode, Autoplay, Navigation, EffectFade]}
//             effect="fade"
//             fadeEffect={{ crossFade: true }}
//             speed={1000}
//             breakpoints={{
//               640: {
//                 slidesPerView: 1.2,
//                 spaceBetween: 24,
//                 effect: "slide",
//               },
//               768: {
//                 slidesPerView: 1.5,
//                 spaceBetween: 24,
//                 effect: "slide",
//               },
//               1024: {
//                 slidesPerView: 2.5,
//                 spaceBetween: 32,
//                 effect: "slide",
//               },
//               1280: {
//                 slidesPerView: 3,
//                 spaceBetween: 32,
//                 effect: "slide",
//               },
//             }}
//             className="!pb-16"
//           >
//             {reviews.map((review, i) => (
//               <SwiperSlide key={i}>
//                 <motion.div
//                   whileHover={{ y: -10 }}
//                   transition={{ duration: 0.3 }}
//                   className="flex flex-col h-full bg-gradient-to-b from-richblack-800 to-richblack-700 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-richblack-600 hover:border-yellow-50/30 group relative overflow-hidden"
//                 >
//                   {/* Animated background element */}
//                   <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-yellow-500 rounded-full filter blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                  
//                   {/* Quote icon */}
//                   <FaQuoteLeft className="text-yellow-50 opacity-20 text-4xl mb-4 group-hover:opacity-30 transition-all duration-500" />
                  
//                   {/* Rating */}
//                   <div className="flex items-center gap-2 mb-4">
//                     <ReactStars
//                       count={5}
//                       value={review?.rating || 0}
//                       size={20}
//                       edit={false}
//                       activeColor="#ffd700"
//                       emptyIcon={<FaStar className="text-richblack-400" />}
//                       fullIcon={<FaStar className="text-yellow-400" />}
//                     />
//                     <motion.span 
//                       className="text-lg font-bold text-yellow-50"
//                       initial={{ scale: 0.9 }}
//                       animate={{ scale: 1 }}
//                       transition={{ duration: 0.5 }}
//                     >
//                       {(review?.rating || 0).toFixed(1)}
//                     </motion.span>
//                   </div>

//                   {/* Review Text */}
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5, delay: 0.2 }}
//                     className="flex-1 mb-6"
//                   >
//                     <p className="text-richblack-100 line-clamp-5 text-lg leading-relaxed">
//                       {review?.review?.split(" ").length > truncateWords
//                         ? `${review.review
//                             .split(" ")
//                             .slice(0, truncateWords)
//                             .join(" ")}...`
//                         : review?.review || "No review text"}
//                     </p>
//                   </motion.div>

//                   {/* User Info */}
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.5, delay: 0.3 }}
//                     className="flex items-center gap-4 pt-4 border-t border-richblack-600"
//                   >
//                     <motion.div
//                       whileHover={{ scale: 1.05 }}
//                       className="relative"
//                     >
//                       <img
//                         src={
//                           review?.user?.image ||
//                           `https://api.dicebear.com/5.x/initials/svg?seed=${
//                             review?.user?.firstName || "User"
//                           } ${review?.user?.lastName || ""}&backgroundType=gradientLinear&fontWeight=500`
//                         }
//                         alt={`${review?.user?.firstName || "User"} ${
//                           review?.user?.lastName || ""
//                         }`}
//                         className="h-14 w-14 rounded-full object-cover border-2 border-yellow-50/50 group-hover:border-yellow-50 transition-all duration-300"
//                       />
//                       <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-yellow-100/30 transition-all duration-500"></div>
//                     </motion.div>
//                     <div className="flex-1 min-w-0">
//                       <h3 className="font-semibold text-richblack-5 text-lg truncate">
//                         {`${review?.user?.firstName || "User"} ${
//                           review?.user?.lastName || ""
//                         }`}
//                       </h3>
//                       <p className="text-richblack-300 truncate">
//                         {review?.course?.courseName || "StudyNotion Student"}
//                       </p>
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               </SwiperSlide>
//             ))}
//           </Swiper>

//           {/* Custom Navigation */}
//           <div className="flex justify-center gap-4 mt-8">
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               className="review-swiper-button-prev bg-richblack-800 hover:bg-yellow-600 text-yellow-50 p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-yellow-500/20"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               className="review-swiper-button-next bg-richblack-800 hover:bg-yellow-600 text-yellow-50 p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-yellow-500/20"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </motion.button>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// export default ReviewSlider;






// import React, { useEffect, useState } from "react";
// import ReactStars from "react-stars";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, FreeMode, Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/navigation";
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
//     <div className="bg-gradient-to-b from-gray-900 to-gray-800 py-16 px-4 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-7xl">
//         <h2 className="text-3xl md:text-4xl font-extrabold text-center text-white mb-12 tracking-tight">
//           What Our Students Say
//         </h2>
        
//         <div className="relative">
//           <Swiper
//             slidesPerView={1}
//             spaceBetween={24}
//             loop={true}
//             freeMode={true}
//             navigation={{
//               nextEl: ".swiper-button-next",
//               prevEl: ".swiper-button-prev",
//             }}
//             autoplay={{
//               delay: 3000,
//               disableOnInteraction: false,
//               pauseOnMouseEnter: true,
//             }}
//             modules={[FreeMode, Autoplay, Navigation]}
//             breakpoints={{
//               640: {
//                 slidesPerView: 2,
//                 spaceBetween: 16,
//               },
//               1024: {
//                 slidesPerView: 3,
//                 spaceBetween: 20,
//               },
//               1280: {
//                 slidesPerView: 4,
//                 spaceBetween: 24,
//               },
//             }}
//             className="!py-8"
//           >
//             {reviews.map((review, i) => (
//               <SwiperSlide key={i}>
//                 <div className="flex flex-col h-full bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-yellow-500/30 transform hover:-translate-y-1">
//                   {/* User Info */}
//                   <div className="flex items-center gap-4 mb-4">
//                     <img
//                       src={
//                         review?.user?.image ||
//                         `https://api.dicebear.com/7.x/initials/svg?seed=${
//                           review?.user?.firstName || "User"
//                         } ${review?.user?.lastName || ""}`
//                       }
//                       alt={`${review?.user?.firstName || "User"} ${
//                         review?.user?.lastName || ""
//                       }`}
//                       className="h-14 w-14 rounded-full object-cover border-2 border-yellow-500/50 shadow-sm"
//                     />
//                     <div className="flex-1 min-w-0">
//                       <h3 className="text-lg font-semibold text-white truncate">
//                         {`${review?.user?.firstName || "User"} ${
//                           review?.user?.lastName || ""
//                         }`}
//                       </h3>
//                       <p className="text-sm text-gray-400 truncate">
//                         {review?.course?.courseName || "Course"}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Rating */}
//                   <div className="flex items-center gap-3 mb-4">
//                     <span className="text-lg font-bold text-yellow-400">
//                       {(review?.rating || 0).toFixed(1)}
//                     </span>
//                     <ReactStars
//                       count={5}
//                       value={review?.rating || 0}
//                       size={22}
//                       edit={false}
//                       activeColor="#ffd700"
//                       emptyIcon={<FaStar className="text-gray-600" />}
//                       fullIcon={<FaStar className="text-yellow-400" />}
//                     />
//                   </div>

//                   {/* Review Text */}
//                   <div className="flex-1">
//                     <p className="text-gray-200 text-sm leading-relaxed line-clamp-4">
//                       {review?.review?.split(" ").length > truncateWords
//                         ? `${review.review
//                             .split(" ")
//                             .slice(0, truncateWords)
//                             .join(" ")}...`
//                         : review?.review || "No review text"}
//                     </p>
//                   </div>

//                   {/* Read More Button */}
//                   {review?.review?.split(" ").length > truncateWords && (
//                     <button className="mt-4 text-sm font-medium text-yellow-400 hover:text-yellow-300 transition-colors duration-200 self-start">
//                       Read more
//                     </button>
//                   )}
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>

//           {/* Custom Navigation Arrows
//           <div className="hidden md:flex justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 z-10 pointer-events-none">
//             <button className="swiper-button-prev pointer-events-auto bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110">
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
//               </svg>
//             </button>
//             <button className="swiper-button-next pointer-events-auto bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110">
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           </div> */}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ReviewSlider;






// real code 
// import React, { useEffect, useState } from "react";
// import ReactStars from "react-stars";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, FreeMode } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/autoplay";
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
//     <div className="bg-richblack-900 py-16 px-4 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-7xl">
//         <h2 className="text-3xl font-bold text-center text-richblack-5 mb-12">
//           What Our Students Say
//         </h2>
        
//         <div className="relative">
//           <Swiper
//             slidesPerView={1}
//             spaceBetween={24}
//             loop={true}
//             freeMode={true}
//             autoplay={{
//               delay: 3000,
//               disableOnInteraction: false,
//               pauseOnMouseEnter: true,
//             }}
//             modules={[FreeMode, Autoplay]}
//             breakpoints={{
//               640: {
//                 slidesPerView: 2,
//               },
//               1024: {
//                 slidesPerView: 3,
//               },
//               1280: {
//                 slidesPerView: 4,
//               },
//             }}
//             className="!py-4"
//           >
//             {reviews.map((review, i) => (
//               <SwiperSlide key={i}>
//                 <div className="flex flex-col h-full bg-richblack-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-richblack-700 hover:border-yellow-50/20">
//                   {/* User Info */}
//                   <div className="flex items-center gap-4 mb-4">
//                     <img
//                       src={
//                         review?.user?.image ||
//                         `https://api.dicebear.com/5.x/initials/svg?seed=${
//                           review?.user?.firstName || "User"
//                         } ${review?.user?.lastName || ""}`
//                       }
//                       alt={`${review?.user?.firstName || "User"} ${
//                         review?.user?.lastName || ""
//                       }`}
//                       className="h-12 w-12 rounded-full object-cover border-2 border-yellow-50"
//                     />
//                     <div className="flex-1 min-w-0">
//                       <h3 className="font-semibold text-richblack-5 truncate">
//                         {`${review?.user?.firstName || "User"} ${
//                           review?.user?.lastName || ""
//                         }`}
//                       </h3>
//                       <p className="text-sm text-richblack-300 truncate">
//                         {review?.course?.courseName || "Course"}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Rating */}
//                   <div className="flex items-center gap-2 mb-4">
//                     <div className="flex-shrink-0">
//                       <span className="text-lg font-bold text-yellow-50">
//                         {(review?.rating || 0).toFixed(1)}
//                       </span>
//                     </div>
//                     <ReactStars
//                       count={5}
//                       value={review?.rating || 0}
//                       size={20}
//                       edit={false}
//                       activeColor="#ffd700"
//                       emptyIcon={<FaStar className="text-richblack-400" />}
//                       fullIcon={<FaStar className="text-yellow-400" />}
//                     />
//                   </div>

//                   {/* Review Text */}
//                   <div className="flex-1">
//                     <p className="text-richblack-100 line-clamp-4">
//                       {review?.review?.split(" ").length > truncateWords
//                         ? `${review.review
//                             .split(" ")
//                             .slice(0, truncateWords)
//                             .join(" ")}...`
//                         : review?.review || "No review text"}
//                     </p>
//                   </div>

//                   {/* Read More Button (if truncated) */}
//                   {review?.review?.split(" ").length > truncateWords && (
//                     <button className="mt-3 text-sm font-medium text-yellow-50 hover:text-yellow-100 transition-colors self-start">
//                       Read more
//                     </button>
//                   )}
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>

//           {/* Navigation Arrows (custom implementation if needed) */}
//           <div className="hidden md:flex justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 z-10 pointer-events-none">
//             {/* <button className="pointer-events-auto bg-richblack-700 hover:bg-richblack-600 text-white p-2 rounded-full shadow-lg transition-all">
//               &larr;
//             </button>
//             <button className="pointer-events-auto bg-richblack-700 hover:bg-richblack-600 text-white p-2 rounded-full shadow-lg transition-all">
//               &rarr;
//             </button> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ReviewSlider;  