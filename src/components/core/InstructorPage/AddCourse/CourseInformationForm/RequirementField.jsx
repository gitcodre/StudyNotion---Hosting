import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const RequirementField = ({name,label,register,errors,setValue,getValues}) => {
    const { editCourse, course } = useSelector((state) => state.course)
    const [requirement,setRequirement] = useState('');
    const [requirementList,setRequirementList] = useState([]);

    useEffect(()=>{
        if (editCourse) {
            setRequirementList(course?.instructions)
        }
      register(name,{
        required:{value:true,message:'Requirement Field is must'},
        validate: (value) => value.length > 0 || "Requirement cannot be empty"
      }) 
    },[]);

    useEffect(() => {
        // here below on left side it is name : requirementList
        // courseRequirements: ["Basic HTML", "CSS Knowledge"]
        setValue(name,requirementList)
    },[requirementList])

    const handleAddRequirement = () => {
        if(requirement)
        {
            setRequirementList([...requirementList,requirement]);
            setRequirement('');
        }
    }
    const handleRemoveRequirement = (index) => {
        const updatedrequirementList = [...requirementList];
        updatedrequirementList.splice(index,1);
        setRequirementList(updatedrequirementList);
    }

  return (
    <div className='flex flex-col gap-2'>
        <label htmlFor='requirementInst'>
            {label}<sup className="text-pink-200">*</sup>      
        </label>
        <div>
            <input 
                type='text'
                id='requirementInst'
                name={name}
                placeholder='Enter Benefits of the course'
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                className='bg-richblack-700 rounded-lg p-3 w-full'
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
            />
            <button type='button' onClick={handleAddRequirement} className='flex pl-2 font-semibold text-yellow-50 pt-2'>
                Add
            </button>
        </div>
        
        {
            
            requirementList.length > 0 && (
                <ul className='flex flex-col gap-2 pl-2'>
                    {
                        requirementList.map((req,index) => (
                            <li key={index} className='text-richblack-5 flex items-center gap-2'>
                                <span>{req}</span>
                                <button type='button' 
                                onClick={() => handleRemoveRequirement(index)} className='text-xs flex pl-2 font-semibold text-pure-greys-300'>
                                    clear
                                </button>
                            </li>
                        ))
                    }
                </ul>
            )
        }

        {
            errors[name] && (
                <span className='text-pink-200 text-sm'>
                    {errors[name].message}
                </span>                
            )
        }
        
        
    </div>

  )
}

export default RequirementField