import toast from "react-hot-toast";
import { studentEndpoints } from "../api_url";
import { apiConnector } from "../apiConnector";
import rzplogo from '../../assets/Logo/rzp_logo.png';
import {setPaymentLoading} from '../../slice/courseSlice'
import {resetCart} from '../../slice/cartSlice'
const {COURSE_PAYMENT_API,COURSE_VERIFY_API,SEND_PAYMENT_SUCCESSFULL_API} = studentEndpoints;

function loadScript(src)
{
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
    })

}

export async function buyCourse(courses,userDetails,navigate,dispatch) {
    const toastId = toast.loading('Loading...');
    try{
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

        if(!res)
        {
            toast.error('Razorpay SDk failed to load');
            return;
        }
        // Create Order
        const orderResponse = await apiConnector('POST',COURSE_PAYMENT_API,{courses});
        if(!orderResponse.data.success)
        {
            toast.error(orderResponse?.data?.message);
            return;
        }
        
        console.log("PRINTING orderResponse", orderResponse);
        console.log("Razorpay Key --->", process.env.REACT_APP_RAZORPAY_KEY);
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY,
            currency:orderResponse?.data?.message?.currency,
            amount:`${orderResponse?.data?.message?.amount}`,
            order_id:orderResponse?.data?.message?.id,
            name:'StudyNotion',
            description:'Thankyou For Purchasing this course',
            image:rzplogo,
            prefill:{
                name:`${userDetails?.firstName}`,
                email:userDetails?.email,
            },
            handler: (response) => {
                sendPaymentSuccessfullEmail(response, orderResponse?.data?.message?.amount);
                verifyPayment({...response, courses}, navigate, dispatch);
            }
        }
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })
    }
    catch(err)
    {
        console.log('Payment API Error.....',err);
        const errorMessage = err?.response?.data?.message || err?.message || 'Could not make Payment';
        toast.error(errorMessage);
    }
    finally{
        toast.dismiss(toastId);
    }
}

export async function sendPaymentSuccessfullEmail(response,amount)
{
    try{
        await apiConnector('POST',SEND_PAYMENT_SUCCESSFULL_API,{
            orderId:response.razorpay_order_id,
            paymentId:response.razorpay_payment_id,
            amount,
        })
    }
    catch(err)
    {
        console.log('Payment Success Email Error ...',err);
    }
}

// verify Payment
export async function verifyPayment(bodyData,navigate,dispatch)
{
    const toastId = toast.loading('Verifying Payment....');
    dispatch(setPaymentLoading(true));
    try{
        console.log('BodyData : ',bodyData);
        const response = await apiConnector('POST',COURSE_VERIFY_API,bodyData);
        console.log('Response : ',response);
        if(!response.data.success)
        {
            throw new Error(response.data.message);
        }
        toast.success('Payment Successfull,You are now added to the course');
        navigate('/dashboard/enrolled-courses');
        dispatch(resetCart());
    }
    catch(err)
    {   
        console.error('Payment Verify Error : ',err);
        toast.error('Failed to Verify Payment');
    }
    finally {
        toast.dismiss(toastId);
        dispatch(setPaymentLoading(false));
    }
} 