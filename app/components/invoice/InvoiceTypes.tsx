'use client';

import { PaymentMethod, PaymentStatus, DocumentStatus } from '@/types/invoice';

const InvoiceTypes = () => {
    return (
        <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">Invoice System Types</h2>

            {/* Payment Methods */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Payment Methods</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.values(PaymentMethod).map((method) => (
                        <div key={method} className="p-4 bg-gray-50 rounded border">
                            <code className="text-sm font-mono">{method}</code>
                        </div>
                    ))}
                </div>
            </div>

            {/* Payment Statuses */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Payment Statuses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {Object.values(PaymentStatus).map((status) => (
                        <div key={status} className="p-4 bg-gray-50 rounded border">
                            <code className="text-sm font-mono">{status}</code>
                        </div>
                    ))}
                </div>
            </div>

            {/* Document Statuses */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Document Statuses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {Object.values(DocumentStatus).map((status) => (
                        <div key={status} className="p-4 bg-gray-50 rounded border">
                            <code className="text-sm font-mono">{status}</code>
                        </div>
                    ))}
                </div>
            </div>

            {/* Type Definitions */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Type Definitions</h3>
                <div className="space-y-6">
                    {/* Address Type */}
                    <div className="p-4 bg-gray-50 rounded border">
                        <h4 className="font-semibold mb-2">Address</h4>
                        <pre className="text-sm font-mono bg-white p-4 rounded">
                            {`interface Address {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}`}
                        </pre>
                    </div>

                    {/* Contact Type */}
                    <div className="p-4 bg-gray-50 rounded border">
                        <h4 className="font-semibold mb-2">Contact</h4>
                        <pre className="text-sm font-mono bg-white p-4 rounded">
                            {`interface Contact {
    name: string;
    email: string;
    phone: string;
    address: Address;
}`}
                        </pre>
                    </div>

                    {/* LineItem Type */}
                    <div className="p-4 bg-gray-50 rounded border">
                        <h4 className="font-semibold mb-2">LineItem</h4>
                        <pre className="text-sm font-mono bg-white p-4 rounded">
                            {`interface LineItem {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    taxRate: number;
    discount?: number;
    total: number;
}`}
                        </pre>
                    </div>

                    {/* PaymentOrder Type */}
                    <div className="p-4 bg-gray-50 rounded border">
                        <h4 className="font-semibold mb-2">PaymentOrder</h4>
                        <pre className="text-sm font-mono bg-white p-4 rounded">
                            {`interface PaymentOrder {
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
}`}
                        </pre>
                    </div>

                    {/* Invoice Type */}
                    <div className="p-4 bg-gray-50 rounded border">
                        <h4 className="font-semibold mb-2">Invoice</h4>
                        <pre className="text-sm font-mono bg-white p-4 rounded">
                            {`interface Invoice extends PaymentOrder {
    invoiceNumber: string;
    paymentTerms: string;
    paymentMethod?: PaymentMethod;
    paidAmount: number;
    remainingAmount: number;
    paymentHistory: PaymentHistory[];
}`}
                        </pre>
                    </div>

                    {/* PaymentVoucher Type */}
                    <div className="p-4 bg-gray-50 rounded border">
                        <h4 className="font-semibold mb-2">PaymentVoucher</h4>
                        <pre className="text-sm font-mono bg-white p-4 rounded">
                            {`interface PaymentVoucher {
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
}`}
                        </pre>
                    </div>

                    {/* PaymentHistory Type */}
                    <div className="p-4 bg-gray-50 rounded border">
                        <h4 className="font-semibold mb-2">PaymentHistory</h4>
                        <pre className="text-sm font-mono bg-white p-4 rounded">
                            {`interface PaymentHistory {
    id: string;
    date: Date;
    amount: number;
    paymentMethod: PaymentMethod;
    referenceNumber?: string;
    notes?: string;
}`}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceTypes; 