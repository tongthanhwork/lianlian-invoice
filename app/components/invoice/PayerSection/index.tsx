import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import { AppSelect } from "../../reusables/form-fields/AppSelect";

interface Payer {
  _id: string;
  name: string;
  emails: string[];
  addresses: string[];
}

interface SelectOption {
  value: string;
  label: string;
  __isNew__?: boolean;
}

interface PayerSectionProps {
  payers: Payer[];
  payerEmails: SelectOption[];
  payerAddresses: SelectOption[];
  selectedPayer: SelectOption | null;
  selectedPayerEmail: SelectOption | null;
  selectedPayerAddress: SelectOption | null;
  setPayers: (payers: Payer[]) => void;
  setPayerEmails: (emails: SelectOption[]) => void;
  setPayerAddresses: (addresses: SelectOption[]) => void;
  setSelectedPayer: (payer: SelectOption | null) => void;
  setSelectedPayerEmail: (email: SelectOption | null) => void;
  setSelectedPayerAddress: (address: SelectOption | null) => void;
}

export const PayerSection = ({
  payers = [],
  payerEmails = [],
  payerAddresses = [],
  selectedPayer = null,
  selectedPayerEmail = null,
  selectedPayerAddress = null,
  setPayers,
  setPayerEmails,
  setPayerAddresses,
  setSelectedPayer,
  setSelectedPayerEmail,
  setSelectedPayerAddress,
}: PayerSectionProps) => {
  const methods = useFormContext();
  const { setValue } = methods;

  return (
    <section className="space-y-4 border-0 ">
      <h3 className="text-lg font-semibold tracking-tight text-gray-900">
        Payer Details
      </h3>
      <div className="flex flex-col space-y-4 border-l pl-4 border-neutral-400 border-solid">
        <div className="space-y-2">
          <Label className="text-base font-medium text-neutral-700">
            Payer
          </Label>
          <AppSelect
            value={selectedPayer}
            options={payers.map((payer: Payer) => ({
              value: payer._id,
              label: payer.name,
            }))}
            placeholder="Select or create payer"
            onChange={(option: any) => {
              setSelectedPayer(option);
              if (!option) {
                setValue("payer.name", "");
              } else if (option?.__isNew__) {
                setValue("payer.name", option.label);
              } else {
                setValue("payer.name", option.label);
              }
            }}
            onCreateOption={async (inputValue: string) => {
              try {
                const response = await fetch("/api/payers", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    name: inputValue,
                  }),
                });

                if (!response.ok) {
                  throw new Error("Failed to create payer");
                }

                const newPayer = await response.json();
                setPayers([...payers, newPayer]);
                setSelectedPayer({
                  value: newPayer.id,
                  label: newPayer.name,
                });
                setValue("payer.name", newPayer.name);
                return {
                  value: newPayer.id,
                  label: newPayer.name,
                };
              } catch (error) {
                console.error("Error creating payer:", error);
                return null;
              }
            }}
            isSearchable={true}
            isClearable={true}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Payer Email
          </Label>
          <AppSelect
            value={selectedPayerEmail}
            options={payerEmails}
            placeholder="Select or create email"
            onChange={(option: any) => {
              setSelectedPayerEmail(option);
              if (!option) {
                setValue("payer.email", "");
              } else if (option?.__isNew__) {
                setValue("payer.email", option.label);
              } else {
                setValue("payer.email", option.value);
              }
            }}
            onCreateOption={async (inputValue: string) => {
              try {
                const response = await fetch("/api/payer-emails", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    email: inputValue,
                  }),
                });

                if (!response.ok) {
                  throw new Error("Failed to create payer email");
                }

                const newEmail = await response.json();
                setPayerEmails([
                  ...payerEmails,
                  {
                    value: newEmail.email,
                    label: newEmail.email,
                  },
                ]);
                setSelectedPayerEmail({
                  value: newEmail.email,
                  label: newEmail.email,
                });
                setValue("payer.email", newEmail.email);
                return {
                  value: newEmail.email,
                  label: newEmail.email,
                };
              } catch (error) {
                console.error("Error creating payer email:", error);
                return null;
              }
            }}
            className="w-full bg-white text-gray-900"
            classNames={{
              control: () => "border border-gray-200 h-10 px-3 rounded-md",
              input: () => "text-sm",
              menu: () => "bg-white mt-1 border border-gray-200 rounded-md",
              option: () => `text-gray-900 px-3 py-2 hover:bg-gray-100`,
            }}
            isSearchable={true}
            isClearable={true}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Payer Address
          </Label>
          <AppSelect
            value={selectedPayerAddress}
            options={payerAddresses}
            placeholder="Select or create address"
            onChange={(option: any) => {
              setSelectedPayerAddress(option);
              if (!option) {
                setValue("payer.address", "");
              } else if (option?.__isNew__) {
                setValue("payer.address", option.label);
              } else {
                setValue("payer.address", option.value);
              }
            }}
            onCreateOption={async (inputValue: string) => {
              try {
                const response = await fetch("/api/payer-addresses", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    address: inputValue,
                  }),
                });

                if (!response.ok) {
                  throw new Error("Failed to create payer address");
                }

                const newAddress = await response.json();
                setPayerAddresses([
                  ...payerAddresses,
                  {
                    value: newAddress.address,
                    label: newAddress.address,
                  },
                ]);
                setSelectedPayerAddress({
                  value: newAddress.address,
                  label: newAddress.address,
                });
                setValue("payer.address", newAddress.address);
                return {
                  value: newAddress.address,
                  label: newAddress.address,
                };
              } catch (error) {
                console.error("Error creating payer address:", error);
                return null;
              }
            }}
            isSearchable={true}
            isClearable={true}
          />
        </div>
      </div>
    </section>
  );
};
