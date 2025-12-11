import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import CountryCode from '../../../data/countrycode.json'
const ContactusForm = () => {
    const [loading,setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors,isSubmitSuccessfull}
    } = useForm();

    useEffect(() => {
        if(isSubmitSuccessfull)
        {
            reset({
                firstname:'',
                lastname:'',
                email:'',
                message:'',
                phoneNo:''
            })
        }
    },[reset,isSubmitSuccessfull])

    const submitContactForm = async(data) => {
        try{
            setLoading(true);
            const response = {status:'ok'};
            console.log('Form Data using Hook Form : ',data);
            setLoading(false);
        }
        catch(err){
            console.log(err);
        }
    }

  return (
    <form onSubmit={handleSubmit(submitContactForm)}>

        <div className='flex flex-col gap-2 pb-2'>

            {/* FirstName & Lastname */}
            <div className='flex gap-10'>
                {/* First Name */}
                <div className='flex flex-col'>
                    <label htmlFor='firstname'>First Name</label>
                    <input
                        className='bg-richblack-800 mt-2 mb-4 w-[15rem] p-2 rounded-md outline-none'
                        type='text'
                        name='firstname'
                        id='firstname'
                        placeholder='Enter first name'
                        {...register('firstname' , {required:true})}
                    />
                    {
                        errors.firstname && (
                            <span>
                                Please Enter your name
                            </span>
                        )
                    }
                </div>
                {/* Last Name */}
                <div className='flex flex-col'>
                    <label htmlFor='lastname'>Last Name</label>
                    <input
                        className='bg-richblack-800 mt-2 mb-4 p-2 w-[18rem] rounded-md outline-none'
                        type='text'
                        name='lastname'    
                        id='lastname'
                        placeholder='Enter Last Name'
                        {...register('lastname')}
                    />
                    
                </div>
            </div>

            {/* Email */}
            <div className='flex flex-col'>
                    <label htmlFor='email'>Email Address</label>
                    <input
                        className='bg-richblack-800 mt-2 mb-4 w-full p-2 rounded-md outline-none'
                        type='email'
                        name='email'
                        id='email'
                        placeholder='Enter Email'
                        {...register('email' , {required:true})}
                    />
                    {
                        errors.email && (
                            <span>
                                Please Enter your Email address
                            </span>
                        )
                    }
            </div>

            {/* Phone No */}
            <div className='flex flex-col'>
                <label htmlFor='Phonenum'>Phone Number</label>

                <div className='flex gap-2'>
                    <select
                        className='bg-richblack-800 mt-2 mb-4 w-[15%] p-2 rounded-md outline-none text-richblack-5'
                        name='Phonenum'
                        id='Phonenum'
                        defaultValue='+91'
                        {...register('countryCode',{required:true})}
                    >
                        {
                            CountryCode.map((element,index) => (
                                <option key={index} value={element.code}>
                                    {element.code} -{element.country}
                                </option>
                            ))
                        }

                    </select>
                    {/* Phone no wali nput field */}
                    <input
                        type='text'
                        name='phonenumber'
                        id='phonenumber'
                        placeholder='12345 67890'
                        maxLength={10}
                        {...register('phoneNo',{
                            required:{value:true , message:'Please Enter Your Phone Number'},
                            pattern: { value: /^[0-9]{10}$/, message: 'Invalid Phone Number' },

                        })}
                        onInput={(e) => {
                            // ✅ restricts user to only digits
                            e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                        }}


                        className='bg-richblack-800 mt-2 mb-4 w-full p-2 rounded-md outline-none text-richblack-5'
                    />
                    {
                        errors.phoneNo && (
                            <span>
                                {errors.phoneNo.message}
                            </span>
                        )
                    }

                </div>

            </div>

            {/* Message */}
            <div>
                <label htmlFor='message'>Message</label>
                <br/>
                <textarea
                    className='bg-richblack-800 mt-2 mb-4 w-full p-2 rounded-md outline-none'
                    name='message'
                    id='message'
                    placeholder='Enter Your message here'
                    rows={6}
                    cols={60}
                    {...register('message',{required:true})}
                />
                {
                    errors.message && (
                        <span>
                            Please enter your message
                        </span>
                    )
                }
            </div>
            
            {/* Send Message Button */}
            <button type='submit' className='bg-yellow-50 w-[100%] p-2 rounded-md text-richblack-900 '>
                Send Message
            </button>

        </div>

    </form>
  )
}

export default ContactusForm