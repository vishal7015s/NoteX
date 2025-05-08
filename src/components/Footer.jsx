import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-4 sm:px-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left side - Logo */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              StudyNotion
            </h2>
          </div>

          {/* Middle - Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-4 md:mb-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookie Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms
            </a>
          </div>

          {/* Right side - Copyright */}
          <div className="text-sm text-gray-500">
            Made with <span className="text-purple-400">♥</span> by <span className="text-blue-400">CodeHelp</span> © 2023
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;