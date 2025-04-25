"use client";
import React from "react";
import axios from "axios";

export default function AxiosProvider({ children }: { children: React.ReactNode }) {
  // const token = process.env.NEXT_PUBLIC_AUTH_TOKEN; // Retrieve token from env
  // console.log("Retrieved token:", token);

  // try {
  //   if (token) {
  //     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //     console.log("Authorization header set.");
  //   } else {
  //     console.error("Authorization token is not set.");
  //   }
  // } catch (error) {
  //   console.error("Error setting authorization header:", error);
  // }
  // axios.defaults.headers.common["Authorization"] = `Bearer asdsadsdaaaaaaaaaaaaaaaaaaaaaaaaaaaa`;
  return <div>{children}</div>;
}