"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export function AuthInitializer() {
  useEffect(() => {
    // Initialize auth store from localStorage
    useAuthStore.getState().initialize();
  }, []);

  return null;
}
