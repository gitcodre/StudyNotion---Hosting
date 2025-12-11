const BASE_URL = process.env.REACT_APP_BASE_URL;

export const endpoints = {
    LOGIN_API: BASE_URL + '/auth/login',
    OTP_API: BASE_URL + '/auth/generateOtp',
    ResetPassword_API: BASE_URL + '/auth/reset-password-token',
    RESET_API: BASE_URL + '/auth/reset-password',
    SIGNUP_API: BASE_URL + '/auth/signup'
}
export const category = {
    GetCategory_API: BASE_URL + '/course/showAllCategories',
    CategoryPageAPI_URL : BASE_URL + '/course/getCategoryPageDetails'
}

export const profile = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changePassword",
    Delete_API : BASE_URL + '/profile/deleteProfile'
}

export const course = {
    GetAllCourseAPI_URL: BASE_URL + '/profile/getEnrolledCourses',
    GetAllCourseInstructorAPI_URL: BASE_URL + '/course/getInstructorCourses',
    AddCourse_API: BASE_URL + '/course/createCourse',
    EditCourseAPI_URL: BASE_URL + '/course/editCourse',
    DELETE_COURSE_API: BASE_URL + '/course/deleteCourse',
    GET_FULL_COURSE_DETAILS_AUTHENTICATED : BASE_URL + '/course/getFullCourseDetails',
    COURSEDETAILS_API : BASE_URL + '/course/getCourseDetails',
    FULLCOURSEDETAILS_API : BASE_URL + '/course/getFullCourseDetails',
    LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
    INSTRUCTOR_DASHBOARD_API_URL : BASE_URL + '/profile/instructorDashboard'
}
export const section = {
    updateSection_Api_Url: BASE_URL + '/course/updateSection',
    createSection_Api_Url: BASE_URL + '/course/addSection',
    DELETE_SECTION_API: BASE_URL + '/course/deleteSection',
}

export const subSection = {
    DELETE_SUBSECTION_API: BASE_URL + '/course/deleteSubSection',
    UPDATE_SUBSECTION_API: BASE_URL + '/course/updateSubSection',
    CREATE_SUBSECTION_API: BASE_URL + '/course/addSubSection'
}

export const studentEndpoints = {
    COURSE_PAYMENT_API : BASE_URL + '/payments/capturePayment',
    COURSE_VERIFY_API : BASE_URL + '/payments/verifySignature',
    SEND_PAYMENT_SUCCESSFULL_API : BASE_URL + '/payments/sendPaymentSuccessfullEmail'
}
export const profileEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + '/profile/updateDisplayPicture',
}
export const ratingEndpoints = {
    CREATE_RATING_API: BASE_URL + '/course/createRating',
    GETALLRATING_API: BASE_URL + '/course/getReviews',
}