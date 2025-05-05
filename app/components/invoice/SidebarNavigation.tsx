"use client";

import { FileText, FileSpreadsheet, FileCheck, Receipt, ScrollText, FileWarning, FileMinus } from "lucide-react";

// ShadCn
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

// Components
import { BaseButton } from "@/app/components";

type DocumentType = {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
};

const DOCUMENT_TYPES: DocumentType[] = [
    {
        id: "payment-voucher",
        label: "Payment voucher",
        icon: FileSpreadsheet
    },
    {
        id: "purchase-order",
        label: "Purchase order",
        icon: FileText
    },
    {
        id: "quotation",
        label: "Quotation",
        icon: FileCheck
    },
    {
        id: "invoice",
        label: "Invoice",
        icon: Receipt
    },
    {
        id: "contract",
        label: "Contract",
        icon: ScrollText
    },
    {
        id: "debit-note",
        label: "Debit note",
        icon: FileWarning
    },
    {
        id: "credit-note",
        label: "Credit Note",
        icon: FileMinus
    }
];

type SidebarNavigationProps = {
    selectedType: string;
    onTypeSelect: (type: string) => void;
    disabled?: boolean;
};

const SidebarNavigation = ({ selectedType, onTypeSelect, disabled }: SidebarNavigationProps) => {
    return (
        <Card className="h-full sticky top-0 bg-white">
            <CardHeader className="pb-4 bg-white border-b border-gray-200">
                <CardTitle className="text-gray-900">Document Type</CardTitle>
            </CardHeader>
            <div className="flex flex-col gap-2 p-4">
                {DOCUMENT_TYPES.map((docType) => {
                    const isSelected = docType.label === selectedType;
                    const Icon = docType.icon;

                    return (
                        <BaseButton
                            key={docType.id}
                            variant={isSelected ? "default" : "outline"}
                            onClick={() => onTypeSelect(docType.label)}
                            disabled={disabled}
                        >
                            <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-gray-500'}`} />
                            <span className="text-sm">{docType.label}</span>
                        </BaseButton>
                    );
                })}
            </div>
        </Card>
    );
};

export default SidebarNavigation; 