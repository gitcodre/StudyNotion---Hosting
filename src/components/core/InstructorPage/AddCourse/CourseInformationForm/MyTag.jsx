import React, { useEffect, useState } from 'react'
import { RxCrossCircled } from "react-icons/rx";

const MyTag = ({name,label,register,errors,setValue,getValues,editCourse,course}) => {
    const[tag,setTag] = useState('');
    const[taglist,setTagList] = useState([]);

    const handleKeyDown = (e) => {
        // Add a tag
        if(e.key === 'Enter' || e.key === ',')
        {
            e.preventDefault();
            const trimmed = tag.trim();
            if(trimmed && !taglist.includes(trimmed))
            {
                const updatedTagList = [...taglist,trimmed];
                setTagList(updatedTagList);
                setTag('');
            }
        }
    }
    const removeTags = (index) => {
        const updatedTagList = [...taglist];
        updatedTagList.splice(index,1);
        setTagList(updatedTagList);
    }
    useEffect(() => {
        if (editCourse && course?.tag) {
            setTagList(course.tag); // <-- Pre-fill UI
        }
    }, [editCourse, course]);

    useEffect(() => {
        register(name,{
            required:{value:true,message:'Your Tag is Empty'},
        })
    },[])

    useEffect(() => {
        setValue(name,taglist);
    },[taglist])
  return (
    <div className='flex flex-col gap-2'>
        <label htmlFor='tags'>{label}<sup className="text-pink-200">*</sup></label>
        <input
            id='tags'
            name={name}
            placeholder='Choose a Tag'
            value={tag}
            className='bg-richblack-700 rounded-lg p-3 '
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            onChange={(e) => setTag(e.target.value)}
            onKeyDown={handleKeyDown}
        />
        <div className='flex flex-wrap gap-2'>
            {
                taglist.map((tag,index) => (
                    <div key={index} className='flex gap-2 bg-yellow-200 text-black px-3 py-1 rounded-md'>
                        <div className='flex gap-1 items-center'>
                            {tag}
                            <button onClick={() => removeTags(index)}>
                                <RxCrossCircled/>
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>

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

export default MyTag