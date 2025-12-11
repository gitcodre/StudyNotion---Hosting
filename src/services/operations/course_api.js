import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { course } from "../api_url";

const{
    AddCourse_API,
    EditCourseAPI_URL,
    COURSEDETAILS_API,
    FULLCOURSEDETAILS_API,
    LECTURE_COMPLETION_API
}=course



export async function addCourseDetails(formData)
{
    let result = null
    const toastId = toast.loading('Loading...');
    try
    {
        const response = await apiConnector('POST',AddCourse_API,formData);
        console.log('Course Addition API : ',response);
        if(!response?.data?.success)
        {
            throw new Error(response.data.message);
        }
        toast.success('New Course Created Successfully');
        result = response?.data?.data
    }
    catch(err)
    {
        toast.error('Failed to create course');
        console.log('Failed Course Error : ',err);
    }
    toast.dismiss(toastId);
    return result;  
}

export const editCourseDetails = async (data) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", EditCourseAPI_URL, data)
    console.log("EDIT COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Course Details")
    }
    toast.success("Course Details Updated Successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("EDIT COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const getCourseDetails = async (courseId) => {
  const toastId = toast.loading('Loading.....');
  let result = null;
  try
  {
    const response = await apiConnector('POST',COURSEDETAILS_API,{courseId});
    if(!response.data.success)
    {
      throw new Error(response.data.message);
    }
    console.log('Course Details Api Response : ', response);
    result = response?.data?.courseDetails;
  }
  catch(err)
  {
    console.error('Fetching course failure error : ',err);
    toast.error('Failed to fetch Course');
  }
  toast.dismiss(toastId);
  return result;
}

export const getStudentFullCourseDetails = async (courseId) => {
  const toastId = toast.loading('Loading.....');
  let result = null;
  try{
    const response = await apiConnector('POST',FULLCOURSEDETAILS_API,{courseId});
    if(!response.data.success)
    {
      throw new Error(response.data.message);
    }
    console.log('Course Details Api Response : ', response);
    result = response?.data?.data;
  }
  catch(err)
  {
    console.error('Fetching course failure error : ',err);
    toast.error('Failed to fetch Course');
  }
  toast.dismiss(toastId);
  return result;
} 

export const markLectureAsComplete = async (data) => {
  let result = null
  console.log("mark complete data", data)
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", LECTURE_COMPLETION_API, data);

    console.log("MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",response);

    if (!response.data.message) {
      throw new Error(response.data.error)
    }

    toast.success("Lecture Completed");
    result = response;
  } 
  catch (error) 
  {
    console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
    toast.error(error.message)
    result = false
  }
  toast.dismiss(toastId)
  return result
} 
