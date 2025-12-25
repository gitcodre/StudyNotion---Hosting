import { createSlice } from "@reduxjs/toolkit";

// Why parse cuz localStorage accepts string and frontend accept object so i called getItem means i need it in my frontend so i need to convert string to object thats why i used JSON.parse
// signupData will be used at verifyEmail.jsx for sending signup data to signup controller .. signupData is Created at time of otp creation signupForm
const initialState = {
    signupData:null,
    loading:false,
    token:localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
}
const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        setSignUpData(state,value) {
            state.signupData = value.payload;
        },
        setLoading(state,value){
            state.loading = value.payload;
        },
        setToken(state,value){
            state.token = value.payload;
        },
    }
})

export const {setSignUpData,setLoading,setToken} = authSlice.actions;
export default authSlice.reducer
