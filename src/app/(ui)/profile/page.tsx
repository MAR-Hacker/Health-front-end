"use client";
import DoctorProfile from "@/src/components/profiles/doctor-profile";
import UserProfile from "@/src/components/profiles/user-profile";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import React, { useEffect, useState } from "react";

export interface DoctorProfile {
  id: string;
  userId: string;
  name: string;
  specialization: string;
  experience: number;
  location: string;
  phoneNumber: string;
  email: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const userId = user?.id;
  const userRole = user?.publicMetadata?.role;

  const [doctorData, setDoctorData] = useState<DoctorProfile | null>(null);
  const [patientData, setPatientData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !userId) return;

    const fetchUserData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (userRole === "doctor") {
          const res = await axios.get<DoctorProfile>(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/doctors/getById/${userId}`
          );
          setDoctorData(res.data);
        } else if (userRole === "user") {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/getById/${userId}`
          );
          setPatientData(res.data);
        } else {
          setError("Unknown user role");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId, userRole, isLoaded]);

  if (!isLoaded || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      {userRole === "doctor" && doctorData ? (
        <DoctorProfile data={doctorData} />
      ) : userRole === "user" && patientData ? (
        <UserProfile data={patientData} />
      ) : (
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <p className="text-gray-700">No profile data available.</p>
        </div>
      )}
    </div>
  );
}
