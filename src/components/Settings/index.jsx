import { Children, useState } from "react"
import ChangeProfilePicture from "./ChangeProfilePicture"
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"
import { logout } from "../../services/operations/authAPI"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { VscSignOut } from "react-icons/vsc"
import ConfirmationModal from "../../components/common/ConfirmationModal"




export default function Settings() {

  const [confirmationModal, setConfirmationModal] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Profile
      </h1>
      {/* Change Profile Picture */}
      <ChangeProfilePicture />
      {/* Profile */}
      <EditProfile />
      {/* Password */}
      <UpdatePassword />
      {/* Delete Account */}

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
        className='flex flex-col items-center p-2 text-gray-700 hover:bg-red-500/20 hover:text-blue-600 rounded-lg transition-all duration-300'
      >
        <VscSignOut size={24} className="transform hover:scale-110 transition-transform duration-200" />
        <span className='text-xs font-medium'>Logout</span>
      </button>

      <DeleteAccount >{Children}</DeleteAccount>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}