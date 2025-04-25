"use client";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import React, { useEffect } from "react";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const userId = user?.id; // Get the user ID from Clerk

  const userRole = user?.publicMetadata?.role; // Default to 'patient' if role is not set

  useEffect(() => {
    const fetchUserData = async () => {
      if (userRole === "doctor") {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/doctors/${userId}`
        );

        if (res.status === 200) {
          console.log("Doctor data:", res.data);
        }
      } else {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`
        );

        if (res.status === 200) {
          console.log("Patient data:", res.data);
        }
      }
    };

    fetchUserData()
      .then(() => {
        console.log("User data fetched successfully");
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userRole]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800">Profile Page</h1>
      <p className="mt-4 text-gray-600">This is the profile page.</p>
    </div>
  );
}
