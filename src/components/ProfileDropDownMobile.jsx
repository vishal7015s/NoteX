import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import useOnClickOutside from "../components/useOnClickOutside"
import { TfiArrowCircleDown } from "react-icons/tfi";

export default function ProfileDropDownMobile({ mobileClose, subLinks, catalogDropdownOpen, setCatalogDropdownOpen }) {
  const { user } = useSelector((state) => state.profile)
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))

  if (!user) return null

  const toggleCatalogDropdown = () => {
    setCatalogDropdownOpen(!catalogDropdownOpen);
  };

  return (
    <button className="relative" onClick={() => setOpen(true)}>
      <div className="flex items-center gap-x-2">
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-8 rounded-full object-cover ring-2 ring-amber-400 transform hover:scale-110 transition-all duration-300 shadow-sm"
        />
        <AiOutlineCaretDown className="text-sm text-gray-200 transition-transform duration-300 group-hover:rotate-180" />
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
          <div className="relative">
            <button 
              onClick={toggleCatalogDropdown}
              className="flex items-center gap-x-3 w-full px-4 py-3 text-sm text-gray-200 hover:bg-indigo-700 hover:text-amber-400 font-semibold transition-colors duration-200"
            >
              <TfiArrowCircleDown className={`transition-transform duration-300 ${catalogDropdownOpen ? 'transform rotate-180' : ''}`} />
              <span>Courses</span>
            </button>

            {catalogDropdownOpen && (
              <div className="bg-gray-900 rounded-lg py-1 animate-slideDown">
                {subLinks.map((sublink, i) => (
                  <Link 
                    key={i}
                    to={`/catlog/${sublink.name.split(" ").join("-").toLowerCase()}`}
                    className="block px-4 py-3 text-sm text-gray-200 hover:bg-indigo-700 hover:text-amber-400 transition-colors duration-200"
                    onClick={() => {
                      setOpen(false);
                      setCatalogDropdownOpen(false);
                      mobileClose?.();
                    }}
                  >
                    {sublink.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </button>
  )
}