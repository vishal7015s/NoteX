import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import {fetchInstructorCourses} from "../../services/operations/courseDetailsAPI"
import {getInstructorData} from '../../services/operations/profileAPI';
import { Link } from 'react-router-dom';
import InstructorChart from './InstructorChart';

function Instructor() {
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const getCourseDataWithStats = async() => {
            setLoading(true);
            const instructorApiData = await getInstructorData(token);
            const result = await fetchInstructorCourses(token);

            console.log(instructorApiData);

            if(instructorApiData){
                setInstructorData(instructorApiData);
            }

            if(result){
                setCourses(result);
            }
            setLoading(false);  
        }
        getCourseDataWithStats();
    }, [])

    const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0);
    const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0);

    return (
        <div className="p-6 md:p-10 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
            {/* Header Section */}
            <div className="mb-10 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                        Welcome, {user?.firstName}
                    </h1>
                    <p className="text-lg text-gray-600 mt-2 font-medium">
                        Ready to inspire? Let's create something extraordinary.
                    </p>
                </div>
                <Link 
                    to="/dashboard/add-course"
                    className="hidden md:block bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-md"
                >
                    Create New Course
                </Link>
            </div>

            {/* Main Content */}
            {loading ? (
                <div className="flex justify-center items-center h-96">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600"></div>
                </div>
            ) : courses.length > 0 ? (
                <div className="space-y-10">
                    {/* Statistics and Chart Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        {/* Chart */}
                        <div className="lg:col-span-3 bg-white p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
                            <InstructorChart courses={instructorData}/>
                        </div>
                        {/* Statistics */}
                        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg">
                            <p className="text-2xl font-bold text-gray-900 mb-6">Your Impact</p>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between border-b pb-4">
                                    <p className="text-gray-600 font-medium">Total Courses</p>
                                    <p className="text-2xl font-bold text-indigo-600">{courses.length}</p>
                                </div>
                                <div className="flex items-center justify-between border-b pb-4">
                                    <p className="text-gray-600 font-medium">Total Students</p>
                                    <p className="text-2xl font-bold text-indigo-600">{totalStudents}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-gray-600 font-medium">Total Income</p>
                                    <p className="text-2xl font-bold text-indigo-600">₹{totalAmount.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Courses Section */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                        <div className="flex justify-between items-center mb-8">
                            <p className="text-2xl font-bold text-gray-900">Your Courses</p>
                            <Link 
                                to="/dashboard/my-courses"
                                className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
                            >
                                View All
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 ">
                            {courses.slice(0, 3).map((course) => (
                                <div 
                                    key={course._id} 
                                    className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                                >
                                    <img 
                                        src={course.thumbnail} 
                                        alt="course img" 
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-5">
                                        <p className="text-lg font-semibold text-gray-900 truncate">{course.courseName}</p>
                                        <div className="flex items-center gap-3 text-gray-600 mt-3 text-sm">
                                            <p>{course.studentsEnrolled.length} Students</p>
                                            <span className="text-gray-400">|</span>
                                            <p>₹{course.price.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                    <p className="text-xl text-gray-600 mb-6 font-medium">
                        You haven't created any courses yet.
                    </p>
                    <Link 
                        to="/dashboard/add-course" 
                        className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-md"
                    >
                        Start Creating Your First Course
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Instructor


// import React from 'react'
// import { useState } from 'react'
// import { useEffect } from 'react'
// import { useSelector } from 'react-redux';
// import {fetchInstructorCourses} from "../../services/operations/courseDetailsAPI"
// import  {getInstructorData}  from '../../services/operations/profileAPI';
// import { Link } from 'react-router-dom';
// import InstructorChart from './InstructorChart';

// function Instructor() {

//     const {token} = useSelector( (state) => state.auth);
//     const {user} = useSelector( (state) => state.profile);

//     const [loading, setLoading] = useState(false);
//     const [instructorData, setInstructorData] = useState(null);
//     const [courses, setCourses] = useState([]);

//     useEffect( () => {
//         const getCourseDataWithStats = async() => {
//             setLoading(true);
//             const instructorApiData = await getInstructorData(token);
//             const result = await fetchInstructorCourses(token);

//             console.log(instructorApiData);

//             if(instructorApiData){
//                 setInstructorData(instructorApiData);
//             }

//             if(result){
//                 setCourses(result);
//             }
//             setLoading(false);  
//         }
//         getCourseDataWithStats();
//     },[])

//     const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0);
//     const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0);

//   return (
//     <div>
//         <div>
//             <h1>Hi {user?.firstName}</h1>
//             <p>Let's start something new</p>
//         </div>
        
//         {
//             loading ? (<div>loading....</div>) : courses.length > 0 ? (
//                 <div>
//                     <div>
//                         <InstructorChart courses={instructorData}/>
//                         <div>
//                             <p>Statistics</p>
//                             <div>
//                                 <p>Total Courses</p>
//                                 <p>{courses.length}</p>
//                             </div>

//                             <div>
//                                 <p>Total Students</p>
//                                 <p>{totalStudents}</p>
//                             </div>

//                             <div>
//                                 <p>Total Income</p>
//                                 <p>{totalAmount}</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div>
//                         <div>
//                             <p>Your Courses</p>
//                             <Link to="/dashboard/my-courses">
//                                 <p>View all</p>
//                             </Link>
//                         </div>
//                         <div>
//                             {
//                                 courses.slice(0,3).map((course) => (
//                                     <div>
//                                         <img src={course.thumbnail} alt="course img" />
//                                         <div>
//                                             <p>{course.courseName}</p>
//                                             <div>
//                                                 <p>{course.studentsEnrolled.length} students</p>
//                                                 <p> | </p>
//                                                 <p>Rs {course.price}</p>
//                                             </div>
//                                         </div>
//                                     </div>
                                    
//                                 ))
//                             }
//                         </div>
//                     </div>
//                 </div>
//             ) : (<div>
//                 <p>you have not created any courses yet</p>
//                 <Link to="/dashboard/add-course">
//                     Create a course
//                 </Link>
//             </div>)
//         }
//     </div>
//   )
// }

// export default Instructor