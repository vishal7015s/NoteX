import React from 'react'
import * as Icons from "react-icons/vsc"
import { NavLink, useLocation } from 'react-router-dom';

function SidebarLink({ link, iconName }) {
  const Icon = Icons[iconName];
  const location = useLocation();

  const isActive = location.pathname === link.path;

  return (
    <NavLink 
      to={link.path}
      className={`
        group relative flex items-center gap-x-2 px-6 py-3 text-sm font-medium text-gray-700
        ${isActive ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-200 hover:text-blue-600'}
        transition-all duration-300 rounded-lg
      `}
    >
      {isActive && (
        <span className='absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r'></span>
      )}
      <Icon className="text-lg transform group-hover:scale-110 transition-transform duration-200" />
      <span className="group-hover:font-semibold">{link.name}</span>
    </NavLink>
  )
}

export default SidebarLink



// import React from 'react'
// import * as Icons from "react-icons/vsc"
// import { useDispatch } from 'react-redux';
// import { NavLink, useLocation } from 'react-router-dom';

// function SidebarLink({ link, iconName }) {
//   const Icon = Icons[iconName];
//   const dispatch = useDispatch();
//   const location = useLocation();

//   const isActive = location.pathname === link.path;

//   return (
//     <NavLink 
//       to={link.path}
//       className={`
//         group relative flex items-center gap-x-2 px-8 py-2 text-sm font-medium 
//         ${isActive ? 'bg-gray-200' : 'text-richblack-300 hover:bg-gray-300'}
//         transition-all duration-200
//       `}
//     >
//       {isActive && (
//         <span className='absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-200 rounded-r'></span>
//       )}
//       <Icon className="text-lg" />
//       <span className="opacity-500 group-hover:opacity-500">{link.name}</span>
//     </NavLink>
//   )
// }

// export default SidebarLink