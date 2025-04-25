"use client";
import DoctorSignupPage from "@/src/components/doctor/doctorSignup";
import React from "react";

import { userTypeAtom } from "@/src/store/atom";
import { useAtom } from "jotai";

export default function page() {
  const [userType, setUserType] = useAtom(userTypeAtom);

  return <div>{userType === "Doctor" && <DoctorSignupPage />}</div>;
}
