import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import {fetchInstructorCourses} from "../../services/operations/courseDetailsAPI"
import  {getInstructorData}  from '../../services/operations/profileAPI';
import { Link } from 'react-router-dom';
import InstructorChart from './InstructorChart';

function Instructor() {

    const {token} = useSelector( (state) => state.auth);
    const {user} = useSelector( (state) => state.profile);

    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect( () => {
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
    },[])

    const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0);
    const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0);

  return (
    <div>
        <div>
            <h1>Hi {user?.firstName}</h1>
            <p>Let's start something new</p>
        </div>
        
        {
            loading ? (<div>loading....</div>) : courses.length > 0 ? (
                <div>
                    <div>
                        <InstructorChart courses={instructorData}/>
                        <div>
                            <p>Statistics</p>
                            <div>
                                <p>Total Courses</p>
                                <p>{courses.length}</p>
                            </div>

                            <div>
                                <p>Total Students</p>
                                <p>{totalStudents}</p>
                            </div>

                            <div>
                                <p>Total Income</p>
                                <p>{totalAmount}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div>
                            <p>Your Courses</p>
                            <Link to="/dashboard/my-courses">
                                <p>View all</p>
                            </Link>
                        </div>
                        <div>
                            {
                                courses.slice(0,3).map((course) => (
                                    <div>
                                        <img src={course.thumbnail} alt="course img" />
                                        <div>
                                            <p>{course.courseName}</p>
                                            <div>
                                                <p>{course.studentsEnrolled.length} students</p>
                                                <p> | </p>
                                                <p>Rs {course.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                ))
                            }
                        </div>
                    </div>
                </div>
            ) : (<div>
                <p>you have not created any courses yet</p>
                <Link to="/dashboard/add-course">
                    Create a course
                </Link>
            </div>)
        }
    </div>
  )
}

export default Instructor