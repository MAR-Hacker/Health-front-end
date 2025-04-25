import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAtom } from "jotai";
import { userTypeAtom } from "@/src/store/atom";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function GetStarted() {
  const [userType, setUserType] = useAtom(userTypeAtom);
  const router = useRouter();

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="bg-teal-600 hover:bg-teal-700 text-white"
          >
            Get Started
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[300px]">
          <DialogHeader>
            <DialogTitle className="text-center">Choose your Role</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col justify-center items-center">
            <div className="space-y-2">
              {/* <Label>Role</Label> */}
              <RadioGroup
                defaultValue="User"
                value={userType}
                onValueChange={(value) => setUserType(value)}
                className="flex gap-4 pt-2"
              >
                <div className="flex  items-center space-x-2">
                  <RadioGroupItem value="User" id="User" />
                  <Label htmlFor="User">User</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Doctor" id="Doctor" />
                  <Label htmlFor="Doctor">Doctor</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <DialogFooter className="mx-auto">
            <Button
              type="submit"
              className="text-xs h-8"
              onClick={() => {
                if (userType === "User") {
                  router.push("/user-signup");
                  console.log("User signup page");
                } else if (userType === "Doctor") {
                  router.push("/doctor-signup");
                  console.log("Doctor signup page");
                }
              }}
            >
              Continue{" "}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
