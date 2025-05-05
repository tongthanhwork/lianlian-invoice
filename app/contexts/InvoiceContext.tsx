"use client";

import { createContext, useContext, useState } from 'react';
import { ExportTypes } from "@/types";

interface InvoiceType {
    payer: {
        name: string;
        email: string;
        address: string;
        zipCode: string;
        city: string;
        country: string;
        phone: string;
        customInputs?: { key: string; value: string; }[];
    };
    receiver: {
        name: string;
        address: string;
        zipCode: string;
        city: string;
        country: string;
        email: string;
        phone: string;
        customInputs?: { key: string; value: string; }[];
    };
    details: {
        currency: string;
        invoiceNumber: string;
        invoiceDate: string;
        dueDate: string;
        language: string;
        items: {
            name: string;
            quantity: number;
            unitPrice: number;
            total: number;
            description?: string;
        }[];
        subTotal: number;
        totalAmount: number;
        totalAmountInWords: string;
        paymentTerms: string;
        pdfTemplate: string;
        updatedAt: string;
    };
}

interface InvoiceData {
    payer: {
        name: string;
        email: string;
        address: string;
        zipCode: string;
        city: string;
        country: string;
        phone: string;
        customInputs?: { key: string; value: string; }[];
    };
    receiver: {
        name: string;
        address: string;
        zipCode: string;
        city: string;
        country: string;
        email: string;
        phone: string;
        customInputs?: { key: string; value: string; }[];
    };
    details: {
        currency: string;
        invoiceNumber: string;
        invoiceDate: string;
        dueDate: string;
        language: string;
        items: {
            name: string;
            quantity: number;
            unitPrice: number;
            total: number;
            description?: string;
        }[];
        subTotal: number;
        totalAmount: number;
        totalAmountInWords: string;
        paymentTerms: string;
        pdfTemplate: string;
        updatedAt: string;
    };
}

export interface InvoiceContextType {
    invoicePdf: Blob | null;
    invoicePdfLoading: boolean;
    savedInvoices: InvoiceType[];
    pdfUrl: string | null;
    onFormSubmit: (values: InvoiceType) => void;
    newInvoice: () => void;
    generatePdf: (data: InvoiceType) => Promise<void>;
    removeFinalPdf: () => void;
    downloadPdf: () => void;
    printPdf: () => void;
    previewPdfInTab: () => void;
    saveInvoice: () => void;
    deleteInvoice: (index: number) => void;
    sendPdfToMail: (email: string) => Promise<void>;
    exportInvoiceAs: (exportAs: ExportTypes) => void;
    importInvoice: (file: File) => void;
    invoiceData: InvoiceType | null;
    setInvoiceData: (data: InvoiceType) => void;
    setInvoicePdf: (pdf: Blob | null) => void;
    setInvoicePdfLoading: (loading: boolean) => void;
    setSavedInvoices: (invoices: InvoiceType[]) => void;
    setPdfUrl: (url: string | null) => void;
}

const defaultContext: InvoiceContextType = {
    invoicePdf: null,
    invoicePdfLoading: false,
    savedInvoices: [],
    pdfUrl: null,
    onFormSubmit: () => { },
    newInvoice: () => { },
    generatePdf: async () => { },
    removeFinalPdf: () => { },
    downloadPdf: () => { },
    printPdf: () => { },
    previewPdfInTab: () => { },
    saveInvoice: () => { },
    deleteInvoice: () => { },
    sendPdfToMail: async () => { },
    exportInvoiceAs: () => { },
    importInvoice: () => { },
    invoiceData: null,
    setInvoiceData: () => { },
    setInvoicePdf: () => { },
    setInvoicePdfLoading: () => { },
    setSavedInvoices: () => { },
    setPdfUrl: () => { },
};

export const InvoiceContext = createContext<InvoiceContextType>(defaultContext);

export const InvoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [invoicePdf, setInvoicePdf] = useState<Blob | null>(null);
    const [invoicePdfLoading, setInvoicePdfLoading] = useState(false);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [invoiceData, setInvoiceData] = useState<InvoiceType | null>(null);
    const [savedInvoices, setSavedInvoices] = useState<InvoiceType[]>([]);

    const onFormSubmit = (values: InvoiceType) => {
        setInvoiceData(values);
        // Add your form submission logic here
    };

    const newInvoice = () => {
        // Implementation
    };

    const generatePdf = async (data: InvoiceType) => {
        // Implementation
    };

    const removeFinalPdf = () => {
        // Implementation
    };

    const downloadPdf = () => {
        // Implementation
    };

    const printPdf = () => {
        // Implementation
    };

    const previewPdfInTab = () => {
        // Implementation
    };

    const saveInvoice = () => {
        // Implementation
    };

    const deleteInvoice = (index: number) => {
        // Implementation
    };

    const sendPdfToMail = async (email: string) => {
        // Implementation
    };

    const exportInvoiceAs = (exportAs: ExportTypes) => {
        // Implementation
    };

    const importInvoice = (file: File) => {
        // Implementation
    };

    return (
        <InvoiceContext.Provider
            value={{
                invoicePdf,
                invoicePdfLoading,
                savedInvoices,
                pdfUrl,
                onFormSubmit,
                newInvoice,
                generatePdf,
                removeFinalPdf,
                downloadPdf,
                printPdf,
                previewPdfInTab,
                saveInvoice,
                deleteInvoice,
                sendPdfToMail,
                exportInvoiceAs,
                importInvoice,
                invoiceData,
                setInvoiceData: (data: InvoiceType) => setInvoiceData(data),
                setInvoicePdf,
                setInvoicePdfLoading,
                setSavedInvoices,
                setPdfUrl,
            }}
        >
            {children}
        </InvoiceContext.Provider>
    );
};

export const useInvoiceContext = () => {
    const context = useContext(InvoiceContext);
    if (!context) {
        throw new Error('useInvoiceContext must be used within an InvoiceProvider');
    }
    return context;
}; 