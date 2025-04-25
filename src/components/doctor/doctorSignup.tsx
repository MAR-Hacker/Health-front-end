"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSignUp } from "@clerk/clerk-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const specializations = [
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Pediatrician",
  "Orthopedic Surgeon",
  "General Practitioner",
  "Psychiatrist",
  "Oncologist",
];

export default function DoctorSignupPage() {
  const { signUp, isLoaded } = useSignUp();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    experience: "",
    location: "",
    phoneNumber: "",
    email: "",
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
    if (!formData.specialization) {
      toast.error("Specialization is required");
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
        firstName: formData.name.split(" ")[0],
        lastName: formData.name.split(" ")[1] || "",
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setShowOtp(true);
      toast.success("Verification code sent to your email");
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
      const verification = await signUp.attemptEmailAddressVerification({
        code: otp,
      });

      if (verification.status === "complete") {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/doctors/create`,
          {
            userId: verification.createdUserId,
            ...formData,
            experience: parseInt(formData.experience, 10),
          }
        );

        if (res.status === 201) {
          toast.success("Doctor account created successfully!");
          router.push("/doctor-dashboard");
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
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col gap-4 border border-gray-200 dark:border-gray-700 p-8 rounded-lg w-full max-w-md mx-4 bg-white dark:bg-gray-800 shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Doctor Registration
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Register your medical practice
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Dr. John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialization">Specialization</Label>
            <Select
              value={formData.specialization}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, specialization: value }))
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your specialization" />
              </SelectTrigger>
              <SelectContent>
                {specializations.map((spec) => (
                  <SelectItem key={spec} value={spec}>
                    {spec}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="experience">Experience (years)</Label>
              <Input
                id="experience"
                name="experience"
                type="number"
                placeholder="5"
                value={formData.experience}
                onChange={handleChange}
                min="0"
                max="50"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                type="text"
                placeholder="New York"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Professional Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="doctor@example.com"
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
              placeholder="+1-234-567-8901"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          {showOtp && (
            <div className="space-y-2">
              <Label htmlFor="otp">Verification Code</Label>
              <Input
                id="otp"
                name="otp"
                type="text"
                placeholder="Enter verification code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
          )}

          <div className="space-y-2 pt-2">
            <Label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                required
              />
              <span>I certify that I'm a licensed medical professional</span>
            </Label>
          </div>

          {!showOtp ? (
            <Button
              type="button"
              variant="default"
              className="w-full mt-4 h-10 rounded-md"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Register as Doctor"}
            </Button>
          ) : (
            <Button
              type="button"
              variant="default"
              className="w-full mt-4 h-10 rounded-md"
              onClick={handleVerify}
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify Account"}
            </Button>
          )}

          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            Already registered?{" "}
            <button
              type="button"
              onClick={() => router.push("/doctor-login")}
              className="text-primary font-medium hover:underline"
            >
              Doctor Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
