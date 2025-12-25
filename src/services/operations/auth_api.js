import { setLoading,setToken } from "../../slice/authSlice"; 
import { setUser } from "../../slice/profileSlice";
import { apiConnector } from "../apiConnector";
import { category, endpoints } from "../api_url";
import {toast} from 'react-hot-toast'
const {
    LOGIN_API,
    OTP_API,
    ResetPassword_API,
    RESET_API,
    SIGNUP_API,
} = endpoints
const {
    GetCategory_API
} = category

export function login(email,password,navigate) {
    return async(dispatch) => { //Redux thunk
        const toastId = toast.loading('Loading...')
        dispatch(setLoading(true))
        try{
            
            // Step 1 : Call apiConnector
            // Step 2 : Check if Data Comes or not using success value
            // Step 3 : Show Toast by saying successfull
            // Step 4 : Store the data generated from api in redux state wherever necessary

            console.log("BASE_URL:", process.env.REACT_APP_BASE_URL);
            console.log("LOGIN_API:", LOGIN_API);
            const response = await apiConnector('POST',LOGIN_API,{email,password});

            console.log('Login Api Response : ', response);

            if(!response.data.success)
            {
                throw new Error(response.data.message);
            }
            toast.success('Login Successfull');

            // Store Token and user in redux state 
            dispatch(setToken(response.data.token));
            const userImage = response.data.image ? response.data.image : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`

            dispatch(setUser({...response.data.user,image:userImage}));
            
            localStorage.setItem('token',JSON.stringify(response.data.token));
            localStorage.setItem('user',JSON.stringify(response.data.user));
            navigate('/dashboard/my-profile');
        }
        catch(err){
            console.log("LOGIN API ERROR............", err);
            toast.error('Failed to login');
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function sendOtp(email,navigate) {
    return async(dispatch) => {
        const toastId = toast.loading('Loading...');
        dispatch(setLoading(true));
        try{
            const response = await apiConnector('POST',OTP_API,{email,checkUserPresent:true});
            console.log('SENDOTP Api Response........',response);
            if(!response.data.success)
            {
                throw new Error(response.data.message);
            }
            toast.success('Otp Sent Successfull');
            navigate("/verify-email");
        }
        catch(err)
        {
            console.log('Otp Send Failure ....',err);
            toast.error('Failed to send Otp');

        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function getPasswordResetToken(email,setEmailPresent) {
    return async(dispatch) => {
        const toastId = toast.loading('Loading...');
        dispatch(setLoading(true));
        try{
            console.log("Reset Password API:", ResetPassword_API);
            const response = await apiConnector('POST',ResetPassword_API,{email});

            console.log('Reset Password Token Response....',response);
            if(!response.data.success)
            {
                throw Error(response.data.message);
            }            
            setEmailPresent(true);
        } 
        catch(err)
        {
            console.error('Token Generation Failed',err);
            toast.error('Failed to Generate Token');
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function resetPassword(password,confirmPassword,token)
{
    return async(dispatch) => {
        const toastId = toast.loading('Loading...');
        dispatch(setLoading(true));
        try{
            const response = await apiConnector('POST',RESET_API,{password,confirmPassword,token});
            console.log('Reset Password Response....',response);
            if(!response.data.success)
            {
                throw Error(response.data.message);
            }
            toast.success('Password Reset Sucessfully');

        }
        catch(err)
        {
            console.error('Token Generation Failed',err);
            toast.error('Failed to Generate Token');
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function signup(firstName,lastName,email,password,confirmPassword,accountType,otp,navigate)
{
    return async(dispatch) => {
        const toastId = toast.loading('Loading...');
        dispatch(setLoading(true));
        try{
            console.log("SIGNUP_API:", SIGNUP_API);
            console.log('OTP : ',otp)
            const response = await apiConnector('POST',SIGNUP_API,
                {
                    firstName,
                    lastName,
                    email,
                    password,
                    confirmPassword,
                    accountType,
                    otp,
                });
            console.log('Signup Response....',response);
            if(!response.data.success)
            {
                throw Error(response.data.message);
            }
            toast.success('Signup Sucessfull');
            navigate("/login");

        }
        catch(err)
        {
            console.error('Signup Failed',err);
            toast.error('Failed to Signup');
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export const getCategory = async () =>
{
    let result = [];
    try{
        const response = await apiConnector('GET',GetCategory_API);

        // gives {id,name,description} of all category in array 

        console.log('Category Fetched API response : ',response);

        if(!response?.data?.success)
        {
           throw new Error(response.data.message);
        }
        result = response?.data?.getAllCategory;
    }
    catch(err){
        console.log('Failed to fetch Category...',err);
        toast.error('Category Data unable to fetch');
    }
    return result;
    
}

export function logout(navigate)
{
    return (dispatch) => {
        dispatch(setToken(null));
        dispatch(setUser(null));
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.success('Logged Out');
        navigate('/')
    }
}