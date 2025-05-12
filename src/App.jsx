import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/primaryPage/Home"
import Footer from "./components/Footer"
import Navbar from "./components/common/Navbar";
import About from "./pages/secondaryPage/About";
import Contact from "./pages/secondaryPage/Contact";
import Login from './pages/primaryPage/Login';
import Signup from "./pages/primaryPage/Signup"
import VerifyEmail from "./pages/secondaryPage/VerifyEmail"
import ForgotPassword from './pages/secondaryPage/ForgotPassword';
import UpdatePassword from './pages/secondaryPage/UpdatePassword';
import MyProfile from "./pages/MyProfile";
import PrivateRoute from './components/PrivateRoute';
import Dashboard from "./pages/Dashboard"
import Error from "./pages/secondaryPage/Error"
import EnrolledCourses from './components/EnrolledCourses';
import Cart from "./pages/cart/index"
import { ACCOUNT_TYPE } from './utils/constants';
import { useSelector } from 'react-redux';
import AddCourse from "./pages/AddCourse/index"
import Mycourses from './pages/AddCourse/Mycourses';
import EditCourse from './pages/AddCourse/EditCourse';
import Catlog from './pages/primaryPage/Catlog';
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from './pages/ViewCourse';
import VideoDetails from "./components/ViewCourse/VideoDetails"
import Instructor from './components/InstructorDashboard/Instructor';
import Settings from './components/Settings';

function App() {

  const { user } = useSelector((state) => state.profile)
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catlog/:catlogName" element={<Catlog />} />
          <Route path="/courses/:courseId" element={<CourseDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/update-password/:id" element={<UpdatePassword />} />
          <Route
            // path='dashboard'
            element={
              <PrivateRoute>
                <Dashboard></Dashboard>
              </PrivateRoute>
            }
          >
            <Route path="/dashboard/my-profile" element={<MyProfile />} />
            <Route path="dashboard/Settings" element={<Settings />} />
            {
              user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <>
                  <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />
                  <Route path="/dashboard/cart" element={<Cart />} />
                </>
              ) 
            }

            {
              user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                <>
                  <Route path="/dashboard/instructor" element={<Instructor />} />
                  <Route path="/dashboard/add-course" element={<AddCourse />} />
                  <Route path="/dashboard/my-courses" element={<Mycourses />} />
                  <Route path="/dashboard/edit-course/:courseId" element={<EditCourse />} />

                </>
              ) 
            }

          </Route>

          <Route element={<PrivateRoute>
            <ViewCourse/>
          </PrivateRoute>}>

            {
              user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <>
                  <Route path='view-course/:courseId/section/:sectionId/sub-section/:subSectionId' element={<VideoDetails/>}></Route>

                </>
              )
            }
          </Route>

          <Route path='*' element={<Error></Error>}/>

      </Routes>
      {/* <Footer></Footer> */}
    </div>
  )
}

export default App