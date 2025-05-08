import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import {ACCOUNT_TYPE} from "../utils/constants"
import { addToCart } from "../slices/cartSlice"

function CourseDetailsCard({course, setConfirmationModal, handleBuyCourse}) {

  const {user} = useSelector( (state) => state.profile);
  const {token} = useSelector( (state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    thumbnail : thumbnailImage,
    price : currentPrice,
  } = course;

  const handleAddToCart = () => {
    if(user && user?.accountType == ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an instructor, you can't buy course");
      return;
    }
    if(token){
      dispatch(addToCart(course));
      return;
    }

    setConfirmationModal({
      text1: "You are not logged in",
      text2: "please login to add to cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })

  }

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link copied to clipboard")
  }

  return (
    <div>
      <img src={thumbnailImage} alt='course img' className='max-h-[300px] min-h-[180px] w-[400px] rounded-xl'></img>
      <div>
        Rs. {currentPrice}
      </div>
      <div className='flex flex-col gap-y-6'>
        <button onClick={
          user && course?.studentsEnrolled.includes(user?._id) ? () => navigate("/dashboard/enrolled-courses") : handleBuyCourse 
        } className='bg-yellow-200 w-fit text-richblack-300'>
          {
            user && course?.studentsEnrolled.includes(user?._id) ? "Go to course" : "Buy Now"
          }
        </button>

        {
          (!course?.studentsEnrolled.includes(user?._id)) && (
            <button onClick={
              handleAddToCart
            } className='bg-yellow-200 w-fit text-richblack-300'>
              Add to Cart
            </button>
          )
        }
      </div>

      <div>
        <p>7 Day Money-Back Guarantee</p>
        <p>
          This Course Includes:
          easy learning well structured course
        </p>
      </div>

      <div>
        <button onClick={handleShare}>Share</button>
      </div>
    </div>
  )
}

export default CourseDetailsCard