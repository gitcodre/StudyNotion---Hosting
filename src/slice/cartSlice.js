import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    // Cart mei Saare Courses Rahenge
    cart : localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
    // Kitne Items hai Cart mei uska Count
    totalItems : localStorage.getItem('totalItems') ? JSON.parse(localStorage.getItem('totalItems')) : 0,
    // Saare items jo cart mei hai uska total Amount 
    totalAmount : localStorage.getItem('totalAmount') ? JSON.parse(localStorage.getItem('totalAmount')) : 0,
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        // action mei course ki id rahegi ya course rahega 
        addToCart : (state,action) => {
            const course = action.payload;
            // To check if this course already present or not if not then only add 
            const index = state.cart.findIndex((item) => item._id === course._id);
            if(index >= 0)
            {
                // Course is already present
                toast.error('Course is Already Present in Cart');
                return ;
            }
            // Add the Course
            state.cart.push(course);
            state.totalItems++;
            state.totalAmount += course.price;

            // Add it to local Storage too coz initial state mei local Storage se hi data uthaya hai 
            localStorage.setItem('cart' , JSON.stringify(state.cart));
            localStorage.setItem('totalItems' , JSON.stringify(state.totalItems));
            localStorage.setItem('totalAmount' , JSON.stringify(state.totalAmount));

            // Success Toast 
            toast.success('Course Added to Cart');
        },
        removeToCart : (state,action) => {
            const course = action.payload;
            const index = state.cart.findIndex((item) => item._id === course._id);

            if(index >= 0)
            {
                // Course hai cart mei to delete kro slice se
                state.totalAmount -= state.cart[index].price;
                state.totalItems--;
                state.cart.splice(index , 1);
                // Update to local storage
                localStorage.setItem('cart' , JSON.stringify(state.cart));
                localStorage.setItem('totalItems' , JSON.stringify(state.totalItems));
                localStorage.setItem('totalAmount' , JSON.stringify(state.totalAmount));
                // Success Toast
                toast.success('Course removed from cart');
            }
        },
        resetCart : (state) => {
            state.cart = [];
            state.totalAmount = 0;
            state.totalItems = 0;
            // Update to local Storage
            localStorage.removeItem('cart');
            localStorage.removeItem('totalItems');
            localStorage.removeItem('totalAmount');

        }
    }
})
export const {addToCart,removeToCart,resetCart} = cartSlice.actions;
export default cartSlice.reducer; 
