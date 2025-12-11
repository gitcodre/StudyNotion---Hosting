import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { section, subSection } from "../api_url";

const {
    updateSection_Api_Url,
    createSection_Api_Url,
    DELETE_SECTION_API,
}=section

const{
    DELETE_SUBSECTION_API,
    UPDATE_SUBSECTION_API,
    CREATE_SUBSECTION_API,
}=subSection

export async function updateSection(bodyData)
{
    console.log('BodyData : ',bodyData);
    const toastId = toast.loading('Loading...');
    let result = null;
    try
    {
        const response = await apiConnector('POST',updateSection_Api_Url,bodyData);
        console.log('Updated Section Details : ',response);
        if(!response?.data?.success)
        {
          throw new Error(response?.data?.message);
        }
        toast.success('Section Updated Successfully');
        result = response?.data?.updateCourse;
    }
    catch(err)
    {
        console.error('Failed to Update Section : ',err);
        toast.error('Section Update Failed');
    }
    toast.dismiss(toastId);
    return result;
}

export async function createSection(bodyData)
{
    const toastId = toast.loading('Loading...');
    let result = null;
    try
    {
        const response = await apiConnector('POST',createSection_Api_Url,bodyData);
        console.log('Created Section Details : ',response);
        if(!response?.data?.success)
        {
            throw new Error(response?.data?.message);
        }
        toast.success('Section Created Successfully');
        result = response?.data?.updateCourse;
    }
    catch(err)
    {
        console.error('Failed to Create Section : ',err);
        toast.error('Section Creation Failed');
    }
    toast.dismiss(toastId);
    return result;

}

export const deleteSection = async (data) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", DELETE_SECTION_API, data)
    console.log("DELETE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Section")
    }
    toast.success("Course Section Deleted")
    result = response?.data?.updatedCourse;
  } catch (error) {
    console.log("DELETE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// delete a subsection
export const deleteSubSection = async (data) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", DELETE_SUBSECTION_API, data)
    console.log("DELETE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Lecture")
    }
    toast.success("Lecture Deleted")
    result = response?.data?.updateCourse
  } catch (error) {
    console.log("DELETE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const UpdateSubSection = async (data) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data)
    console.log("UPDATE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Lecture")
    }
    toast.success("Lecture Updated")
    result = response?.data?.updateCourse;
  } catch (error) {
    console.log("UPDATE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const CreateSubSection = async (data) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data)
    console.log("CREATE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Lecture")
    }
    toast.success("Lecture Created")
    result = response?.data?.updateCourse
    
  } catch (error) {
    console.log("CREATE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}