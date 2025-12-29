"use client";

import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:5000",
});

export const getProducts = async () => {
  const response = await httpClient.get("/products");
  return response.data;
};
