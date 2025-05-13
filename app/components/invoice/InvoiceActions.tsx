"use client";

// ShadCn
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Components
import {
  PdfViewer,
  BaseButton,
  NewInvoiceAlert,
  InvoiceLoaderModal,
  InvoiceExportModal,
} from "@/app/components";

// Contexts
import { useInvoiceContext } from "@/contexts/InvoiceContext";
import { useTranslationContext } from "@/contexts/TranslationContext";

// Icons
import { FileInput, FolderUp, Import, Plus } from "lucide-react";

const InvoiceActions = () => {
  const { invoicePdfLoading, invoiceData } = useInvoiceContext();
  const { _t } = useTranslationContext();

  return (
    <div className="h-full sticky top-0 bg-white border border-solid border-neutral-200 rounded-lg">
      <CardHeader className="pb-4 bg-white border-b border-gray-200">
        <CardTitle className="text-gray-900">{_t("actions.title")}</CardTitle>
        <CardDescription className="text-gray-600">
          {invoiceData?.details?.invoiceNumber
            ? `Invoice #${invoiceData.details.invoiceNumber}`
            : _t("actions.description")}
        </CardDescription>
        {/* Generate pdf button */}
        <BaseButton
          type="submit"
          tooltipLabel="Generate your invoice"
          loading={invoicePdfLoading}
          loadingText="Generating your invoice"
        >
          <FileInput />
          {_t("actions.generatePdf")}
        </BaseButton>
      </CardHeader>

      <div className="flex flex-col items-center gap-4 p-4 bg-white h-[calc(100vh_-_236px)] overflow-y-scroll">
        <div className="w-full">
          {/* Live preview and Final pdf */}
          <PdfViewer />
        </div>
      </div>
    </div>
  );
};

export default InvoiceActions;
