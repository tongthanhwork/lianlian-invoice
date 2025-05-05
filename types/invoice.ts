export enum PaymentMethod {
    CASH = 'CASH',
    BANK_TRANSFER = 'BANK_TRANSFER',
    CREDIT_CARD = 'CREDIT_CARD',
    CHECK = 'CHECK'
}

export enum PaymentStatus {
    PENDING = 'PENDING',
    PAID = 'PAID',
    PARTIALLY_PAID = 'PARTIALLY_PAID',
    OVERDUE = 'OVERDUE',
    CANCELLED = 'CANCELLED'
}

export enum DocumentStatus {
    DRAFT = 'DRAFT',
    SENT = 'SENT',
    VIEWED = 'VIEWED',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED'
}

export interface Address {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

export interface Contact {
    name: string;
    email: string;
    phone: string;
    address: Address;
}

export interface LineItem {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    taxRate: number;
    discount?: number;
    total: number;
}

export interface PaymentOrder {
    id: string;
    orderNumber: string;
    date: Date;
    dueDate: Date;
    status: PaymentStatus;
    documentStatus: DocumentStatus;
    customer: Contact;
    items: LineItem[];
    subtotal: number;
    tax: number;
    discount?: number;
    total: number;
    notes?: string;
    termsAndConditions?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Invoice extends PaymentOrder {
    invoiceNumber: string;
    paymentTerms: string;
    paymentMethod?: PaymentMethod;
    paidAmount: number;
    remainingAmount: number;
    paymentHistory: PaymentHistory[];
}

export interface PaymentVoucher {
    id: string;
    voucherNumber: string;
    date: Date;
    status: PaymentStatus;
    documentStatus: DocumentStatus;
    customer: Contact;
    invoiceReference: string;
    paymentMethod: PaymentMethod;
    amount: number;
    referenceNumber?: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface PaymentHistory {
    id: string;
    date: Date;
    amount: number;
    paymentMethod: PaymentMethod;
    referenceNumber?: string;
    notes?: string;
}

export interface InvoiceFilters {
    status?: PaymentStatus;
    documentStatus?: DocumentStatus;
    dateFrom?: Date;
    dateTo?: Date;
    customerName?: string;
    minAmount?: number;
    maxAmount?: number;
}

export interface PaymentVoucherFilters {
    status?: PaymentStatus;
    documentStatus?: DocumentStatus;
    dateFrom?: Date;
    dateTo?: Date;
    customerName?: string;
    paymentMethod?: PaymentMethod;
} 