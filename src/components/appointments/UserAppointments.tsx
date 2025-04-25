"use client";
import { useState, useEffect } from "react";
import { Calendar, Clock, Video, Phone } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

interface User {
  id: string;
  userId: string;
  name: string;
  age: number;
  gender: string;
  imageUrl: string;
  phoneNumber: string;
  email: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}

interface Availability {
  id: string;
  doctorId: string;
  startTime: string;
  endTime: string;
  createdAt: string;
}

interface Appointment {
  id: string;
  date: string;
  reason: string;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  userId: string;
  doctorId: string;
  availabilityId: string;
  createdAt: string;
  user: User; // Ensure user is included
  availability: Availability;
  type?: string; // Added because it's used in the UI
}

export default function UserAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { userId } = useAuth();

  useEffect(() => {
    const fetchAppointmentsOfUser = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const id = userId;
        const response = await axios.get(
          `https://health-backend-m8l5.onrender.com/users/get-user-appointment/${id}`
        );

        setAppointments(response.data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to load appointments. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointmentsOfUser();
  }, [userId]);

  const upcomingAppointments = appointments.filter(
    (app) => app.status === "PENDING"
  );
  const pastAppointments = appointments.filter((app) =>
    ["COMPLETED", "CANCELLED"].includes(app.status)
  );

  const displayedAppointments =
    activeTab === "upcoming" ? upcomingAppointments : pastAppointments;

  const formatDate = (dateStr: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      return new Date(dateStr).toLocaleDateString("en-US", options);
    } catch (err) {
      return dateStr;
    }
  };

  return (
    <div className="rounded-[12px]">
      <h1 className="text-3xl text-black font-bold mb-8">Your Appointments</h1>

      <div className="flex border-b mb-6">
        <button
          className={`py-2 px-4 mr-4 font-medium ${
            activeTab === "upcoming"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={`py-2 px-4 mr-4 font-medium ${
            activeTab === "past"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("past")}
        >
          Past
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
          <p>{error}</p>
        </div>
      ) : displayedAppointments.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500 text-lg">
            No {activeTab} appointments found.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  {/* Check if user exists and name is defined */}
                  <img
                    src={appointment.user?.imageUrl}
                    alt={appointment.user?.name || "User Image"}
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://randomuser.me/api/portraits/men/32.jpg";
                    }}
                  />
                  <div>
                    <h3 className="text-lg text-black font-medium">
                      {appointment.user?.name || "Unknown User"}
                    </h3>
                    <p className="text-blue-600">{appointment.reason}</p>
                  </div>
                </div>

                <div className="flex flex-col md:items-end">
                  <div className="flex items-center mb-2">
                    <Calendar size={18} className="mr-2 text-gray-500" />
                    <span className="text-black">
                      {formatDate(appointment.date)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={18} className="mr-2 text-gray-500" />
                    <span className="text-black">
                      {formatDate(appointment.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t flex items-center justify-between">
                <div className="flex items-center">
                  {appointment.type === "video" ? (
                    <Video size={18} className="mr-2 text-green-600" />
                  ) : (
                    <Phone size={18} className="mr-2 text-blue-600" />
                  )}
                  <span className="capitalize text-black">
                    {appointment.type || "In-person"} consultation
                  </span>
                </div>

                {appointment.status === "PENDING" && (
                  <div className="flex gap-2">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm">
                      Join Call
                    </button>
                    <button className="border border-gray-300 hover:bg-gray-100 text-gray-700 py-2 px-4 rounded text-sm">
                      Reschedule
                    </button>
                  </div>
                )}

                {appointment.status === "COMPLETED" && (
                  <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    Completed
                  </span>
                )}

                {appointment.status === "CANCELLED" && (
                  <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-800">
                    Cancelled
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
