// import axios from "axios";

// // Backend API
// const axiosBackend = axios.create({
//   baseURL: process.env.REACT_APP_BACKEND_URL
// });

// // AI service API
// const axiosAI = axios.create({
//   baseURL: process.env.REACT_APP_AI_URL 
// });

// // Add token automatically for backend requests
// axiosBackend.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//     console.log("Token:", token);
//     console.log("Backend URL:", config.baseURL);
//   }
//   return config;
// });

// export { axiosBackend, axiosAI };
 import axios from "axios";

 const axiosBackend = axios.create({
   baseURL:  process.env.REACT_APP_API_URL,
 });

 // AI service API
 const axiosAI = axios.create({
  baseURL: process.env.REACT_APP_AI_URL || "/ai", 
});

// Add token automatically
 axiosBackend.interceptors.request.use((config) => {
   const token = localStorage.getItem("token");
   if (token) {
     config.headers.Authorization = `Bearer ${token}`;
     console.log("Token:", localStorage.getItem("token"));
     console.log(process.env.REACT_APP_API_URL);

   }
   return config;
 });




export {axiosBackend,axiosAI};   


