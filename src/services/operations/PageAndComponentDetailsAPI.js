import React from 'react'
import toast from 'react-hot-toast'
import { apiConnector } from '../apiConnector';
import { category } from '../api_url';

const{CategoryPageAPI_URL} = category

export const getCatalogPageData = async(categoryId) => {
    if(!categoryId) return;

    const toastId = toast.loading('Loading...');
    let result = [];
    try
    {
        const response = await apiConnector('POST' , CategoryPageAPI_URL , {categoryId});

        console.log('Category PageDetails API URL : ', response);

        if(!response?.data?.success)
        {
            throw new Error('Backend Isuue For fetching Category Page');
        }
        
        // toast.success('Fetched Category Page Successfully');    
        result = response?.data;
    }
    catch(err)
    {
        
        console.log('Category Page Details API Error : ',err);
        toast.error('Failed to fetch Category Page Details');
    }   
    toast.dismiss(toastId);
    return result;
}
