import React from 'react'
import IconButton from './IconBtn'

function ConfirmationModal({modalData}) {
  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center backdrop-blur-[3px] ">
        <div className="bg-gray-200 rounded-xl p-6 w-full max-w-md border border-richblack-600 shadow-[0_10px_25px_rgba(0,0,0,0.3)] animate-scale-in">
            <div className=" text-center">
                <p className="text-2xl font-bold text-richblack-5 mb-3">{modalData.text1}</p>
                <p className="text-richblack-200 mb-8 text-base leading-relaxed">{modalData.text2}</p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <div className="w-full sm:w-auto">
                        <IconButton 
                            onClick={modalData?.btn1Handler} 
                            text={modalData?.btn1Text}
                            customClasses="bg-yellow-100 text-richblack-900 hover:bg-yellow-50 w-full py-2.5 px-6 rounded-lg font-medium transition-all duration-300 hover:shadow-[0_4px_12px_rgba(255,255,255,0.15)] transform hover:-translate-y-0.5 active:translate-y-0"
                        />
                    </div>
                    <button 
                        onClick={modalData?.btn2Handler}
                        className="bg-richblack-600 text-richblack-5 hover:bg-richblack-700 w-full sm:w-auto py-2.5 px-6 rounded-lg font-medium transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transform hover:-translate-y-0.5 active:translate-y-0 border border-richblack-500"
                    >
                        {modalData?.btn2Text}
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationModal