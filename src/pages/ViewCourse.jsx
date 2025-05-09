import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import VideoDetailsSlider from "../components/ViewCourse/VideoDetailsSlider"
import CourseReviewModal from "../components/ViewCourse/CourseReviewModal"

function ViewCourse() {

    const [reviewModal, setReviewModal] = useState(false);
    const {courseId} = useParams();
    const {token} = useSelector( (state) => state.auth);
    const dispatch = useDispatch();
    
    useEffect( () => {
        const setCourseSpecificDetails = async() => {
            const courseData = await getFullDetailsOfCourse(courseId, token);
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
            dispatch(setEntireCourseData(courseData.courseDetails));
            dispatch(setCompletedLectures(courseData.setCompletedVideos));
            let lectures = 0;
            courseData?.courseDetails?.courseContent?.forEach( (sec) => {
                lectures += sec.subSection.length
            })
            dispatch(setTotalNoOfLectures(lectures));
        }

        setCourseSpecificDetails(); 
    },[]);
  return (
    <>
        <div className='flex'>
            <VideoDetailsSlider setReviewModal={setReviewModal}/>

            <div>
                <Outlet></Outlet>
            </div>
        </div>

        {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}
    </>
  )
}

export default ViewCourse