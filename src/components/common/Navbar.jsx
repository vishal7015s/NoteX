// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { NavbarLinks } from '../../data/navbar-links';
// import { useSelector } from 'react-redux';
// import { FaCartShopping } from "react-icons/fa6";
// import ProfileDropDown from "../profileDropDown"
// import { apiConnector } from '../../services/apiConnector';
// import { categories } from '../../services/apis';
// import { TfiArrowCircleDown } from "react-icons/tfi";




// function Navbar() {

//     const {token} = useSelector( (state) => state.auth);
//     const {user} = useSelector( (state) => state.profile);
//     const {totalItems} = useSelector( (state) => state.cart);


//     const [subLinks, setSubLinks] = useState([]);

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

//   return (
//     <div className='flex h-14 items-center justify-center border-b-[1px] border-b-gray-500'>
//         <div className='flex w-11/12 max-w-maxContent items-center justify-between'>

//             <Link to="/">
//                 <img src='data:image/png;base64,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' height={20} width={24}></img>
//             </Link>

//             <nav>
//                 <ul className='flex gap-x-6 text-blue-500'>
//                     {
//                      NavbarLinks.map( (link, index) => {
//                        return <li key={index}>
//                             {
//                                 link.title === "Catlog" ? (
//                                     <div className='relative flex gap-x-1 items-center group'>
//                                         <p>{link.title}</p>
//                                         <TfiArrowCircleDown /> 

//                                         <div className='invisible absolute left-[50%] 
//                                         translate-x-[-50%] translate-y-[80%]
//                                          top-[50%]
//                                          flex flex-col rounded-md bg-red-500 p-4 text-blue-500
//                                          opacity-0 transition-all duration-200 group-hover:visible
//                                          group-hover:opacity-100 lg:w-[300px]'>

//                                             <div className='absolute left-[50%] top-0 
//                                             translate-y-[80%] 
//                                             translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-red-500'>
//                                             </div>

//                                             {
//                                                 subLinks.map( (link, i) => {
//                                                     return (
//                                                         <Link to={`/category/${link.name.split(" ").join("-").toLowerCase()}`} key={i}>
//                                                             <p>{link.name}</p>
//                                                         </Link>
//                                                     )
//                                                 })
//                                             }
//                                         </div> 


//                                     </div>
//                                 ) : (
//                                     <Link to={link?.path}>
//                                         <p className='text-yellow-25'>
//                                             {link.title}
//                                         </p>
//                                     </Link>
//                                 )
//                             }
//                         </li>
//                      })   
//                     }
//                 </ul>
//             </nav>

//             {/* login signup dashboard */}

//             <div className='flex gap-x-4 items-center'>

//                 {
//                     user && user?.accountType != "Instructor" && (
//                         <Link to="/dashboard/cart" className='relative'>
//                             <FaCartShopping />
//                             {
//                                 totalItems > 0 && (
//                                     <span className='absolute top-0 right-0 bg-red-600 text-white text-sm px-2 py-1 rounded-full'>
//                                         {totalItems}
//                                     </span>
//                                 )
//                             }
//                         </Link>
//                     )
//                 }

//                 {
//                     token === null && (
//                         <Link to="/login">
//                             <button>
//                                 Login
//                             </button>
//                         </Link>
//                     )
//                 }

//                 {
//                     token === null && (
//                         <Link to="/signup">
//                             <button>
//                                 Signup
//                             </button>
//                         </Link>
//                     )
//                 }

//                 {
//                     token != null && <ProfileDropDown></ProfileDropDown>
//                 }
                
//             </div>

//         </div> 
//     </div>
//   )
// }

// export default Navbar



import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { NavbarLinks } from '../../data/navbar-links';
import { useSelector } from 'react-redux';
import { FaBars, FaTimes } from "react-icons/fa";
import ProfileDropDown from "../profileDropDown"
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/apis';
import { TfiArrowCircleDown } from "react-icons/tfi";
import { FaCartShopping } from "react-icons/fa6";


