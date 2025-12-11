import "./App.css";
import { Routes,Route } from "react-router-dom";
import Home from './pages/Home' 
import Login from "./pages/Login";
import Navbar from './components/common/Navbar';
import Signup from "./pages/Signup";
import OpenRoute from "./components/core/Auth/OpenRoute";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Error from "./pages/Error";
import ProtectedRoute from "./components/core/Auth/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./pages/MyProfile";
import Settings from "./pages/Settings";
import EnrolledCourses from "./pages/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart/Cart";
import {useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constant";
import MyCourse from "./components/core/InstructorPage/MyCourse";
import AddCourse from "./components/core/InstructorPage/AddCourse";
import EditCourseForm from "./components/core/InstructorPage/AddCourse/EditCourse/EditCourseForm";
import Catalog from "./pages/Catalog";
import Course_Details from "./pages/Course_Details";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import DashboardIns from "./components/core/Dashboard/InstructorDashboard/DashboardIns";
function App() {
  const {user} = useSelector((state) => state.profile)

  return (
    <div className="bg-richblack-900 w-screen min-h-screen font-inter">
      <Navbar/>
      <Routes>

        <Route path="/" element={<Home/>} ></Route>
        <Route path="/catalog/:catalogName" element={<Catalog/>}></Route>
        <Route path="/courses/:courseId" element={<Course_Details/>} />
        

        {/* OpenRoute ka mtlb jo uske under hai wo sirf non logged in user hi access kr paaye */}
        <Route 
          path="/login" 
          element={
            <OpenRoute>
              <Login/>
            </OpenRoute>
          } 
        />

        <Route 
          path="/signup" 
          element={
            <OpenRoute>
              <Signup/>
            </OpenRoute>
          }
        />

        <Route 
          path="/forgot-password" 
          element={
            <OpenRoute>
              <ForgotPassword/>
            </OpenRoute>
          }
        />

        {/* Update password mei token hoga isliye url ke bdd :id */}
        <Route 
          path="/update-password/:id" 
          element={
            <OpenRoute>
              <UpdatePassword/>
            </OpenRoute>
          }
        />

        <Route 
          path="/verify-email" 
          element={
            <OpenRoute>
              <VerifyEmail/>
            </OpenRoute>
          }
        />

        <Route 
          path="/about" 
          element={
            <AboutUs/>
          }
        />

        <Route 
          path="/contact" 
          element={
            <ContactUs/>
          }
        />

        {/* Dashboard */}
        <Route
          element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard/my-profile" element={<MyProfile/>}/>
          <Route path="/dashboard/settings" element={<Settings/>}/>
          {/* This route will run only after payment integration thing */}
          {   
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
                <Route path="/dashboard/cart" element={<Cart/>}/>
              </>
              
            )
          }
          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="/dashboard/add-course" element={<AddCourse/>}/>
                <Route path="/dashboard/my-courses" element={<MyCourse/>}/>
                <Route path="/dashboard/edit-course/:courseId" element={<EditCourseForm/>}/>
                <Route path="/dashboard/instructor" element={<DashboardIns/>}/>
              </>
            )
          }


        </Route>

        
        <Route element={
          <ProtectedRoute>
            <ViewCourse/>
          </ProtectedRoute>
        }>
          {/* Outlet */}
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route 
                  path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                  element={<VideoDetails/>}
                />
              </>
            )
          }

        </Route>

        <Route path="*" element={<Error/>}/>

          
      </Routes>
    </div>
  );
}

export default App;

// ****** Things to Remember *********

// Method	Use case	Returns

// .filter()	Get all matches satisfying a condition	Array
// .find()	Get first match satisfying a condition	Single object
// .map()	Transform every element in an array	Array of same length