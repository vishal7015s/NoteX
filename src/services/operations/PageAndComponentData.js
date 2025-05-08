// import React from 'react'
// import toast from 'react-hot-toast';
// import { apiConnector } from '../apiConnector';
// import { catalogData } from '../apis';

// export const getCatlogPageData = async (categoryId) => {

//     const toastId = toast.loading("Loading...");
//   let result = [];
//   try{
//     const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, {categoryId: categoryId});

//     if(!response?.data?.success)
//         throw new Error("could not fetch category page data");

//     result = response?.data;
//   }
//   catch(error){
//     console.log("CATLOG PAGE DATA API ERROR...",error);
//     toast.error(error.message);
//     result = error?.response?.data;
    
//   }
//   toast.dismiss(toastId);
//   return result;
// }




// temp  
import { toast } from "react-hot-toast"

import { apiConnector } from "../apiConnector"
import { catalogData } from "../apis"

export const getCatalogPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector(
      "POST",
      catalogData.CATALOGPAGEDATA_API,
      {
        categoryId: categoryId,
      }
    )
    console.log("resssssss", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Catagory page data.")
    }
    result = response?.data
  } catch (error) {
    console.log("CATALOGPAGEDATA_API API ERROR............", error)
    toast.error(error.message)
    result = error.response?.data
  }
  toast.dismiss(toastId)
  return result
}