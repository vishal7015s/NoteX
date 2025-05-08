// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { apiConnector } from '../../services/apiConnector';
// import {categories} from "../../services/apis"
// import  {getCatalogPageData} from '../../services/operations/PageAndComponentData';

// function Catlog() {

//     const {catlogName} = useParams();
//     const [catlogPageData, setCatlogPageData] = useState(null);
//     const [categoryId, setCategoryId] = useState();



//     useEffect(() => {
//         ;(async () => {
//           try {
//             const res = await apiConnector("GET", categories.CATEGORIES_API)
//             console.log("new resl is", res)
//             const category_id = res?.data?.data?.filter(
//               (ct) => ct.name.split(" ").join("-").toLowerCase() === catlogName
//             )[0]._id
//             console.log("bhai category id he nhi mili", category_id)
//             // setCategoryId(category_id)
//           } catch (error) {
//             console.log("Could not fetch Categories.", error)
//           }
//         })()
//       }, [catlogName])

   

//     useEffect(() => {
//         if (categoryId) {
//           ;(async () => {
//             try {
//               const res = await getCatalogPageData(categoryId)
//               console.log("new resl is", res)
//               setCatlogPageData(res)
//             } catch (error) {
//               console.log(error)
//             }
//           })()
//         }
//       }, [categoryId])

//   return (
//     <div>
//         <div>
//             <p>{`Home / Catalog /`}</p>
//             <span>
//                 {catlogPageData?.data?.selectedCategory?.name}
//             </span>
//             <p> {catlogPageData?.data?.selectedCategory?.name}</p>
//             <p> {catlogPageData?.data?.selectedCategory?.description}</p>
//         </div>

//         <div>
//             {/* section 1 */}
//             <div className='flex gap-x-3'>
//                 <p>Most Popular</p>
//                 <p>New</p>
//                 {/* <CourseSlider></CourseSlider> */}
//             </div>

//             {/* section 2 */}
//             <div>
//                 <p>Top Courses</p>
//                 {/* <CourseSlider></CourseSlider> */}
//             </div>

//             {/* section 3 */}
//             <div>
//                 <p>Frequently Bought Together</p>
//                 {/* <CourseSlider></CourseSlider> */}
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Catlog



// temp 
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

// import CourseCard from "../components/Catalog/CourseCard"
// import CourseSlider from "../components/Catalog/CourseSlider"
// import Course_Card from "../components/core/Catalog/Course_Card"
// import Course_Slider from "../components/core/Catalog/Course_Slider"
import { apiConnector } from "../../services/apiConnector"
import { categories } from "../../services/apis"
import { getCatalogPageData } from "../../services/operations/PageAndComponentData"
import Error from "../../pages/secondaryPage/Error"
import Course_Card from "../Catlog/Course_Card"
import Course_Slider from "../Catlog/Course_Slider"

function Catalog() {
  const { loading } = useSelector((state) => state.profile)
  const { catlogName } = useParams()
  const [active, setActive] = useState(1)
  const [catalogPageData, setCatalogPageData] = useState(null)
  const [categoryId, setCategoryId] = useState("")
  // Fetch All Categories
  useEffect(() => {
    ;(async () => {
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        const category_id = res?.data?.data?.filter(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === catlogName
        )[0]._id
        setCategoryId(category_id)
        console.log(category_id)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
    })()
  }, [catlogName])
  useEffect(() => {
    if (categoryId) {
      ;(async () => {
        try {
          const res = await getCatalogPageData(categoryId)
          console.log(res)
          setCatalogPageData(res)
        } catch (error) {
          console.log(error)
        }
      })()
    }
  }, [categoryId])

  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
//   if (!loading && !catalogPageData.success) {
//     return <Error />
//   }
  
  return (
    <>
      {/* Hero Section */}
      <div className=" box-content bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
          <p className="text-sm text-richblack-300">
            {`Home / Catalog / `}
            <span className="text-yellow-25">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-3xl text-richblack-5">
            {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <p className="max-w-[870px] text-richblack-200">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Section 1 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Courses to get you started</div>
        <div className="my-4 flex border-b border-b-richblack-600 text-sm">
          <p
            className={`px-4 py-2 ${
              active === 1
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Most Populer
          </p>
          <p
            className={`px-4 py-2 ${
              active === 2
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <div>
          <Course_Slider
            Courses={catalogPageData?.data?.selectedCategory?.course}
          />
        </div>
      </div>
      {/* Section 2 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">
          Top courses in {catalogPageData?.data?.differentCategory?.name}
        </div>
        <div className="py-8">
          <Course_Slider
            Courses={catalogPageData?.data?.differentCategory?.course}
          />
        </div>
      </div>

      {/* Section 3 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Frequently Bought</div>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {catalogPageData?.data?.mostSellingCourses
              ?.slice(0, 4)
              .map((course, i) => (
                <Course_Card course={course} key={i} Height={"h-[400px]"} />
              ))}
          </div>
        </div>
      </div>

    </>
  )
}

export default Catalog