import { useState } from "react";
import { VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { sidebarLinks } from "../data/dashboard-links";
import { logout } from "../services/operations/authAPI";
import ConfirmationModal from "../components/common/ConfirmationModal";
import SidebarLink from "./SidebarLink";

export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[250px] items-center border-r-2 border-gray-300 bg-gradient-to-b from-blue-50 to-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-[calc(100vh-3.5rem)] min-w-[250px] flex-col border-r-2 border-gray-300 bg-gradient-to-b from-blue-50 to-gray-100 py-10 shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
        <div className="flex flex-col px-6 flex-grow">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null;
            return (
              <SidebarLink
                key={link.id}
                link={link}
                iconName={link.icon}
                className="transform transition-transform duration-200 hover:scale-105"
              />
            );
          })}
        </div>
        <div className="mx-auto mt-6 mb-4 h-[1px] w-11/12 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        <div className="flex flex-col px-6">
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
            className="transform transition-transform duration-200 hover:scale-105"
          />
          <div className="mx-auto my-4 h-[1px] w-11/12 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
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
            className="flex items-center gap-x-3 px-4 py-3 text-sm font-medium text-gray-800 hover:bg-red-100 hover:text-red-600 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            <VscSignOut className="text-lg transition-transform duration-200 group-hover:rotate-12" />
            <span>Logout</span>
          </button>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}


// import { useState } from "react"
// import { VscSignOut } from "react-icons/vsc"
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"

// import { sidebarLinks } from "../data/dashboard-links"
// import { logout } from "../services/operations/authAPI"
// import ConfirmationModal from "../components/common/ConfirmationModal"
// import SidebarLink from "./SidebarLink"

// export default function Sidebar() {
//   const { user, loading: profileLoading } = useSelector(
//     (state) => state.profile
//   )
//   const { loading: authLoading } = useSelector((state) => state.auth)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const [confirmationModal, setConfirmationModal] = useState(null)

//   if (profileLoading || authLoading) {
//     return (
//       <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r border-gray-300 bg-gradient-to-b from-gray-50 to-blue-50">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
//       </div>
//     )
//   }

//   return (
//     <>
//       <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r border-gray-300 bg-gradient-to-b  from-gray-50 to-blue-50 py-10 shadow-xl">
//         <div className="flex flex-col px-6 flex-grow">
//           {sidebarLinks.map((link) => {
//             if (link.type && user?.accountType !== link.type) return null
//             return (
//               <SidebarLink key={link.id} link={link} iconName={link.icon} />
//             )
//           })}
//         </div>
//         <div className="mx-auto mt-6 mb-4 h-[1px] w-10/12 bg-gray-300" />
//         <div className="flex flex-col px-6">
//           <SidebarLink
//             link={{ name: "Settings", path: "/dashboard/settings" }}
//             iconName="VscSettingsGear"
//           />
//           <div className="mx-auto my-3 h-[1px] w-10/12 bg-gray-300"></div>
//           <button
//             onClick={() =>
//               setConfirmationModal({
//                 text1: "Are you sure?",
//                 text2: "You will be logged out of your account.",
//                 btn1Text: "Logout",
//                 btn2Text: "Cancel",
//                 btn1Handler: () => dispatch(logout(navigate)),
//                 btn2Handler: () => setConfirmationModal(null),
//               })
//             }
//             className="flex items-center gap-x-3 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-red-500/20 hover:text-blue-600 rounded-lg transition-all duration-300"
//           >
//             <VscSignOut className="text-lg" />
//             <span>Logout</span>
//           </button>
//         </div>
//       </div>
//       {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
//     </>
//   )
// }



// import { useState } from "react"
// import { VscSignOut } from "react-icons/vsc"
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"

// import { sidebarLinks } from "../data/dashboard-links"
// import { logout } from "../services/operations/authAPI"
// import ConfirmationModal from "../components/common/ConfirmationModal"
// import SidebarLink from "./SidebarLink"

// export default function Sidebar() {
//   const { user, loading: profileLoading } = useSelector(
//     (state) => state.profile
//   )
//   const { loading: authLoading } = useSelector((state) => state.auth)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const [confirmationModal, setConfirmationModal] = useState(null)

//   if (profileLoading || authLoading) {
//     return (
//       <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
//         <div className="spinner"></div>
//       </div>
//     )
//   }

//   return (
//     <>
//       <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
//         <div className="flex flex-col">
//           {sidebarLinks.map((link) => {
//             if (link.type && user?.accountType !== link.type) return null
//             return (
//               <SidebarLink key={link.id} link={link} iconName={link.icon} />
//             )
//           })}
//         </div>
//         <div className="mx-auto mt-100 mb-4 h-[1px] w-10/12 bg-richblack-700" />
//         <div className="flex flex-col">
//           <SidebarLink
//             link={{ name: "Settings", path: "/dashboard/settings" }}
//             iconName="VscSettingsGear"
//           />
//           <div className="mx-auto my-2 h-[1px] w-10/12 bg-richblack-700"></div>
//           <button
//             onClick={() =>
//               setConfirmationModal({
//                 text1: "Are you sure?",
//                 text2: "You will be logged out of your account.",
//                 btn1Text: "Logout",
//                 btn2Text: "Cancel",
//                 btn1Handler: () => dispatch(logout(navigate)),
//                 btn2Handler: () => setConfirmationModal(null),
//               })
//             }
//             className="flex items-center gap-x-2 px-8 py-2 text-sm font-medium hover:bg-gray-300"
//           >
//             <VscSignOut className="text-lg" />
//             <span className="opacity-100">Logout</span>
//           </button>
//         </div>
//       </div>
//       {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
//     </>
//   )
// }