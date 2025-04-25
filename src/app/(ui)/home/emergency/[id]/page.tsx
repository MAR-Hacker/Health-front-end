"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

interface Booking {
  status: "BOOKED" | "FREE" | "EXPIRED";
  bookingTime: string;
  expiresAt: string;
}

interface AmbulanceData {
  id: string;
  vehicleNumber: string;
  hospitalName: string;
  location: string;
  estimatedTime: number;
  driverName: string;
  driverContact: string;
  createdAt: string;
  updatedAt: string;
  bookings: Booking[];
}

export default function AmbulanceDetails() {
  const { id } = useParams();
  const [data, setData] = useState<AmbulanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useAuth();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/ambulance/ambulance/${id}`
      );
      if (response.status !== 200) throw new Error("Failed to fetch data");

      setData(response.data);
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleBook = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/ambulance/ambulance/${userId}/${id}`
      );
      if (response.status !== 200) throw new Error();

      toast.success("Ambulance booked successfully!");
      fetchData(); // Refetch updated data
    } catch (err) {
      toast.error("Ambulance is already booked!");
      setError("Error booking ambulance");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error || "No data found"}
      </div>
    );
  }

  const latestBooking = [...(data.bookings || [])].sort(
    (a, b) =>
      new Date(b.bookingTime).getTime() - new Date(a.bookingTime).getTime()
  )[0];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Ambulance Details
        </h1>
        <div className="space-y-3">
          <p className="text-gray-600">
            <span className="font-semibold">Vehicle Number:</span>{" "}
            {data.vehicleNumber}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Hospital:</span> {data.hospitalName}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Location:</span> {data.location}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Estimated Time:</span>{" "}
            {data.estimatedTime} minutes
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Driver Name:</span>{" "}
            {data.driverName}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Driver Contact:</span>{" "}
            {data.driverContact}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Created At:</span>{" "}
            {new Date(data.createdAt).toLocaleString()}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Updated At:</span>{" "}
            {new Date(data.updatedAt).toLocaleString()}
          </p>
          {latestBooking && (
            <p className="text-gray-600">
              <span className="font-semibold">Current Status:</span>{" "}
              {latestBooking.status}
            </p>
          )}
        </div>
        <button
          onClick={handleBook}
          className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Book Ambulance
        </button>
      </div>
    </div>
  );
}
