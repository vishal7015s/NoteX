import React from 'react';
import codingGif from './coding-animation.gif'; // Replace with your actual GIF file

const HeroSection = () => {
  return (
    <section className="relative bg-gray-900 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/30 to-gray-900/80"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="relative z-10 text-center md:text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Empower Your Future with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Coding Skills</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl"
            >
              With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/30">
                Learn More
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300">
                Book a Demo
              </button>
            </motion.div>
          </div>
          
          {/* GIF animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 flex justify-center"
          >
            <div className="relative w-full max-w-lg">
              <img 
                src={codingGif} 
                alt="Coding animation" 
                className="rounded-xl shadow-2xl border-4 border-white/10"
              />
              {/* Glowing effect around the GIF */}
              <div className="absolute inset-0 rounded-xl bg-blue-500/10 blur-xl -z-10"></div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Floating elements for visual interest */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
    </section>
  );
};

export default HeroSection;