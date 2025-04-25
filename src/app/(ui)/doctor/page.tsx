"use client";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Doctor = {
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
  // Rating and availability not in API but we'll keep for UI
  rating?: number;
  availability?: string;
};

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "https://health-backend-m8l5.onrender.com/doctors/getAll"
        );

        // Add mock ratings and availability since they're not in the API
        const doctorsWithRatings = response.data.map((doctor: Doctor) => ({
          ...doctor,
          rating: (Math.random() * (5 - 4) + 4).toFixed(1), // Random rating between 4.0-5.0
        }));

        setDoctors(doctorsWithRatings);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError("Failed to load doctors. Please try again.");

        // Fallback to mock data in case the API fails
        const mockDoctors = [
          {
            id: "1",
            userId: "user_1",
            name: "Dr. Sarah Johnson",
            specialization: "Cardiologist",
            experience: 10,
            location: "New York",
            phoneNumber: "555-1234",
            email: "sarah.johnson@example.com",
            imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
            rating: 4.8,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          // Add more mock doctors if needed
        ];
        setDoctors(mockDoctors);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Helper function to generate random availability strings

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty
      ? doctor.specialization === selectedSpecialty
      : true;
    return matchesSearch && matchesSpecialty;
  });

  // Extract unique specialties from all doctors
  const specialties = [
    ...new Set(doctors.map((doctor) => doctor.specialization)),
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl text-black font-bold mb-8">Find Doctors</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute top-3 left-3 text-gray-800" size={20} />
          <input
            type="text"
            placeholder="Search doctors by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
          className="px-4 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Specialties</option>
          {specialties.map((specialty) => (
            <option key={specialty} value={specialty}>
              {specialty}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
          {error}
        </div>
      ) : filteredDoctors.length === 0 ? (
        <div className="bg-gray-50 p-8 text-center rounded-md">
          <p className="text-gray-500">
            No doctors match your search criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
              onClick={() => router.push(`/doctor/${doctor.id}`)}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={doctor.imageUrl}
                    alt={doctor.name}
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://randomuser.me/api/portraits/lego/5.jpg";
                    }}
                  />
                  <div>
                    <h3 className="text-lg text-black font-medium">
                      {doctor.name}
                    </h3>
                    <p className="text-blue-600">{doctor.specialization}</p>
                  </div>
                </div>

                <div className="mb-2">
                  <span className="text-sm text-gray-500">Experience: </span>
                  <span className="text-sm text-black font-medium">
                    {doctor.experience} years
                  </span>
                </div>

                <div className="mb-3">
                  <span className="text-sm text-gray-500">Location: </span>
                  <span className="text-sm text-black">{doctor.location}</span>
                </div>

                <div className="flex items-center mb-3">
                  <div className="flex mr-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(Number(doctor.rating))
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600">{doctor.rating}</span>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-200">
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
