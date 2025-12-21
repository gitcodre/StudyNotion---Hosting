import { useDispatch, useSelector } from "react-redux"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"

import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useEffect, useState } from "react"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import { deleteCourse, fetchAllInstructorCourse } from "../../../../../services/operations/profile_api"
import Confirmationmodal from "../../../../common/Confirmationmodal"
import { COURSE_STATUS } from "../../../../../utils/constant"
import { formatDate } from "../../../../../services/formatDate"


export default function CoursesTable({ courses, setCourses }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const TRUNCATE_LENGTH = 30

  const handleCourseDelete = async (courseId) => {
    setLoading(true)
    await deleteCourse({ courseId: courseId })
    const result = await fetchAllInstructorCourse()
    if (result) {
      setCourses(result)
    }
    setConfirmationModal(null)
    setLoading(false)
  }
  useEffect(() => {
    console.log("All Course ", courses)
    // console.log('Category Courses',courses[0]?.category[0]?.name);
  })

  return (
    <div className="rounded-xl border border-richblack-800 mt-10">
      {/* Header - Desktop Only */}
      <div className="hidden md:flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-4 text-sm font-medium uppercase text-richblack-100 ">
        <p className="flex-1">Courses</p>
        <p className="w-[120px] lg:pl-0 pl-8">Duration</p>
        <p className="w-[100px]">Price</p>
        <p className="w-[100px]">Actions</p>
      </div>

      {/* Body */}
      <div className="flex flex-col">
        {courses?.length === 0 ? (
          <div className="py-10 text-center text-2xl font-medium text-richblack-100">
            No courses found
          </div>
        ) : (
          courses?.map((course) => (
            <div
              key={course._id}
              className="flex flex-col md:flex-row gap-y-6 md:gap-x-10 border-b border-richblack-800 px-6 py-8"
            >
              {/* 1. Course Info Section (Image + Text) */}
              <div className="flex flex-1 flex-col md:flex-row gap-x-4 gap-y-4">
                {/* Thumbnail Image */}
                <img
                  src={course?.thumbnail}
                  alt={course?.courseName}
                  className="h-[148px] w-full lg:w-[220px] md:w-[150px] rounded-lg object-cover"
                />
                {/* Description of Course */}
                <div className="flex flex-col justify-between gap-y-2">

                  <p className="text-lg font-semibold text-richblack-5">
                    {course.courseName}
                  </p>
                  <p className="text-sm text-richblack-100">
                    Category: {course?.category[0]?.name}
                  </p>
                  <p className="text-xs text-richblack-300">
                    {course.courseDescription.split(" ").length > TRUNCATE_LENGTH
                      ? course.courseDescription.split(" ").slice(0, TRUNCATE_LENGTH).join(" ") + "..."
                      : course.courseDescription}
                  </p>
                  <p className="text-[12px] text-white">
                    Created: {formatDate(course.createdAt)}
                  </p>
                  {/* Course Status  */}
                  {course.status === COURSE_STATUS.DRAFT ? (
                    <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                      <HiClock size={14} /> Drafted
                    </p>
                  ) : 
                  (
                    <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                      <span className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                        <FaCheck size={8} />
                      </span>
                      Published
                    </p>
                  )}

                </div>

              </div>

              {/* 2. Duration */}
              <div className="text-sm font-medium text-richblack-100 lg:w-[120px] md:w-[80px]">
                <span className="md:hidden text-richblack-400 mr-2 font-normal">Duration:</span>
                2hr 30min
              </div>

              {/* 3. Price */}
              <div className="text-sm font-medium text-richblack-100 md:w-[100px]">
                <span className="md:hidden text-richblack-400 mr-2 font-normal">Price:</span>
                ₹{course.price}
              </div>

              {/* 4. Actions */}
              <div className="text-sm font-medium text-richblack-100 md:w-[100px]">
                <span className="md:hidden text-richblack-400 mr-2 font-normal">Actions:</span>
                {/* Edit wala Button */}
                <button
                  disabled={loading}
                  onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                  className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                >
                  <FiEdit2 size={20} />
                </button>
                {/* Delete Wala Button */}
                <button
                  disabled={loading}
                  onClick={() => handleCourseDelete(course._id)}
                  className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                >
                  <RiDeleteBin6Line size={20} />
                </button>

              </div>

            </div>
          ))
        )}
      </div>
      {confirmationModal && <Confirmationmodal modalData={confirmationModal} />}
    </div>
  )
}