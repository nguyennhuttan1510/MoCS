import HttpClient from "service/https";

export interface IStaff {
    id: number,
    name: string,
    phone?: number,
    avatar?: File,
    position: string,
}



export const createStaff = async (objStaff: IStaff) => {
    const Staff = {
        id: objStaff.id,
        name: objStaff.name,
        phone: objStaff.phone,
        avatar: objStaff.avatar,
        position: objStaff.position,
    }
    let result;
    try {
        const httpClient = HttpClient();
        const handleResponse = await httpClient.post('staff/', Staff);
        result = await handleResponse.data;
    } catch (error) {
        console.log(error);
    }
    return result;
}

export const updateStaff = async (objStaff: any) => {
    let result;
    try {
        const httpClient = HttpClient();
        const handleResponse = await httpClient.patch(`staff/${objStaff.id}`, objStaff);
        result = await handleResponse.data;
    } catch (error) {
        console.log(error);
    }
    return result;
}


export const deleteStaff = async (objStaff: any) => {
    let result;
    try {
        const httpClient = HttpClient();
        const handleResponse = await httpClient.delete(`staff/${objStaff.id}`);
        result = await handleResponse.data;
    } catch (error) {
        console.log(error);
    }
    return result;
}


