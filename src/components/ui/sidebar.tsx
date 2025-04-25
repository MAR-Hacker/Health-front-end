"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  UserRound,
  Calendar,
  MessageSquare,
  Ambulance,
  Menu,
  X,
  LogOut,
  Home,
  PlusCircle,
} from "lucide-react";
import { useState } from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { signOut } = useClerk();
  const { user } = useUser(); // Get user data from Clerk
  const router = useRouter();

  // Determine user role from public metadata
  const userRole = user?.publicMetadata?.role || "user";

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    signOut(() => {
      router.push("/login");
    });
  };

  // Navigation items based on role
  const navItems =
    userRole === "doctor"
      ? [
          { href: "/home", label: "Home", icon: <Home size={20} /> },
          {
            href: "/home/my-slots",
            label: "My Slots",
            icon: <Calendar size={20} />,
          },
          {
            href: "/home/create-slots",
            label: "Create Slots",
            icon: <PlusCircle size={20} />,
          },
        ]
      : [
          { href: "/home", label: "Home", icon: <Home size={20} /> },
          {
            href: "/doctors",
            label: "Find Doctors",
            icon: <UserRound size={20} />,
          },
          {
            href: "/home/ai-chat",
            label: "AI Chat",
            icon: <MessageSquare size={20} />,
          },
          {
            href: "/home/emergency",
            label: "Emergency Service",
            icon: <Ambulance size={20} />,
          },
        ];

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-600 text-white md:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:w-64 w-3/4
          flex flex-col
        `}
      >
        <div className="p-5 border-b flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-600">Health App</h1>
          <Link href="/profile/user">
            <div className="relative cursor-pointer group">
              <img
                src={
                  user?.imageUrl ||
                  "https://randomuser.me/api/portraits/men/44.jpg"
                }
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-transparent group-hover:border-blue-500 transition-all"
              />
              <div className="absolute inset-0 rounded-full bg-blue-600 opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </div>
          </Link>
        </div>

        <nav className="p-4 flex-grow">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 p-3 rounded-md transition-colors
                    ${
                      pathname === item.href
                        ? "bg-blue-100 text-blue-600"
                        : "hover:bg-gray-100 text-black"
                    }
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout button at the bottom */}
        <div className="p-4 border-t mt-auto">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 p-3 rounded-md w-full hover:bg-red-50 text-red-600 transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
