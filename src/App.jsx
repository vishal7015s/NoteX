// import { Helmet } from 'react-helmet-async';
// import React from 'react'
// import { Routes, Route } from 'react-router-dom'
// import Home from "./pages/primaryPage/Home"
// import Footer from "./components/Footer"
// import Navbar from "./components/common/Navbar";
// import About from "./pages/secondaryPage/About";
// import Contact from "./pages/secondaryPage/Contact";
// import Login from './pages/primaryPage/Login';
// import Signup from "./pages/primaryPage/Signup"
// import VerifyEmail from "./pages/secondaryPage/VerifyEmail"
// import ForgotPassword from './pages/secondaryPage/ForgotPassword';
// import UpdatePassword from './pages/secondaryPage/UpdatePassword';
// import MyProfile from "./pages/MyProfile";
// import PrivateRoute from './components/PrivateRoute';
// import Dashboard from "./pages/Dashboard"
// import Error from "./pages/secondaryPage/Error"
// import EnrolledCourses from './components/EnrolledCourses';
// import Cart from "./pages/cart/index"
// import { ACCOUNT_TYPE } from './utils/constants';
// import { useSelector } from 'react-redux';
// import AddCourse from "./pages/AddCourse/index"
// import Mycourses from './pages/AddCourse/Mycourses';
// import EditCourse from './pages/AddCourse/EditCourse';
// import Catlog from './pages/primaryPage/Catlog';
// import CourseDetails from "./pages/CourseDetails";
// import ViewCourse from './pages/ViewCourse';
// import VideoDetails from "./components/ViewCourse/VideoDetails"
// import Instructor from './components/InstructorDashboard/Instructor';
// import Settings from './components/Settings';

// function App() {
//   const user = { accountType: ACCOUNT_TYPE.STUDENT };

