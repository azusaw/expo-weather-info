import axios from "axios";
import Toast from "react-native-toast-message";

export const axiosInstance = axios.create({
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("Axios error", error); // for dev
    Toast.show({
      type: "error",
      text1: "Failed to fetch data",
      text2: "An error occurred while retrieving weather data.",
    });
    return Promise.reject(error);
  },
);
