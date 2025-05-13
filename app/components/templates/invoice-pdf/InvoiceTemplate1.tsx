import React from "react";

// Components
import { InvoiceLayout } from "@/app/components";

// Helpers
import { formatNumberWithCommas, isDataUrl } from "@/lib/helpers";

// Variables
import { DATE_OPTIONS } from "@/lib/variables";

// Types
import { InvoiceType } from "@/types";

const InvoiceTemplate = (data: InvoiceType) => {
  console.log("Call InvoiceTemplate1.tsx");
  console.log("Data at InvoiceTemplate1.tsx", data);
  const { payer, receiver, details } = data;
  // Payment voucher
  return (
    <InvoiceLayout data={data}>
      <div>
        <div>
          {/* Payer Info */}
          <address className="mt-4 not-italic text-gray-800">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{payer.name}</h2>
            </div>
            <div className="text-center">
              {payer.address && <div>{payer.address}</div>}
            </div>
            <h1 className="text-center text-3xl font-bold mb-4">
              Payment Voucher
            </h1>

            {/* To, Address, Voucher No, Date on one row with different alignment */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-4">
              <div className="space-y-2 text-left">
                <div>
                  <span className="font-semibold">To:</span> {receiver.name}
                </div>
                <div>
                  <span className="font-semibold">Address:</span>{" "}
                  {receiver.address}
                </div>
              </div>
              <div className="space-y-2 pl-12">
                <div className="grid grid-cols-2">
                  <span className="font-semibold text-left">Voucher No:</span>
                  <span className="text-right">{details.invoiceNumber}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="font-semibold text-left">Date:</span>
                  <span className="text-right">
                    {new Date(details.invoiceDate).toLocaleDateString(
                      "en-US",
                      DATE_OPTIONS
                    )}
                  </span>
                </div>
              </div>
            </div>
          </address>
        </div>

        <div className="mt-3">
          <div className="border border-gray-200 p-1 rounded-lg space-y-1">
            {/* Table Header */}
            <div className="hidden sm:grid sm:grid-cols-5">
              <div className="sm:col-span-1 text-xs font-medium text-gray-500 uppercase">
                No.
              </div>
              <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">
                Item
              </div>
              <div className="sm:col-span-2 text-right text-xs font-medium text-gray-500 uppercase">
                Amount
              </div>
            </div>

            {/* Item Rows */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-y-1">
              {details.items.map((item, index) => (
                <React.Fragment key={index}>
                  {/* No. */}
                  <div className="sm:col-span-1 border-b border-gray-300">
                    <p className="text-gray-800">{index + 1}</p>
                  </div>

                  {/* Item Name and Description */}
                  <div className="col-span-full sm:col-span-2 border-b border-gray-300">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-600 whitespace-pre-line">
                      {item.description}
                    </p>
                  </div>

                  {/* Amount */}
                  <div className="sm:col-span-2 border-b border-gray-300">
                    <p className="text-right text-gray-800">
                      {item.total} {details.currency}
                    </p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Total Section */}
        <div className="mt-2 flex sm:justify-end">
          <div className="sm:text-right space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 sm:gap-2">
              <dl className="grid sm:grid-cols-5 gap-x-3">
                {/* Discount */}
                {details.discountDetails?.amount &&
                  details.discountDetails.amount > 0 && (
                    <div>
                      <dt className="col-span-3 font-semibold text-gray-800">
                        Discount:
                      </dt>
                      <dd className="col-span-2 text-gray-500">
                        {details.discountDetails.amountType === "amount"
                          ? `- ${details.discountDetails.amount} ${details.currency}`
                          : `- ${details.discountDetails.amount}%`}
                      </dd>
                    </div>
                  )}

                {/* Tax */}
                {details.taxDetails?.amount &&
                  details.taxDetails.amount > 0 && (
                    <div>
                      <dt className="col-span-3 font-semibold text-gray-800">
                        Tax:
                      </dt>
                      <dd className="col-span-2 text-gray-500">
                        {details.taxDetails.amountType === "amount"
                          ? `+ ${details.taxDetails.amount} ${details.currency}`
                          : `+ ${details.taxDetails.amount}%`}
                      </dd>
                    </div>
                  )}

                {/* Shipping */}
                {details.shippingDetails?.cost &&
                  details.shippingDetails.cost > 0 && (
                    <div>
                      <dt className="col-span-3 font-semibold text-gray-800">
                        Shipping:
                      </dt>
                      <dd className="col-span-2 text-gray-500">
                        {details.shippingDetails.costType === "amount"
                          ? `+ ${details.shippingDetails.cost} ${details.currency}`
                          : `+ ${details.shippingDetails.cost}%`}
                      </dd>
                    </div>
                  )}

                {/* Total */}
                <div className="sm:col-span-5 text-right">
                  <dt className="col-span-3 font-semibold text-gray-800">
                    Total:
                  </dt>
                  <dd className="col-span-2 text-gray-500">
                    {formatNumberWithCommas(Number(details.totalAmount))}{" "}
                    {details.currency}
                  </dd>
                </div>

                {/* Total in Words */}
                {details.totalAmountInWords && (
                  <div className="sm:col-span-5 text-right">
                    <dt className="font-semibold text-gray-800 inline">
                      Total in words:
                    </dt>
                    <dd className="text-gray-500 inline ml-2">
                      <em>
                        {details.totalAmountInWords} {details.currency}
                      </em>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </InvoiceLayout>
  );
};

export default InvoiceTemplate;
