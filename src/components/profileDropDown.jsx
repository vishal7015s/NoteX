import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import useOnClickOutside from "../components/useOnClickOutside"
import { logout } from "../services/operations/authAPI"

export default function ProfileDropDown({ mobileClose }) {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))

  if (!user) return null

  return (
    <button className="relative" onClick={() => setOpen(true)}>
      <div className="flex items-center gap-x-2">
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-8 rounded-full object-cover ring-2 ring-amber-400 transform hover:scale-110 transition-all duration-300 shadow-sm"
        />
        <AiOutlineCaretDown className="text-md text-gray-200 transition-transform duration-300 group-hover:rotate-180" />
      </div>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[120%] right-0 z-[1000] w-48 overflow-hidden rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 shadow-2xl border border-gray-600 transform transition-all duration-300 animate-slideDown"
          ref={ref}
        >
          <Link to="/dashboard/my-profile" onClick={() => { setOpen(false); mobileClose?.(); }}>
            <div className="flex items-center gap-x-2 py-3 px-4 text-sm text-gray-200 hover:bg-indigo-700 hover:text-amber-400 transition-colors duration-200">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
          <div
            onClick={() => {
              dispatch(logout(navigate))
              setOpen(false)
              mobileClose?.()
            }}
            className="flex items-center gap-x-2 py-3 px-4 text-sm text-gray-200 hover:bg-red-600/50 hover:text-amber-400 transition-colors duration-200"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </button>
  )
}



// import { useRef, useState } from "react"
// import { AiOutlineCaretDown } from "react-icons/ai"
// import { VscDashboard, VscSignOut } from "react-icons/vsc"
// import { useDispatch, useSelector } from "react-redux"
// import { Link, useNavigate } from "react-router-dom"

// import useOnClickOutside from "../components/useOnClickOutside"
// import { logout } from "../services/operations/authAPI"

// export default function ProfileDropDown({ mobileClose }) {
//   const { user } = useSelector((state) => state.profile)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const [open, setOpen] = useState(false)
//   const ref = useRef(null)

//   useOnClickOutside(ref, () => setOpen(false))

//   if (!user) return null

//   return (
//     <button className="relative" onClick={() => setOpen(true)}>
//       <div className="flex items-center gap-x-2">
//         <img
//           src={user?.image}
//           alt={`profile-${user?.firstName}`}
//           className="aspect-square w-[30px] rounded-full object-cover ring-2 ring-blue-500 transition-transform hover:scale-110"
//         />
//         <AiOutlineCaretDown className="text-sm text-white transition-transform duration-300 group-hover:rotate-180" />
//       </div>
//       {open && (
//         <div
//           onClick={(e) => e.stopPropagation()}
//           className="absolute top-[120%] right-0 z-[1000] w-48 overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl border border-gray-700 transform transition-all duration-300 animate-slideDown"
//           ref={ref}
//         >
//           <Link to="/dashboard/my-profile" onClick={() => { setOpen(false); mobileClose?.(); }}>
//             <div className="flex items-center gap-x-2 py-3 px-4 text-sm text-gray-200 hover:bg-blue-600/50 hover:text-white transition-colors duration-200">
//               <VscDashboard className="text-lg" />
//               Dashboard
//             </div>
//           </Link>
//           <div
//             onClick={() => {
//               dispatch(logout(navigate))
//               setOpen(false)
//               mobileClose?.()
//             }}
//             className="flex items-center gap-x-2 py-3 px-4 text-sm text-gray-200 hover:bg-red-600/50 hover:text-white transition-colors duration-200"
//           >
//             <VscSignOut className="text-lg" />
//             Logout
//           </div>
//         </div>
//       )}
//     </button>
//   )
// }



// import { useRef, useState } from "react"
// import { AiOutlineCaretDown } from "react-icons/ai"
// import { VscDashboard, VscSignOut } from "react-icons/vsc"
// import { useDispatch, useSelector } from "react-redux"
// import { Link, useNavigate } from "react-router-dom"

// import useOnClickOutside from "../components/useOnClickOutside"
// import { logout } from "../services/operations/authAPI"

// export default function ProfileDropDown() {
//   const { user } = useSelector((state) => state.profile)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const [open, setOpen] = useState(false)
//   const ref = useRef(null)

//   useOnClickOutside(ref, () => setOpen(false))

//   if (!user) return null

//   return (
//     <button className="relative" onClick={() => setOpen(true)}>
//       <div className="flex items-center gap-x-1">
//         <img
//           src={user?.image}
//           alt={`profile-${user?.firstName}`}
//           className="aspect-square w-[30px] rounded-full object-cover"
//         />
//         <AiOutlineCaretDown className="text-sm text-richblack-100" />
//       </div>
//       {open && (
//         <div
//           onClick={(e) => e.stopPropagation()}
//           className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
//           ref={ref}
//         >
//           <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
//             <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
//               <VscDashboard className="text-lg" />
//               Dashboard
//             </div>
//           </Link>
//           <div
//             onClick={() => {
//               dispatch(logout(navigate))
//               setOpen(false)
//             }}
//             className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
//           >
//             <VscSignOut className="text-lg" />
//             Logout
//           </div>
//         </div>
//       )}
//     </button>
//   )
// }