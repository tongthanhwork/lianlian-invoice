import React, { ReactNode } from "react";
import { DatePickerFormField } from "../..";
import { Label } from "@/components/ui/label";
import { FormInput } from "../..";

export const VoucherSection = ({ children }: { children: ReactNode }) => {
  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold tracking-tight text-gray-900">
        Voucher Details
      </h3>
      <div className="flex flex-col space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Voucher Number
          </Label>
          <FormInput
            name="details.invoiceNumber"
            placeholder="Enter voucher number"
            className="bg-white text-gray-900 placeholder:text-gray-900"
          />
        </div>
        {children}
      </div>
    </section>
  );
};
