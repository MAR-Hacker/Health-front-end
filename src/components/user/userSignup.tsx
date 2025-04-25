"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSignUp } from "@clerk/clerk-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function UserSignupPage() {
  const { signUp, isLoaded } = useSignUp();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    age: 0,
    gender: "",
    phoneNumber: "",
    email: "",
    location: "",
  });
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!formData.phoneNumber.trim()) {
      toast.error("Phone number is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!isLoaded || !validateForm()) return;

    setIsLoading(true);
    try {
      await signUp.create({
        emailAddress: formData.email,
      });

      // Prepare phone verification
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setShowOtp(true);
      toast.success("OTP sent to your email");
    } catch (err: any) {
      console.error("Signup error:", err);
      toast.error(
        err.errors?.[0]?.message || "Signup failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!otp || !isLoaded) return;

    setIsLoading(true);
    try {
      // Verify phone number
      const verification = await signUp.attemptEmailAddressVerification({
        code: otp,
      });

      if (verification.status === "complete") {
        // Create user in your backend
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/create`,
          {
            userId: verification.createdUserId,
            ...formData,
            age: parseInt(formData.age.toString(), 10),
          }
        );

        if (res.status === 201) {
          toast.success("Account created successfully!");
          router.push("/dashboard"); // Redirect after successful signup
        }
      }
    } catch (err: any) {
      console.error("Verification error:", err);
      toast.error(
        err.errors?.[0]?.message || "Verification failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-[96vh] bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col gap-4 border border-gray-200 dark:border-gray-700 p-8 rounded-lg w-full max-w-md mx-4 bg-white dark:bg-gray-800 shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Enter your details to get started
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                placeholder="32"
                value={formData.age}
                onChange={handleChange}
                min="18"
                max="100"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup
                value={formData.gender}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, gender: value }))
                }
                className="flex gap-4 pt-2"
                required
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="+1234567890"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              type="text"
              placeholder="New York, NY"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          {showOtp && (
            <div className="space-y-2">
              <Label htmlFor="otp">OTP</Label>
              <Input
                id="otp"
                name="otp"
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
          )}

          {!showOtp ? (
            <Button
              type="button"
              variant="default"
              className="w-full mt-4 h-10 rounded-md"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Create Account"}
            </Button>
          ) : (
            <Button
              type="button"
              variant="default"
              className="w-full mt-4 h-10 rounded-md"
              onClick={handleVerify}
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify"}
            </Button>
          )}

          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-primary font-medium hover:underline"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
