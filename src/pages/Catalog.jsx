import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { apiConnector } from '../services/apiConnector';
import { getCategory } from '../services/operations/auth_api';
import { getCatalogPageData } from '../services/operations/PageAndComponentDetailsAPI';
import Course_Card from '../components/core/Catalog/Course_Card';
import CourseSlider from '../components/core/Catalog/CourseSlider';

const Catalog = () => {
    const [catalogPageData,setCatalogPageData] = useState(null);
    const [categoryId,setCategoryId] = useState('');
    const {catalogName} = useParams();
    // I want categoryPageDetails ka controller ko call krna uske liye mujhe category ka id chaiye
    // category ka id gettCategoryDetails wale api mei hai jo navbar mei use hua tha

    useEffect(() => {
        const fetchCategory = async () => {
            // Result will be array of objects
            const result = await getCategory();

            // This result will store selected category ka id
            const category_id = result.filter((cat) => 
                cat.name.split(' ').join('-').toLowerCase() === catalogName)[0]._id;

            // Your fix prevents unnecessary re-renders by avoiding state updates when the value hasn’t changed.
            // This breaks the infinite cycle of useEffect → API → toast.

            if (category_id) {
                setCategoryId(category_id);
            }
        }
        fetchCategory();
    },[catalogName])

    useEffect(() => {
        if(!categoryId) return;
        const fetchCatalogPage = async () => {
            const result = await getCatalogPageData(categoryId);
            if(result)
            {
                console.log('Catalog Page Result : ', result);
                setCatalogPageData(result);
            }
        }
        fetchCatalogPage();
    },[categoryId])

    return(
        !catalogPageData || catalogPageData.length === 0 ? (
            <div className='text-richblack-5 flex justify-center mt-10 w-full text-4xl '>
                No Courses in this Category
            </div>
        ) : 
        (
            <div className='text-richblack-5'>

                <div className='bg-richblack-800 pb-24'>
                    <div className='w-[30%] ml-60 pt-20 flex flex-col gap-4'>
                        {/* Links */}
                        <p className='text-richblack-100'>Home / Catalog / <span className='text-yellow-50'>{catalogPageData?.data?.selectedCategory?.name}</span></p>
                        {/* Heading */}
                        <p className='text-2xl'>
                            {catalogPageData?.data?.selectedCategory?.name}
                        </p>
                        {/* Descritpion */}
                        <p className='text-richblack-100'>
                            {catalogPageData?.data?.selectedCategory?.name} is a Famous Programming Language
                        </p>
                    </div>
                </div>

                <div className='w-[75%] pl-10 pt-10 mx-auto'>
                    {/* Section 1 */}
                    <div className='flex flex-col mb-20'>
                        <h2 className='text-2xl font-semibold mb-4'>Courses to get you started</h2>
                        <div className='flex gap-x-5 mb-1'>
                            <p>Most Popular</p>
                            <p>New</p>
                        </div>
                        <div className='w-[90%] h-1 border-b-2 mb-2 border-richblack-5'></div>
                        {/* Selected category course ka data aayega */}
                        <div className='mt-5 pr-10'>
                            <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.course} />
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className='mb-20'>
                        <h2 className='text-2xl font-semibold mb-2'>Top Courses in {catalogPageData?.data?.differentCategory?.name}</h2>
                        {/* Different Category ke course ka data aayega */}
                        <div className='mt-5 pr-10'>
                            <CourseSlider Courses={catalogPageData?.data?.differentCategory?.course} />
                        </div>
                    </div>
                    {/* Section 3 */}
                    <div className='pb-10'>
                        <h2 className='text-2xl font-semibold mb-2'>Frequently Bought</h2>
                        {/* Most selling course ka data aayega */}
                        <div className='py-8'>
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 gap-y-10'>
                                {
                                    catalogPageData?.data?.mostSellingCourses?.slice(0,4)
                                    .map((course,index) => (
                                        <Course_Card course={course} key={index} Height={'h-[400px]'} />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>  

            </div>
        )
        
    )
}

export default Catalog


