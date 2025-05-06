export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export interface InvoiceType {
    payer: {
        name: string;
        address: string;
        email: string;
        zipCode: string;
        city: string;
        country: string;
        phone: string;
        customInputs?: {
            value: string;
            key: string;
        }[];
    };
    receiver: {
        name: string;
        address: string;
        email: string;
        zipCode: string;
        city: string;
        country: string;
        phone: string;
        customInputs?: {
            value: string;
            key: string;
        }[];
    };
    details: {
        currency: string;
        invoiceNumber?: string;
        paymentOrderNumber?: string;
        invoiceDate?: string;
        paymentOrderDate?: string;
        dueDate: string;
        language: string;
        items: {
            name: string;
            description: string;
            quantity: number;
            unitPrice: number;
            total: number;
        }[];
        subTotal: number;
        totalAmount: number;
        totalAmountInWords: string;
        paymentTerms: string;
        pdfTemplate: string;
        updatedAt: string;
        signature?: {
            name: string;
            title: string;
            fontFamily: string;
        };
    };
} 