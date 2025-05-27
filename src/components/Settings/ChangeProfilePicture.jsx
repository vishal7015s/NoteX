
import { useEffect, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import { updateDisplayPicture } from "../../services/operations/SettingsAPI";
import IconBtn from "../common/IconBtn";

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileUpload = () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("displayPicture", imageFile);
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false);
      });
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
      <div className="flex items-center gap-3 sm:gap-4">
        <img
          src={previewSource || user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-16 sm:w-20 rounded-full object-cover border-2 border-blue-200 hover:scale-105 transition-transform duration-300"
        />
        <div className="space-y-2">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">Change Profile Picture</h2>
          <p className="text-xs sm:text-sm text-gray-600">Upload a new profile picture</p>
        </div>
      </div>
      <div className="flex flex-row gap-2 sm:gap-3">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/gif, image/jpeg"
        />
        <button
          onClick={handleClick}
          disabled={loading}
          className="rounded-md bg-blue-600 text-white font-medium py-2 px-4 sm:px-5 hover:bg-blue-700 hover:scale-105 transition-all duration-300 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Select
        </button>
        <IconBtn
          text={loading ? "Uploading..." : "Upload"}
          onClick={handleFileUpload}
          disabled={loading}
          customClasses="flex items-center gap-2 rounded-md bg-blue-100 text-blue-600 font-medium py-2 px-4 sm:px-5 hover:bg-blue-200 hover:scale-105 transition-all duration-300 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {!loading && <FiUpload className="text-base sm:text-lg text-blue-600" />}
          {loading && (
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-600"></div>
          )}
        </IconBtn>
      </div>
    </div>
  );
}



// the real code 
// import { useEffect, useRef, useState } from "react"
// import { FiUpload } from "react-icons/fi"
// import { useDispatch, useSelector } from "react-redux"

// import { updateDisplayPicture } from "../../services/operations/SettingsAPI"
// import IconBtn from "../common/IconBtn"

// export default function ChangeProfilePicture() {
//   const { token } = useSelector((state) => state.auth)
//   const { user } = useSelector((state) => state.profile)
//   const dispatch = useDispatch()

//   const [loading, setLoading] = useState(false)
//   const [imageFile, setImageFile] = useState(null)
//   const [previewSource, setPreviewSource] = useState(null)

//   const fileInputRef = useRef(null)

//   const handleClick = () => {
//     fileInputRef.current.click()
//   }

//   const handleFileChange = (e) => {
//     const file = e.target.files[0]
//     // console.log(file)
//     if (file) {
//       setImageFile(file)
//       previewFile(file)
//     }
//   }

//   const previewFile = (file) => {
//     const reader = new FileReader()
//     reader.readAsDataURL(file)
//     reader.onloadend = () => {
//       setPreviewSource(reader.result)
//     }
//   }

//   const handleFileUpload = () => {
//     try {
//       console.log("uploading...")
//       setLoading(true)
//       const formData = new FormData()
//       formData.append("displayPicture", imageFile)
//       // console.log("formdata", formData)
//       dispatch(updateDisplayPicture(token, formData)).then(() => {
//         setLoading(false)
//       })
//     } catch (error) {
//       console.log("ERROR MESSAGE - ", error.message)
//     }
//   }

//   useEffect(() => {
//     if (imageFile) {
//       previewFile(imageFile)
//     }
//   }, [imageFile])
//   return (
//     <>
//       <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
//         <div className="flex items-center gap-x-4">
//           <img
//             src={previewSource || user?.image}
//             alt={`profile-${user?.firstName}`}
//             className="aspect-square w-[78px] rounded-full object-cover"
//           />
//           <div className="space-y-2">
//             <p>Change Profile Picture</p>
//             <div className="flex flex-row gap-3">
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//                 className="hidden"
//                 accept="image/png, image/gif, image/jpeg"
//               />
//               <button
//                 onClick={handleClick}
//                 disabled={loading}
//                 className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
//               >
//                 Select
//               </button>
//               <IconBtn
//                 text={loading ? "Uploading..." : "Upload"}
//                 onClick={handleFileUpload}
//               >
//                 {!loading && (
//                   <FiUpload className="text-lg text-richblack-900" />
//                 )}
//               </IconBtn>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }