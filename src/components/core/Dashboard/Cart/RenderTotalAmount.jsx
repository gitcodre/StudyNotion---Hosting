import React from "react";
import { useDispatch, useSelector } from "react-redux";
import GenericBtn from "../../../common/GenericBtn";
import { buyCourse } from "../../../../services/operations/StudentFeaturesApi";
import { useNavigate } from "react-router-dom";

function RenderTotalAmount () {
    const {totalAmount} = useSelector((state) => state.cart);
    const {cart} = useSelector((state) => state.cart);
    const {user} = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleBuyCourse = () =>{
        const courses = cart.map((course) => course._id);
        console.log('Bought this Course : ',courses);
        // Payment Gateway ko Integrate karna hai in Future
        buyCourse(courses,user,navigate,dispatch);  
    }

    return(
        <div className="text-richblack-5 bg-richblack-800 p-6 flex flex-col gap-y-2 border border-richblack-700 rounded-md mt-2">
            <p className="text-richblack-200">Total:</p>
            <p className="text-2xl text-yellow-50 mb-4">Rs. {totalAmount}</p>
            <GenericBtn
                text={'Buy Now'}
                onclick={handleBuyCourse}
                customClasses={'w-full bg-yellow-25 font-semibold text-black rounded-md p-2 px-4'}
            />
        </div>
    )
}

export default RenderTotalAmount;