import HttpClient from "service/https";

export interface IStaff {
  id: number;
  name: string;
  username: string;
  phone?: number;
  avatar?: File;
  position: string;
  salary: any;
}

export const createStaff = async (objStaff: IStaff) => {
  var form = new FormData();
  // form.append("avatar", "");
  form.append("position", objStaff.position);
  // form.append("id", "10");
  form.append("name", objStaff.name);
  // form.append("phone", "");
  form.append("username", objStaff.username);
  form.append("salary", objStaff.salary);
  // form.append("password", "123456");
  let result;
  try {
    const httpClient = HttpClient();
    const handleResponse = await httpClient.post("staff/", form);
    result = await handleResponse.data;
  } catch (error) {
    console.log(error);
  }
  return result;
};

export const updateStaff = async (objStaff: any) => {
  let result;
  try {
    const httpClient = HttpClient();
    const handleResponse = await httpClient.patch(
      `staff/${objStaff.id}`,
      objStaff
    );
    result = await handleResponse.data;
  } catch (error) {
    console.log(error);
  }
  return result;
};

export const deleteStaff = async (id: any) => {
  let result;
  try {
    const httpClient = HttpClient();
    const handleResponse = await httpClient.delete(`staff/${id}`);
    result = await handleResponse.data;
  } catch (error) {
    console.log(error);
  }
  return result;
};

export const getAllStaff = async () => {
  let result;
  try {
    const httpClient = HttpClient();
    const handleResponse = await httpClient.get(`staff/`);
    result = handleResponse.data;
  } catch (err) {
    console.log(err);
  }
  return result;
};
