import React from 'react';
import { motion } from 'framer-motion';
import ReviewSlider from "../ReviewSlider";
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import gif from "../../assets/header-gif.gif"
import p1 from "../../assets/t1.jpg"
import p2 from "../../assets/man3.jpg"
import p3 from "../../assets/ty.jpg"
import bg from "../../assets/screen-background.avif"

function Home() {
  // Hero section assets
  const codingGifUrl = gif;
  const heroBackground = bg;

  // Student profile images
  const studentImages = [
    p1,
    p2,
    p3,
  ];

  return (
    <div className="bg-gray-900 text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBackground} 
            alt="Abstract tech background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/70 to-gray-900"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Semester Exam
                </span> Preparation Made Easy
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                Get the best resources for your semester exams - curated PDFs, video lectures, and practice materials created by top instructors.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/40"
                >
                  <Link to="/signup">

                   Browse Study Materials
                  </Link>
                </motion.button>
                <button className="px-8 py-3 bg-transparent border-2 border-white/30 text-white font-medium rounded-lg hover:bg-white hover:text-gray-900 transition-colors duration-300">
                <Link to="/signup">
                  Download Free Samples
                </Link>
                </button>
              </div>

              {/* Trust indicators */}
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-gray-300">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {studentImages.slice(0, 3).map((img, i) => (
                      <img 
                        key={i}
                        src={img}
                        alt={`Student ${i+1}`}
                        className="w-10 h-10 rounded-full border-2 border-gray-900 object-cover"
                      />
                    ))}
                  </div>
                  <span>10,000+ Successful Students</span>
                </div>
              </div>
            </motion.div>
            
            {/* GIF animation - made larger */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center w-full"
            >
              <div className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl">
                <img 
                  src={codingGifUrl} 
                  loading="lazy"
                  alt="Professional coding animation" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-brown-400/20 pointer-events-none"></div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scrolling indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      </section>

      {/* Advantage Section */}
      <section className="py-24 px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">NoteX</span> Advantage
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to excel in your semester exams
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Comprehensive Notes",
                description: "Well-structured PDFs covering entire syllabus with highlighted important topics",
                icon: "📚",
                color: "from-blue-500 to-blue-600",
                features: [
                  "Chapter-wise notes",
                  "Diagrams & illustrations",
                  "Exam-focused content"
                ]
              },
              {
                title: "Video Lectures",
                description: "Recorded classes by experienced professors with clear explanations",
                icon: "🎥",
                color: "from-purple-500 to-purple-600",
                features: [
                  "Topic-wise videos",
                  "2x speed option",
                  "Downloadable content"
                ]
              },
              {
                title: "Question Banks",
                description: "Previous year papers with solutions and important questions",
                icon: "📝",
                color: "from-green-500 to-green-600",
                features: [
                  "10+ years papers",
                  "Model answers",
                  "Marking scheme"
                ]
              },
              {
                title: "Doubt Solving",
                description: "Get your questions answered by subject experts",
                icon: "💬",
                color: "from-orange-500 to-orange-600",
                features: [
                  "24/7 Q&A forum",
                  "Live doubt sessions",
                  "Personalized help"
                ]
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="relative group overflow-hidden rounded-2xl shadow-2xl border border-gray-700 transition-all duration-500 bg-gray-800 hover:bg-gray-800/90"
              >
                <div className="p-8 h-full flex flex-col">
                  {/* Icon with gradient background */}
                  <div className={`w-16 h-16 rounded-xl mb-6 flex items-center justify-center text-2xl bg-gradient-to-br ${feature.color} text-white`}>
                    {feature.icon}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300 mb-6">{feature.description}</p>
                  
                  {/* Features list */}
                  <ul className="mt-auto space-y-2">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-5 h-5 text-green-400 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Gradient bottom border */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700"
          >
            {[
              { value: "10,000+", label: "Students Helped" },
              { value: "500+", label: "Study Materials" },
              { value: "4.9★", label: "Average Rating" },
              { value: "24/7", label: "Support Available" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 uppercase text-sm tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <ReviewSlider/>
      <Footer/>
    </div>
  );
}

export default Home;










// real code 

// import React from 'react'
// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import ReviewSlider from "../ReviewSlider"



// function Home() {

//   // section 1
//   const codingGifUrl = "https://media.giphy.com/media/L1R1tvI9svkIWwpVYr/giphy.gif";

//   // section 2
//   const [typedText, setTypedText] = useState('');
//   const [typedCode, setTypedCode] = useState('');
//   const fullText = "Unlock your coding potential with our online courses.";
//   const fullDescription = "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.";
  
//   const codeLines = [
//     '<!DOCTYPE html>',
//     '<html>',
//     '<head>',
//     '  <title>Example</title>',
//     '  <link rel="stylesheet" href="styles.css">',
//     '</head>',
//     '<body>',
//     '  <h1><a href="/">Header</a></h1>',
//     '  <nav>',
//     '    <a href="one">One</a>',
//     '    <a href="two">Two</a>',
//     '    <a href="three">Three</a>',
//     '  </nav>',
//     '</body>',
//     '</html>'
//   ];

//   // Typing animations
//   useEffect(() => {
//     // Header typing
//     let currentIndex = 0;
//     const headerInterval = setInterval(() => {
//       if (currentIndex <= fullText.length) {
//         setTypedText(fullText.substring(0, currentIndex));
//         currentIndex++;
//       } else {
//         clearInterval(headerInterval);
//       }
//     }, 50);

//     // Code typing
//     let currentLine = 0;
//     let currentChar = 0;
//     let fullCode = '';
//     const codeInterval = setInterval(() => {
//       if (currentLine < codeLines.length) {
//         if (currentChar <= codeLines[currentLine].length) {
//           fullCode = codeLines.slice(0, currentLine).join('\n') + '\n' + 
//                     codeLines[currentLine].substring(0, currentChar);
//           setTypedCode(fullCode);
//           currentChar++;
//         } else {
//           currentLine++;
//           currentChar = 0;
//         }
//       } else {
//         clearInterval(codeInterval);
//       }
//     }, 30);

//     return () => {
//       clearInterval(headerInterval);
//       clearInterval(codeInterval);
//     };
//   }, []);

//   //section 3
//   const skills = [
//     {
//       title: "Leadership",
//       description: "Fully committed to the success company",
//       icon: "👨‍💼",
//       image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
//     },
//     {
//       title: "Responsibility",
//       description: "Students will always be our top priority",
//       icon: "🤝",
//       image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
//     },
//     {
//       title: "Flexibility",
//       description: "The ability to switch is an important skills",
//       icon: "🧘",
//       image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
//     },
//     {
//       title: "Solve the problem",
//       description: "Code your way to a solution",
//       icon: "💻",
//       image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
//     }
//   ];

//   return (
//     <div>
//       <div>
//       {/* section 1 */}

//       <section className="relative bg-gray-900 overflow-hidden min-h-[90vh] flex items-center">
//       {/* Animated background elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-1/4 -left-20 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
//         <div className="absolute top-1/2 -right-20 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
//         <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
//       </div>

//       <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10 w-full">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
//           {/* Text content - Improved mobile spacing */}
//           <div className="text-center lg:text-left px-4 sm:px-8 lg:px-0 order-2 lg:order-1 mt-10 lg:mt-0">
//             <motion.h1 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//               className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white mb-6 leading-tight"
//             >
//               Empower Your Future with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-text-gradient">Coding Skills</span>
//             </motion.h1>
            
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="text-lg sm:text-xl text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto lg:mx-0"
//             >
//               With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
//             </motion.p>
            
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.4 }}
//               className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start"
//             >
//               <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/40 transform hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base">
//                 Learn More
//                 <span className="ml-2 inline-block group-hover:animate-bounce">→</span>
//               </button>
//               <button className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-lg sm:rounded-xl hover:bg-white hover:text-gray-900 transition-all duration-300 hover:border-white hover:shadow-lg text-sm sm:text-base">
//                 Book a Demo
//               </button>
//             </motion.div>
//           </div>
          
