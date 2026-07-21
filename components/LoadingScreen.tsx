"use client";

import { useEffect } from "react";

export default function LoadingScreen() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => {
      document.body.style.overflow = "";
    }, 220);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return null;
}
