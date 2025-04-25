"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Phone, MapPin, Clock, User, Truck } from "lucide-react";
import { useRouter } from "next/navigation";

type Ambulance = {
  id: string;
  vehicleNumber: string;
  hospitalName: string;
  location: string;
  estimatedTime: number;
  driverName: string;
  driverContact: string;
  createdAt: string;
  updatedAt: string;
};

export default function AmbulancePage() {
  const [ambulances, setAmbulances] = useState<Ambulance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch ambulance data on mount
  useEffect(() => {
    const fetchAmbulances = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/ambulance/ambulances`
        );
        setAmbulances(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching ambulances:", err);
        setError("Failed to load ambulance data. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchAmbulances();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 shadow-md rounded-[12px]">
        <h1 className="text-3xl font-bold text-center text-white">
          Available Ambulances
        </h1>
        <p className="text-blue-100 text-center mt-2">
          Find nearby ambulances with estimated arrival times
        </p>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 text-lg">{error}</div>
        ) : ambulances.length === 0 ? (
          <div className="text-center text-gray-600 text-lg">
            No ambulances available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ambulances.map((ambulance) => (
              <div
                key={ambulance.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <h2 className="text-xl font-semibold text-blue-600 mb-2">
                  {ambulance.hospitalName}
                </h2>
                <div className="space-y-2 text-gray-700 text-sm">
                  <div className="flex items-center">
                    <Truck size={16} className="mr-2 text-blue-500" />
                    <span>
                      <strong>Vehicle:</strong> {ambulance.vehicleNumber}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-2 text-blue-500" />
                    <span>
                      <strong>Location:</strong> {ambulance.location}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2 text-blue-500" />
                    <span>
                      <strong>ETA:</strong> {ambulance.estimatedTime} minutes
                    </span>
                  </div>
                  <div className="flex items-center">
                    <User size={16} className="mr-2 text-blue-500" />
                    <span>
                      <strong>Driver:</strong> {ambulance.driverName}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Phone size={16} className="mr-2 text-blue-500" />
                    <span>
                      <strong>Contact:</strong>{" "}
                      <a
                        href={`tel:${ambulance.driverContact}`}
                        className="text-blue-600 hover:underline"
                      >
                        {ambulance.driverContact}
                      </a>
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => router.push(`/home/emergency/${ambulance.id}`)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Contact Ambulance
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
