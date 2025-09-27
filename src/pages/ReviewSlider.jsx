import React from "react";
import ReactStars from "react-stars";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { FaStar } from "react-icons/fa";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

function ReviewSlider() {
  // Static reviews data
  const staticReviews = [
    {
      user: {
        firstName: "Rahul",
        lastName: "Sharma",
        image: "https://api.dicebear.com/7.x/initials/svg?seed=Rahul Sharma"
      },
      course: {
        courseName: "Full Stack Web Development"
      },
      rating: 4.8,
      review: "This course completely transformed my coding skills. The instructors are amazing and the projects are very practical. I landed a job within 2 months of completing the course!"
    },
    {
      user: {
        firstName: "Priya",
        lastName: "Patel",
        image: "https://api.dicebear.com/7.x/initials/svg?seed=Priya Patel"
      },
      course: {
        courseName: "Data Science Master"
      },
      rating: 4.9,
      review: "Excellent course content and fantastic. The hands projects helped me understand complex concepts easily."
    },
    {
      user: {
        firstName: "Amit",
        lastName: "Kumar",
        image: "https://api.dicebear.com/7.x/initials/svg?seed=Amit Kumar"
      },
      course: {
        courseName: "Android App Development"
      },
      rating: 4.7,
      review: "The course structure is well organized and the instructors are very knowledgeable. I built 5 real-world apps during the course which boosted my confidence."
    },
    {
      user: {
        firstName: "Neha",
        lastName: "Verma",
        image: "https://api.dicebear.com/7.x/initials/svg?seed=Neha Verma"
      },
      course: {
        courseName: "UI/UX Design"
      },
      rating: 4.6,
      review: "As a beginner in design, this course was perfect for me. The step-by-step approach and practical assignments helped me build a strong portfolio."
    },
    {
      user: {
        firstName: "Sanjay",
        lastName: "Gupta",
        image: "https://api.dicebear.com/7.x/initials/svg?seed=Sanjay Gupta"
      },
      course: {
        courseName: "Digital Marketing"
      },
      rating: 4.5,
      review: "Comprehensive course covering all aspects of digital marketing. The case studies and real-world examples made learning very effective."
    },
    {
      user: {
        firstName: "Anjali",
        lastName: "Singh",
        image: "https://api.dicebear.com/7.x/initials/svg?seed=Anjali Singh"
      },
      course: {
        courseName: "Machine Learning"
      },
      rating: 4.8,
      review: "Challenging but rewarding course. The instructors break  complex ML algorithms into understandable concepts."
    }
  ];

  const [reviews, setReviews] = React.useState(staticReviews);
  const truncateWords = 15;

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
// import { FaStar } from "react-icons/fa";
// import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
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

//   // Component for each review card with glow, tilt, and animations
//   const ReviewCard = ({ review, index }) => {
//     const x = useMotionValue(0);
//     const y = useMotionValue(0);

//     // Smoothly animate the glow position using useSpring for a natural feel
//     const springX = useSpring(x, { stiffness: 100, damping: 20 });
//     const springY = useSpring(y, { stiffness: 100, damping: 20 });

//     // Transform mouse position into tilt angles
//     const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
//     const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);

//     const handleMouseMove = (event) => {
//       const rect = event.currentTarget.getBoundingClientRect();
//       const mouseX = event.clientX - rect.left;
//       const mouseY = event.clientY - rect.top;
//       const centerX = rect.width / 2;
//       const centerY = rect.height / 2;
//       const normalizedX = (mouseX - centerX) / centerX;
//       const normalizedY = (mouseY - centerY) / centerY;
//       x.set(mouseX);
//       y.set(mouseY);
//       rotateX.set(normalizedY);
//       rotateY.set(normalizedX);
//     };

//     const handleMouseLeave = () => {
//       x.set(0);
//       y.set(0);
//       rotateX.set(0);
//       rotateY.set(0);
//     };

//     return (
//       <motion.div
//         className="flex flex-col h-full bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-yellow-500/30 relative overflow-hidden"
//         onMouseMove={handleMouseMove}
//         onMouseLeave={handleMouseLeave}
//         initial={{ opacity: 0, y: 50, scale: 0.95 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
//         whileHover={{ scale: 1.03 }}
//         style={{ rotateX, rotateY, perspective: 1000 }}
//       >
//         {/* Glow Effect */}
//         <motion.div
//           className="absolute inset-0 pointer-events-none"
//           style={{
//             background: `radial-gradient(circle 120px at ${springX}px ${springY}px, rgba(255,165,0,0.25), rgba(59,130,246,0.25), transparent)`,
//             opacity: 0,
//           }}
//           whileHover={{
//             opacity: [0.8, 0.4, 0.8],
//             transition: { duration: 1.2, repeat: Infinity },
//           }}
//         />

//         {/* User Info */}
//         <div className="flex items-center gap-4 mb-4 relative z-10">
//           <motion.img
//             src={
//               review?.user?.image ||
//               `https://api.dicebear.com/7.x/initials/svg?seed=${
//                 review?.user?.firstName || "User"
//               } ${review?.user?.lastName || ""}`
//             }
//             loading="lazy"
//             alt={`${review?.user?.firstName || "User"} ${
//               review?.user?.lastName || ""
//             }`}
//             className="h-14 w-14 rounded-full object-cover border-2 border-yellow-500/50 shadow-sm"
//             whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
//           />
//           <div className="flex-1 min-w-0">
//             <motion.h3
//               className="text-lg font-semibold text-white truncate"
//               initial={{ x: -20, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               {`${review?.user?.firstName || "User"} ${
//                 review?.user?.lastName || ""
//               }`}
//             </motion.h3>
//             <motion.p
//               className="text-sm text-gray-400 truncate"
//               initial={{ x: -20, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ duration: 0.5, delay: 0.3 }}
//             >
//               {review?.course?.courseName || "Course"}
//             </motion.p>
//           </div>
//         </div>

//         {/* Rating */}
//         <motion.div
//           className="flex items-center gap-3 mb-4 relative z-10"
//           initial={{ scale: 0.8, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//         >
//           <span className="text-lg font-bold text-yellow-400">
//             {(review?.rating || 0).toFixed(1)}
//           </span>
//           <ReactStars
//             count={5}
//             value={review?.rating || 0}
//             size={22}
//             edit={false}
//             activeColor="#ffd700"
//             emptyIcon={<FaStar className="text-gray-600" />}
//             fullIcon={<FaStar className="text-yellow-400" />}
//           />
//         </motion.div>

//         {/* Review Text */}
//         <motion.div
//           className="flex-1 relative z-10"
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.5 }}
//         >
//           <p className="text-gray-200 text-sm leading-relaxed line-clamp-4">
//             {review?.review?.split(" ").length > truncateWords
//               ? `${review.review
//                   .split(" ")
//                   .slice(0, truncateWords)
//                   .join(" ")}...`
//               : review?.review || "No review text"}
//           </p>
//         </motion.div>

