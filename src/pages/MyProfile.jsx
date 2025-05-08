// import React from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import IconBtn from "../components/common/IconBtn"

// function MyProfile() {

//     const {user} = useSelector( (state) => state.profile)
//     const navigate = useNavigate();
//   return (
//     <div>

//         <h1>My Profile</h1>

//         {/* section 1 */}
//         <div>
//             <div>
//                 <img src={user?.image} className='apsect-square w-[78px] rounded-full object-cover' alt="user image"/>
//                 <div>
//                     <p>{user?.firstName + " " + user?.lastName}</p>
//                     <p>{user?.email}</p>
//                 </div>
//             </div>
//             <IconBtn
//                 text="Edit"
//                 onClick={ () => {
//                     navigate("/dashboard/settings")
//                 }}
//             >
//             </IconBtn>
//         </div>

//         {/* section 2 */}
//         <div>
//             <div>
//                 <p>About</p>
//                 <IconBtn text="Edit" onClick={ () => {navigate("/dashboard/settings")}}></IconBtn>
//             </div>
//             <p>{user?.additionalDetails?.about ?? "Write something about your self"}</p>
//         </div>

//         {/* section 3 */}
//         <div>
//             <div>
//                 <p>Personal Details</p>
//                 <IconBtn text="Edit" onClick={ () => {navigate("/dashboard/settings")}}></IconBtn>
//             </div>
//             <div>
//                 <div>
//                     <p>First Name</p>
//                     <p>{user?.firstName}</p>
//                 </div>
//                 <div>
//                     <p>Email</p>
//                     <p>{user?.email}</p>
//                 </div>
//                 <div>
//                     <p>Gender</p>
//                     <p>{user?.additionalDetails?.gender ?? "Add gender"}</p>
//                 </div>
//                 <div>
//                     <p>Last Name</p>
//                     <p>{user.lastName}</p>
//                 </div>
//                 <div>
//                     <p>Phone Number</p>
//                     <p>{user?.additionalDetails?.contactNumber ?? "Add phone number"}</p>
//                 </div>
//                 <div>
//                     <p>Date of Birth</p>
//                     <p>{user?.additionalDetails?.dateOfBirth ?? "Add date of birth"}</p>
//                 </div>
//             </div>
//         </div>


//     </div>
//   )
// }

// export default MyProfile




import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from "../components/common/IconBtn"

function MyProfile() {
    const {user} = useSelector((state) => state.profile)
    const navigate = useNavigate();
    
    return (
        <div className="w-full max-h-screen bg-richblack-900 text-richblack-5 p-4 sm:p-8">
            {/* Main Container */}
            <div className="max-w-[1200px] mx-auto">
                {/* Header */}
                <h1 className="text-3xl font-bold mb-8 text-center sm:text-left">My Profile</h1>

                {/* Section 1: Profile Card */}
                <div className="bg-richblack-800 rounded-xl p-6 mb-8 shadow-lg">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <img 
                                src={user?.image} 
                                className='aspect-square w-20 h-20 rounded-full object-cover border-2 border-yellow-200'
                                alt="Profile" 
                            />
                            <div>
                                <p className="text-xl font-bold">{user?.firstName + " " + user?.lastName}</p>
                                <p className="text-richblack-200">{user?.email}</p>
                            </div>
                        </div>
                        <IconBtn
                            text="Edit"
                            customClasses="bg-yellow-100 text-richblack-900 hover:bg-yellow-50 py-2 px-4 rounded-lg font-medium transition-all"
                            onClick={() => navigate("/dashboard/settings")}
                        />
                    </div>
                </div>

                {/* Section 2: About */}
                <div className="bg-richblack-800 rounded-xl p-6 mb-8 shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">About</h2>
                        <IconBtn 
                            text="Edit" 
                            customClasses="bg-richblack-700 text-richblack-5 hover:bg-richblack-600 py-2 px-4 rounded-lg font-medium transition-all"
                            onClick={() => navigate("/dashboard/settings")}
                        />
                    </div>
                    <p className={`text-richblack-100 ${!user?.additionalDetails?.about ? "italic text-richblack-400" : ""}`}>
                        {user?.additionalDetails?.about ?? "Write something about yourself"}
                    </p>
                </div>

                {/* Section 3: Personal Details */}
                <div className="bg-richblack-800 rounded-xl p-6 shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Personal Details</h2>
                        <IconBtn 
                            text="Edit" 
                            customClasses="bg-richblack-700 text-richblack-5 hover:bg-richblack-600 py-2 px-4 rounded-lg font-medium transition-all"
                            onClick={() => navigate("/dashboard/settings")}
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Row 1 */}
                        <DetailItem label="First Name" value={user?.firstName} />
                        <DetailItem label="Email" value={user?.email} />
                        
                        {/* Row 2 */}
                        <DetailItem label="Gender" value={user?.additionalDetails?.gender} placeholder="Add gender" />
                        <DetailItem label="Last Name" value={user?.lastName} />
                        
                        {/* Row 3 */}
                        <DetailItem label="Phone Number" value={user?.additionalDetails?.contactNumber} placeholder="Add phone number" />
                        <DetailItem label="Date of Birth" value={user?.additionalDetails?.dateOfBirth} placeholder="Add date of birth" />
                    </div>
                </div>
            </div>
        </div>
    )
}

// Reusable Detail Item Component
function DetailItem({ label, value, placeholder }) {
    return (
        <div className="flex flex-col gap-1">
            <p className="text-sm text-richblack-400">{label}</p>
            <p className={`font-medium ${!value ? "italic text-richblack-400" : ""}`}>
                {value || placeholder}
            </p>
        </div>
    )
}

export default MyProfile