//           {/* GIF animation - Larger on desktop */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="relative flex justify-center order-1 lg:order-2 w-full h-full"
//           >
//             <div className="relative w-full max-w-[500px] lg:max-w-[600px] xl:max-w-[700px] h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px]">
//               <img 
//                 src={codingGifUrl} 
//                 alt="Coding animation" 
//                 className="absolute inset-0 w-full h-full object-cover rounded-lg lg:rounded-2xl shadow-xl lg:shadow-2xl border-2 lg:border-4 border-white/10 transform hover:scale-[1.02] transition-transform duration-300"
//               />
//               {/* Glowing effect */}
//               <div className="absolute inset-0 rounded-lg lg:rounded-2xl bg-gradient-to-tr from-blue-500/10 to-purple-500/10 blur-lg -z-10"></div>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Floating code elements decoration - Hidden on mobile */}
//       <div className="hidden md:flex absolute bottom-10 left-0 right-0 justify-center space-x-8 opacity-20">
//         {['</>', '{ }', 'console', 'div', '() =>', 'const'].map((item, index) => (
//           <motion.span
//             key={index}
//             initial={{ y: 0 }}
//             animate={{ y: [0, -15, 0] }}
//             transition={{
//               duration: 4 + index,
//               repeat: Infinity,
//               ease: "easeInOut"
//             }}
//             className="text-white font-mono text-lg"
//           >
//             {item}
//           </motion.span>
//         ))}
//       </div>
//     </section>

//       {/* section 2 */}