//         {/* Read More Button */}
//         {review?.review?.split(" ").length > truncateWords && (
//           <motion.button
//             className="mt-4 text-sm font-medium text-yellow-400 hover:text-yellow-300 transition-colors duration-200 self-start relative z-10"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.6 }}
//             whileHover={{ x: 5 }}
//           >
//             Read more
//           </motion.button>
//         )}
//       </motion.div>
//     );
//   };

//   return (
//     <div className="bg-gradient-to-b from-gray-900 to-gray-800 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
//       <div className="mx-auto max-w-7xl relative">
//         {/* Decorative background elements */}
//         <div className="absolute inset-0 -z-10">
//           <motion.div
//             className="absolute top-0 left-10 w-48 h-48 bg-orange-500/25 rounded-full filter blur-2xl"
//             animate={{ opacity: [0.3, 0.6, 0.3] }}
//             transition={{ duration: 3, repeat: Infinity }}
//           />
//           <motion.div
//             className="absolute bottom-0 right-10 w-48 h-48 bg-blue-500/25 rounded-full filter blur-2xl"
//             animate={{ opacity: [0.3, 0.6, 0.3] }}
//             transition={{ duration: 3, repeat: Infinity, delay: 1 }}
//           />
//         </div>

//         <motion.h2
//           className="text-3xl md:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-400 mb-12 tracking-tight relative group"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{
//             duration: 0.8,
//             type: "spring",
//             stiffness: 100,
//             damping: 15,
//           }}
//         >
//           Hear From Our Learners
//           {/* Underline effect on hover */}
//           <span className="absolute left-1/2 bottom-0 -translate-x-1/2 h-1 w-0 bg-gradient-to-r from-orange-400 to-blue-400 rounded-full transition-all duration-500 group-hover:w-1/3" />
//         </motion.h2>

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
//                 <ReviewCard review={review} index={i} />
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ReviewSlider;