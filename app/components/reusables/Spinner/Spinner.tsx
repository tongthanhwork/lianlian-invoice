"use client";
import { useEffect, useState } from "react";
import { spinnerService } from "@/services/spinner.service";
import styles from "./styles.module.scss";

export default function Spinner() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = spinnerService.subscribe((loading) => {
      setIsLoading(loading);
    });

    return () => unsubscribe();
  }, []);

  if (!isLoading) return null;

  return (
    <div className={styles.spinnerOverlay}>
      <div className={styles.spinner}></div>
    </div>
  );
}
