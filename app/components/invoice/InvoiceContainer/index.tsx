import { Badge } from "@/components/ui/badge";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import React from "react";

export const InvoiceContainer = ({
  title,
  invoiceLabel,
  children,
}: {
  title: string;
  invoiceLabel: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="border border-solid border-neutral-200 rounded-lg bg-white">
        <CardHeader className="border-b border-border/40 bg-white">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3">
              <span className="text-2xl font-bold tracking-tight text-gray-800">
                {title}
              </span>
            </CardTitle>
            <Badge
              variant="secondary"
              className="h-8 rounded-md px-3 bg-gray-100"
            >
              <p className="text-sm font-medium text-gray-900">
                {invoiceLabel}
              </p>
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6 bg-white h-[calc(100vh_-_180px)] overflow-y-scroll">
          {children}
        </CardContent>
      </div>
    </div>
  );
};
