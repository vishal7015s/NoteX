import { useEffect, useState, useRef } from "react";
import { AiOutlineCaretDown, AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { NavbarLinks } from "../data/navbar-links";
import { apiConnector } from "../services/apiConnector";
import { categories } from "../services/apis";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [catalogDropdownOpen, setCatalogDropdownOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const catalogRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (catalogRef.current && !catalogRef.current.contains(event.target)) {
        setCatalogDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(res.data.data);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    })();
  }, []);

  // Framer Motion variants for animations
  const mobileMenuVariants = {
    hidden: { opacity: 0, y: "-100%" },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: "-100%", transition: { duration: 0.3, ease: "easeIn" } },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, scaleY: 0, originY: 0 },
    visible: { opacity: 1, scaleY: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, scaleY: 0, transition: { duration: 0.2, ease: "easeIn" } },
  };

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-richblack-900 via-richblack-800 to-richblack-900 border-b border-richblack-700 shadow-lg">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between mx-auto py-3">
        {/* Logo */}
        <Link to="/" className="group relative">
          <motion.span
            className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Logo
          </motion.span>
          <span className="absolute inset-0 bg-gradient-to-r from-yellow-200/20 to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full blur-md"></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-10">
            {NavbarLinks.map((link, index) => (
              <li key={index} className="relative group">
                {link.title === "Catalog" ? (
                  <div
                    ref={catalogRef}
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => setCatalogDropdownOpen(!catalogDropdownOpen)}
                  >
                    <motion.p
                      className="text-base font-semibold text-richblack-25"
                      whileHover={{ color: "#FEF08A" }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.title}
                    </motion.p>
                    <BsChevronDown
                      className={`text-sm text-richblack-25 transition-transform duration-300 ${catalogDropdownOpen ? "rotate-180" : ""}`}
                    />
                    <AnimatePresence>
                      {catalogDropdownOpen && (
                        <motion.div
                          className="absolute left-1/2 top-full z-[1000] w-[240px] -translate-x-1/2 mt-3 flex flex-col rounded-2xl bg-gradient-to-b from-richblack-5 to-richblack-50 p-5 text-richblack-900 shadow-xl lg:w-[340px]"
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          <div className="absolute left-1/2 top-0 -z-10 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-richblack-5 shadow-sm"></div>
                          {loading ? (
                            <p className="text-center font-medium text-richblack-700">Loading...</p>
                          ) : subLinks.length ? (
                            subLinks
                              .filter((subLink) => subLink?.courses?.length >= 0)
                              .map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                                  className="rounded-lg py-3 px-4 hover:bg-yellow-50 hover:text-richblack-900 transition-colors duration-200"
                                  key={i}
                                  onClick={() => setCatalogDropdownOpen(false)}
                                >
                                  <motion.p
                                    className="font-medium"
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    {subLink.name}
                                  </motion.p>
                                </Link>
                              ))
                          ) : (
                            <p className="text-center font-medium text-richblack-700">No Courses Found</p>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <motion.p
                      className="text-base font-semibold text-richblack-25"
                      whileHover={{ color: "#FEF08A", scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.title}
                    </motion.p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Auth/Cart Section */}
        <div className="hidden items-center gap-x-6 md:flex">
          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative group">
              <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                <AiOutlineShoppingCart className="text-2xl text-richblack-100 group-hover:text-yellow-200 transition-colors duration-200" />
                {totalItems > 0 && (
                  <motion.span
                    className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-yellow-400 text-center text-xs font-bold text-richblack-900"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    {totalItems}
                  </motion.span>
                )}
              </motion.div>
            </Link>
          )}
          {token === null && (
            <>
              <Link to="/login">
                <motion.button
                  className="rounded-lg border border-richblack-600 bg-gradient-to-r from-richblack-800 to-richblack-700 px-5 py-2 text-richblack-50 font-medium shadow-md"
                  whileHover={{ scale: 1.05, backgroundImage: "linear-gradient(to right, #FEF08A, #FDE047)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  Log in
                </motion.button>
              </Link>
              <Link to="/signup">
                <motion.button
                  className="rounded-lg border border-richblack-600 bg-gradient-to-r from-richblack-800 to-richblack-700 px-5 py-2 text-richblack-50 font-medium shadow-md"
                  whileHover={{ scale: 1.05, backgroundImage: "linear-gradient(to right, #FEF08A, #FDE047)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  Sign up
                </motion.button>
              </Link>
            </>
          )}
          {token !== null && (
            <motion.button
              className="relative focus:outline-none group"
              onClick={() => setProfileOpen(!profileOpen)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-x-3">
                <motion.img
                  src={user?.image}
                  alt={`profile-${user?.firstName}`}
                  className="aspect-square w-[38px] rounded-full object-cover border-2 border-yellow-400 shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                  whileHover={{ rotate: 10 }}
                  transition={{ duration: 0.3 }}
                />
                <AiOutlineCaretDown className="text-base text-richblack-50 group-hover:text-yellow-200 group-hover:rotate-180 transition-all duration-300" />
              </div>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    className="absolute top-[120%] right-0 z-[3000] w-[180px] md:w-[240px] min-w-[150px] rounded-2xl border border-richblack-600 bg-gradient-to-b from-richblack-800 to-richblack-900 shadow-xl divide-y divide-richblack-600 overflow-hidden"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    ref={profileRef}
                  >
                    <Link to="/dashboard/my-profile" onClick={() => setProfileOpen(false)}>
                      <motion.div
                        className="flex items-center gap-x-3 py-3 px-5 text-sm font-medium text-richblack-50 hover:bg-richblack-700 hover:text-yellow-100 transition-colors duration-200"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <VscDashboard className="text-lg text-yellow-200" />
                        Dashboard
                      </motion.div>
                    </Link>
                    <motion.div
                      onClick={() => {
                        dispatch(logout(navigate));
                        setProfileOpen(false);
                      }}
                      className="flex items-center gap-x-3 py-3 px-5 text-sm font-medium text-richblack-50 hover:bg-richblack-700 hover:text-yellow-100 transition-colors duration-200 cursor-pointer"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <VscSignOut className="text-lg text-yellow-200" />
                      Logout
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-richblack-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <AiOutlineMenu fontSize={28} className="group-hover:text-yellow-200 transition-colors duration-200" />
        </motion.button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              ref={mobileMenuRef}
              className="md:hidden fixed inset-0 bg-yellow-400 top-[68px] bg-gradient-to-b from-richblack-900 to-richblack-800 z-[2500] overflow-y-auto"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex flex-col p-6 gap-6 max-w-maxContent mx-auto w-11/12">
                {/* Mobile Navigation Links */}
                {NavbarLinks.map((link, index) => (
                  <div key={index} className="border-b border-richblack-600 pb-4 last:border-0">
                    {link.title === "Catalog" ? (
                      <div className="flex flex-col">
                        <motion.div
                          className="flex items-center justify-between py-3 cursor-pointer"
                          onClick={() => setCatalogDropdownOpen(!catalogDropdownOpen)}
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className="text-lg font-semibold text-richblack-25 hover:text-yellow-100 transition-colors duration-200">
                            {link.title}
                          </span>
                          <BsChevronDown
                            className={`text-base transition-transform duration-300 ${catalogDropdownOpen ? "rotate-180" : ""}`}
                          />
                        </motion.div>
                        <AnimatePresence>
                          {catalogDropdownOpen && (
                            <motion.div
                              className="pl-4 mt-3 space-y-3 bg-richblack-5 rounded-xl p-5 text-richblack-900 shadow-lg"
                              variants={dropdownVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                            >
                              {loading ? (
                                <p className="text-center font-medium text-richblack-700">Loading...</p>
                              ) : subLinks.length ? (
                                subLinks
                                  .filter((subLink) => subLink?.courses?.length >= 0)
                                  .map((subLink, i) => (
                                    <Link
                                      to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                                      className="block py-2 text-base font-medium text-richblack-900 hover:bg-yellow-50 hover:text-richblack-900 transition-colors duration-200 rounded"
                                      key={i}
                                      onClick={() => {
                                        setCatalogDropdownOpen(false);
                                        setMobileMenuOpen(false);
                                      }}
                                    >
                                      <motion.p whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                                        {subLink.name}
                                      </motion.p>
                                    </Link>
                                  ))
                              ) : (
                                <p className="text-center font-medium text-richblack-700">No Courses Found</p>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={link?.path}
                        className="block py-3 text-lg font-semibold text-richblack-25"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <motion.p
                          whileHover={{ color: "#FEF08A", scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          {link.title}
                        </motion.p>
                      </Link>
                    )}
                  </div>
                ))}

                {/* Mobile Auth/Cart Section */}
                <div className="flex flex-col gap-4 pt-4 border-t border-richblack-600">
                  {user && user?.accountType !== "Instructor" && (
                    <Link
                      to="/dashboard/cart"
                      className="flex items-center gap-3 py-3 text-lg font-semibold text-richblack-25"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                        <AiOutlineShoppingCart className="text-xl text-yellow-200" />
                      </motion.div>
                      <motion.span whileHover={{ color: "#FEF08A" }} transition={{ duration: 0.2 }}>
                        Cart {totalItems > 0 && `(${totalItems})`}
                      </motion.span>
                    </Link>
                  )}
                  {token === null && (
                    <>
                      <Link to="/login">
                        <motion.button
                          className="w-full rounded-lg border border-richblack-600 bg-gradient-to-r from-richblack-800 to-richblack-700 py-3 text-base font-semibold text-richblack-50 shadow-md"
                          whileHover={{ scale: 1.02, backgroundImage: "linear-gradient(to right, #FEF08A, #FDE047)" }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.2 }}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Log in
                        </motion.button>
                      </Link>
                      <Link to="/signup">
                        <motion.button
                          className="w-full rounded-lg border border-richblack-600 bg-gradient-to-r from-richblack-800 to-richblack-700 py-3 text-base font-semibold text-richblack-50 shadow-md"
                          whileHover={{ scale: 1.02, backgroundImage: "linear-gradient(to right, #FEF08A, #FDE047)" }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.2 }}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Sign up
                        </motion.button>
                      </Link>
                    </>
                  )}
                  {token !== null && (
                    <motion.button
                      className="relative focus:outline-none group"
                      onClick={() => setProfileOpen(!profileOpen)}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center gap-x-3 py-3">
                        <motion.img
                          src={user?.image}
                          alt={`profile-${user?.firstName}`}
                          className="aspect-square w-[38px] rounded-full object-cover border-2 border-yellow-400 shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                          whileHover={{ rotate: 10 }}
                          transition={{ duration: 0.3 }}
                        />
                        <AiOutlineCaretDown className="text-base text-richblack-50 group-hover:text-yellow-200 group-hover:rotate-180 transition-all duration-300" />
                      </div>
                      <AnimatePresence>
                        {profileOpen && (
                          <motion.div
                            className="absolute top-[120%] right-0 z-[3000] w-[180px] md:w-[240px] min-w-[150px] rounded-2xl border border-richblack-600 bg-gradient-to-b from-richblack-800 to-richblack-900 shadow-xl divide-y divide-richblack-600 overflow-hidden"
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            ref={profileRef}
                          >
                            <Link to="/dashboard/my-profile" onClick={() => setProfileOpen(false)}>
                              <motion.div
                                className="flex items-center gap-x-3 py-3 px-5 text-sm font-medium text-richblack-50 hover:bg-richblack-700 hover:text-yellow-100 transition-colors duration-200"
                                whileHover={{ x: 5 }}
                                transition={{ duration: 0.2 }}
                              >
                                <VscDashboard className="text-lg text-yellow-200" />
                                Dashboard
                              </motion.div>
                            </Link>
                            <motion.div
                              onClick={() => {
                                dispatch(logout(navigate));
                                setProfileOpen(false);
                              }}
                              className="flex items-center gap-x-3 py-3 px-5 text-sm font-medium text-richblack-50 hover:bg-richblack-700 hover:text-yellow-100 transition-colors duration-200 cursor-pointer"
                              whileHover={{ x: 5 }}
                              transition={{ duration: 0.2 }}
                            >
                              <VscSignOut className="text-lg text-yellow-200" />
                              Logout
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Navbar;



// import { useEffect, useState, useRef } from "react"
// import { AiOutlineCaretDown, AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
// import { BsChevronDown } from "react-icons/bs"
// import { useDispatch, useSelector } from "react-redux"
// import { Link, useNavigate } from "react-router-dom"
// import { NavbarLinks } from "../data/navbar-links"
// import { apiConnector } from "../services/apiConnector"
// import { categories } from "../services/apis"
// // import ProfileDropdown from "./profileDropDown"
// import { VscDashboard, VscSignOut } from "react-icons/vsc"

// function Navbar() {
//   const { token } = useSelector((state) => state.auth)
//   const { user } = useSelector((state) => state.profile)
//   const { totalItems } = useSelector((state) => state.cart)
//   const [subLinks, setSubLinks] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
//   const [catalogDropdownOpen, setCatalogDropdownOpen] = useState(false)
//   const catalogRef = useRef(null)
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [open, setOpen] = useState(false);
//   const ref = useRef(null);
//   const mobileMenuRef = useRef(null)

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (catalogRef.current && !catalogRef.current.contains(event.target)) {
//         setCatalogDropdownOpen(false)
//       }
//       if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
//         setMobileMenuOpen(false)
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside)
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside)
//     }
//   }, [])

//   useEffect(() => {
//     (async () => {
//       setLoading(true)
//       try {
//         const res = await apiConnector("GET", categories.CATEGORIES_API)
//         setSubLinks(res.data.data)
//       } catch (error) {
//         console.log("Could not fetch Categories.", error)
//       }
//       setLoading(false)
//     })()
//   }, [])

//   return (
//     <div className="sticky top-0 z-50 bg-richblack-800 border-b border-richblack-700">
//       <div className="flex w-11/12 max-w-maxContent items-center justify-between mx-auto py-4">
//         {/* Logo */}
//         <Link to="/">
//           {/* <img src={logo} alt="Logo" width={160} height={32} loading="lazy" /> */}
//           <span className="text-2xl font-bold text-white">Logo</span>
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:block">
//           <ul className="flex gap-x-6 text-richblack-25">
//             {NavbarLinks.map((link, index) => (
//               <li key={index} className="relative group">
//                 {link.title === "Catalog" ? (
//                   <div
//                     ref={catalogRef}
//                     className="flex items-center gap-1 cursor-pointer"
//                     onClick={() => setCatalogDropdownOpen(!catalogDropdownOpen)}
//                   >
//                     <p>{link.title}</p>
//                     <BsChevronDown className={`transition-transform ${catalogDropdownOpen ? "rotate-180" : ""}`} />

//                     {/* Catalog Dropdown */}
//                     {catalogDropdownOpen && (
//                       <div className="absolute left-1/2 top-full z-[1000] w-[200px] -translate-x-1/2 translate-y-2 flex flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 shadow-lg lg:w-[300px]">
//                         <div className="absolute left-1/2 top-0 -z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-richblack-5"></div>
//                         {loading ? (
//                           <p className="text-center">Loading...</p>
//                         ) : subLinks.length ? (
//                           subLinks
//                             .filter((subLink) => subLink?.courses?.length >= 0)
//                             .map((subLink, i) => (
//                               <Link
//                                 to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
//                                 className="rounded-lg py-2 pl-4 hover:bg-richblack-50 transition-colors"
//                                 key={i}
//                                 onClick={() => setCatalogDropdownOpen(false)}
//                               >
//                                 <p>{subLink.name}</p>
//                               </Link>
//                             ))
//                         ) : (
//                           <p className="text-center">No Courses Found</p>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <Link to={link?.path}>
//                     <p className="hover:text-yellow-50 transition-colors">
//                       {link.title}
//                     </p>
//                   </Link>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </nav>

//         {/* Desktop Auth/Cart Section */}
//         <div className="hidden items-center gap-x-4 md:flex">
//           {user && user?.accountType !== "Instructor" && (
//             <Link to="/dashboard/cart" className="relative">
//               <AiOutlineShoppingCart className="text-2xl text-richblack-100 hover:text-white transition-colors" />
//               {totalItems > 0 && (
//                 <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-yellow-100 text-center text-xs font-bold text-richblack-900">
//                   {totalItems}
//                 </span>
//               )}
//             </Link>
//           )}
//           {token === null && (
//             <>
//               <Link to="/login">
//                 <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 hover:bg-richblack-700 hover:text-white transition-colors">
//                   Log in
//                 </button>
//               </Link>
//               <Link to="/signup">
//                 <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 hover:bg-richblack-700 hover:text-white transition-colors">
//                   Sign up
//                 </button>
//               </Link>
//             </>
//           )}
//           {token !== null && (
//             <button className="relative " onClick={() => setOpen(true)}>
//               <div className="flex items-center gap-x-1">
//                 <img
//                   src={user?.image}
//                   alt={`profile-${user?.firstName}`}
//                   className="aspect-square w-[30px] rounded-full object-cover"
//                 />
//                 <AiOutlineCaretDown className="text-sm text-richblack-100" />
//               </div>
//               {open && (
//                 <div
//                   onClick={(e) => e.stopPropagation()}
//                   className="absolute top-[100%] right-0 z-[3000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800 w-[150px] md:w-[200px] min-w-[120px]"
//                   ref={ref}
//                 >
//                   <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
//                     <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
//                       <VscDashboard className="text-lg" />
//                       Dashboard
//                     </div>
//                   </Link>
//                   <div
//                     onClick={() => {
//                       dispatch(logout(navigate));
//                       setOpen(false);
//                     }}
//                     className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
//                   >
//                     <VscSignOut className="text-lg" />
//                     Logout
//                   </div>
//                 </div>
//               )}
//             </button>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden text-richblack-100"
//           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//         >
//           <AiOutlineMenu fontSize={24} />
//         </button>

//         {/* Mobile Menu */}
//         {mobileMenuOpen && (
//           <div
//             ref={mobileMenuRef}
//             className="md:hidden absolute top-full left-0 right-0 bg-richblack-800 border-t border-richblack-700 shadow-lg z-[999]"
//           >
//             <div className="flex flex-col p-4 gap-4">
//               {/* Mobile Navigation Links */}
//               {NavbarLinks.map((link, index) => (
//                 <div key={index} className="border-b border-richblack-700 pb-3 last:border-0">
//                   {link.title === "Catalog" ? (
//                     <div className="flex flex-col">
//                       <div
//                         className="flex items-center justify-between py-2 cursor-pointer"
//                         onClick={() => setCatalogDropdownOpen(!catalogDropdownOpen)}
//                       >
//                         <span className="text-richblack-25">{link.title}</span>
//                         <BsChevronDown className={`transition-transform ${catalogDropdownOpen ? "rotate-180" : ""}`} />
//                       </div>

//                       {/* Mobile Catalog Dropdown */}
//                       {catalogDropdownOpen && (
//                         <div className="pl-4 mt-2 space-y-2">
//                           {loading ? (
//                             <p className="text-center text-richblack-100">Loading...</p>
//                           ) : subLinks.length ? (
//                             subLinks
//                               .filter((subLink) => subLink?.courses?.length >= 0)
//                               .map((subLink, i) => (
//                                 <Link
//                                   to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
//                                   className="block py-2 text-richblack-100 hover:text-white transition-colors"
//                                   key={i}
//                                   onClick={() => {
//                                     setCatalogDropdownOpen(false)
//                                     setMobileMenuOpen(false)
//                                   }}
//                                 >
//                                   {subLink.name}
//                                 </Link>
//                               ))
//                           ) : (
//                             <p className="text-center text-richblack-100">No Courses Found</p>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   ) : (
//                     <Link
//                       to={link?.path}
//                       className="block py-2 text-richblack-25 hover:text-white transition-colors"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       {link.title}
//                     </Link>
//                   )}
//                 </div>
//               ))}

//               {/* Mobile Auth/Cart Section */}
//               <div className="flex flex-col gap-3 pt-3 border-t border-richblack-700">
//                 {user && user?.accountType !== "Instructor" && (
//                   <Link
//                     to="/dashboard/cart"
//                     className="flex items-center gap-2 text-richblack-25 hover:text-white transition-colors"
//                     onClick={() => setMobileMenuOpen(false)}
//                   >
//                     <AiOutlineShoppingCart className="text-xl" />
//                     <span>Cart {totalItems > 0 && `(${totalItems})`}</span>
//                   </Link>
//                 )}
//                 {token === null && (
//                   <>
//                     <Link to="/login">
//                       <button
//                         className="w-full rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 hover:bg-richblack-700 hover:text-white transition-colors"
//                         onClick={() => setMobileMenuOpen(false)}
//                       >
//                         Log in
//                       </button>
//                     </Link>
//                     <Link to="/signup">
//                       <button
//                         className="w-full rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 hover:bg-richblack-700 hover:text-white transition-colors"
//                         onClick={() => setMobileMenuOpen(false)}
//                       >
//                         Sign up
//                       </button>
//                     </Link>
//                   </>
//                 )}
//                 {token !== null && (
//                   <div onClick={() => setMobileMenuOpen(false)}>
//                     <button className="relative " onClick={() => setOpen(true)}>
//                       <div className="flex items-center gap-x-1">
//                         <img
//                           src={user?.image}
//                           alt={`profile-${user?.firstName}`}
//                           className="aspect-square w-[30px] rounded-full object-cover"
//                         />
//                         <AiOutlineCaretDown className="text-sm text-richblack-100" />
//                       </div>
//                       {open && (
//                         <div
//                           onClick={(e) => e.stopPropagation()}
//                           className="absolute top-[100%] right-0 z-[3000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800 w-[150px] md:w-[200px] min-w-[120px]"
//                           ref={ref}
//                         >
//                           <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
//                             <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
//                               <VscDashboard className="text-lg" />
//                               Dashboard
//                             </div>
//                           </Link>
//                           <div
//                             onClick={() => {
//                               dispatch(logout(navigate));
//                               setOpen(false);
//                             }}
//                             className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
//                           >
//                             <VscSignOut className="text-lg" />
//                             Logout
//                           </div>
//                         </div>
//                       )}
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Navbar


// import { useEffect, useState } from "react";
// import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
// import { BsChevronDown } from "react-icons/bs";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { NavbarLinks } from "../data/navbar-links";
// import { apiConnector } from "../services/apiConnector";
// import { categories } from "../services/apis";
// import ProfileDropDown from "./profileDropDown";

// function Navbar() {
//   const { token } = useSelector((state) => state.auth);
//   const { user } = useSelector((state) => state.profile);
//   const { totalItems } = useSelector((state) => state.cart);
//   const [subLinks, setSubLinks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     (async () => {
//       setLoading(true);
//       try {
//         const res = await apiConnector("GET", categories.CATEGORIES_API);
//         setSubLinks(res.data.data);
//         console.log(res.data.data);
//       } catch (error) {
//         console.log("Could not fetch Categories.", error);
//       }
//       setLoading(false);
//     })();
//   }, []);

//   return (
//     <div className="relative">
//       <div className="flex w-11/12 max-w-maxContent items-center justify-between mx-auto py-4">
//         {/* Logo */}
//         <Link to="/">
//           <span className="text-richblack-25 text-2xl">Logo</span>
//         </Link>

//         {/* Navigation links (Desktop) */}
//         <nav className="hidden md:block">
//           <ul className="flex gap-x-6 text-richblack-25">
//             {NavbarLinks.map((link, index) => (
//               <li key={index}>
//                 {link.title === "Catalog" ? (
//                   <div className="group relative flex items-center gap-1 cursor-pointer">
//                     <p>{link.title}</p>
//                     <BsChevronDown />
//                     <div className="invisible absolute left-[50%] top-[100%] z-[2000] flex w-[200px] translate-x-[-50%] translate-y-[1em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[0.5em] group-hover:opacity-100 lg:w-[300px]">
//                       <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
//                       {loading ? (
//                         <p className="text-center">Loading...</p>
//                       ) : subLinks.length ? (
//                         <>
//                           {subLinks
//                             ?.filter((subLink) => subLink?.courses?.length >= 0)
//                             ?.map((subLink, i) => (
//                               <Link
//                                 to={`/catalog/${subLink.name
//                                   .split(" ")
//                                   .join("-")
//                                   .toLowerCase()}`}
//                                 className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
//                                 key={i}
//                               >
//                                 <p className="text-center">{subLink.name}</p>
//                               </Link>
//                             ))}
//                         </>
//                       ) : (
//                         <p className="text-center">No Courses Found</p>
//                       )}
//                     </div>
//                   </div>
//                 ) : (
//                   <Link to={link?.path}>
//                     <p className="hover:text-yellow-50">{link.title}</p>
//                   </Link>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </nav>

//         {/* Login / Signup / Dashboard / Cart (Desktop) */}
//         <div className="hidden items-center gap-x-4 md:flex">
//           {user && user?.accountType !== "Instructor" && (
//             <Link to="/dashboard/cart" className="relative">
//               <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
//               {totalItems > 0 && (
//                 <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
//                   {totalItems}
//                 </span>
//               )}
//             </Link>
//           )}
//           {token === null && (
//             <Link to="/login">
//               <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
//                 Log in
//               </button>
//             </Link>
//           )}
//           {token === null && (
//             <Link to="/signup">
//               <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
//                 Sign up
//               </button>
//             </Link>
//           )}
//           {token !== null && <ProfileDropDown />}
//         </div>

//         {/* Hamburger Menu (Mobile) */}
//         <button
//           className="mr-4 md:hidden"
//           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//         >
//           <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <div className="fixed inset-0 z-[2500] bg-richblack-800 bg-opacity-95 flex flex-col items-center justify-start pt-16 md:hidden">
//           <nav className="w-full max-w-maxContent mx-auto">
//             <ul className="flex flex-col items-center gap-y-4 text-richblack-25">
//               {NavbarLinks.map((link, index) => (
//                 <li key={index}>
//                   {link.title === "Catalog" ? (
//                     <div className="relative flex flex-col items-center gap-1 cursor-pointer">
//                       <div className="flex items-center gap-1">
//                         <p>{link.title}</p>
//                         <BsChevronDown />
//                       </div>
//                       <div className="mt-2 w-[200px] flex flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900">
//                         {loading ? (
//                           <p className="text-center">Loading...</p>
//                         ) : subLinks.length ? (
//                           <>
//                             {subLinks
//                               ?.filter((subLink) => subLink?.courses?.length >= 0)
//                               ?.map((subLink, i) => (
//                                 <Link
//                                   to={`/catalog/${subLink.name
//                                     .split(" ")
//                                     .join("-")
//                                     .toLowerCase()}`}
//                                   className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
//                                   key={i}
//                                   onClick={() => setMobileMenuOpen(false)}
//                                 >
//                                   <p className="text-center">{subLink.name}</p>
//                                 </Link>
//                               ))}
//                           </>
//                         ) : (
//                           <p className="text-center">No Courses Found</p>
//                         )}
//                       </div>
//                     </div>
//                   ) : (
//                     <Link to={link?.path} onClick={() => setMobileMenuOpen(false)}>
//                       <p className="hover:text-yellow-50">{link.title}</p>
//                     </Link>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </nav>
//           <div className="flex flex-col items-center gap-y-4 mt-6">
//             {user && user?.accountType !== "Instructor" && (
//               <Link
//                 to="/dashboard/cart"
//                 className="relative"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
//                 {totalItems > 0 && (
//                   <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
//                     {totalItems}
//                   </span>
//                 )}
//               </Link>
//             )}
//             {token === null && (
//               <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
//                 <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
//                   Log in
//                 </button>
//               </Link>
//             )}
//             {token === null && (
//               <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
//                 <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
//                   Sign up
//                 </button>
//               </Link>
//             )}
//             {token !== null && (
//               <div className="mt-4">
//                 <ProfileDropDown />
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Navbar;

// import { useEffect, useState } from "react"
// import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
// import { BsChevronDown } from "react-icons/bs"
// import { useSelector } from "react-redux"
// import { Link } from "react-router-dom"
// import { NavbarLinks } from "../data/navbar-links"
// import { apiConnector } from "../services/apiConnector"
// import { categories } from "../services/apis"

// function Navbar() {
//   const { token } = useSelector((state) => state.auth)
//   const { user } = useSelector((state) => state.profile)
//   const { totalItems } = useSelector((state) => state.cart)
//   const [subLinks, setSubLinks] = useState([])
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     ; (async () => {
//       setLoading(true)
//       try {
//         const res = await apiConnector("GET",
//           categories.CATEGORIES_API)
//         setSubLinks(res.data.data)
//         console.log(res.data.data)
//       } catch (error) {
//         console.log("Could not fetch Categories.", error)
//       }
//       setLoading(false)
//     })()
//   }, [])

//   return (
//     <div >
//       <div className="flex w-11/12 max-w-maxContent items-center justify-between">
//         {/* Logo */}
//         <Link to="/">
//           {/* <img src={logo} alt="Logo" width={160} height={32} loading="lazy" /> */}
//         </Link>
//         {/* Navigation links */}
//         <nav className="hidden md:block">
//           <ul className="flex gap-x-6 text-richblack-25">
//             {NavbarLinks.map((link, index) => (
//               <li key={index}>
//                 {link.title === "Catalog" ? (
//                   <>
//                     <div                    >
//                       <p>{link.title}</p>
//                       <BsChevronDown />
//                       <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
//                         <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
//                         {loading ? (
//                           <p className="text-center">Loading...</p>
//                         ) : subLinks.length ? (
//                           <>
//                             {subLinks
//                               ?.filter(
//                                 (subLink) => subLink?.courses?.length >= 0
//                               )
//                               ?.map((subLink, i) => (
//                                 <Link
//                                   to={`/catalog/${subLink.name
//                                     .split(" ")
//                                     .join("-")
//                                     .toLowerCase()}`}
//                                   className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
//                                   key={i}
//                                 >


//                                   <p className="text-center">{subLink.name}</p>
//                                 </Link>
//                               ))}
//                           </>
//                         ) : (
//                           <p className="text-center">No Courses Found</p>
//                         )}
//                       </div>
//                     </div>
//                   </>
//                 ) : (
//                   <Link to={link?.path}>
//                     <p>
//                       {link.title}
//                     </p>
//                   </Link>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </nav>
//         {/* Login / Signup / Dashboard */}
//         <div className="hidden items-center gap-x-4 md:flex">
//           {user && user?.accountType !== "Instructor" && (
//             <Link to="/dashboard/cart" className="relative">
//               <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
//               {totalItems > 0 && (
//                 <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
//                   {totalItems}
//                 </span>
//               )}
//             </Link>
//           )}
//           {token === null && (
//             <Link to="/login">
//               <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
//                 Log in
//               </button>
//             </Link>
//           )}
//           {token === null && (
//             <Link to="/signup">
//               <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
//                 Sign up
//               </button>
//             </Link>
//           )}
//           {token !== null && <ProfileDropdown />}
//         </div>
//         <button className="mr-4 md:hidden">
//           <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Navbar