"use client";

// ShadCn
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Components
import { BaseButton, SendPdfToEmailModal, Subheading } from "@/app/components";

// Contexts
import { useInvoiceContext } from "@/contexts/InvoiceContext";

// Icons
import {
  BookmarkIcon,
  DownloadCloudIcon,
  Eye,
  Mail,
  MoveLeft,
  Printer,
} from "lucide-react";

export default function FinalPdf() {
  const {
    pdfUrl,
    removeFinalPdf,
    previewPdfInTab,
    downloadPdf,
    printPdf,
    saveInvoice,
    sendPdfToMail,
  } = useInvoiceContext();

  return (
    <>
      <div className="flex flex-row items-center justify-between mb-2 h-fit">
        <div className="flex items-center ">
          <BaseButton
            variant={"ghost"}
            tooltipLabel="Back to preview"
            size="sm"
            onClick={removeFinalPdf}
            className=" text-neutral-700 flex flex-row items-center gap-2"
          >
            <MoveLeft className="w-5 h-5" />
          </BaseButton>
        </div>
        {/* Buttons */}
        <div className="flex flex-wrap gap-2 my-1">
          <BaseButton
            tooltipLabel="Preview invoice in new tab"
            onClick={previewPdfInTab}
            size="sm"
            variant={"outline"}
          >
            <Eye className="w-5 h-5" />
          </BaseButton>
          <BaseButton
            tooltipLabel="Download invoice PDF"
            onClick={downloadPdf}
            size="sm"
            variant={"outline"}
          >
            <DownloadCloudIcon className="w-5 h-5" />
          </BaseButton>

          <BaseButton
            tooltipLabel="Print invoice"
            onClick={printPdf}
            size="sm"
            variant={"outline"}
          >
            <Printer className="w-5 h-5" />
          </BaseButton>

          <BaseButton
            tooltipLabel="Save invoice in website"
            onClick={saveInvoice}
            size="sm"
            variant={"outline"}
          >
            <BookmarkIcon className="w-5 h-5" />
          </BaseButton>
        </div>
      </div>

      <iframe
        className=" w-full  h-[calc(100vh_-_308px)] overflow-y-scroll"
        src={`${pdfUrl}#toolbar=0`}
      />
    </>
  );
}
