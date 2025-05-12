import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useState } from "react"
import { NavLink, useNavigate } from 'react-router-dom';
import { VscSignOut } from "react-icons/vsc"
import * as Icons from "react-icons/vsc"
import { sidebarLinks } from "../data/dashboard-links"
import { logout } from "../services/operations/authAPI"
import ConfirmationModal from "../components/common/ConfirmationModal"

function Dashboard() {
    const {loading: authLoading} = useSelector((state) => state.auth);
    const {loading: profileLoading} = useSelector((state) => state.profile);
    const {user} = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState(null);

    if(authLoading || profileLoading) {
        return (
            <div className='flex justify-center items-center h-screen w-full bg-gradient-to-br from-gray-100 to-cyan-100'>
                <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400'></div>
            </div>
        )
    }

    return (
        <div className='relative flex min-h-[calc(100vh-3.5rem)] bg-gradient-to-br from-gray-100 to-cyan-100'>
            {/* Sidebar - Hidden on mobile, visible from md breakpoint */}
            <div className='hidden md:block'>
                <Sidebar />
            </div>

            {/* Main Content Area */}
            <div className='flex-1 h-[calc(100vh-3.5rem)] overflow-auto'>
                <div className='mx-auto w-full px-4 sm:px-6 md:w-11/12 md:max-w-[1200px] py-8 md:py-10 bg-white rounded-xl shadow-lg'>
                    <Outlet />
                </div>
            </div>

            {/* Mobile Bottom Navigation Bar */}
            <div className='md:hidden fixed bottom-0 left-0 w-full bg-gradient-to-r from-white to-gray-100 shadow-lg z-50'>
                <div className='flex justify-around items-center py-2'>
                    {sidebarLinks.map((link) => {
                        if (link.type && user?.accountType !== link.type) return null;
                        const Icon = Icons[link.icon];
                        return (
                            <NavLink
                                key={link.id}
                                to={link.path}
                                className={({ isActive }) =>
                                    `flex flex-col items-center p-2 rounded-lg ${
                                        isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-200 hover:text-blue-600'
                                    } transition-all duration-300`
                                }
                            >
                                <Icon size={24} className="transform hover:scale-110 transition-transform duration-200" />
                                <span className='text-xs font-medium'>{link.name}</span>
                            </NavLink>
                        );
                    })}

                    {/* mobile view add after all fix  */}

                    <NavLink
                        to="/dashboard/settings"
                        className={({ isActive }) =>
                            `flex flex-col items-center p-2 rounded-lg ${
                                isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-200 hover:text-blue-600'
                            } transition-all duration-300`
                        }
                    >
                        <Icons.VscSettingsGear size={24} className="transform hover:scale-110 transition-transform duration-200" />
                        <span className='text-xs font-medium'>Settings</span>
                    </NavLink>
                    {/* <button
                        onClick={() =>
                            setConfirmationModal({
                                text1: "Are you sure?",
                                text2: "You will be logged out of your account.",
                                btn1Text: "Logout",
                                btn2Text: "Cancel",
                                btn1Handler: () => dispatch(logout(navigate)),
                                btn2Handler: () => setConfirmationModal(null),
                            })
                        }
                        className='flex flex-col items-center p-2 text-gray-700 hover:bg-red-500/20 hover:text-blue-600 rounded-lg transition-all duration-300'
                    >
                        <VscSignOut size={24} className="transform hover:scale-110 transition-transform duration-200" />
                        <span className='text-xs font-medium'>Logout</span>
                    </button> */}
                </div>
            </div>

            {/* {confirmationModal && <ConfirmationModal modalData={confirmationModal} />} */}
        </div>
    )
}

export default Dashboard




// import React from 'react'
// import { useSelector } from 'react-redux'
// import { Outlet } from 'react-router-dom';
// import Sidebar from '../components/Sidebar';

// function Dashboard() {
//     const {loading: authLoading} = useSelector((state) => state.auth);
//     const {loading: profileLoading} = useSelector((state) => state.profile);

//     if(authLoading || profileLoading) {
//         return (
//             <div className='flex justify-center items-center h-screen w-full'>
//                 <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-100'></div>
//             </div>
//         )
//     }

//     return (
//         <div className='relative flex min-h-[calc(100vh-3.5rem)] bg-richblack-900'>
//             {/* Sidebar - Hidden on mobile, visible from md breakpoint */}
//             <div className='hidden md:block'>
//                 <Sidebar />
//             </div>
            
//             {/* Mobile menu button - Visible only on mobile */}
//             <div className='md:hidden fixed bottom-4 right-4 z-50'>
//                 <button className='bg-yellow-50 text-richblack-900 p-3 rounded-full shadow-lg'>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                     </svg>
//                 </button>
//             </div>

//             {/* Main Content Area */}
//             <div className='flex-1 h-[calc(100vh-3.5rem)] overflow-auto'>
//                 <div className='mx-auto w-full px-4 sm:px-6 md:w-11/12 md:max-w-[1200px] py-8 md:py-10'>
//                     <Outlet />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Dashboard








