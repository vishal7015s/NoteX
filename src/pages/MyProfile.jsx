import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FiEdit2 } from 'react-icons/fi'

function MyProfile() {
    const { user } = useSelector((state) => state.profile)
    const navigate = useNavigate();
    
    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-richblack-900 to-richblack-800 text-richblack-5 p-4 sm:p-8">
            {/* Main Container */}
            <div className="max-w-[1200px] mx-auto">
                {/* Header with single Edit Profile button */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent">
                        My Profile
                    </h1>
                    <button 
                        onClick={() => navigate("/dashboard/settings")}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg  bg-yellow-100 hover:bg-yellow-100 text-richblack-900 font-medium transition-all duration-200"
                    >
                        <FiEdit2 className="text-lg" />
                        <span>Edit Profile</span>
                    </button>
                </div>

                {/* Section 1: Profile Card */}
                <div className="bg-richblack-800 rounded-xl p-6 mb-8 shadow-lg border border-gray-700 hover:border-richblack-600 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="flex items-center gap-4">
                            <img 
                                src={user?.image} 
                                className='aspect-square w-16 sm:w-20 h-16 sm:h-20 rounded-full object-cover border-2 border-yellow-200'
                                alt="Profile" 
                            />
                            <div>
                                <p className="text-lg sm:text-xl font-bold text-white">
                                    {user?.firstName + " " + user?.lastName}
                                </p>
                                <p className="text-sm sm:text-base  text-richblack-200">{user?.email}</p>
                                <p className="text-xs sm:text-sm mt-1 mb-1 px-2 py-1 bg-richblack-700 rounded-full inline-block">
                                   ( {user?.accountType} )
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 2: About */}
                <div className="bg-richblack-800 rounded-xl p-6 mb-8 shadow-lg border border-gray-700">
                    <h2 className="text-lg sm:text-xl font-bold text-white mb-4">About</h2>
                    <p className={`text-richblack-100 p-4 rounded-lg bg-richblack-700 ${!user?.additionalDetails?.about ? "italic text-richblack-400" : ""}`}>
                        {user?.additionalDetails?.about ?? "if you write something about yourself click on edit profile button..."}
                    </p>
                </div>

                {/* Section 3: Personal Details */}
                <div className=" bg-richblack-800 rounded-xl p-6 shadow-lg border border-gray-700">
                    <h2 className="text-lg sm:text-xl font-bold text-white ">Personal Details</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        {/* Row 1 */}
                        <DetailItem 
                            label="First Name" 
                            placeholder={user?.firstName} 
                        />
                            <DetailItem 
                                label="Last Name" 
                                placeholder={user?.lastName} 
                            />
                        <DetailItem 
                            label="Email" 
                            placeholder={user?.email} 
                        />
                        
                        {/* Row 2 */}
                        <DetailItem 
                            label="Gender" 
                            value={user?.additionalDetails?.gender} 
                            placeholder="Not specified" 
                        />
                        
                        {/* Row 3 */}
                        <DetailItem 
                            label="Phone Number" 
                            value={user?.additionalDetails?.contactNumber} 
                            placeholder="Not specified" 
                        />
                        <DetailItem 
                            label="Date of Birth" 
                            value={user?.additionalDetails?.dateOfBirth} 
                            placeholder="Not specified" 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

// Simplified Detail Item Component without edit icon
function DetailItem({ label, value, placeholder }) {
    return (
        <div className="flex flex-col gap-1 p-3 sm:p-4 rounded-lg bg-richblack-700">
            <p className="text-xs sm:text-sm text-richblack-300">{label}</p>
            <p className={`text-sm sm:text-base font-medium ${!value ? "italic text-richblack-400" : "text-white"}`}>
                {value || placeholder}
            </p>
        </div>
    )
}

export default MyProfile


// import React from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import IconBtn from "../components/common/IconBtn"

// function MyProfile() {
//     const {user} = useSelector((state) => state.profile)
//     const navigate = useNavigate();
    
//     return (
//         <div className="w-full max-h-screen bg-richblack-900 text-richblack-5 p-4 sm:p-8">
//             {/* Main Container */}
//             <div className="max-w-[1200px] mx-auto">
//                 {/* Header */}
//                 <h1 className="text-3xl font-bold mb-8 text-center sm:text-left">My Profile</h1>

//                 {/* Section 1: Profile Card */}
//                 <div className="bg-richblack-800 rounded-xl p-6 mb-8 shadow-lg">
//                     <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
//                         <div className="flex items-center gap-4">
//                             <img 
//                                 src={user?.image} 
//                                 className='aspect-square w-20 h-20 rounded-full object-cover border-2 border-yellow-200'
//                                 alt="Profile" 
//                             />
//                             <div>
//                                 <p className="text-xl font-bold">{user?.firstName + " " + user?.lastName}</p>
//                                 <p className="text-richblack-200">{user?.email}</p>
//                             </div>
//                         </div>
//                         <IconBtn
//                             text="Edit"
//                             customClasses="bg-yellow-100 text-richblack-900 hover:bg-yellow-50 py-2 px-4 rounded-lg font-medium transition-all"
//                             onClick={() => navigate("/dashboard/settings")}
//                         />
//                     </div>
//                 </div>

//                 {/* Section 2: About */}
//                 <div className="bg-richblack-800 rounded-xl p-6 mb-8 shadow-lg">
//                     <div className="flex justify-between items-center mb-4">
//                         <h2 className="text-xl font-bold">About</h2>
//                         <IconBtn 
//                             text="Edit" 
//                             customClasses="bg-richblack-700 text-richblack-5 hover:bg-richblack-600 py-2 px-4 rounded-lg font-medium transition-all"
//                             onClick={() => navigate("/dashboard/settings")}
//                         />
//                     </div>
//                     <p className={`text-richblack-100 ${!user?.additionalDetails?.about ? "italic text-richblack-400" : ""}`}>
//                         {user?.additionalDetails?.about ?? "Write something about yourself"}
//                     </p>
//                 </div>

//                 {/* Section 3: Personal Details */}
//                 <div className="bg-richblack-800 rounded-xl p-6 shadow-lg">
//                     <div className="flex justify-between items-center mb-6">
//                         <h2 className="text-xl font-bold">Personal Details</h2>
//                         <IconBtn 
//                             text="Edit" 
//                             customClasses="bg-richblack-700 text-richblack-5 hover:bg-richblack-600 py-2 px-4 rounded-lg font-medium transition-all"
//                             onClick={() => navigate("/dashboard/settings")}
//                         />
//                     </div>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {/* Row 1 */}
//                         <DetailItem label="First Name" value={user?.firstName} />
//                         <DetailItem label="Email" value={user?.email} />
                        
//                         {/* Row 2 */}
//                         <DetailItem label="Gender" value={user?.additionalDetails?.gender} placeholder="Add gender" />
//                         <DetailItem label="Last Name" value={user?.lastName} />
                        
//                         {/* Row 3 */}
//                         <DetailItem label="Phone Number" value={user?.additionalDetails?.contactNumber} placeholder="Add phone number" />
//                         <DetailItem label="Date of Birth" value={user?.additionalDetails?.dateOfBirth} placeholder="Add date of birth" />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// // Reusable Detail Item Component
// function DetailItem({ label, value, placeholder }) {
//     return (
//         <div className="flex flex-col gap-1">
//             <p className="text-sm text-richblack-400">{label}</p>
//             <p className={`font-medium ${!value ? "italic text-richblack-400" : ""}`}>
//                 {value || placeholder}
//             </p>
//         </div>
//     )
// }

// export default MyProfile