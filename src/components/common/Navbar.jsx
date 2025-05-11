import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { NavbarLinks } from '../../data/navbar-links';
import { useSelector } from 'react-redux';
import { FaBars, FaTimes } from "react-icons/fa";
import ProfileDropDown from "../profileDropDown"
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/apis';
import { TfiArrowCircleDown } from "react-icons/tfi";
// import { FaCartShopping } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";


function Navbar() {
    const {token} = useSelector( (state) => state.auth);
    const {user} = useSelector( (state) => state.profile);
    const {totalItems} = useSelector( (state) => state.cart);
    const [subLinks, setSubLinks] = useState([]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [catalogDropdownOpen, setCatalogDropdownOpen] = useState(false);
    const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false);

    const fetchSubLinks = async() => {
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            setSubLinks(result.data.data);
        }
        catch(error) {
            console.log("could not fetch the category list", error);
        }
    }

    useEffect(() => {
        fetchSubLinks();
    }, []);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
        setCatalogDropdownOpen(false);
        setMobileCatalogOpen(false);
    };

    const toggleCatalogDropdown = () => {
        setCatalogDropdownOpen(!catalogDropdownOpen);
    };

    const toggleMobileCatalog = () => {
        setMobileCatalogOpen(!mobileCatalogOpen);
    };

    return (
        <div className='bg-gradient-to-r from-gray-800 to-indigo-900 shadow-xl sticky top-0 z-50'>
            <div className='container w-11/12 mx-auto px-4 py-4'>
                <div className='flex items-center justify-between'>
                    {/* Logo */}
                    <Link to="/" className='group'>
                        <span className='text-2xl sm:text-3xl font-bold text-white bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-lg'>
                            NoteX
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className='hidden md:flex items-center space-x-8'>
                        <ul className='flex space-x-6'>
                            {NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    {link.title === "Catlog" ? (
                                        <div className='relative group'>
                                            <button 
                                                onClick={toggleCatalogDropdown}
                                                className='flex items-center text-gray-200 hover:text-amber-400 font-medium text-lg transition-colors duration-200 group'
                                            >
                                                {link.title}
                                                <TfiArrowCircleDown className={`ml-2 transition-transform duration-300 ${catalogDropdownOpen ? 'transform rotate-180' : ''} group-hover:rotate-180`} />
                                            </button>

                                            {catalogDropdownOpen && (
                                                <div className='absolute left-0 mt-3 w-56 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl shadow-2xl py-2 z-50 border border-gray-600 transform transition-all duration-300 animate-slideDown'>
                                                    <div className='px-4 py-2 border-b border-gray-600'>
                                                        <span className='text-sm font-semibold text-gray-200'>Categories</span>
                                                    </div>
                                                    {subLinks.map((sublink, i) => (
                                                        <Link 
                                                            key={i}
                                                            to={`/catlog/${sublink.name.split(" ").join("-").toLowerCase()}`}
                                                            className='block px-4 py-3 text-sm text-gray-200 hover:bg-indigo-700 hover:text-amber-400 transition-colors duration-200'
                                                            onClick={() => setCatalogDropdownOpen(false)}
                                                        >
                                                            {sublink.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <Link 
                                            to={link?.path}
                                            className='text-gray-200 hover:text-amber-400 font-medium text-lg transition-colors duration-200'
                                        >
                                            {link.title}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Mobile Auth Buttons (Login/Signup) */}
                    <div className='md:hidden flex items-center space-x-2'>
                        {token === null ? (
                            <>
                                <Link to="/login">
                                    <button className='px-3 py-1.5 text-gray-200 hover:text-amber-400 font-semibold text-sm border border-gray-500 rounded-lg hover:bg-gray-700 transition-all duration-300'>
                                        Login
                                    </button>
                                </Link>
                                <Link to="/signup">
                                    <button className='px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 rounded-lg hover:from-yellow-500 hover:to-orange-600 font-semibold text-sm transition-all duration-300 transform hover:scale-105'>
                                        Signup
                                    </button>
                                </Link>
                            </>
                        ) : (
                            <ProfileDropDown />
                        )}
                    </div>

                    {/* Desktop Auth/Cart/Profile */}
                    <div className='hidden md:flex items-center space-x-6'>
                        {user && user?.accountType !== "Instructor" && (
                            <Link to="/dashboard/cart" className='relative text-gray-200 hover:text-amber-400 group'>
                                <BsCart4 size={24} className='transform group-hover:scale-110 transition-transform duration-200' />
                                {totalItems > 0 && (
                                    <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full animate-bounce'>
                                        {totalItems}
                                    </span>
                                )}
                            </Link>
                        )}

                        {token === null ? (
                            <>
                                <Link to="/login">
                                    <button className='px-4 py-2 text-gray-200 hover:text-amber-400 font-semibold border border-gray-500 rounded-lg hover:bg-gray-700 transition-all duration-300'>
                                        Login
                                    </button>
                                </Link>
                                <Link to="/signup">
                                    <button className='px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 rounded-lg hover:from-yellow-500 hover:to-orange-600 font-semibold transition-all duration-300 transform hover:scale-105'>
                                        Signup
                                    </button>
                                </Link>
                            </>
                        ) : (
                            <ProfileDropDown />
                        )}
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className='mt-4 pb-4 bg-gray-800/95 rounded-xl'>
                            <ul className='space-y-2'>
                                {NavbarLinks.map((link, index) => (
                                    <li key={index}>
                                        {link.title === "Catlog" ? (
                                            <div className='relative'>
                                                <button 
                                                    onClick={toggleMobileCatalog}
                                                    className='flex items-center justify-between w-full px-4 py-3 text-gray-200 hover:bg-indigo-700 rounded-lg text-lg font-semibold transition-colors duration-200'
                                                >
                                                    <span>{link.title}</span>
                                                    <TfiArrowCircleDown className={`transition-transform duration-300 ${mobileCatalogOpen ? 'transform rotate-180' : ''}`} />
                                                </button>

                                                {mobileCatalogOpen && (
                                                    <div className='ml-4 mt-1 bg-gray-900 rounded-lg py-1 animate-slideDown'>
                                                        {subLinks.map((sublink, i) => (
                                                            <Link 
                                                                key={i}
                                                                to={`/category/${sublink.name.split(" ").join("-").toLowerCase()}`}
                                                                className='block px-4 py-3 text-gray-200 hover:bg-indigo-700 hover:text-amber-400 rounded-lg text-md transition-colors duration-200'
                                                                onClick={() => {
                                                                    setMobileMenuOpen(false);
                                                                    setMobileCatalogOpen(false);
                                                                }}
                                                            >
                                                                {sublink.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <Link 
                                                to={link?.path}
                                                className='block px-4 py-3 text-gray-200 hover:bg-indigo-700 rounded-lg text-lg font-semibold transition-colors duration-200'
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {link.title}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>

                            <div className='mt-4 pt-4 border-t border-gray-600'>
                                {user && user?.accountType !== "Instructor" && (
                                    <Link 
                                        to="/dashboard/cart" 
                                        className='flex items-center px-4 py-3 text-gray-200 hover:bg-indigo-700 rounded-lg text-lg font-semibold transition-colors duration-200'
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <span className='mr-2'>Cart</span>
                                        <BsCart4/>
                                        {totalItems > 0 && (
                                            <span className='ml-2 bg-red-500 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full animate-pulse'>
                                                {totalItems}
                                            </span>
                                        )}
                                    </Link>
                                )}

                                {token === null ? (
                                    <div className='flex space-x-2 mt-3 px-4'>
                                        <Link 
                                            to="/login" 
                                            className='flex-1 text-center px-4 py-3 border border-gray-500 text-gray-200 rounded-lg hover:bg-gray-700 text-lg font-semibold transition-all duration-300'
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Login
                                        </Link>
                                        <Link 
                                            to="/signup" 
                                            className='flex-1 text-center px-4 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 rounded-lg hover:from-yellow-500 hover:to-orange-600 text-lg font-semibold transition-all duration-300 transform hover:scale-105'
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Signup
                                        </Link>
                                    </div>
                                ) : (
                                    <div className='mt-3 px-4'>
                                        <ProfileDropDown mobileClose={() => setMobileMenuOpen(false)} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes slideDown {
                    from {
                        transform: translateY(-10px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                .animate-slideDown {
                    animation: slideDown 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    )
}

export default Navbar


// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { NavbarLinks } from '../../data/navbar-links';
// import { useSelector } from 'react-redux';
// import { FaBars, FaTimes } from "react-icons/fa";
// import ProfileDropDown from "../profileDropDown"
// import { apiConnector } from '../../services/apiConnector';
// import { categories } from '../../services/apis';
// import { TfiArrowCircleDown } from "react-icons/tfi";
// import { FaCartShopping } from "react-icons/fa6";

// function Navbar() {
//     const {token} = useSelector( (state) => state.auth);
//     const {user} = useSelector( (state) => state.profile);
//     const {totalItems} = useSelector( (state) => state.cart);
//     const [subLinks, setSubLinks] = useState([]);
//     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//     const [catalogDropdownOpen, setCatalogDropdownOpen] = useState(false);
//     const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false);

//     const fetchSubLinks = async() => {
//         try{
//             const result = await apiConnector("GET", categories.CATEGORIES_API);
//             setSubLinks(result.data.data);
//         }
//         catch(error){
//             console.log("could not fetch the category list", error);
//         }
//     }

//     useEffect( () => {
//         fetchSubLinks();
//     },[]);

//     const toggleMobileMenu = () => {
//         setMobileMenuOpen(!mobileMenuOpen);
//         setCatalogDropdownOpen(false);
//         setMobileCatalogOpen(false);
//     };

//     const toggleCatalogDropdown = () => {
//         setCatalogDropdownOpen(!catalogDropdownOpen);
//     };

//     const toggleMobileCatalog = () => {
//         setMobileCatalogOpen(!mobileCatalogOpen);
//     };

//     return (
//         <div className='bg-gradient-to-r from-blue-100 to-indigo-100 shadow-lg sticky top-0 z-50'>
//             <div className='container w-11/12 mx-auto px-4 py-4'>
//                 <div className='flex items-center justify-between'>
//                     {/* Logo */}
//                     <Link to="/" className='flex items-center group'>
//                         <img 
//                             src='https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books_23-2149342941.jpg?w=200' 
//                             alt='NoteX Logo' 
//                             className='h-12 w-12 mr-3 rounded-lg object-cover transform group-hover:scale-110 transition-transform duration-300'
//                         />
//                         <span className='text-2xl font-extrabold text-indigo-600 hidden sm:block bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300 animate-pulse'>NoteX</span>
//                     </Link>

//                     {/* Desktop Navigation */}
//                     <nav className='hidden md:flex items-center space-x-8'>
//                         <ul className='flex space-x-6'>
//                             {NavbarLinks.map((link, index) => (
//                                 <li key={index}>
//                                     {link.title === "Catlog" ? (
//                                         <div className='relative group'>
//                                             <button 
//                                                 onClick={toggleCatalogDropdown}
//                                                 className='flex items-center text-indigo-600 hover:text-yellow-500 font-semibold text-lg transition-colors duration-200 group'
//                                             >
//                                                 {link.title}
//                                                 <TfiArrowCircleDown className={`ml-2 transition-transform duration-300 ${catalogDropdownOpen ? 'transform rotate-180' : ''} group-hover:rotate-180`} />
//                                             </button>

//                                             {catalogDropdownOpen && (
//                                                 <div className='absolute left-0 mt-3 w-56 bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl shadow-2xl py-2 z-50 border border-gray-300 transform transition-all duration-300 animate-slideDown'>
//                                                     <div className='px-4 py-2 border-b border-gray-300'>
//                                                         <span className='text-sm font-semibold text-gray-700'>Categories</span>
//                                                     </div>
//                                                     {subLinks.map((sublink, i) => (
//                                                         <Link 
//                                                             key={i}
//                                                             to={`/catlog/${sublink.name.split(" ").join("-").toLowerCase()}`}
//                                                             className='block px-4 py-3 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 transition-colors duration-200'
//                                                             onClick={() => setCatalogDropdownOpen(false)}
//                                                         >
//                                                             {sublink.name}
//                                                         </Link>
//                                                     ))}
//                                                 </div>
//                                             )}
//                                         </div>
//                                     ) : (
//                                         <Link 
//                                             to={link?.path}
//                                             className='text-indigo-600 hover:text-yellow-500 font-semibold text-lg transition-colors duration-200'
//                                         >
//                                             {link.title}
//                                         </Link>
//                                     )}
//                                 </li>
//                             ))}
//                         </ul>
//                     </nav>

//                     {/* Mobile Auth Buttons (Login/Signup) */}
//                     <div className='md:hidden flex items-center space-x-2'>
//                         {token === null ? (
//                             <>
//                                 <Link to="/login">
//                                     <button className='px-3 py-1.5 text-indigo-600 hover:text-yellow-500 font-semibold text-sm border border-indigo-300 rounded-lg hover:bg-indigo-50 transition-all duration-300'>
//                                         Login
//                                     </button>
//                                 </Link>
//                                 <Link to="/signup">
//                                     <button className='px-3 py-1.5 bg-gradient-to-r from-yellow-300 to-pink-300 text-indigo-600 rounded-lg hover:from-yellow-400 hover:to-pink-400 font-semibold text-sm transition-all duration-300 transform hover:scale-105'>
//                                         Signup
//                                     </button>
//                                 </Link>
//                             </>
//                         ) : (
//                             <ProfileDropDown />
//                         )}
//                     </div>

//                     {/* Desktop Auth/Cart/Profile */}
//                     <div className='hidden md:flex items-center space-x-6'>
//                         {user && user?.accountType !== "Instructor" && (
//                             <Link to="/dashboard/cart" className='relative text-indigo-600 hover:text-yellow-500 group'>
//                                 <FaCartShopping size={24} className='transform group-hover:scale-110 transition-transform duration-200' />
//                                 {totalItems > 0 && (
//                                     <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full animate-bounce'>
//                                         {totalItems}
//                                     </span>
//                                 )}
//                             </Link>
//                         )}

//                         {token === null ? (
//                             <>
//                                 <Link to="/login">
//                                     <button className='px-4 py-2 text-indigo-600 hover:text-yellow-500 font-semibold border border-indigo-300 rounded-lg hover:bg-indigo-50 transition-all duration-300'>
//                                         Login
//                                     </button>
//                                 </Link>
//                                 <Link to="/signup">
//                                     <button className='px-4 py-2 bg-gradient-to-r from-yellow-300 to-pink-300 text-indigo-600 rounded-lg hover:from-yellow-400 hover:to-pink-400 font-semibold transition-all duration-300 transform hover:scale-105'>
//                                         Signup
//                                     </button>
//                                 </Link>
//                             </>
//                         ) : (
//                             <ProfileDropDown />
//                         )}
//                     </div>
//                 </div>

//                 {/* Mobile Menu */}
//                 {mobileMenuOpen && (
//                     <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
//                         <div className='mt-4 pb-4 bg-gray-50/95 rounded-xl'>
//                             <ul className='space-y-2'>
//                                 {NavbarLinks.map((link, index) => (
//                                     <li key={index}>
//                                         {link.title === "Catlog" ? (
//                                             <div className='relative'>
//                                                 <button 
//                                                     onClick={toggleMobileCatalog}
//                                                     className='flex items-center justify-between w-full px-4 py-3 text-indigo-600 hover:bg-indigo-100 rounded-lg text-lg font-semibold transition-colors duration-200'
//                                                 >
//                                                     <span>{link.title}</span>
//                                                     <TfiArrowCircleDown className={`transition-transform duration-300 ${mobileCatalogOpen ? 'transform rotate-180' : ''}`} />
//                                                 </button>

//                                                 {mobileCatalogOpen && (
//                                                     <div className='ml-4 mt-1 bg-gray-100 rounded-lg py-1 animate-slideDown'>
//                                                         {subLinks.map((sublink, i) => (
//                                                             <Link 
//                                                                 key={i}
//                                                                 to={`/category/${sublink.name.split(" ").join("-").toLowerCase()}`}
//                                                                 className='block px-4 py-3 text-gray-700 hover:bg-indigo-200 hover:text-indigo-600 rounded-lg text-md transition-colors duration-200'
//                                                                 onClick={() => {
//                                                                     setMobileMenuOpen(false);
//                                                                     setMobileCatalogOpen(false);
//                                                                 }}
//                                                             >
//                                                                 {sublink.name}
//                                                             </Link>
//                                                         ))}
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         ) : (
//                                             <Link 
//                                                 to={link?.path}
//                                                 className='block px-4 py-3 text-indigo-600 hover:bg-indigo-100 rounded-lg text-lg font-semibold transition-colors duration-200'
//                                                 onClick={() => setMobileMenuOpen(false)}
//                                             >
//                                                 {link.title}
//                                             </Link>
//                                         )}
//                                     </li>
//                                 ))}
//                             </ul>

//                             <div className='mt-4 pt-4 border-t border-gray-300'>
//                                 {user && user?.accountType !== "Instructor" && (
//                                     <Link 
//                                         to="/dashboard/cart" 
//                                         className='flex items-center px-4 py-3 text-indigo-600 hover:bg-indigo-100 rounded-lg text-lg font-semibold transition-colors duration-200'
//                                         onClick={() => setMobileMenuOpen(false)}
//                                     >
//                                         <span className='mr-2'>Cart</span>
//                                         <FaCartShopping />
//                                         {totalItems > 0 && (
//                                             <span className='ml-2 bg-red-500 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full animate-pulse'>
//                                                 {totalItems}
//                                             </span>
//                                         )}
//                                     </Link>
//                                 )}

//                                 {token === null ? (
//                                     <div className='flex space-x-2 mt-3 px-4'>
//                                         <Link 
//                                             to="/login" 
//                                             className='flex-1 text-center px-4 py-3 border border-gray-300 text-indigo-600 rounded-lg hover:bg-indigo-50 text-lg font-semibold transition-all duration-300'
//                                             onClick={() => setMobileMenuOpen(false)}
//                                         >
//                                             Login
//                                         </Link>
//                                         <Link 
//                                             to="/signup" 
//                                             className='flex-1 text-center px-4 py-3 bg-gradient-to-r from-yellow-300 to-pink-300 text-indigo-600 rounded-lg hover:from-yellow-400 hover:to-pink-400 text-lg font-semibold transition-all duration-300 transform hover:scale-105'
//                                             onClick={() => setMobileMenuOpen(false)}
//                                         >
//                                             Signup
//                                         </Link>
//                                     </div>
//                                 ) : (
//                                     <div className='mt-3 px-4'>
//                                         <ProfileDropDown mobileClose={() => setMobileMenuOpen(false)} />
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             <style>{`
//                 @keyframes slideDown {
//                     from {
//                         transform: translateY(-10px);
//                         opacity: 0;
//                     }
//                     to {
//                         transform: translateY(0);
//                         opacity: 1;
//                     }
//                 }
//                 .animate-slideDown {
//                     animation: slideDown 0.3s ease-out forwards;
//                 }
//             `}</style>
//         </div>
//     )
// }

// export default Navbar



// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { NavbarLinks } from '../../data/navbar-links';
// import { useSelector } from 'react-redux';
// import { FaBars, FaTimes } from "react-icons/fa";
// import ProfileDropDown from "../profileDropDown"
// import { apiConnector } from '../../services/apiConnector';
// import { categories } from '../../services/apis';
// import { TfiArrowCircleDown } from "react-icons/tfi";
// import { FaCartShopping } from "react-icons/fa6";


// function Navbar() {
//     const {token} = useSelector( (state) => state.auth);
//     const {user} = useSelector( (state) => state.profile);
//     const {totalItems} = useSelector( (state) => state.cart);
//     const [subLinks, setSubLinks] = useState([]);
//     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//     const [catalogDropdownOpen, setCatalogDropdownOpen] = useState(false);
//     const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false);

//     const fetchSubLinks = async() => {
//         try{
//             const result = await apiConnector("GET", categories.CATEGORIES_API);
//             setSubLinks(result.data.data);
//         }
//         catch(error){
//             console.log("could not fetch the category list", error);
//         }
//     }

//     useEffect( () => {
//         fetchSubLinks();
//     },[]);

//     const toggleMobileMenu = () => {
//         setMobileMenuOpen(!mobileMenuOpen);
//         setCatalogDropdownOpen(false);
//         setMobileCatalogOpen(false);
//     };

//     const toggleCatalogDropdown = () => {
//         setCatalogDropdownOpen(!catalogDropdownOpen);
//     };

//     const toggleMobileCatalog = () => {
//         setMobileCatalogOpen(!mobileCatalogOpen);
//     };

//     return (
//         <div className='bg-white shadow-md sticky top-0 z-50'>
//             <div className='container w-11/12 mx-auto px-4 py-3'>
//                 <div className='flex items-center justify-between'>
//                     {/* Logo */}
//                     <Link to="/" className='flex items-center'>
//                         <img 
//                             src='https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books_23-2149342941.jpg?w=200' 
//                             alt='NoteX Logo' 
//                             className='h-10 w-10 mr-2 rounded-md object-cover'
//                         />
//                         <span className='text-xl font-bold text-blue-600 hidden sm:block'>NoteX</span>
//                     </Link>

//                     {/* Desktop Navigation */}
//                     <nav className='hidden md:flex items-center space-x-8'>
//                         <ul className='flex space-x-6'>
//                             {NavbarLinks.map((link, index) => (
//                                 <li key={index}>
//                                     {link.title === "Catlog" ? (
//                                         <div className='relative'>
//                                             <button 
//                                                 onClick={toggleCatalogDropdown}
//                                                 className='flex items-center text-gray-700 hover:text-blue-600 font-medium text-lg'
//                                             >
//                                                 {link.title}
//                                                 <TfiArrowCircleDown className={`ml-1 transition-transform ${catalogDropdownOpen ? 'transform rotate-180' : ''}`} />
//                                             </button>

//                                             {catalogDropdownOpen && (
//                                                 <div className='absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100'>
//                                                     <div className='px-4 py-2 border-b border-gray-200'>
//                                                         <span className='text-sm font-semibold text-gray-700'>Categories</span>
//                                                     </div>
//                                                     {subLinks.map((sublink, i) => (
//                                                         <Link 
//                                                             key={i}
//                                                             to={`/catlog/${sublink.name.split(" ").join("-").toLowerCase()}`}
//                                                             className='block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600'
//                                                             onClick={() => setCatalogDropdownOpen(false)}
//                                                         >
//                                                             {sublink.name}
//                                                         </Link>
//                                                     ))}
//                                                 </div>
//                                             )}
//                                         </div>
//                                     ) : (
//                                         <Link 
//                                             to={link?.path}
//                                             className='text-gray-700 hover:text-blue-600 font-medium text-lg'
//                                         >
//                                             {link.title}
//                                         </Link>
//                                     )}
//                                 </li>
//                             ))}
//                         </ul>
//                     </nav>

//                     {/* Mobile menu button */}
//                     <div className='md:hidden'>
//                         <button 
//                             onClick={toggleMobileMenu}
//                             className='text-gray-700 hover:text-blue-600 focus:outline-none transition-all duration-300'
//                         >
//                             {mobileMenuOpen ? (
//                                 <FaTimes size={24} className='text-red-500' />
//                             ) : (
//                                 <FaBars size={24} />
//                             )}
//                         </button>
//                     </div>

//                     {/* Desktop Auth/Cart/Profile */}
//                     <div className='hidden md:flex items-center space-x-4'>
//                         {user && user?.accountType !== "Instructor" && (
//                             <Link to="/dashboard/cart" className='relative text-gray-700 hover:text-blue-600'>
//                                 <FaCartShopping size={20} />
//                                 {totalItems > 0 && (
//                                     <span className='absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full'>
//                                         {totalItems}
//                                     </span>
//                                 )}
//                             </Link>
//                         )}

//                         {token === null ? (
//                             <>
//                                 <Link to="/login">
//                                     <button className='px-4 py-2 text-gray-700 hover:text-blue-600 font-medium'>
//                                         Login
//                                     </button>
//                                 </Link>
//                                 <Link to="/signup">
//                                     <button className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition-colors duration-300'>
//                                         Signup
//                                     </button>
//                                 </Link>
//                             </>
//                         ) : (
//                             <ProfileDropDown />
//                         )}
//                     </div>
//                 </div>

//                 {/* Mobile Menu */}
//                 {mobileMenuOpen && (
//                     <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${mobileMenuOpen ? 'max-h-screen' : 'max-h-0'}`}>
//                         <div className='mt-4 pb-4'>
//                             <ul className='space-y-2'>
//                                 {NavbarLinks.map((link, index) => (
//                                     <li key={index}>
//                                         {link.title === "Catlog" ? (
//                                             <div className='relative'>
//                                                 <button 
//                                                     onClick={toggleMobileCatalog}
//                                                     className='flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md text-lg font-medium'
//                                                 >
//                                                     <span>{link.title}</span>
//                                                     <TfiArrowCircleDown className={`transition-transform ${mobileCatalogOpen ? 'transform rotate-180' : ''}`} />
//                                                 </button>

//                                                 {mobileCatalogOpen && (
//                                                     <div className='ml-4 mt-1 bg-gray-50 rounded-md py-1 animate-slideDown'>
//                                                         {subLinks.map((sublink, i) => (
//                                                             <Link 
//                                                                 key={i}
//                                                                 to={`/category/${sublink.name.split(" ").join("-").toLowerCase()}`}
//                                                                 className='block px-4 py-3 text-gray-700 hover:bg-gray-100 text-md'
//                                                                 onClick={() => {
//                                                                     setMobileMenuOpen(false);
//                                                                     setMobileCatalogOpen(false);
//                                                                 }}
//                                                             >
//                                                                 {sublink.name}
//                                                             </Link>
//                                                         ))}
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         ) : (
//                                             <Link 
//                                                 to={link?.path}
//                                                 className='block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md text-lg font-medium'
//                                                 onClick={() => setMobileMenuOpen(false)}
//                                             >
//                                                 {link.title}
//                                             </Link>
//                                         )}
//                                     </li>
//                                 ))}
//                             </ul>

//                             <div className='mt-4 pt-4 border-t border-gray-200'>
//                                 {user && user?.accountType !== "Instructor" && (
//                                     <Link 
//                                         to="/dashboard/cart" 
//                                         className='flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md text-lg font-medium'
//                                         onClick={() => setMobileMenuOpen(false)}
//                                     >
//                                         <span className='mr-2'>Cart</span>
//                                         <FaCartShopping />
//                                         {totalItems > 0 && (
//                                             <span className='ml-2 bg-red-600 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full'>
//                                                 {totalItems}
//                                             </span>
//                                         )}
//                                     </Link>
//                                 )}

//                                 {token === null ? (
//                                     <div className='flex space-x-2 mt-3'>
//                                         <Link 
//                                             to="/login" 
//                                             className='flex-1 text-center px-4 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 text-lg font-medium'
//                                             onClick={() => setMobileMenuOpen(false)}
//                                         >
//                                             Login
//                                         </Link>
//                                         <Link 
//                                             to="/signup" 
//                                             className='flex-1 text-center px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-lg font-medium transition-colors duration-300'
//                                             onClick={() => setMobileMenuOpen(false)}
//                                         >
//                                             Signup
//                                         </Link>
//                                     </div>
//                                 ) : (
//                                     <div className='mt-3'>
//                                         <ProfileDropDown mobileClose={() => setMobileMenuOpen(false)} />
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {/* Add custom animation CSS */}
//             {/* <style jsx>{`
//                 @keyframes slideDown {
//                     from {
//                         transform: translateY(-10px);
//                         opacity: 0;
//                     }
//                     to {
//                         transform: translateY(0);
//                         opacity: 1;
//                     }
//                 }
//                 .animate-slideDown {
//                     animation: slideDown 0.3s ease-out forwards;
//                 }
//             `}</style> */}
//             <style>{`
//                 @keyframes slideDown {
//                     from {
//                     transform: translateY(-10px);
//                     opacity: 0;
//                     }
//                     to {
//                     transform: translateY(0);
//                     opacity: 1;
//                     }
//                 }
//                 .animate-slideDown {
//                     animation: slideDown 0.3s ease-out forwards;
//                 }
//                 `}</style>
            
//         </div>
//     )
// }

// export default Navbar