//   return (
//     <div>
//       <Navbar></Navbar>
//       <Routes>
//         {/* Homepage */}
//         <Route
//           path="/"
//           element={
//             <>
//               <Helmet>
//                 <title>NoteX: Free B-Tech RGPV Notes PDF Download</title>
//                 <meta name="description" content="Download free B-Tech RGPV notes PDF on NoteX for 1st, 2nd, 3rd, and 4th year students. Access updated syllabus, study materials, and resources easily for all semesters." />
//                 <link rel="canonical" href="https://note-x-seven.vercel.app/" />
//               </Helmet>
//               <Home />
//             </>
//           }
//         />
//         <Route
//           path="/catlog/:catlogName"
//           element={
//             <>
//               <Helmet>
//                 <title>NoteX: Explore {`:catlogName`} Courses and Notes</title>
//                 <meta name="description" content={`Browse ${`:catlogName`} courses and B-Tech RGPV notes on NoteX. Download free PDFs for 1st, 2nd, 3rd, 4th year.`} />
//                 <link rel="canonical" href={`https://note-x-seven.vercel.app/catlog/${":catlogName"}`} />
//                 <script type="application/ld+json">
//                 {JSON.stringify({
//                   "@context": "https://schema.org",
//                   "@type": "BreadcrumbList",
//                   "itemListElement": [
//                     { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://note-x-seven.vercel.app/" },
//                     { "@type": "ListItem", "position": 2, "name": "Catalog", "item": `https://note-x-seven.vercel.app/catlog/${":catlogName"}` }
//                   ]
//                 })}
//                 </script>
//               </Helmet>
//               <Catlog />
//             </>
//           }
//         />
//         <Route
//           path="/courses/:courseId"
//           element={
//             <>
//               <Helmet>
//                 <title>NoteX: Course Details for {`:courseId`}</title>
//                 <meta name="description" content={`View details of course ${`:courseId`} on NoteX. Access B-Tech RGPV notes and resources for all years.`} />
//                 <link rel="canonical" href={`https://note-x-seven.vercel.app/courses/${":courseId"}`} />
//                 <script type="application/ld+json">
//                 {JSON.stringify({
//                   "@context": "https://schema.org",
//                   "@type": "Course",
//                   "name": `Course ${":courseId"}`,
//                   "description": `Learn B-Tech RGPV topics with course ${":courseId"} on NoteX.`,
//                   "provider": { "@type": "EducationalOrganization", "name": "NoteX", "url": "https://note-x-seven.vercel.app/" }
//                 })}
//                 </script>
//               </Helmet>
//               <CourseDetails />
//             </>
//           }
//         />
//         <Route
//           path="/about"
//           element={
//             <>
//               <Helmet>
//                 <title>NoteX: About Us - Educational Platform</title>
//                 <meta name="description" content="Learn about NoteX, the leading platform for free B-Tech RGPV notes and courses for 1st, 2nd, 3rd, 4th year students." />
//                 <link rel="canonical" href="https://note-x-seven.vercel.app/about" />
//               </Helmet>
//               <About />
//             </>
//           }
//         />
//         <Route
//           path="/contact"
//           element={
//             <>
//               <Helmet>
//                 <title>NoteX: Contact Us for Support</title>
//                 <meta name="description" content="Get in touch with NoteX for support on B-Tech RGPV notes, courses, and resources. We’re here to help!" />
//                 <link rel="canonical" href="https://note-x-seven.vercel.app/contact" />
//               </Helmet>
//               <Contact />
//             </>
//           }
//         />
//         <Route
//           path="/login"
//           element={
//             <>
//               <Helmet>
//                 <title>NoteX: Login to Your Account</title>
//                 <meta name="description" content="Login to NoteX to access free B-Tech RGPV notes, courses, and resources for all years." />
//                 <meta name="robots" content="noindex, nofollow" />
//                 <link rel="canonical" href="https://note-x-seven.vercel.app/login" />
//               </Helmet>
//               <Login />
//             </>
//           }
//         />
//         <Route
//           path="/signup"
//           element={
//             <>
//               <Helmet>
//                 <title>NoteX: Sign Up for Free</title>
//                 <meta name="description" content="Sign up on NoteX to download free B-Tech RGPV notes and access courses for 1st, 2nd, 3rd, 4th year." />
//                 <meta name="robots" content="noindex, nofollow" />
//                 <link rel="canonical" href="https://note-x-seven.vercel.app/signup" />
//               </Helmet>
//               <Signup />
//             </>
//           }
//         />
//         <Route
//           path="/verify-email"
//           element={
//             <>
//               <Helmet>
//                 <title>NoteX: Verify Your Email</title>
//                 <meta name="description" content="Verify your email on NoteX to start accessing free B-Tech RGPV notes and courses." />
//                 <meta name="robots" content="noindex, nofollow" />
//                 <link rel="canonical" href="https://note-x-seven.vercel.app/verify-email" />
//               </Helmet>
//               <VerifyEmail />
//             </>
//           }
//         />
//         <Route
//           path="/forgot-password"
//           element={
//             <>
//               <Helmet>
//                 <title>NoteX: Forgot Password</title>
//                 <meta name="description" content="Reset your NoteX password to continue accessing free B-Tech RGPV notes and courses." />
//                 <meta name="robots" content="noindex, nofollow" />
//                 <link rel="canonical" href="https://note-x-seven.vercel.app/forgot-password" />
//               </Helmet>
//               <ForgotPassword />
//             </>
//           }
//         />
//         <Route
//           path="/update-password/:id"
//           element={
//             <>
//               <Helmet>
//                 <title>NoteX: Update Your Password</title>
//                 <meta name="description" content="Update your password on NoteX to securely access B-Tech RGPV notes and courses." />
//                 <meta name="robots" content="noindex, nofollow" />
//                 <link rel="canonical" href={`https://note-x-seven.vercel.app/update-password/${":id"}`} />
//               </Helmet>
//               <UpdatePassword />
//             </>
//           }
//         />
//         <Route
//           element={
//             <PrivateRoute>
//               <Dashboard />
//             </PrivateRoute>
//           }
//         >
//           <Route
//             path="/dashboard/my-profile"
//             element={
//               <>
//                 <Helmet>
//                   <title>NoteX: My Profile</title>
//                   <meta name="description" content="View and edit your profile on NoteX. Access your B-Tech RGPV notes and enrolled courses." />
//                   <meta name="robots" content="noindex, nofollow" />
//                   <link rel="canonical" href="https://note-x-seven.vercel.app/dashboard/my-profile" />
//                   <script type="application/ld+json">
//                   {JSON.stringify({
//                     "@context": "https://schema.org",
//                     "@type": "BreadcrumbList",
//                     "itemListElement": [
//                       { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://note-x-seven.vercel.app/" },
//                       { "@type": "ListItem", "position": 2, "name": "Dashboard", "item": "https://note-x-seven.vercel.app/dashboard" },
//                       { "@type": "ListItem", "position": 3, "name": "My Profile", "item": "https://note-x-seven.vercel.app/dashboard/my-profile" }
//                     ]
//                   })}
//                   </script>
//                 </Helmet>
//                 <MyProfile />
//               </>
//             }
//           />
//           <Route
//             path="dashboard/Settings"
//             element={
//               <>
//                 <Helmet>
//                   <title>NoteX: Account Settings</title>
//                   <meta name="description" content="Manage your account settings on NoteX. Update preferences for B-Tech RGPV notes and courses." />
//                   <meta name="robots" content="noindex, nofollow" />
//                   <link rel="canonical" href="https://note-x-seven.vercel.app/dashboard/Settings" />
//                   <script type="application/ld+json">
//                   {JSON.stringify({
//                     "@context": "https://schema.org",
//                     "@type": "BreadcrumbList",
//                     "itemListElement": [
//                       { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://note-x-seven.vercel.app/" },
//                       { "@type": "ListItem", "position": 2, "name": "Dashboard", "item": "https://note-x-seven.vercel.app/dashboard" },
//                       { "@type": "ListItem", "position": 3, "name": "Settings", "item": "https://note-x-seven.vercel.app/dashboard/Settings" }
//                     ]
//                   })}
//                   </script>
//                 </Helmet>
//                 <Settings />
//               </>
//             }
//           />
//           {user?.accountType === ACCOUNT_TYPE.STUDENT && (
//             <>
//               <Route
//                 path="/dashboard/enrolled-courses"
//                 element={
//                   <>
//                     <Helmet>
//                       <title>NoteX: My Enrolled Courses</title>
//                       <meta name="description" content="View your enrolled B-Tech RGPV courses on NoteX. Access notes and resources for all years." />
//                       <meta name="robots" content="noindex, nofollow" />
//                       <link rel="canonical" href="https://note-x-seven.vercel.app/dashboard/enrolled-courses" />
//                     </Helmet>
//                     <EnrolledCourses />
//                   </>
//                 }
//               />
//               <Route
//                 path="/dashboard/cart"
//                 element={
//                   <>
//                     <Helmet>
//                       <title>NoteX: Your Cart</title>
//                       <meta name="description" content="Review your cart on NoteX. Add B-Tech RGPV courses and notes for checkout." />
//                       <meta name="robots" content="noindex, nofollow" />
//                       <link rel="canonical" href="https://note-x-seven.vercel.app/dashboard/cart" />
//                     </Helmet>
//                     <Cart />
//                   </>
//                 }
//               />
//             </>
//           )}
//           {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
//             <>
//               <Route
//                 path="/dashboard/instructor"
//                 element={
//                   <>
//                     <Helmet>
//                       <title>NoteX: Instructor Dashboard</title>
//                       <meta name="description" content="Manage your courses as an instructor on NoteX. Create and share B-Tech RGPV notes." />
//                       <meta name="robots" content="noindex, nofollow" />
//                       <link rel="canonical" href="https://note-x-seven.vercel.app/dashboard/instructor" />
//                     </Helmet>
//                     <Instructor />
//                   </>
//                 }
//               />
//               <Route
//                 path="/dashboard/add-course"
//                 element={
//                   <>
//                     <Helmet>
//                       <title>NoteX: Add a New Course</title>
//                       <meta name="description" content="Add a new B-Tech RGPV course on NoteX as an instructor. Share notes and resources." />
//                       <meta name="robots" content="noindex, nofollow" />
//                       <link rel="canonical" href="https://note-x-seven.vercel.app/dashboard/add-course" />
//                     </Helmet>
//                     <AddCourse />
//                   </>
//                 }
//               />
//               <Route
//                 path="/dashboard/my-courses"
//                 element={
//                   <>
//                     <Helmet>
//                       <title>NoteX: My Courses (Instructor)</title>
//                       <meta name="description" content="View and manage your B-Tech RGPV courses on NoteX as an instructor." />
//                       <meta name="robots" content="noindex, nofollow" />
//                       <link rel="canonical" href="https://note-x-seven.vercel.app/dashboard/my-courses" />
//                     </Helmet>
//                     <Mycourses />
//                   </>
//                 }
//               />
//               <Route
//                 path="/dashboard/edit-course/:courseId"
//                 element={
//                   <>
//                     <Helmet>
//                       <title>NoteX: Edit Course {`:courseId`}</title>
//                       <meta name="description" content={`Edit course ${`:courseId`} on NoteX. Update B-Tech RGPV notes and resources.`} />
//                       <meta name="robots" content="noindex, nofollow" />
//                       <link rel="canonical" href={`https://note-x-seven.vercel.app/dashboard/edit-course/${":courseId"}`} />
//                     </Helmet>
//                     <EditCourse />
//                   </>
//                 }
//               />
//             </>
//           )}
//         </Route>
//         <Route
//           element={
//             <PrivateRoute>
//               <ViewCourse />
//             </PrivateRoute>
//           }
//         >
//           {user?.accountType === ACCOUNT_TYPE.STUDENT && (
//             <>
//               <Route
//                 path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
//                 element={
//                   <>
//                     <Helmet>
//                       <title>NoteX: Watch Course {`:courseId`}</title>
//                       <meta name="description" content={`Watch course ${`:courseId`} section ${`:sectionId`} on NoteX. Access B-Tech RGPV video lectures and notes.`} />
//                       <meta name="robots" content="noindex, nofollow" />
//                       <link rel="canonical" href={`https://note-x-seven.vercel.app/view-course/${":courseId"}/section/${":sectionId"}/sub-section/${":subSectionId"}`} />
//                     </Helmet>
//                     <VideoDetails />
//                   </>
//                 }
//               />
//             </>
//           )}
//         </Route>
//         <Route
//           path="*"
//           element={
//             <>
//               <Helmet>
//                 <title>NoteX: Page Not Found</title>
//                 <meta name="description" content="Oops! The page you’re looking for on NoteX doesn’t exist. Explore B-Tech RGPV notes and courses instead." />
//                 <link rel="canonical" href="https://note-x-seven.vercel.app/" />
//               </Helmet>
//               <Error />
//             </>
//           }
//         />
//       </Routes>
//     </div>
//   );
// }

// export default App;





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