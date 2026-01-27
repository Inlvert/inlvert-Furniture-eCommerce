"use client";

import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:5000",
});

export interface LoginDto {
  email: string;
  password: string;
}

// Request interceptor
httpClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response interceptor
httpClient.interceptors.response.use(
  function (response) {
    if (response?.data?.accessToken) {
      const token = response.data.accessToken;
      localStorage.setItem("accessToken", token);
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const getProducts = async () => {
  const response = await httpClient.get("/products");
  return response.data;
};

// export const login = async (email: string, password: string) => {
//   const response = await httpClient.post("/auth/login", {
//     email,
//     password,
//   });
//   return response.data;
// }

export const login = (userData: LoginDto) => {
  const response = httpClient.post("/auth/login", userData);
  return response
}

export const getProfile = async () => {
  const response = await httpClient.get("/auth/profile");
  return response;
};
