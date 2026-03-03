"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useRef } from "react";

function Provider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const called = useRef(false);

  useEffect(() => {
    if (!isLoaded || !user || called.current) return;

    called.current = true;
    createNewUser();
  }, [isLoaded, user]);

  const createNewUser = async () => {
  try {
    await axios.post("/api/user");
  } catch (error: any) {
    // Ignore ALL expected cases
    if ([401, 409, 500].includes(error.response?.status)) {
      return;
    }

    console.error(
      "Create user failed:",
      error.response?.data || error.message
    );
  }
};



  return <>{children}</>;
}

export default Provider;
