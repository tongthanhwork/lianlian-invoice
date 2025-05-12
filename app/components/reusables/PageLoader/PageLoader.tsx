"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { spinnerService } from "@/services/spinner.service";

export default function PageLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    spinnerService.startSpinner();
    const timer = setTimeout(() => {
      spinnerService.endSpinner();
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <Suspense
      fallback={
        <div>
          <LoadingSpinner />
          {children}
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

function LoadingSpinner() {
  useEffect(() => {
    spinnerService.startSpinner();
    return () => spinnerService.endSpinner();
  }, []);

  return null;
}
