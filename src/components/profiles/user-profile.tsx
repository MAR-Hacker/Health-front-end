"use client";

import Image from "next/image";
import { FC } from "react";

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
  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <div className="flex flex-col items-center">
        {/* <Image
          src={data.imageUrl}
          alt={`${data.name}'s profile`}
          width={150}
          height={150}
          className="rounded-full mb-4"
        /> */}
        <h2 className="text-2xl font-bold text-gray-800">{data.name}</h2>
        <p className="text-gray-600">
          {data.gender}, {data.age} years old
        </p>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-700">
            <span className="font-semibold">Location:</span> {data.location}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Phone:</span> {data.phoneNumber}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Email:</span> {data.email}
          </p>
        </div>
        <div>
          <p className="text-gray-700">
            <span className="font-semibold">Created:</span>{" "}
            {new Date(data.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Last Updated:</span>{" "}
            {new Date(data.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
