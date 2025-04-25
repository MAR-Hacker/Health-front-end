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
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    experience: "",
    location: "",
    phoneNumber: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your signup logic here
    console.log("Doctor form submitted:", formData);
    router.push("/verify-doctor"); // Redirect to verification page
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

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <Button
            type="submit"
            variant="default"
            className="w-full mt-4 h-10 rounded-md"
          >
            Register as Doctor
          </Button>

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
        </form>
      </div>
    </div>
  );
}
