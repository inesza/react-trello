import axios from "axios";

const apiHandler = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
});

// apiHandler.interceptors.request.use((config) => {
//   const token = localStorage.getItem("authToken");
//   config.headers.Authorization = token ? `Bearer ${token}` : "";
//   return config;
// });

//! Error handling to use in the catch
function errorHandler(error) {
  if (error.data) {
    console.log(error.data && error.data.message);
  }
  throw error;
}


const service = {
  // Service is spread to have access to the basics get/post...
  ...apiHandler,
};

export default service;
