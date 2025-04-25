"use client";
import UserSignupPage from "@/src/components/user/userSignup";
import React from "react";

import { userTypeAtom } from "@/src/store/atom";
import { useAtom } from "jotai";

export default function page() {
  const [userType, setUserType] = useAtom(userTypeAtom);

  return <div>{userType === "User" && <UserSignupPage />}</div>;
}