//       <section className="relative bg-gray-900 text-white pt-12 pb-16 md:pt-16 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
//       <div className="max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
//           {/* Text content */}
//           <div>
//             <motion.h1 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//               className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight"
//             >
//               {typedText}
//               <span className="inline-block w-2 h-8 bg-blue-500 ml-1 animate-blink"></span>
//             </motion.h1>
            
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 1.5, duration: 0.8 }}
//               className="text-lg text-gray-300 mb-8 max-w-2xl"
//             >
//               {fullDescription}
//             </motion.p>
            
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 2, duration: 0.5 }}
//               className="flex flex-wrap gap-4"
//             >
//               <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/30">
//                 Try it Yourself →
//               </button>
//               <button className="px-6 py-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-medium rounded-lg transition-colors duration-300">
//                 Learn More
//               </button>
//             </motion.div>
//           </div>

//           {/* Code block */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.5, duration: 0.8 }}
//             className="bg-gray-800 rounded-lg overflow-hidden shadow-xl border border-gray-700"
//           >
//             <div className="bg-gray-700 px-4 py-3 flex items-center">
//               <div className="flex space-x-2 mr-4">
//                 <div className="w-3 h-3 rounded-full bg-red-500"></div>
//                 <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
//                 <div className="w-3 h-3 rounded-full bg-green-500"></div>
//               </div>
//               <div className="text-sm font-medium">
//                 <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
//                   example.html
//                 </span>
//               </div>
//             </div>
//             <div className="p-4 font-mono text-sm">
//               <div className="text-gray-500 mb-4">// Start coding in seconds</div>
//               {typedCode.split('\n').map((line, index) => (
//                 <div key={index} className="flex">
//                   <span className="text-gray-500 w-8 flex-shrink-0">{index + 1}</span>
//                   <span className="text-gray-300">
//                     {line.split('').map((char, charIndex) => {
//                       let colorClass = 'text-gray-300';
//                       if (char === '<' || char === '>' || char === '/' || char === '"') {
//                         colorClass = 'text-purple-400';
//                       } else if (line.trim().startsWith('<') && !line.includes('=')) {
//                         colorClass = 'text-blue-400';
//                       } else if (line.includes('=')) {
//                         colorClass = 'text-yellow-300';
//                       }
//                       return (
//                         <span 
//                           key={charIndex} 
//                           className={colorClass}
//                           style={{
//                             opacity: charIndex < line.length ? 1 : 0.5,
//                             transition: 'opacity 0.1s'
//                           }}
//                         >
//                           {char}
//                         </span>
//                       );
//                     })}
//                   </span>
//                 </div>
//               ))}
//               {typedCode.length > 0 && (
//                 <span className="inline-block w-2 h-4 bg-blue-500 ml-1 animate-blink"></span>
//               )}
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Background elements */}
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
//         <div className="absolute top-1/4 -left-20 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
//         <div className="absolute top-1/2 -right-20 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
//       </div>
//     </section>
      

//       {/* section 3 */}

//       <section className="bg-gray-900 pb-24">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16 pt-0">
//           <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
//             Get the skills you need for a job that is in demand.
//           </h2>
//           <p className="text-lg text-gray-300 max-w-3xl mx-auto">
//             The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
//           {skills.map((skill, index) => (
//             <motion.div 
//               key={index}
//               whileHover={{ y: -5 }}
//               className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-purple-500/30 transition-all duration-300 border border-gray-700 group"
//             >
//               <div className="h-48 overflow-hidden relative">
//                 <img 
//                   src={skill.image} 
//                   alt={skill.title}
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
//                 <div className="absolute bottom-4 left-4 text-5xl">{skill.icon}</div>
//               </div>
//               <div className="p-6 relative">
//                 <div className="absolute -top-5 right-5 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white">
//                   {index + 1}
//                 </div>
//                 <h3 className="text-xl font-bold text-white mb-2">{skill.title}</h3>
//                 <p className="text-gray-400">{skill.description}</p>
//                 <div className="mt-4 pt-4 border-t border-gray-700 flex justify-end">
//                   <button className="text-sm text-purple-400 hover:text-purple-300 flex items-center">
//                     Read more <span className="ml-1">→</span>
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         <div className="text-center">
//           <motion.button 
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-300 mb-12 shadow-lg hover:shadow-purple-500/40"
//           >
//             Learn More
//           </motion.button>
          
//           <div className="flex flex-col sm:flex-row justify-center items-center gap-8 text-gray-300">
//             <div className="text-center">
//               <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">10+</div>
//               <div className="text-lg uppercase tracking-wider">Years Experience</div>
//             </div>
//             <div className="hidden sm:block w-px h-16 bg-gray-700"></div>
//             <div className="text-center">
//               <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">250+</div>
//               <div className="text-lg uppercase tracking-wider">Course Types</div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className='text-white mt-10 ml-15'>
//         <ReviewSlider/>
//       </div>
//     </section>


   
//       {/* footer */}

//     </div>
//     </div>
//   )
// }

// export default Home;