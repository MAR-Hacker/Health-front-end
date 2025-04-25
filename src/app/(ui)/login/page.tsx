"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { signIn, isLoaded } = useSignIn();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!isLoaded) return;

    setIsLoading(true);
    try {
      // Create sign in attempt with email
      await signIn.create({
        identifier: email,
      });

      // Find the email factor
      const emailFactor = signIn.supportedFirstFactors?.find(
        (f) => f.strategy === "email_code"
      );

      // Only proceed if we found a valid email factor
      if (emailFactor?.emailAddressId) {
        // Prepare email verification
        await signIn.prepareFirstFactor({
          strategy: "email_code",
          emailAddressId: emailFactor.emailAddressId,
        });

        setOtpSent(true);
        toast.success("Verification code sent to your email!");
      } else {
        throw new Error("No email verification method available");
      }
    } catch (err: any) {
      console.error("Error sending code:", err);
      toast.error(
        err.errors?.[0]?.message || "Failed to send verification code"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!isLoaded || !otp) return;

    setIsLoading(true);
    try {
      // Attempt verification with the code
      const result = await signIn.attemptFirstFactor({
        strategy: "email_code",
        code: otp,
      });

      if (result.status === "complete") {
        toast.success("Login successful!");
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.error("Error verifying code:", err);
      toast.error(err.errors?.[0]?.message || "Invalid verification code");
    } finally {
      setIsLoading(false);
    }
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
              ? "Enter the verification code sent to your email"
              : "Enter your email to receive a verification code"}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus-visible:ring-2 focus-visible:ring-primary"
              disabled={otpSent || isLoading}
            />
          </div>

          {otpSent && (
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Verification Code
              </label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="focus-visible:ring-2 focus-visible:ring-primary"
                disabled={isLoading}
              />
            </div>
          )}
        </div>

        {!otpSent ? (
          <Button
            variant="default"
            className="w-full mt-2 h-10 rounded-md"
            onClick={handleSendOtp}
            disabled={!email || isLoading}
          >
            {isLoading ? "Sending..." : "Send Verification Code"}
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="w-full h-10 rounded-md"
              onClick={() => {
                setOtpSent(false);
                setOtp("");
              }}
              disabled={isLoading}
            >
              Change Email
            </Button>
            <Button
              variant="default"
              className="w-full h-10 rounded-md"
              onClick={handleVerifyOtp}
              disabled={!otp || isLoading}
            >
              {isLoading ? "Verifying..." : "Login"}
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
