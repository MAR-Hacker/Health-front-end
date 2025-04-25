"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSendOtp = () => {
    // Add your OTP sending logic here
    setOtpSent(true);
  };

  const handleLogin = () => {
    // Add your login verification logic here
    router.push("/dashboard"); // Redirect after successful login
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col gap-4 border border-gray-200 dark:border-gray-700 p-8 rounded-lg w-full max-w-md mx-4 bg-white dark:bg-gray-800 shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {otpSent
              ? "Enter the OTP sent to your number"
              : "Enter your Phone number to receive OTP"}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Phone Number
            </label>
            <Input
              id="number"
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus-visible:ring-2 focus-visible:ring-primary"
              disabled={otpSent}
            />
          </div>

          {otpSent && (
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                OTP
              </label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
          )}
        </div>

        {!otpSent ? (
          <Button
            variant="default"
            className="w-full mt-2 h-10 rounded-md"
            onClick={handleSendOtp}
            disabled={!email}
          >
            Send OTP
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="w-full h-10 rounded-md"
              onClick={() => setOtpSent(false)}
            >
              Change Email
            </Button>
            <Button
              variant="default"
              className="w-full h-10 rounded-md"
              onClick={handleLogin}
              disabled={otp.length !== 6}
            >
              Login
            </Button>
          </div>
        )}

        <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
          Don't have an account?{" "}
          <button
            onClick={() => router.push("/signup")}
            className="text-primary font-medium hover:underline"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
