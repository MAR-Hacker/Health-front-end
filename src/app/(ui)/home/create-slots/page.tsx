"use client";

import type React from "react";

import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Calendar, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { TimePickerDemo } from "@/src/components/doctor/time-picker";

export default function CreateAppointmentSlots() {
  const { userId } = useAuth();

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState<string>("09:00");
  const [endTime, setEndTime] = useState<string>("17:00");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Format datetime-local input value to valid ISO string
  const formatToISO = (date: Date | undefined, timeString: string): string => {
    if (!date) return "";

    const [hours, minutes] = timeString.split(":").map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours, minutes, 0, 0);

    return newDate.toISOString();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!startTime || !endTime) {
      setError("Please select both start and end times");
      return;
    }

    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    if (
      endHour < startHour ||
      (endHour === startHour && endMinute <= startMinute)
    ) {
      setError("End time must be after start time");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/doctors/create-avaliability`,
        {
          doctorId: userId,
          startTime: formatToISO(new Date(), startTime),
          endTime: formatToISO(new Date(), endTime),
        }
      );

      if (response.status === 201) {
        toast.success("Appointment slots created successfully!");
      } else {
        setError("Failed to create slots. Please try again.");
        toast.error("Failed to create slots. Please try again.");
      }
    } catch (error) {
      console.error("Error creating slots:", error);
      setError("Error occurred while creating slots. Please try again.");
      toast.error("Error creating slots. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
          <CardTitle className="text-xl font-semibold">
            Create Appointment Slots
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime" className="text-sm font-medium">
                  Start Time
                </Label>
                <TimePickerDemo
                  value={startTime}
                  onChange={setStartTime}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime" className="text-sm font-medium">
                  End Time
                </Label>
                <TimePickerDemo
                  value={endTime}
                  onChange={setEndTime}
                  className="w-full"
                />
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Slots...
                </>
              ) : (
                "Create Appointment Slots"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
