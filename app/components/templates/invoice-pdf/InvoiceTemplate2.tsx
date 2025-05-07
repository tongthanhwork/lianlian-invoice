import React from "react";

// Components
import { InvoiceLayout } from "@/app/components";

// Helpers
import { formatNumberWithCommas, isDataUrl } from "@/lib/helpers";

// Variables
import { DATE_OPTIONS } from "@/lib/variables";

// Types
import { InvoiceType } from "@/types";

const InvoiceTemplate2 = (data: InvoiceType) => {
    console.log("Call InvoiceTemplate1.tsx")
    console.log("Data at InvoiceTemplate1.tsx", data);
    const { payer, receiver, details } = data;
    // Payment voucher
    return (
        <InvoiceLayout data={data}>
            <div>
                <div>
                    <div className="text-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-800">{receiver.name}</h2>
                    </div>
                    <div className="text-center  text-gray-800">
                        {receiver.address && <div>{receiver.address}</div>}
                    </div>
                </div>
                <div className='text-right'>
                    <address className='mt-4 not-italic text-gray-800'>

                        <h1 className="text-center text-3xl font-bold mb-4"> Invoice</h1>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-4">
                            <div className="space-y-2 text-left">
                                <div>
                                    <span className="font-semibold">To:</span> {payer.name}
                                </div>
                                <div>
                                    <span className="font-semibold">Address:</span> {payer.address}
                                </div>
                            </div>
                            <div className="space-y-2 pl-12">
                                <div className="grid grid-cols-2">
                                    <span className="font-semibold text-left">Voucher No:</span>
                                    <span className="text-right">{details.invoiceNumber}</span>
                                </div>
                                <div className="grid grid-cols-2">
                                    <span className="font-semibold text-left">Date:</span>
                                    <span className="text-right">{new Date(details.invoiceDate).toLocaleDateString("en-US", DATE_OPTIONS)}</span>
                                </div>
                                <div className="grid grid-cols-2">
                                    <span className="font-semibold text-left">Due Date:</span>
                                    <span className="text-right">{new Date(details.dueDate).toLocaleDateString("en-US", DATE_OPTIONS)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-4">
                            <div className="space-y-2 text-left">
                                <div>
                                    <span className="font-semibold">Account holder name:</span> {receiver.name}
                                </div>
                                <div>
                                    <span className="font-semibold">LianLian Account ID/email:</span> {receiver.address}
                                </div>
                            </div>
                        </div>
                    </address>
                </div>
            </div>
            <div className='mt-3'>
                <div className='border border-gray-200 p-1 rounded-lg space-y-1'>
                    <div className='hidden sm:grid sm:grid-cols-5'>
                        <div className='sm:col-span-1 text-xs font-medium text-gray-500 uppercase'>No.</div>
                        <div className='sm:col-span-2 text-xs font-medium text-gray-500 uppercase'>Item</div>
                        <div className='sm:col-span-2 text-right text-xs font-medium text-gray-500 uppercase'>Amount</div>
                    </div>
                    <div className='hidden sm:block border-b border-gray-200'></div>
                    <div className='grid grid-cols-3 sm:grid-cols-5 gap-y-1'>
                        {details.items.map((item, index) => (
                            <React.Fragment key={index}>
                                <div className='sm:col-span-1 border-b border-gray-300'>
                                    <p className='text-gray-800'>{index + 1}</p>
                                </div>
                                <div className='col-span-full sm:col-span-2 border-b border-gray-300'>
                                    <p className='font-medium text-gray-800'>{item.name}</p>
                                    <p className='text-xs text-gray-600 whitespace-pre-line'>{item.description}</p>
                                </div>
                                <div className='sm:col-span-2 border-b border-gray-300'>
                                    <p className='text-right text-gray-800'>
                                        {item.total} {details.currency}
                                    </p>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                    <div className='sm:hidden border-b border-gray-200'></div>
                </div>
            </div>

            <div className='mt-2 flex sm:justify-end'>
                <div className='sm:text-right space-y-2'>
                    <div className='grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2'>
                        <dl className='grid sm:grid-cols-5 gap-x-3'>


                        </dl>
                        {details.discountDetails?.amount != undefined &&
                            details.discountDetails?.amount > 0 && (
                                <dl className='grid sm:grid-cols-5 gap-x-3'>
                                    <dt className='col-span-3 font-semibold text-gray-800'>Discount:</dt>
                                    <dd className='col-span-2 text-gray-500'>
                                        {details.discountDetails.amountType === "amount"
                                            ? `- ${details.discountDetails.amount} ${details.currency}`
                                            : `- ${details.discountDetails.amount}%`}
                                    </dd>
                                </dl>
                            )}
                        {details.taxDetails?.amount != undefined && details.taxDetails?.amount > 0 && (
                            <dl className='grid sm:grid-cols-5 gap-x-3'>
                                <dt className='col-span-3 font-semibold text-gray-800'>Tax:</dt>
                                <dd className='col-span-2 text-gray-500'>
                                    {details.taxDetails.amountType === "amount"
                                        ? `+ ${details.taxDetails.amount} ${details.currency}`
                                        : `+ ${details.taxDetails.amount}%`}
                                </dd>
                            </dl>
                        )}
                        {details.shippingDetails?.cost != undefined && details.shippingDetails?.cost > 0 && (
                            <dl className='grid sm:grid-cols-5 gap-x-3'>
                                <dt className='col-span-3 font-semibold text-gray-800'>Shipping:</dt>
                                <dd className='col-span-2 text-gray-500'>
                                    {details.shippingDetails.costType === "amount"
                                        ? `+ ${details.shippingDetails.cost} ${details.currency}`
                                        : `+ ${details.shippingDetails.cost}%`}
                                </dd>
                            </dl>
                        )}
                        <dl className='grid sm:grid-cols-5 gap-x-3'>
                            <dt className='col-span-3 font-semibold text-gray-800'>Total:</dt>
                            <dd className='col-span-2 text-gray-500'>
                                {formatNumberWithCommas(Number(details.totalAmount))} {details.currency}
                            </dd>
                        </dl>
                        {details.totalAmountInWords && (
                            <dl className='grid sm:grid-cols-5 gap-x-3'>
                                <dt className='col-span-3 font-semibold text-gray-800'>Total in words:</dt>
                                <dd className='col-span-2 text-gray-500'>
                                    <em>
                                        {details.totalAmountInWords} {details.currency}
                                    </em>
                                </dd>
                            </dl>
                        )}
                    </div>
                </div>
            </div>


        </InvoiceLayout>
    );
};

export default InvoiceTemplate2;
