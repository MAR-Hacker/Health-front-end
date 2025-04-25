import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect, useState } from "react";

interface AvailabilitySlot {
  id: string;
  doctorId: string;
  startTime: string;
  endTime: string;
  createdAt: string;
}

interface BookingRequest {
  userId: string; // Will need to be obtained from user context/auth
  doctorId: string;
  availabilityId: string;
  date: string;
  reason: string;
}

export default function DoctorAvailabilityDialog({
  doctorId,
}: {
  doctorId: string;
}) {
  const [availableSlots, setAvailableSlots] = useState<AvailabilitySlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(
    null
  );
  const [appointmentReason, setAppointmentReason] = useState("General checkup");
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const { userId } = useAuth();

  const fetchDoctorSlots = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/doctors/get-doctor-avaliability/${doctorId}`
      );

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      setAvailableSlots(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching doctor slots:", error);
      setError("Failed to load doctor availability");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorSlots();
  }, [doctorId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Calculate duration in hours and minutes
  const getDuration = (start: string, end: string) => {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    const durationMs = endTime - startTime;

    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

    return hours > 0
      ? `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`
      : `${minutes}m`;
  };

  const handleBookAppointment = async () => {
    if (!selectedSlot) return;

    setIsBooking(true);

    try {
      if (!userId) return; // Ensure userId is available
      // Create booking request based on the provided format
      const bookingRequest: BookingRequest = {
        userId: userId,
        doctorId: doctorId,
        availabilityId: selectedSlot.id,
        date: selectedSlot.startTime, // Using the slot's startTime as the appointment date
        reason: appointmentReason,
      };

      // Make API call with the proper request body
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/book-appointment/book`,
        bookingRequest
      );

      setBookingSuccess(true);
      // Refetch available slots after booking
      fetchDoctorSlots();
    } catch (error) {
      console.error("Error booking appointment:", error);
      setError("Failed to book appointment. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

  const resetBookingState = () => {
    setSelectedSlot(null);
    setAppointmentReason("General checkup");
    setBookingSuccess(false);
    setError("");
  };

  // Sort slots chronologically
  const sortedSlots = [...availableSlots].sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );

  return (
    <AlertDialog onOpenChange={resetBookingState}>
      <AlertDialogTrigger className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
        View Availability
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Doctor Availability</AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="text-red-500 py-4">{error}</div>
            ) : bookingSuccess ? (
              <div className="bg-green-50 p-4 rounded-md text-green-700 border border-green-200 my-4">
                Appointment booked successfully!
              </div>
            ) : sortedSlots.length === 0 ? (
              <div className="py-4">
                No available slots found for this doctor.
              </div>
            ) : (
              <div className="mt-2 space-y-4">
                <p>Select an available time slot:</p>
                <div className="grid gap-3 mt-2 max-h-64 overflow-y-auto pr-2">
                  {sortedSlots.map((slot) => (
                    <div
                      key={slot.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedSlot?.id === slot.id
                          ? "bg-blue-50 border-blue-300 ring-2 ring-blue-300"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedSlot(slot)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="font-medium">
                          {formatDate(slot.startTime)}
                        </div>
                        <div className="text-sm bg-blue-100 px-2 py-1 rounded text-blue-700">
                          {getDuration(slot.startTime, slot.endTime)}
                        </div>
                      </div>
                      <div className="text-gray-600 mt-1">
                        {formatTime(slot.startTime)} -{" "}
                        {formatTime(slot.endTime)}
                      </div>
                    </div>
                  ))}
                </div>

                {selectedSlot && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Reason for visit
                    </label>
                    <input
                      type="text"
                      value={appointmentReason}
                      onChange={(e) => setAppointmentReason(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter reason for appointment"
                    />
                  </div>
                )}
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex space-x-2">
          <AlertDialogCancel className="mt-0">Cancel</AlertDialogCancel>
          {!bookingSuccess && !isLoading && sortedSlots.length > 0 && (
            <AlertDialogAction
              onClick={handleBookAppointment}
              disabled={!selectedSlot || isBooking}
              className={`${
                !selectedSlot ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isBooking ? (
                <span className="flex items-center">
                  <span className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></span>
                  Booking...
                </span>
              ) : (
                "Book Appointment"
              )}
            </AlertDialogAction>
          )}
          {bookingSuccess && <AlertDialogAction>Done</AlertDialogAction>}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
