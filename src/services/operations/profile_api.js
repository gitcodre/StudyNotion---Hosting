import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { setUser } from "../../slice/profileSlice";

const { course, profileEndpoints } = require("../api_url");
const {
    GetAllCourseAPI_URL,
    GetAllCourseInstructorAPI_URL,
    DELETE_COURSE_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    INSTRUCTOR_DASHBOARD_API_URL,
} = course
const {UPDATE_DISPLAY_PICTURE_API} = profileEndpoints

// For Student to see there purchased course 
export async function fetchCourse(){
    const toastId = toast.loading('Loading...');
    let result = [];
    try{
        const response = await apiConnector('GET',GetAllCourseAPI_URL);
        console.log('Get User Enrolled Courses Api : ',response);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result = response.data.data
    }
    catch(err)
    {
        console.error('Error while Fetching Response......',err);
        toast.error("Could Not Get Enrolled Courses")
    }
    toast.dismiss(toastId);
    return result;
}
// fetch Instructor Courses
export async function fetchAllInstructorCourse() {
    const toastId = toast.loading('Loading....');
    let result = [];
    try
    {
        let response = await apiConnector('GET',GetAllCourseInstructorAPI_URL);
        console.log('Get Instructor Courses Api : ',response);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result = response.data.data

    }
    catch(err)
    {
        console.error('Error in getting all courses response',err);
        toast.error('Could not get Courses');
    }
    toast.dismiss(toastId);
    return result;

}
// Delete Instructor Course
export const deleteCourse = async (data) => {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("DELETE", DELETE_COURSE_API, data)
    console.log("DELETE COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Course")
    }
    toast.success("Course Deleted")
  } catch (error) {
    console.log("DELETE COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
}
// Get Full Detailed Instructor Course
export const getFullDetailsOfCourse = async(courseId) => {
  const toastId = toast.loading("Loading...")
    
  let result = null
  try {
    const response = await apiConnector("POST",GET_FULL_COURSE_DETAILS_AUTHENTICATED,{courseId})
    console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data
  } catch (error) {
    console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
    result = error.response.data
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  return result
}
export const updateDisplayPicture = (formData) => {
  return async(dispatch) => {
    const toastId = toast.loading("Loading...");
    try{
      const response = await apiConnector('PUT',UPDATE_DISPLAY_PICTURE_API,formData, {
        "Content-Type": "multipart/form-data"
      });
      console.log("UPDATE_DISPLAY_PICTURE_API API RESPONSE............",response);
      if(!response.data.success)
      {
        throw new Error(response.data.message);
      }
      toast.success("Display Picture Updated Successfully");
      dispatch(setUser(response.data.data));
      localStorage.setItem('user', JSON.stringify(response.data.data));
    }
    catch(err)
    {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", err);
      toast.error("Could Not Update Display Picture")
    }
    toast.dismiss(toastId);
  }
}

export const getInstructorData = async() => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try
  {
    const response = await apiConnector('GET',INSTRUCTOR_DASHBOARD_API_URL);
    console.log('Instructor Data Response : ', response);
    if(!response.data.success)
    {
      throw new Error(response.data.message);
    }  
    result = response?.data?.data;
  }
  catch(err)
  {
    console.error('GET_INSTRUCTOR_DASHBOARD_API_ERROR',err);
    toast.error('Could not fetch Instructor Data');
  }
  toast.dismiss(toastId);
  return result;
}