import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import CountryCode from '../../../data/countrycode.json'
const ContactusForm = () => {
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
            const response = {status:'ok'};
            console.log('Response',response)
            console.log('Form Data using Hook Form : ',data);
        }
        catch(err){
            console.log(err);
        }
    }

  return (
    <form onSubmit={handleSubmit(submitContactForm)}>

        <div className='flex flex-col gap-2 pb-2'>

            {/* FirstName & Lastname */}
            <div className='md:flex gap-10'>
                {/* First Name */}
                <div className='flex flex-col md:px-0 px-[1rem]'>
                    <label htmlFor='firstname'>First Name</label>
                    <input
                        className='bg-richblack-800 mt-2 mb-4 md:w-[15rem] p-2 rounded-md outline-none'
                        type='text'
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
                <div className='flex flex-col md:px-0 px-[1rem]'>
                    <label htmlFor='lastname'>Last Name</label>
                    <input
                        className='bg-richblack-800 mt-2 mb-4 p-2 lg:w-[18rem] rounded-md outline-none'
                        type='text'   
                        id='lastname'
                        placeholder='Enter Last Name'
                        {...register('lastname')}
                    /> 
                </div>
            </div>

            {/* Email */}
            <div className='flex flex-col md:px-0 px-[1rem]'>
                <label htmlFor='email'>Email Address</label>
                <input
                    className='bg-richblack-800 mt-2 mb-4 w-full p-2 rounded-md outline-none'
                        type='email'
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
            <div className='flex flex-col md:px-0 px-[1rem]'>
                <label htmlFor='Phonenum'>Phone Number</label>

                <div className='flex gap-2'>
                    <select
                        className='bg-richblack-800 mt-2 mb-4 md:w-[15%] w-[25%] p-2 rounded-md outline-none text-richblack-5'
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
                    {/* Phone no wali input field */}
                    <input
                        type='text'
                        id='Phonenum'
                        placeholder='12345 67890'
                        maxLength={10}
                        {...register('phoneNo',{
                            required:{value:true , message:'Please Enter Your Phone Number'},
                            // This is just a validation if it breaches message shows
                            pattern: { value: /^[0-9]{10}$/, message: 'Invalid Phone Number' },

                        })}
                        // This is a restricton that it will not breach 
                        onInput={(e) => {
                            // ✅ restricts user to only digits
                            // replace(A, B): This function says: "Find everything that matches A and swap it with B."
                            // ^ (Inside the brackets): When the ^ is inside [], it means "NOT." So, [^0-9] means "anything that is NOT a digit."
                            // g: This stands for Global. It tells JavaScript to find all non-digits in the string, not just the first one it sees.
                            // '' (The Empty String): This is what we are replacing the "bad" characters with. Effectively, it deletes them.
                            // In simple terms: "Find every character that is NOT a number and delete it instantly."
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
            <div className='md:px-0 px-[1rem]'>
                <label htmlFor='message'>Message</label>
                <br/>
                <textarea
                    className='bg-richblack-800 mt-2 mb-4 w-full p-2 rounded-md outline-none'
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
            <button type='submit' className='bg-yellow-50 md:w-[100%] w-[90%] md:ml-0 ml-[1rem] p-2 rounded-md text-richblack-900 '>
                Send Message
            </button>

        </div>

    </form>
  )
}

export default ContactusForm