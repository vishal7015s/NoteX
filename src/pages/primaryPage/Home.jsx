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
                        loading='lazy'
                        src={img}
                        alt={`Student ${i+1}`}
                        className="w-10 h-10 rounded-full border-2 border-gray-900 object-cover"
                      />
                    ))}
                  </div>
                  <span>+300 Students</span>
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