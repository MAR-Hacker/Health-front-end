import "../app/globals.css";
import { Outfit, Inter } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";
import AxiosProvider from "../providers/axios-provider";
// import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";
import JotaiProvider from "../providers/jotai-provider";
import Sidebar from "../components/ui/sidebar";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HealthAI - Next-Generation Healthcare App",
  description:
    "AI-powered healthcare platform combining symptom checking, telemedicine, and real-time health tracking",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <AxiosProvider>
        <html lang="en" suppressHydrationWarning>
          <body className={inter.className}>
            {/* <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            > */}

            <JotaiProvider>
              <div className="flex">
                <div className="w-[20%]">
                  <Sidebar />
                </div>
                <div className="w-full ">{children}</div>
              </div>
            </JotaiProvider>
            <Toaster />
            {/* </ThemeProvider> */}
          </body>
        </html>
      </AxiosProvider>
    </ClerkProvider>
  );
}
