"use client";
import { useUser } from "@clerk/nextjs";
import UserAppointments from "../../../../components/appointments/UserAppointments";
import DoctorAppointments from "@/src/components/appointments/DoctorAppointments";

export default function AppointmentsPage() {
  const { user } = useUser();
  const userRole = user?.publicMetadata?.role;

  if (userRole === "doctor") {
    return <DoctorAppointments />;
  } else if (userRole === "user") {
    return <UserAppointments />;
  }
}
