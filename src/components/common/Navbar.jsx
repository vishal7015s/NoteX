import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { NavbarLinks } from '../../data/navbar-links';
import { useSelector } from 'react-redux';
import { FaBars, FaTimes } from "react-icons/fa";
import ProfileDropDown from "../profileDropDown"
import ProfileDropDownMobile from "../ProfileDropDownMobile"
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/apis';
import { TfiArrowCircleDown } from "react-icons/tfi";
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
                                                Courses
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
                            <ProfileDropDownMobile 
                                subLinks={subLinks} 
                                catalogDropdownOpen={catalogDropdownOpen} 
                                setCatalogDropdownOpen={setCatalogDropdownOpen}
                            />
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
                                        <BsCart4 />
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
                                        <ProfileDropDownMobile 
                                            subLinks={subLinks} 
                                            catalogDropdownOpen={catalogDropdownOpen} 
                                            setCatalogDropdownOpen={setCatalogDropdownOpen}
                                            mobileClose={() => setMobileMenuOpen(false)}
                                        />
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

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { NavbarLinks } from "../../data/navbar-links";
// import { useSelector } from "react-redux";
// import { FaBars, FaTimes } from "react-icons/fa";
// import ProfileDropDown from "../profileDropDown";
// import ProfileDropDownMobile from "../ProfileDropDownMobile";
// import { TfiArrowCircleDown } from "react-icons/tfi";
// import { BsCart4 } from "react-icons/bs";

// function Navbar() {
//   const { token } = useSelector((state) => state.auth);
//   const { user } = useSelector((state) => state.profile);
//   const { totalItems } = useSelector((state) => state.cart);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [catalogOpen, setCatalogOpen] = useState(false);
//   const [years, setYears] = useState([]);
//   const [branches, setBranches] = useState([]);
//   const [semesters, setSemesters] = useState([]);
//   const [selectedYear, setSelectedYear] = useState(null);
//   const [selectedBranch, setSelectedBranch] = useState(null);

//   useEffect(() => {
//     const fetchYears = async () => {
//       try {
//         const response = await fetch("http://localhost:4000/api/v1/flow/years");
//         if (!response.ok) throw new Error("Failed to fetch years");
//         const data = await response.json();
//         // Ensure data is an array, adjust based on API response structure
//         setYears(Array.isArray(data) ? data : data.data || []);
//       } catch (error) {
//         console.error("Error fetching years:", error);
//         setYears([]); // Set to empty array on error
//       }
//     };
//     fetchYears();
//   }, []);

//   const fetchBranches = async (yearId) => {
//     try {
//       const response = await fetch(`http://localhost:4000/api/v1/flow/branches`);
//       if (!response.ok) throw new Error("Failed to fetch branches");
//       const data = await response.json();
//       setBranches(Array.isArray(data) ? data : data.data || []);
//     } catch (error) {
//       console.error("Error fetching branches:", error);
//       setBranches([]);
//     }
//   };

//   const fetchSemesters = async (branchId) => {
//     try {
//       const response = await fetch(`http://localhost:4000/api/v1/flow/semesters`);
//       if (!response.ok) throw new Error("Failed to fetch semesters");
//       const data = await response.json();
//       setSemesters(Array.isArray(data) ? data : data.data || []);
//     } catch (error) {
//       console.error("Error fetching semesters:", error);
//       setSemesters([]);
//     }
//   };

//   const handleYearSelect = (year) => {
//     setSelectedYear(year);
//     setBranches([]);
//     setSemesters([]);
//     setSelectedBranch(null);
//     if (year) fetchBranches(year._id);
//   };

//   const handleBranchSelect = (branch) => {
//     setSelectedBranch(branch);
//     setSemesters([]);
//     if (branch) fetchSemesters(branch._id);
//   };

//   const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
//   const toggleCatalog = () => setCatalogOpen(!catalogOpen);

