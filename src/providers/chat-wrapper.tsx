// "use client";

// import { usePathname } from "next/navigation";
// import { ChatProvider } from "~/components/chat/chat-provider";
// import { ReactNode } from "react";

// export function ChatProviderWrapper({ children }: { children: ReactNode }) {
//   const pathname = usePathname();

//   // Define routes that need ChatProvider
//   const chatRoutes = ["/chat", "/my-network", "/meetings", "/profile"];
//   const needsChatProvider = chatRoutes.some((route) =>
//     pathname?.startsWith(route),
//   );

//   return needsChatProvider ? <ChatProvider>{children}</ChatProvider> : children;
// }
