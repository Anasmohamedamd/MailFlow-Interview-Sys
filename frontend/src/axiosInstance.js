 import axios from "axios";

 const axiosInstance = axios.create({
   baseURL:  process.env.REACT_APP_API_URL,
 });

// Add token automatically
 axiosInstance.interceptors.request.use((config) => {
   const token = localStorage.getItem("token");
   if (token) {
     config.headers.Authorization = `Bearer ${token}`;
     console.log("Token:", localStorage.getItem("token"));
     console.log(process.env.REACT_APP_API_URL);

   }
   return config;
 });

// axiosInstance.js
// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: process.env.REACT_APP_API_URL, 
// });

// // Attach token automatically
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );



export default axiosInstance;

