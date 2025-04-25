"use client";

import { useUser } from "@clerk/nextjs";
import { PropsWithChildren, useEffect, useState } from "react";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

export function StreamVideoProvider({ children }: PropsWithChildren) {
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    // Initialize Stream Video client with your API key
    const apiKey = process.env.NEXT_PUBLIC_GETSTREAM_API_KEY as string;
    if (!apiKey) {
      console.error("Stream API key is not defined");
      return;
    }

    // Create user token - in production, this should come from your backend
    // to securely generate the token server-side
    const userId = user.id;
    const userName = user.firstName || "User";
    const userToken = process.env.NEXT_PUBLIC_GETSTREAM_TOKEN as string;

    // Create and initialize the client
    const streamClient = new StreamVideoClient({
      apiKey,
      user: {
        id: userId,
      },
      token: userToken,
    });

    setClient(streamClient);

    // Cleanup on unmount
    return () => {
      streamClient.disconnectUser();
      setClient(null);
    };
  }, [user]);

  if (!client || !user) return <>{children}</>;

  return <StreamVideo client={client}>{children}</StreamVideo>;
}
