"use client";
import { useState, useEffect } from "react";
import { Calendar, Clock, Video } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import toast from "react-hot-toast";
import {
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
} from "@stream-io/video-react-sdk";

// Add GetStream related imports
import {
  useStreamVideoClient,
  Call,
  CallRecording,
  CallControls,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

interface Patient {
  id: string;
  userId: string;
  name: string;
  age: number;
  gender: string;
  imageUrl: string;
  phoneNumber: string;
  email: string;
  location: string;
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
  meetingId?: string; // Add meetingId field for video calls
  user: Patient;
  availability: Availability;
}

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCall, setActiveCall] = useState<Call | null>(null);
  const [showMeeting, setShowMeeting] = useState(false);

  const { userId } = useAuth();

  // Initialize GetStream client
  // Note: In a real implementation, you would get these from environment variables
  const apiKey = process.env.NEXT_PUBLIC_GETSTREAM_API_KEY || "your_api_key";
  const token = process.env.NEXT_PUBLIC_GETSTREAM_TOKEN || "your_token";

  const client = useStreamVideoClient();

  // Create a meeting for the appointment
  const createMeeting = async (appointment: Appointment) => {
    try {
      // Check if client is available
      if (!client) {
        toast.error("Video client not initialized");
        return;
      }

      // Create a unique call ID based on the appointment
      const callId = `appointment-${appointment.id}`;

      // Create the call
      const call = client.call("default", callId);

      // Get or create the call
      await call.getOrCreate({
        data: {
          // Custom data for your call
          custom: {
            appointmentId: appointment.id,
            doctorId: appointment.doctorId,
            patientId: appointment.userId,
            patientName: appointment.user.name,
            reason: appointment.reason,
            date: appointment.date,
          },
        },
      });

      // Update the appointment with the meeting ID in your backend
      await axios.patch(
        `https://health-backend-m8l5.onrender.com/accept-appointment/update-status/${appointment.id}`,
        {
          status: "COMPLETED",
          meetingId: callId,
        }
      );

      // Update local state
      setAppointments((prevAppointments) =>
        prevAppointments.map((apt) =>
          apt.id === appointment.id
            ? { ...apt, status: "COMPLETED", meetingId: callId }
            : apt
        )
      );

      toast.success("Appointment accepted and meeting created!");
      return callId;
    } catch (error) {
      console.error("Error creating meeting:", error);
      toast.error("Failed to create meeting room");
      return null;
    }
  };

  const joinMeeting = async (meetingId: string) => {
    console.log("Joining meeting with ID:", meetingId);
    try {
      if (!client) {
        toast.error("Video client not initialized");
        return;
      }

      // Get the call object
      const call = client.call("default", meetingId);

      // Join the call
      await call.join({ create: false });

      // Set the active call
      setActiveCall(call);
      setShowMeeting(true);
    } catch (error) {
      console.error("Error joining meeting:", error);
      toast.error("Failed to join meeting");
    }
  };

  const handlePatchStatus = async (
    appointment: Appointment,
    status: string
  ) => {
    try {
      // If accepting the appointment, create a meeting
      if (status === "COMPLETED") {
        const meetingId = await createMeeting(appointment);
        if (!meetingId) {
          // If meeting creation failed, don't proceed
          return;
        }
      } else {
        // For other status updates like cancellation
        const res = await axios.patch(
          `https://health-backend-m8l5.onrender.com/accept-appointment/update-status/${appointment.id}`,
          {
            status: status,
          }
        );

        if (res.status === 200) {
          setAppointments((prevAppointments) =>
            prevAppointments.map((apt: any) =>
              apt.id === appointment.id ? { ...apt, status: status } : apt
            )
          );

          if (status === "CANCELLED") {
            toast.success("Appointment cancelled successfully!");
          }
        }
      }
    } catch (error) {
      console.error("Error updating appointment status:", error);
      toast.error(
        "Failed to update appointment status. Please try again later."
      );
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://health-backend-m8l5.onrender.com/doctors/get-doctor-appointment/${userId}`
        );

        if (response.status === 200) {
          setAppointments(response.data);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError("Failed to load appointments. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchAppointments();
    }
  }, [userId]);

  // Check if appointment time has arrived
  const isMeetingTimeReached = (appointment: Appointment) => {
    if (!appointment.date || !appointment.availability?.startTime) return false;

    const now = new Date();
    const appointmentDate = new Date(appointment.date);
    const [startHours, startMinutes] = appointment.availability.startTime
      .split(":")
      .map(Number);

    appointmentDate.setHours(startHours, startMinutes);

    // Meeting is available 5 minutes before actual time until the end time
    const meetingAvailableTime = new Date(appointmentDate);
    meetingAvailableTime.setMinutes(meetingAvailableTime.getMinutes() - 5);

    return now >= meetingAvailableTime;
  };

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

  const formatTime = (timeStr: string) => {
    try {
      const time = new Date(timeStr);
      return time.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch (err) {
      return timeStr;
    }
  };

  // If we're showing a meeting, render the video call UI
  if (showMeeting && activeCall) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col">
        <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Appointment Video Call</h2>
          <button
            onClick={() => {
              activeCall.leave();
              setShowMeeting(false);
              setActiveCall(null);
            }}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
          >
            End Call
          </button>
        </div>

        <div className="flex-1 relative">
          <StreamCall call={activeCall}>
            <StreamTheme>
              <SpeakerLayout participantsBarPosition="bottom" />
              <CallControls />
            </StreamTheme>
          </StreamCall>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[12px]">
      <h1 className="text-3xl text-black font-bold mb-8">My Appointments</h1>

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
                  <img
                    src={appointment.user.imageUrl}
                    alt={appointment.user.name}
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://randomuser.me/api/portraits/men/32.jpg";
                    }}
                  />
                  <div>
                    <h3 className="text-lg text-black font-medium">
                      {appointment.user.name}
                    </h3>
                    <p className="text-blue-600">{appointment.reason}</p>
                    <p className="text-sm text-gray-500">
                      {appointment.user.email}
                    </p>
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
                      {formatTime(appointment.availability.startTime)} -{" "}
                      {formatTime(appointment.availability.endTime)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t flex items-center justify-between">
                {appointment.status === "PENDING" && (
                  <div className="flex gap-2">
                    <button
                      className="bg-blue-600 h-9 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm"
                      onClick={() =>
                        handlePatchStatus(appointment, "COMPLETED")
                      }
                    >
                      Accept
                    </button>
                    <button
                      className="border h-9 border-gray-300 hover:bg-gray-100 text-gray-700 py-2 px-4 rounded text-sm"
                      onClick={() =>
                        handlePatchStatus(appointment, "CANCELLED")
                      }
                    >
                      Reject
                    </button>
                  </div>
                )}

                {appointment.status === "COMPLETED" && (
                  <div className="flex items-center justify-between w-full">
                    <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                      Accepted
                    </span>

                    <button
                      onClick={() => joinMeeting(appointment.meetingId!)}
                      className="flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                    >
                      <Video size={16} />
                      <span>Join Call</span>
                    </button>
                  </div>
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
