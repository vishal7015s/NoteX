import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { getCatalogPageData } from "../../services/operations/PageAndComponentData";
import Error from "../../pages/secondaryPage/Error";
import Course_Card from "../Catlog/Course_Card";

function Catalog() {
  const { loading } = useSelector((state) => state.profile);
  const { catlogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  // Fetch All Categories
  useEffect(() => {
    (async () => {
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        const category_id = res?.data?.data?.filter(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === catlogName
        )[0]._id;
        setCategoryId(category_id);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
    })();
  }, [catlogName]);

  // Fetch Catalog Page Data
  useEffect(() => {
    if (categoryId) {
      (async () => {
        try {
          const res = await getCatalogPageData(categoryId);
          setCatalogPageData(res);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [categoryId]);

  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-gradient-to-br from-blue-50 to-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-gray-100 text-gray-800">
      {/* Hero Section */}
      <div className="box-content bg-white px-4 py-8 border-b-2 border-gray-300 shadow-md">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent">
          <p className="text-sm text-gray-500">
            {`Home / Catalog / `}
            <span className="text-blue-600 font-medium">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-800">
            {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <p className="max-w-[870px] text-sm sm:text-base text-gray-600">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Section 1: Courses to Get You Started */}
      <div className="mx-auto box-content max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Courses to Get You Started</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {catalogPageData?.data?.selectedCategory?.course?.map((course, i) => (
            <Course_Card course={course} key={i} Height="h-[200px] sm:h-[250px]" />
          ))}
        </div>
      </div>

      {/* Section 2: Top Courses in Different Category */}
      {/* <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
          Top Courses in {catalogPageData?.data?.differentCategory?.name}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {catalogPageData?.data?.differentCategory?.course?.map((course, i) => (
            <Course_Card course={course} key={i} Height="h-[200px] sm:h-[250px]" />
          ))}
        </div>
      </div> */}

      {/* Section 3: Frequently Bought */}
      {/* <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Frequently Bought</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {catalogPageData?.data?.mostSellingCourses?.slice(0, 4).map((course, i) => (
            <Course_Card course={course} key={i} Height="h-[200px] sm:h-[250px]" />
          ))}
        </div>
      </div> */}
    </div>
  );
}

export default Catalog;

//  import React, { useEffect, useState } from "react"
// import { useSelector } from "react-redux"
// import { useParams } from "react-router-dom"

// // import CourseCard from "../components/Catalog/CourseCard"
// // import CourseSlider from "../components/Catalog/CourseSlider"
// // import Course_Card from "../components/core/Catalog/Course_Card"
// // import Course_Slider from "../components/core/Catalog/Course_Slider"
// import { apiConnector } from "../../services/apiConnector"
// import { categories } from "../../services/apis"
// import { getCatalogPageData } from "../../services/operations/PageAndComponentData"
// import Error from "../../pages/secondaryPage/Error"
// import Course_Card from "../Catlog/Course_Card"
// import Course_Slider from "../Catlog/Course_Slider"

// function Catalog() {
//   const { loading } = useSelector((state) => state.profile)
//   const { catlogName } = useParams()
//   const [active, setActive] = useState(1)
//   const [catalogPageData, setCatalogPageData] = useState(null)
//   const [categoryId, setCategoryId] = useState("")
//   // Fetch All Categories
//   useEffect(() => {
//     ;(async () => {
//       try {
//         const res = await apiConnector("GET", categories.CATEGORIES_API)
//         const category_id = res?.data?.data?.filter(
//           (ct) => ct.name.split(" ").join("-").toLowerCase() === catlogName
//         )[0]._id
//         setCategoryId(category_id)
//         console.log(category_id)
//       } catch (error) {
//         console.log("Could not fetch Categories.", error)
//       }
//     })()
//   }, [catlogName])
//   useEffect(() => {
//     if (categoryId) {
//       ;(async () => {
//         try {
//           const res = await getCatalogPageData(categoryId)
//           console.log(res)
//           setCatalogPageData(res)
//         } catch (error) {
//           console.log(error)
//         }
//       })()
//     }
//   }, [categoryId])

//   if (loading || !catalogPageData) {
//     return (
//       <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
//         <div className="spinner"></div>
//       </div>
//     )
//   }
// //   if (!loading && !catalogPageData.success) {
// //     return <Error />
// //   }

// console.log("auraaa",catalogPageData)
  
//   return (
//     <>
//       {/* Hero Section */}
//       <div className=" box-content bg-richblack-800 px-4">
//         <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
//           <p className="text-sm text-richblack-300">
//             {`Home / Catalog / `}
//             <span className="text-yellow-25">
//               {catalogPageData?.data?.selectedCategory?.name}
//             </span>
//           </p>
//           <p className="text-3xl text-richblack-5">
//             {catalogPageData?.data?.selectedCategory?.name}
//           </p>
//           <p className="max-w-[870px] text-richblack-200">
//             {catalogPageData?.data?.selectedCategory?.description}
//           </p>
//         </div>
//       </div>

//       {/* Section 1 */}
//       <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
//         <div className="section_heading p-2 ">Courses to get you started</div>
//         <div>
//           <Course_Slider
//             Courses={catalogPageData?.data?.selectedCategory?.course}
//           />
//         </div>
//       </div>
//       {/* Section 2
//       <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
//         <div className="section_heading">
//           Top courses in {catalogPageData?.data?.differentCategory?.name}
//         </div>
//         <div className="py-8">
//           <Course_Slider
//             Courses={catalogPageData?.data?.differentCategory?.course}
//           />
//         </div>
//       </div> */}

//       {/* Section 3
//       <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
//         <div className="section_heading">Frequently Bought</div>
//         <div className="py-8">
//           <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//             {catalogPageData?.data?.mostSellingCourses
//               ?.slice(0, 4)
//               .map((course, i) => (
//                 <Course_Card course={course} key={i} Height={"h-[400px]"} />
//               ))}
//           </div>
//         </div>
//       </div> */}

//     </>
//   )
// }

// export default Catalog