//   return (
//     <div className="bg-gray-800 text-white sticky top-0 z-50">
//       <div className="container mx-auto px-4 py-2 flex justify-between items-center">
//         <Link to="/" className="text-xl font-bold">
//           NoteX
//         </Link>
//         <nav className="hidden md:flex space-x-4">
//           <ul className="flex space-x-4">
//             {NavbarLinks.map((link, index) => (
//               <li key={index}>
//                 {link.title === "Catlog" ? (
//                   <div className="relative">
//                     <button onClick={toggleCatalog} className="flex items-center">
//                       Courses <TfiArrowCircleDown className={catalogOpen ? "rotate-180" : ""} />
//                     </button>
//                     {catalogOpen && (
//                       <div className="absolute bg-gray-700 rounded mt-2">
//                         <div>
//                           {Array.isArray(years) && years.length > 0 ? (
//                             years.map((year) => (
//                               <div key={year._id}>
//                                 <button onClick={() => handleYearSelect(year)} className="block px-2 py-1">
//                                   {year.year}
//                                 </button>
//                                 {selectedYear && selectedYear._id === year._id && (
//                                   <div className="ml-4">
//                                     {Array.isArray(branches) && branches.length > 0 ? (
//                                       branches.map((branch) => (
//                                         <div key={branch._id}>
//                                           <button onClick={() => handleBranchSelect(branch)} className="block px-2 py-1">
//                                             {branch.name}
//                                           </button>
//                                           {selectedBranch && selectedBranch._id === branch._id && (
//                                             <div className="ml-4">
//                                               {Array.isArray(semesters) && semesters.length > 0 ? (
//                                                 semesters.map((semester) => (
//                                                   <Link
//                                                     key={semester._id}
//                                                     to={`/courses/${branch.name.toLowerCase().split(" ").join("-")}/${year.year.toLowerCase().split(" ").join("-")}/${semester.name.toLowerCase().split(" ").join("-")}`}
//                                                     className="block px-2 py-1"
//                                                     onClick={() => setCatalogOpen(false)}
//                                                   >
//                                                     {semester.name}
//                                                   </Link>
//                                                 ))
//                                               ) : (
//                                                 <div>No semesters available</div>
//                                               )}
//                                             </div>
//                                           )}
//                                         </div>
//                                       ))
//                                     ) : (
//                                       <div>No branches available</div>
//                                     )}
//                                   </div>
//                                 )}
//                               </div>
//                             ))
//                           ) : (
//                             <div>No years available</div>
//                           )}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <Link to={link.path} className="hover:text-yellow-400">
//                     {link.title}
//                   </Link>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </nav>
//         <div className="md:hidden flex items-center space-x-2">
//           {token ? (
//             <ProfileDropDownMobile />
//           ) : (
//             <>
//               <Link to="/login">Login</Link>
//               <Link to="/signup">Signup</Link>
//             </>
//           )}
//           <button onClick={toggleMobileMenu}>
//             {mobileMenuOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>
//         <div className="hidden md:flex items-center space-x-2">
//           {user?.accountType !== "Instructor" && totalItems > 0 && (
//             <Link to="/dashboard/cart" className="relative">
//               <BsCart4 />
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
//                 {totalItems}
//               </span>
//             </Link>
//           )}
//           {token ? <ProfileDropDown /> : (
//             <>
//               <Link to="/login">Login</Link>
//               <Link to="/signup">Signup</Link>
//             </>
//           )}
//         </div>
//       </div>
//       {mobileMenuOpen && (
//         <div className="md:hidden bg-gray-800 p-2">
//           <ul>
//             {NavbarLinks.map((link, index) => (
//               <li key={index}>
//                 {link.title === "Catlog" ? (
//                   <div>
//                     <button onClick={toggleCatalog} className="flex w-full justify-between">
//                       Courses <TfiArrowCircleDown className={catalogOpen ? "rotate-180" : ""} />
//                     </button>
//                     {catalogOpen && (
//                       <div className="ml-2">
//                         {Array.isArray(years) && years.length > 0 ? (
//                           years.map((year) => (
//                             <div key={year._id}>
//                               <button onClick={() => handleYearSelect(year)} className="block">
//                                 {year.year}
//                               </button>
//                               {selectedYear && selectedYear._id === year._id && (
//                                 <div className="ml-2">
//                                   {Array.isArray(branches) && branches.length > 0 ? (
//                                     branches.map((branch) => (
//                                       <div key={branch._id}>
//                                         <button onClick={() => handleBranchSelect(branch)} className="block">
//                                           {branch.name}
//                                         </button>
//                                         {selectedBranch && selectedBranch._id === branch._id && (
//                                           <div className="ml-2">
//                                             {Array.isArray(semesters) && semesters.length > 0 ? (
//                                               semesters.map((semester) => (
//                                                 <Link
//                                                   key={semester._id}
//                                                   to={`/courses/${branch.name.toLowerCase().split(" ").join("-")}/${year.year.toLowerCase().split(" ").join("-")}/${semester.name.toLowerCase().split(" ").join("-")}`}
//                                                   className="block"
//                                                   onClick={() => setMobileMenuOpen(false)}
//                                                 >
//                                                   {semester.name}
//                                                 </Link>
//                                               ))
//                                             ) : (
//                                               <div>No semesters available</div>
//                                             )}
//                                           </div>
//                                         )}
//                                       </div>
//                                     ))
//                                   ) : (
//                                     <div>No branches available</div>
//                                   )}
//                                 </div>
//                               )}
//                             </div>
//                           ))
//                         ) : (
//                           <div>No years available</div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <Link to={link.path} onClick={() => setMobileMenuOpen(false)}>
//                     {link.title}
//                   </Link>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Navbar;