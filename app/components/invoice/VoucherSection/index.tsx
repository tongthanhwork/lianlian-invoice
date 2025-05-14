import React, { ReactNode } from "react";
import { DatePickerFormField } from "../..";
import { Label } from "@/components/ui/label";
import FormInput from "../../reusables/form-fields/FormInput/FormInput";
import { SectionContainer } from "../SectionContainer";
import { cn } from "@/lib/utils";

export const VoucherSection = ({
  children,
  className,
  numberTitle,
}: {
  children: ReactNode;
  className?: string;
  numberTitle?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-4", className)}>
      <div className="space-y-2">
        <FormInput
          name="details.invoiceNumber"
          placeholder="Enter voucher number"
          label={numberTitle}
        />
      </div>
      {children}
    </div>
  );
};
