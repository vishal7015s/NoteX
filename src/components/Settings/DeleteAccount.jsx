import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deleteProfile } from "../../services/operations/SettingsAPI";
import ConfirmationModal from "../../components/common/ConfirmationModal";

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);

  async function handleDeleteAccount() {
    try {
      await dispatch(deleteProfile(token, navigate));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  }

  return (
    <div className="bg-white border-2 border-gray-300 rounded-xl shadow-md  transition-all duration-300 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
          <FiTrash2 size={24} className="hover:scale-110 transition-transform duration-300" />
        </div>
        <div className="flex-1 space-y-2 text-center sm:text-left">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">Delete Account</h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Permanently delete your account and all associated content, including paid courses.
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            setConfirmationModal({
              text1: "Are you sure?",
              text2: "This will permanently delete your account and all its content.",
              btn1Text: "Delete",
              btn2Text: "Cancel",
              btn1Handler: () => {
                handleDeleteAccount();
                setConfirmationModal(null);
              },
              btn2Handler: () => setConfirmationModal(null),
            })
          }
          className="rounded-md bg-red-600 text-white font-medium py-2 px-4 sm:px-5 hover:bg-red-700 hover:scale-105 transition-all duration-300 text-sm sm:text-base"
        >
          Delete My Account
        </button>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}



// the  real code 
// import { FiTrash2 } from "react-icons/fi"
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"

// import { deleteProfile } from "../../services/operations/SettingsAPI"

// export default function DeleteAccount() {
//   const { token } = useSelector((state) => state.auth)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   async function handleDeleteAccount() {
//     try {
//       dispatch(deleteProfile(token, navigate))
//     } catch (error) {
//       console.log("ERROR MESSAGE - ", error.message)
//     }
//   }

//   return (
//     <>
//       <div className="my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 px-12">
//         <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
//           <FiTrash2 className="text-3xl text-pink-200" />
//         </div>
//         <div className="flex flex-col space-y-2">
//           <h2 className="text-lg font-semibold text-richblack-5">
//             Delete Account
//           </h2>
//           <div className="w-3/5 text-pink-25">
//             <p>Would you like to delete account?</p>
//             <p>
//               This account may contain Paid Courses. Deleting your account is
//               permanent and will remove all the contain associated with it.
//             </p>
//           </div>
//           <button
//             type="button"
//             className="w-fit cursor-pointer italic text-pink-300"
//             onClick={handleDeleteAccount}
//           >
//             I want to delete my account.
//           </button>
//         </div>
//       </div>
//     </>
//   )
// }