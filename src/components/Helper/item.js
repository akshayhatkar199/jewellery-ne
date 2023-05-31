import { axiosPrivate } from "./axios";

export const itemListApi = async (userId,offset) => {
    let res = await axiosPrivate.get("/item/list?userId="+userId+"&offset="+offset+"" );
    return res.data;
  };

export const itemApi = async (payloadData) => {
    let res = await axiosPrivate.post("/item/add",payloadData );
    return res.data;
  };
  
export const itemByIdApi = async (userId,itemId) => {
    let res = await axiosPrivate.get("/item/edit?userId="+userId+"&itemId="+itemId+"" );

    return res.data;
  };
  
  export const updateitemByIdApi = async (payloadData) => {
    let res = await axiosPrivate.post("/item/update",payloadData);
    return res.data;
  };
  export const deleteitemByIdApi = async (payloadData) => {
    let res = await axiosPrivate.post("/item/delete",payloadData);
    return res.data;
  };