import React from 'react'

function IconBtn({ 
  text, 
  onClick, 
  children, 
  disabled, 
  outline = false, 
  type,
  customClasses = ""
}) {
  return (
    <button 
      disabled={disabled} 
      onClick={onClick} 
      type={type}
      className={`
        flex items-center justify-center gap-2
        rounded-lg font-medium text-sm sm:text-base
        px-4 py-2 sm:px-5 sm:py-2.5
        transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:ring-offset-2 focus:ring-offset-richblack-800
        transform hover:-translate-y-0.5 active:translate-y-0
        ${
          outline
            ? `border border-yellow-50 text-yellow-50 hover:bg-yellow-50 hover:text-richblack-900 
               shadow-[0_2px_8px_rgba(255,255,255,0.1)] hover:shadow-[0_4px_12px_rgba(255,255,255,0.15)]
               ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`
            : `bg-yellow-200 text-richblack-900 hover:bg-yellow-300 
               shadow-[0_2px_8px_rgba(255,199,0,0.2)] hover:shadow-[0_4px_12px_rgba(255,199,0,0.3)]
               ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`
        }
        ${children ? 'min-w-[40px] px-3' : ''}
        ${customClasses}
      `}
    >
      {children ? (
        <>
          <span className="flex items-center justify-center">
            {children}
          </span>
          {text && <span>{text}</span>}
        </>
      ) : (
        text
      )}
    </button>
  )
}

export default IconBtn