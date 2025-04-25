"use client";

import Image from "next/image";
import { use, type FC } from "react";
import { MapPin, Phone, Mail, Calendar, Award, Clock } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import AlertDialogDemo from "../doctor/doctor-slots";

interface DoctorProfileData {
  id: string;
  userId: string;
  name: string;
  specialization: string;
  experience: number;
  location: string;
  phoneNumber: string;
  email: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface DoctorProfileProps {
  data: DoctorProfileData;
}

const DoctorProfile: FC<DoctorProfileProps> = ({ data }) => {
  const { user } = useUser();
  if (!user) return null;
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-700 h-60 relative">
        <div className="container mx-auto px-4">
          <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 md:left-10 md:translate-x-0 flex md:flex-row flex-col items-center md:items-end gap-6">
            <div className="relative">
              {data.imageUrl ? (
                <img
                  src={data.imageUrl || "/placeholder.svg"}
                  alt={data.name}
                  width={150}
                  height={150}
                  className="rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-[150px] h-[150px] rounded-full bg-teal-200 flex items-center justify-center border-4 border-white shadow-lg">
                  <span className="text-4xl font-bold text-teal-700">
                    {data.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <div className="text-center md:text-left pb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {data.name}
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                {data.specialization}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-28 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Contact Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white border-b pb-2">
              Contact Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="text-teal-600 dark:text-teal-400 w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Location
                  </p>
                  <p className="text-gray-800 dark:text-gray-200">
                    {data.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-teal-600 dark:text-teal-400 w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Phone
                  </p>
                  <p className="text-gray-800 dark:text-gray-200">
                    {data.phoneNumber}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-teal-600 dark:text-teal-400 w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Email
                  </p>
                  <p className="text-gray-800 dark:text-gray-200">
                    {data.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="text-teal-600 dark:text-teal-400 w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Member Since
                  </p>
                  <p className="text-gray-800 dark:text-gray-200">
                    {new Date(data.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Professional Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white border-b pb-2">
              Professional Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="text-teal-600 dark:text-teal-400 w-5 h-5" />
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Experience
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 pl-8">
                  {data.experience} years of professional experience
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="text-teal-600 dark:text-teal-400 w-5 h-5" />
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Last Updated
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 pl-8">
                  {new Date(data.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                About
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Dr. {data.name} is a highly skilled {data.specialization} with{" "}
                {data.experience} years of experience. Based in {data.location},
                they provide exceptional care and are committed to the highest
                standards of medical practice.
              </p>
            </div>
            {user.id !== data.userId && (
              <div className="mt-8">
                <AlertDialogDemo doctorId={data.userId} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
