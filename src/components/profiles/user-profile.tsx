"use client";

import { FC } from "react";
import { MapPin, Phone, Mail, Calendar, Clock } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

interface UserProfileData {
  id: string;
  userId: string;
  name: string;
  age: number;
  gender: string;
  imageUrl?: string;
  phoneNumber: string;
  email: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}

interface UserProfileProps {
  data: UserProfileData;
}

const UserProfile: FC<UserProfileProps> = ({ data }) => {
  const { user } = useUser();
  if (!user) return null;

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-60 relative">
        <div className="container mx-auto px-4">
          <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 md:left-10 md:translate-x-0 flex md:flex-row flex-col items-center md:items-end gap-6">
            <div className="relative">
              {data.imageUrl ? (
                <img
                  src={data.imageUrl}
                  alt={data.name}
                  width={150}
                  height={150}
                  className="rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-[150px] h-[150px] rounded-full bg-blue-200 flex items-center justify-center border-4 border-white shadow-lg">
                  <span className="text-4xl font-bold text-blue-700">
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
                {data.gender}, {data.age} years old
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pt-28 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white border-b pb-2">
              Contact Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="text-blue-600 dark:text-blue-400 w-5 h-5" />
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
                <Phone className="text-blue-600 dark:text-blue-400 w-5 h-5" />
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
                <Mail className="text-blue-600 dark:text-blue-400 w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Email
                  </p>
                  <p className="text-gray-800 dark:text-gray-200">
                    {data.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white border-b pb-2">
              Profile Details
            </h2>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Calendar className="text-blue-600 dark:text-blue-400 w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Account Created
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
              <div className="flex items-center gap-3">
                <Clock className="text-blue-600 dark:text-blue-400 w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Last Updated
                  </p>
                  <p className="text-gray-800 dark:text-gray-200">
                    {new Date(data.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="pt-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  About
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {data.name} is a valued member of our platform, currently
                  residing in {data.location}. This profile was created on{" "}
                  {new Date(data.createdAt).toLocaleDateString()}, and last
                  updated on {new Date(data.updatedAt).toLocaleDateString()}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
