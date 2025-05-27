import { useState } from "react";
import { VscSignOut } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import ChangeProfilePicture from "./ChangeProfilePicture";
import DeleteAccount from "./DeleteAccount";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";
import { logout } from "../../services/operations/authAPI";
import ConfirmationModal from "../../components/common/ConfirmationModal";

export default function Settings() {
  const [confirmationModal, setConfirmationModal] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 sm:mb-8 animate-fade-in">
          Edit Profile
        </h1>
        <div className="space-y-4 sm:space-y-6">
          {/* Change Profile Picture */}
          <div className="bg-white border-2 border-gray-300 rounded-xl shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-300 p-4 sm:p-6">
            <ChangeProfilePicture />
          </div>
          {/* Edit Profile */}
          <div className="bg-white border-2 border-gray-300 rounded-xl shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-300 p-4 sm:p-6">
            <EditProfile />
          </div>
          {/* Update Password */}
          <div className="bg-white border-2 border-gray-300 rounded-xl shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-300 p-4 sm:p-6">
            <UpdatePassword />
          </div>
          {/* Delete Account */}
          <div className="bg-white border-2 border-gray-300 rounded-xl shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-300 p-4 sm:p-6">
            <DeleteAccount />
          </div>
          {/* Logout */}
          <div className="bg-white border-2 border-gray-300 rounded-xl shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-300 p-4 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <VscSignOut size={24} />
              </div>
              <div className="flex-1">
                <h2 className="text-base sm:text-lg font-semibold text-gray-800">Logout</h2>
                <p className="text-xs sm:text-sm text-gray-600">Sign out of your account</p>
              </div>
              <button
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
                className="rounded-md bg-blue-600 text-white font-medium py-2 px-4 hover:bg-blue-700 hover:scale-105 transition-all duration-300 text-sm sm:text-base"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
      </div>
    </div>
  );
}


// import { Children, useState } from "react"
// import ChangeProfilePicture from "./ChangeProfilePicture"
// import DeleteAccount from "./DeleteAccount"
// import EditProfile from "./EditProfile"
// import UpdatePassword from "./UpdatePassword"
// import { logout } from "../../services/operations/authAPI"
// import { useDispatch } from "react-redux"
// import { useNavigate } from "react-router-dom"
// import { VscSignOut } from "react-icons/vsc"
// import ConfirmationModal from "../../components/common/ConfirmationModal"




// export default function Settings() {

//   const [confirmationModal, setConfirmationModal] = useState(null);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//   return (
//     <>
//       <h1 className="mb-14 text-3xl font-medium text-richblack-5">
//         Edit Profile
//       </h1>
//       {/* Change Profile Picture */}
//       <ChangeProfilePicture />
//       {/* Profile */}
//       <EditProfile />
//       {/* Password */}
//       <UpdatePassword />
//       {/* Delete Account */}

//       <button
//         onClick={() =>
//           setConfirmationModal({
//             text1: "Are you sure?",
//             text2: "You will be logged out of your account.",
//             btn1Text: "Logout",
//             btn2Text: "Cancel",
//             btn1Handler: () => dispatch(logout(navigate)),
//             btn2Handler: () => setConfirmationModal(null),
//           })
//         }
//         className='flex flex-col items-center p-2 text-gray-700 hover:bg-red-500/20 hover:text-blue-600 rounded-lg transition-all duration-300'
//       >
//         <VscSignOut size={24} className="transform hover:scale-110 transition-transform duration-200" />
//         <span className='text-xs font-medium'>Logout</span>
//       </button>

//       <DeleteAccount >{Children}</DeleteAccount>
//       {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
//     </>
//   )
// }