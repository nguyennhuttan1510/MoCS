import HttpClient from "service/https";

export const createMenu = async (formData) => {
  const require = {
    name: formData.name,
    price: parseInt(formData.price),
    discount: parseInt(formData.discount),
    category: formData.category,
  };
  let result;
  try {
    const httpClient = HttpClient();
    const handleResponse = await httpClient.post("menu/", require);
    result = await handleResponse.data;
  } catch (error) {
    console.log(error);
  }
  return result;
};

export const getAllMenu = async () => {
  let result;
  try {
    const httpClient = HttpClient();
    const handleResponse = await httpClient.get("menu/");
    result = await handleResponse.data;
  } catch (error) {
    console.log(error);
  }
  return result;
};

export const createTabale = async (formData) => {
  const require = {
    name: formData.name,
  };
  let result;
  try {
    const httpClient = HttpClient();
    const handleResponse = await httpClient.post("table/", require);
    result = await handleResponse.data;
  } catch (error) {
    console.log(error);
  }
  return result;
};

export const deleteMenu = async (idMenu) => {
  let result;
  try {
    const httpClient = HttpClient();
    const handleResponse = await httpClient.delete(`menu/${idMenu}`);
    result = await handleResponse.data;
  } catch (error) {
    console.log(error);
  }
  return result;
};
