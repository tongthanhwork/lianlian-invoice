"use client";

// Components
import { DynamicInvoiceTemplate, Subheading } from "@/app/components";

// Types
import { InvoiceType } from "@/types";

type LivePreviewProps = {
  data: InvoiceType;
};

const LivePreview = ({ data }: LivePreviewProps) => {
  // Set the template based on the document type
  const templateNumber = data.details.pdfTemplate || "1";

  return (
    <>
      <div className="mt-3 h-[calc(100vh_-_240px)] overflow-y-scroll border border-solid border-neutral-500  ">
        <DynamicInvoiceTemplate {...data} />
      </div>
    </>
  );
};

export default LivePreview;
