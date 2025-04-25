"use client";
import DoctorProfile from "@/src/components/profiles/doctor-profile";
import UserProfile from "@/src/components/profiles/user-profile";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { User } from "lucide-react";
import React, { useEffect } from "react";

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
  createdAt: string; // or `Date` if you're parsing it
  updatedAt: string; // or `Date` if you're parsing it
}

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const userId = user?.id;

  const userRole = user?.publicMetadata?.role;
  const [doctorData, setDoctorData] = React.useState<DoctorProfile | null>(
    null
  );
  const [patientData, setPatientData] = React.useState<any>(null); // Adjust type as needed

  useEffect(() => {
    const fetchUserData = async () => {
      if (userRole === "doctor") {
        const res = await axios.get<DoctorProfile>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/doctors/getById/${userId}`
        );

        if (res.status === 200) {
          setDoctorData(res.data);
        }
      } else if (userRole === "user") {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}`
        );

        if (res.status === 200) {
          setPatientData(res.data);
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
      {userRole === "doctor" && doctorData ? (
        <DoctorProfile data={doctorData} /> // Pass the doctor data to the component
      ) : (
        <UserProfile data={patientData} /> // Pass the patient
      )}
    </div>
  );
}
