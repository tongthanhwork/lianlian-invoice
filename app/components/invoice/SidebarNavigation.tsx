"use client";

import {
  FileText,
  FileSpreadsheet,
  FileCheck,
  Receipt,
  ScrollText,
  FileWarning,
  FileMinus,
} from "lucide-react";

// ShadCn
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

// Components
import { BaseButton } from "@/app/components";

type DocumentType = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  enabled: boolean;
};

const DOCUMENT_TYPES: DocumentType[] = [
  {
    id: "payment-voucher",
    label: "Payment voucher",
    icon: FileSpreadsheet,
    enabled: true,
  },
  {
    id: "purchase-order",
    label: "Purchase order",
    icon: FileText,
    enabled: false,
  },
  {
    id: "quotation",
    label: "Quotation",
    icon: FileCheck,
    enabled: false,
  },
  {
    id: "invoice",
    label: "Invoice",
    icon: Receipt,
    enabled: true,
  },
  {
    id: "contract",
    label: "Contract",
    icon: ScrollText,
    enabled: false,
  },
  {
    id: "debit-note",
    label: "Debit note",
    icon: FileWarning,
    enabled: false,
  },
  {
    id: "credit-note",
    label: "Credit Note",
    icon: FileMinus,
    enabled: false,
  },
];

type SidebarNavigationProps = {
  selectedType: string;
  onTypeSelect: (type: string) => void;
  disabled?: boolean;
};

const SidebarNavigation = ({
  selectedType,
  onTypeSelect,
  disabled,
}: SidebarNavigationProps) => {
  return (
    <div className="h-full sticky top-0 bg-white">
      <div className="flex flex-col gap-2 p-4">
        {DOCUMENT_TYPES.map((docType) => {
          const isSelected = docType.label === selectedType;
          const Icon = docType.icon;

          return (
            <BaseButton
              key={docType.id}
              variant="outline"
              onClick={() => docType.enabled && onTypeSelect(docType.label)}
              disabled={disabled || !docType.enabled}
              className={`flex items-center justify-start border-0 gap-2 px-4 py-2 rounded-none rounded-r-lg  transition-all duration-200 cursor-pointer
                                ${
                                  isSelected
                                    ? "border-l-2 !border-blue-400 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-600"
                                    : "bg-white  text-gray-700 hover:bg-gray-100 hover:text-gray-700"
                                }
                                ${
                                  !docType.enabled
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                                }
                            `}
            >
              <Icon className={`w-5 h-5 `} />
              <span className={`text-sm font-medium `}>{docType.label}</span>
            </BaseButton>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarNavigation;
