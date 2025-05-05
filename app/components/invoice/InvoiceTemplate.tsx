import React from 'react';
import { InvoiceType } from '@/types';

interface InvoiceTemplateProps {
    data: InvoiceType;
}

const InvoiceTemplate: React.FC<InvoiceTemplateProps> = ({ data }) => {
    return (
        <div className="p-8 bg-white">
            <div className="mb-8">
                <h1 className="text-2xl font-bold">Invoice</h1>
                <p className="text-gray-600">#{data.details.invoiceNumber}</p>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                    <h2 className="font-semibold mb-2">From</h2>
                    <p>{data.sender.name}</p>
                    <p>{data.sender.address}</p>
                    <p>{data.sender.email}</p>
                </div>
                <div>
                    <h2 className="font-semibold mb-2">To</h2>
                    <p>{data.receiver.name}</p>
                    <p>{data.receiver.address}</p>
                    <p>{data.receiver.email}</p>
                </div>
            </div>

            <div className="mb-8">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-2">Item</th>
                            <th className="text-right py-2">Quantity</th>
                            <th className="text-right py-2">Price</th>
                            <th className="text-right py-2">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.details.items.map((item, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-2">{item.name}</td>
                                <td className="text-right">{item.quantity}</td>
                                <td className="text-right">{item.unitPrice}</td>
                                <td className="text-right">{item.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="text-right">
                <p className="mb-2">Subtotal: {data.details.subTotal}</p>
                <p className="font-bold">Total: {data.details.totalAmount}</p>
                <p className="text-sm text-gray-600">{data.details.totalAmountInWords}</p>
            </div>
        </div>
    );
};

export default InvoiceTemplate; 