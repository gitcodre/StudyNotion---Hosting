import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RxDropdownMenu } from "react-icons/rx";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import Confirmationmodal from '../../../../common/Confirmationmodal';
import { FaCaretDown } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import SubSectionModal from './SubSectionModal';
import { setCourse } from '../../../../../slice/courseSlice';
import { deleteSection, deleteSubSection } from '../../../../../services/operations/section_api';

const NestedView = ({ handleChangeEditSectionName }) => {

    const [addSubSection,setAddSubSection] = useState(null);
    const [viewSubSection,setViewSubSection] = useState(null);
    const [editSubSection,setEditSubSection] = useState(null);
    

    const[confirmationModal,setConfirmationModal] = useState(null);

    const {course} = useSelector((state) => state.course);
    const dispatch = useDispatch();

    // Delete button on Section Logic
    const handleDeleteSection = async(sectionId) => {
        const result = await deleteSection({
            sectionId,
            courseId: course._id},
        );
        console.log("Deleting Section Result : ", result);
        if(result) {
            dispatch(setCourse(result))
        }
        setConfirmationModal(null);
    }  

    // Delete button on subSection Logic
    const handleDeleteSubSection = async(subSectionId,sectionId) => {
        const courseId = course._id;
        const result = await deleteSubSection({subSectionId, sectionId, courseId});
        if(result) {
            //TODO: extra kya kar skte h yaha pr 
            dispatch(setCourse(result));
        }
        setConfirmationModal(null);
    } 

  return (
    <div className='text-richblack-5 pl-5 mt-2 rounded-lg bg-richblack-600 md:ml-5 ml-2 mb-10 py-4 md:w-[93%]'>
        <div className='w-full pr-5 '>
            {
                // Section wala hai 
                course?.courseContent?.map((section) => (
                    <details key={section._id} open  className='cursor-pointer w-full pb-4' >
                        
                        <summary className='border-b-2 pb-2 border-richblack-300 flex justify-between items-center'>
                            {/* Course Name Left Side*/}
                            <div className='flex items-center gap-2 w-full'>
                                <RxDropdownMenu fontSize={20}/>
                                <p>{section.sectionName}</p>
                            </div>
                            {/* Edit,Delete,DropDown Right Side */}
                            <div className='flex items-center gap-x-3'>
                                {/* Edit wala button Finally */}
                                <button 
                                    onClick={() => handleChangeEditSectionName(section._id,section.sectionName)}
                                >
                                    <MdModeEditOutline/>
                                </button>
                                {/* Delete wala button */}
                                <button
                                    onClick={() => {
                                        setConfirmationModal({
                                            text1:'Delete this Section?',
                                            text2:'All the Lectures in this section will be deleted',
                                            btntext1:'Delete',
                                            btntext2:'Cancel',
                                            btn1Handler: () => handleDeleteSection(section._id),
                                            btn2Handler: () => setConfirmationModal(null)
                                    })}}
                                >
                                    <RiDeleteBin5Line/>
                                </button>

                                <span>|</span>

                                {/* Down wala button */}
                                <button>
                                    <FaCaretDown/>
                                </button>

                            </div>
                        </summary>

                        {/* Add SubSection */}
                        <div className='mt-4 w-[90%] mx-auto'>
                            {/* SubSection */}
                            {
                                // data is refer to subsection model which is   title,timeDuration,description,videoUrl,id
                                section?.subSection.map((data) => (
                                    <div 
                                        key={data?._id}
                                        onClick={() => setViewSubSection(data)}
                                        className='flex justify-between items-center pb-2 gap-2 border-b-2  border-richblack-300 mb-2'
                                    >
                                        {/* Title */}
                                        <div className='flex items-center gap-x-3'>
                                            <RxDropdownMenu fontSize={20}/>
                                            <p>{data.title}</p>
                                        </div>

                                        {/* Edit/Delete wala button */}
                                        <div className='flex items-center gap-x-3'
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <button
                                                onClick={() => setEditSubSection({...data,sectionId:section._id})}
                                            >
                                                <MdModeEditOutline/>
                                            </button>
                                            {/* Delete wala button */}
                                            <button
                                                onClick={() => {
                                                setConfirmationModal({
                                                text1:'Delete this Sub Section?',
                                                text2:'selected lecture will be deleted',
                                                btntext1:'Delete',
                                                btntext2:'Cancel',
                                                // Controller ko kya data chaiye uss hissab se data pass karenge
                                                btn1Handler: () => handleDeleteSubSection(data._id,section._id),
                                                btn2Handler: () => setConfirmationModal(null)
                                            })}}
                                            >
                                                <RiDeleteBin5Line/>
                                            </button>   
                                        </div>

                                    </div>
                                ))
                            }
                            {/* Add Lecture Button */}
                            <button className='text-yellow-50 flex items-center gap-x-2 pt-2 font-semibold'
                                onClick={() => setAddSubSection({ sectionId: section._id })}
                            >
                                <FaPlus/>
                                Add Lecture
                            </button>

                        </div>

                    </details>
                ))
            
            }
        </div>
        {confirmationModal && <Confirmationmodal modalData={confirmationModal}/>}
        {/* Add subSection Modal */}
        {
            // Data mere pass sirf - section id hai kyuki mujhe new subsection banana hai so data thodi na hoga subsection ka 
            addSubSection ? (<SubSectionModal
                modalData={addSubSection}
                setModalData={setAddSubSection}
                add={true}
            />) : 
            // data aur section ki id hogi mujhe edit krna hai to mere pass data present hona chaoye aur kaun se section mei edit krna hai uski id
            editSubSection ? (<SubSectionModal
                modalData={editSubSection}
                setModalData={setEditSubSection}
                edit={true}
            />) :
            // Mere pass sirf data hona chiaye kyuki mujhe to sirf dekhna hai 
            viewSubSection ? (<SubSectionModal
                modalData={viewSubSection}
                setModalData={setViewSubSection}
                view={true}
            />) :
            (<div></div>)
        }
    </div>
  )
}

export default NestedView