function Navbar() {
    const {token} = useSelector( (state) => state.auth);
    const {user} = useSelector( (state) => state.profile);
    const {totalItems} = useSelector( (state) => state.cart);
    const [subLinks, setSubLinks] = useState([]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [catalogDropdownOpen, setCatalogDropdownOpen] = useState(false);
    const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false);

    const fetchSubLinks = async() => {
        try{
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            setSubLinks(result.data.data);
        }
        catch(error){
            console.log("could not fetch the category list", error);
        }
    }

    useEffect( () => {
        fetchSubLinks();
    },[]);

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
        <div className='bg-white shadow-md sticky top-0 z-50'>
            <div className='container w-11/12 mx-auto px-4 py-3'>
                <div className='flex items-center justify-between'>
                    {/* Logo */}
                    <Link to="/" className='flex items-center'>
                        <img 
                            src='https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books_23-2149342941.jpg?w=200' 
                            alt='NoteX Logo' 
                            className='h-10 w-10 mr-2 rounded-md object-cover'
                        />
                        <span className='text-xl font-bold text-blue-600 hidden sm:block'>NoteX</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className='hidden md:flex items-center space-x-8'>
                        <ul className='flex space-x-6'>
                            {NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    {link.title === "Catlog" ? (
                                        <div className='relative'>
                                            <button 
                                                onClick={toggleCatalogDropdown}
                                                className='flex items-center text-gray-700 hover:text-blue-600 font-medium text-lg'
                                            >
                                                {link.title}
                                                <TfiArrowCircleDown className={`ml-1 transition-transform ${catalogDropdownOpen ? 'transform rotate-180' : ''}`} />
                                            </button>

                                            {catalogDropdownOpen && (
                                                <div className='absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100'>
                                                    <div className='px-4 py-2 border-b border-gray-200'>
                                                        <span className='text-sm font-semibold text-gray-700'>Categories</span>
                                                    </div>
                                                    {subLinks.map((sublink, i) => (
                                                        <Link 
                                                            key={i}
                                                            to={`/catlog/${sublink.name.split(" ").join("-").toLowerCase()}`}
                                                            className='block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600'
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
                                            className='text-gray-700 hover:text-blue-600 font-medium text-lg'
                                        >
                                            {link.title}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Mobile menu button */}
                    <div className='md:hidden'>
                        <button 
                            onClick={toggleMobileMenu}
                            className='text-gray-700 hover:text-blue-600 focus:outline-none transition-all duration-300'
                        >
                            {mobileMenuOpen ? (
                                <FaTimes size={24} className='text-red-500' />
                            ) : (
                                <FaBars size={24} />
                            )}
                        </button>
                    </div>

                    {/* Desktop Auth/Cart/Profile */}
                    <div className='hidden md:flex items-center space-x-4'>
                        {user && user?.accountType !== "Instructor" && (
                            <Link to="/dashboard/cart" className='relative text-gray-700 hover:text-blue-600'>
                                <FaCartShopping size={20} />
                                {totalItems > 0 && (
                                    <span className='absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full'>
                                        {totalItems}
                                    </span>
                                )}
                            </Link>
                        )}

                        {token === null ? (
                            <>
                                <Link to="/login">
                                    <button className='px-4 py-2 text-gray-700 hover:text-blue-600 font-medium'>
                                        Login
                                    </button>
                                </Link>
                                <Link to="/signup">
                                    <button className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition-colors duration-300'>
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
                    <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${mobileMenuOpen ? 'max-h-screen' : 'max-h-0'}`}>
                        <div className='mt-4 pb-4'>
                            <ul className='space-y-2'>
                                {NavbarLinks.map((link, index) => (
                                    <li key={index}>
                                        {link.title === "Catlog" ? (
                                            <div className='relative'>
                                                <button 
                                                    onClick={toggleMobileCatalog}
                                                    className='flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md text-lg font-medium'
                                                >
                                                    <span>{link.title}</span>
                                                    <TfiArrowCircleDown className={`transition-transform ${mobileCatalogOpen ? 'transform rotate-180' : ''}`} />
                                                </button>

                                                {mobileCatalogOpen && (
                                                    <div className='ml-4 mt-1 bg-gray-50 rounded-md py-1 animate-slideDown'>
                                                        {subLinks.map((sublink, i) => (
                                                            <Link 
                                                                key={i}
                                                                to={`/category/${sublink.name.split(" ").join("-").toLowerCase()}`}
                                                                className='block px-4 py-3 text-gray-700 hover:bg-gray-100 text-md'
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
                                                className='block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md text-lg font-medium'
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {link.title}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>

                            <div className='mt-4 pt-4 border-t border-gray-200'>
                                {user && user?.accountType !== "Instructor" && (
                                    <Link 
                                        to="/dashboard/cart" 
                                        className='flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md text-lg font-medium'
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <span className='mr-2'>Cart</span>
                                        <FaCartShopping />
                                        {totalItems > 0 && (
                                            <span className='ml-2 bg-red-600 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full'>
                                                {totalItems}
                                            </span>
                                        )}
                                    </Link>
                                )}

                                {token === null ? (
                                    <div className='flex space-x-2 mt-3'>
                                        <Link 
                                            to="/login" 
                                            className='flex-1 text-center px-4 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 text-lg font-medium'
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Login
                                        </Link>
                                        <Link 
                                            to="/signup" 
                                            className='flex-1 text-center px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-lg font-medium transition-colors duration-300'
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Signup
                                        </Link>
                                    </div>
                                ) : (
                                    <div className='mt-3'>
                                        <ProfileDropDown mobileClose={() => setMobileMenuOpen(false)} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Add custom animation CSS */}
            {/* <style jsx>{`
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
            `}</style> */}
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