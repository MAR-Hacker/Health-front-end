"use client";
import DoctorProfile from "@/src/components/profiles/doctor-profile";
import axios from "axios";
import React, { useEffect } from "react";

export interface DoctorProfileData {
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

export default function page({ params }: { params: { id: string } }) {
  const [doctorData, setDoctorData] = React.useState<DoctorProfileData | null>(
    null
  ); // Adjust type as needed
  const handleDoctorById = async () => {
    try {
      const res = await axios.get<DoctorProfileData>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/doctors/getById/${params.id}`
      );
      if (res.status === 200) {
        setDoctorData(res.data);
      }
    } catch (error) {
      console.error("Error fetching doctor data:", error);
    }
  };
  useEffect(() => {
    handleDoctorById();
  }, [params.id]);
  return (
    <div>
      {doctorData && (
        <DoctorProfile data={doctorData} /> // Pass the doctor data to the DoctorProfile component
      )}
    </div>
  );
}
