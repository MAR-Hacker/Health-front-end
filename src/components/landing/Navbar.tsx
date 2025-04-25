import React from "react";
import { Button } from "@/components/ui/button";
import { SignOutButton, useClerk } from "@clerk/clerk-react";

export default function Navbar() {
  //   const { signOut } = useClerk();
  return (
    <div className="flex h-15">
      <Button
        className="bg-blue-500 text-white hover:bg-blue-700 font-bold py-2 px-4 rounded"
        // onClick={() => {
        //   signOut();
        // }}
      >
        Logout
      </Button>
    </div>
  );
}
