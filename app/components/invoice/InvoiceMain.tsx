"use client";

// RHF
import { useFormContext } from "react-hook-form";

// ShadCn
import { Form } from "@/components/ui/form";

// Components
import SidebarNavigation from "./SidebarNavigation";

// Context
import { useInvoiceContext } from "@/contexts/InvoiceContext";

// Types
import { InvoiceType } from "@/types";

import { useState, useEffect } from "react";
import PaymentVoucherForm from "./PaymentVoucherForm";
import InvoiceForm from "./InvoiceForm";
import InvoiceActions from "./InvoiceActions";

const DOCUMENT_TYPES = [
  "Payment voucher",
  "Purchase order",
  "Quotation",
  "Invoice",
  "Contract",
  "Debit note",
  "Credit Note",
];

const InvoiceMain = () => {
  const { handleSubmit, watch, setValue, reset } =
    useFormContext<InvoiceType>();
  const { onFormSubmit, setInvoiceData } = useInvoiceContext();
  const [selectedType, setSelectedType] = useState(DOCUMENT_TYPES[0]); // Default to Payment voucher
  const [renderKey, setRenderKey] = useState(0); // Add key for forcing re-render

  // Watch form values for live updates
  const formValues = watch();

  // Set initial template when component mounts
  useEffect(() => {
    setValue("details.pdfTemplate", 1); // Set template 1 for Payment voucher
  }, []);

  // Update invoice data when form values change
  useEffect(() => {
    setInvoiceData(formValues);
  }, []);

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    // Set the template based on document type
    const templateNumber = type === "Payment voucher" ? 1 : 2;

    // Reset form data
    reset({
      details: {
        pdfTemplate: templateNumber,
        invoiceNumber: "",
        invoiceDate: "",
      },
      payer: {
        name: "",
        address: "",
        email: "",
      },
      receiver: {
        name: "",
        address: "",
        email: "",
        zipCode: "",
        city: "",
      },
    });

    // Force re-render of InvoiceActions and InvoiceTemplate
    setRenderKey((prev) => prev + 1);
  };

  const renderForm = () => {
    switch (selectedType) {
      case "Payment voucher":
        return <PaymentVoucherForm />;
      case "Invoice":
        return <InvoiceForm />;
      default:
        return <InvoiceForm />;
    }
  };

  return (
    <Form {...useFormContext<InvoiceType>()}>
      <form
        onSubmit={handleSubmit(onFormSubmit, (err) => {
          console.log(err);
        })}
      >
        <div className="flex flex-col lg:flex-row w-full gap-4">
          {/* Sidebar Navigation */}
          <SidebarNavigation
            selectedType={selectedType}
            onTypeSelect={handleTypeSelect}
          />

          {/* Form */}
          <div className="flex flex-row gap-6 w-full mt-4">
            <div className="h-fit w-[55%]">{renderForm()}</div>

            {/* Actions */}
            <div className="h-fit w-[45%]">
              <InvoiceActions key={renderKey} />
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default InvoiceMain;
