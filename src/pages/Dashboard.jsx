// import React from 'react'
// import { useSelector } from 'react-redux'
// import { Outlet } from 'react-router-dom';
// import Sidebar from '../components/Sidebar';

// function Dashboard() {

//     const {loading: authLoading} = useSelector( (state) => state.auth);
//     const {loading: profileLoading} = useSelector( (state) => state.profile);

//     if(authLoading || profileLoading){
//         return(
//             <div className='mt-12'>Loading...</div>
//         )
//     }

//   return (
//     <div className='relative flex min-h[calc(100vh-3.5rem)]'>
//         <Sidebar></Sidebar>
//         <div className='h[calc(100vh-3.5rem)] overflow-auto'>
//             <div className='mx-auto w-11/12 max-w-[100px] py-10'>
//                 <Outlet></Outlet>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Dashboard






// import { useSelector } from "react-redux"
// import { Outlet } from "react-router-dom"

// import Sidebar from "../components/Sidebar"

// function Dashboard() {
//   const { loading: profileLoading } = useSelector((state) => state.profile)
//   const { loading: authLoading } = useSelector((state) => state.auth)

//   if (profileLoading || authLoading) {
//     return (
//       <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
//         <div className="spinner">hello...</div>
//       </div>
//     )
//   }

//   return (
//     <div className="relative flex min-h-[calc(100vh-3.5rem)]">
//       <Sidebar />
//       <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
//         <div className="mx-auto w-11/12 max-w-[1000px] py-10">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Dashboard








import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function Dashboard() {
    const {loading: authLoading} = useSelector((state) => state.auth);
    const {loading: profileLoading} = useSelector((state) => state.profile);

    if(authLoading || profileLoading) {
        return (
            <div className='flex justify-center items-center h-screen w-full'>
                <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-100'></div>
            </div>
        )
    }

    return (
        <div className='relative flex min-h-[calc(100vh-3.5rem)] bg-richblack-900'>
            {/* Sidebar - Hidden on mobile, visible from md breakpoint */}
            <div className='hidden md:block'>
                <Sidebar />
            </div>
            
            {/* Mobile menu button - Visible only on mobile */}
            <div className='md:hidden fixed bottom-4 right-4 z-50'>
                <button className='bg-yellow-50 text-richblack-900 p-3 rounded-full shadow-lg'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Main Content Area */}
            <div className='flex-1 h-[calc(100vh-3.5rem)] overflow-auto'>
                <div className='mx-auto w-full px-4 sm:px-6 md:w-11/12 md:max-w-[1200px] py-8 md:py-10'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard








