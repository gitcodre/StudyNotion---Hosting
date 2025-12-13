import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { FiUpload } from "react-icons/fi";
import GenericBtn from '../../common/GenericBtn';
import { updateDisplayPicture } from '../../../services/operations/profile_api';

const ProfilePicture = ({user}) => {

    const dispatch = useDispatch(); 
    const [imageFile,setImageFile] = useState(null);
    const [previewSource,setPreviewSource] = useState(null);
    const [loading,setLoading] = useState(false);

    const fileInputRef = useRef(null);
    
    const handleFileChange = (e) => {
        // User Selected files file mei aa jayega
        const file = e.target.files[0];
        if(file)
        {
            setImageFile(file);
            preview(file);
        }
    }
    const preview = (file) => {
        const reader = new FileReader();
        // convert image to url like a string format so browser can display it 
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }

    const handleClick = () => {
        fileInputRef.current.click();
    }

    const handleFileUpload = async(e) => {
        try{
            setLoading(true);
            const formData = new FormData();
            formData.append('displayPicture', imageFile);
            console.log('ImageFile : ',imageFile);
            await dispatch(updateDisplayPicture(formData));
            setLoading(false);
        }
        catch(err)
        {
            console.log('Error Message....',err.message);
        }
    }
    useEffect(() => {
        console.log('User : ',user);
        console.log('User Image : ',user?.image);
    })

  return (
    <div className='text-richblack-5 w-full flex items-center justify-between'>
        <div className='flex gap-x-4 items-center'>
            <img 
                src={previewSource || user?.image}
                alt={`profile-${user?.firstName}`}
                className='w-[78px] aspect-square rounded-full object-cover cursor-pointer'
            />
            <div>
                <h2>{user?.firstName} {user?.lastName}</h2>
                <p className='text-richblack-300'>{user?.email}</p>
            </div>

        </div>


        {/* Select / Upload Button */}
        <div className='flex items-center gap-x-2'>
            <input 
                type='file'
                className='hidden'
                onChange={handleFileChange}
                ref={fileInputRef}
                accept='image/png , image/gif , image/jpeg , image/jpg'
            />
            {/* Select Button */}
            <div>
                <button
                    onClick={handleClick}
                    disabled={loading}
                    className="cursor-pointer rounded-md bg-richblack-700 border py-2 px-5 font-semibold text-richblack-50"
                >
                    Select
                </button>
            </div>
            {/* Upload Button */}
            <GenericBtn 
                text={loading ? 'Uploading...':'Upload'}
                onclick={handleFileUpload}
                customClasses={'text-yellow-50 flex gap-x-2'}
            >
                {
                    !loading && (
                        <FiUpload className="text-lg text-yellow-50"/>
                    )
                }
            </GenericBtn>

        </div>
    </div>
  )
}

export default ProfilePicture

