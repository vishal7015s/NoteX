import React from 'react';
import { FaHeart, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-700">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Section - Logo and Description */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent mb-4">
              NoteX
            </h2>
            <p className="text-sm text-gray-400 text-center md:text-left max-w-xs">
            A dedicated platform for students, providing high-quality courses and resources to excel in exams and reach their academic goals.
            </p>
            <div className="flex gap-4 mt-4">
              <a
                href="https://x.com/vishal_7015s"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/vishalshivhare7015s/?trk=opento_sprofile_goalscard"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
            </div>
          </div>

          {/* Middle Section - Navigation Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-center md:text-left">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300"
                >
                  Contact Us
                </Link>
              <li>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Right Section - Contact Info */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-white mb-4">Get in Touch</h3>
            <p className="text-sm text-gray-400 mb-2">Email: vishalshivhare7015@gmail.com</p>
            <p className="text-sm text-gray-400 mb-2">Phone: +91 8839801254</p>
            <p className="text-sm text-gray-400">Address: 123 Learning St, Knowledge City, 12345</p>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-500">
            Made  <FaHeart className="inline text-purple-400" /> by{' '}
            <a
              href="https://codehelp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
            >
              vishal & vishal
            </a>{' '}
            © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



// import React from 'react';

// const Footer = () => {
//   return (
//     <footer className="bg-gray-900 text-gray-300 py-8 px-4 sm:px-6 border-t border-gray-800">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col md:flex-row justify-between items-center">
//           {/* Left side - Logo */}
//           <div className="mb-4 md:mb-0">
//             <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
//               StudyNotion
//             </h2>
//           </div>

//           {/* Middle - Links */}
//           <div className="flex flex-wrap justify-center gap-4 mb-4 md:mb-0">
//             <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
//               Privacy Policy
//             </a>
//             <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
//               Cookie Policy
//             </a>
//             <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
//               Terms
//             </a>
//           </div>

//           {/* Right side - Copyright */}
//           <div className="text-sm text-gray-500">
//             Made with <span className="text-purple-400">♥</span> by <span className="text-blue-400">CodeHelp</span> © 2023
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
