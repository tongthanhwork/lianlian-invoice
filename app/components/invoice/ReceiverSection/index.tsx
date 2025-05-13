import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import { AppSelect } from "../../reusables/form-fields/AppSelect";
import { SectionContainer } from "../SectionContainer";
interface Receiver {
  _id: string;
  name: string;
  emails: string[];
}

interface SelectOption {
  value: string;
  label: string;
  __isNew__?: boolean;
}

interface ReceiverSectionProps {
  receivers: Receiver[];
  receiverEmails: SelectOption[];
  receiverAddresses: SelectOption[];
  selectedReceiver: SelectOption | null;
  selectedReceiverEmail: SelectOption | null;
  selectedReceiverAddress: SelectOption | null;
  setReceivers: (receivers: Receiver[]) => void;
  setReceiverEmails: (emails: SelectOption[]) => void;
  setReceiverAddresses: (addresses: SelectOption[]) => void;
  setSelectedReceiver: (receiver: SelectOption | null) => void;
  setSelectedReceiverEmail: (email: SelectOption | null) => void;
  setSelectedReceiverAddress: (address: SelectOption | null) => void;
}

export const ReceiverSection = ({
  receivers = [],
  receiverEmails = [],
  receiverAddresses = [],
  selectedReceiver = null,
  selectedReceiverEmail = null,
  selectedReceiverAddress = null,
  setReceivers,
  setReceiverEmails,
  setReceiverAddresses,
  setSelectedReceiver,
  setSelectedReceiverEmail,
  setSelectedReceiverAddress,
}: ReceiverSectionProps) => {
  const methods = useFormContext();
  const { setValue } = methods;

  return (
    <SectionContainer title="Receiver Details">
      <div className="flex flex-col space-y-4">
        <AppSelect
          label="Receiver"
          value={selectedReceiver}
          options={receivers.map((receiver: Receiver) => ({
            value: receiver._id,
            label: receiver.name,
          }))}
          placeholder="Select or create receiver"
          onChange={(option: any) => {
            setSelectedReceiver(option);
            if (!option) {
              setValue("receiver.name", "");
            } else if (option?.__isNew__) {
              setValue("receiver.name", option.label);
            } else {
              setValue("receiver.name", option.label);
            }
          }}
          onCreateOption={async (inputValue: string) => {
            try {
              const response = await fetch("/api/receivers", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: inputValue,
                }),
              });

              if (!response.ok) {
                throw new Error("Failed to create receiver");
              }

              const newReceiver = await response.json();
              setReceivers([...receivers, newReceiver]);
              setSelectedReceiver({
                value: newReceiver._id,
                label: newReceiver.name,
              });
              setValue("receiver.name", newReceiver.name);
              return {
                value: newReceiver._id,
                label: newReceiver.name,
              };
            } catch (error) {
              console.error("Error creating receiver:", error);
              return null;
            }
          }}
          isSearchable={true}
          isClearable={true}
        />

        <AppSelect
          label="Receiver Email"
          value={selectedReceiverEmail}
          options={receiverEmails}
          placeholder="Select or create email"
          onChange={(option: any) => {
            setSelectedReceiverEmail(option);
            if (!option) {
              setValue("receiver.email", "");
            } else if (option?.__isNew__) {
              setValue("receiver.email", option.label);
            } else {
              setValue("receiver.email", option.value);
            }
          }}
          onCreateOption={async (inputValue: string) => {
            try {
              const response = await fetch("/api/receiver-emails", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: inputValue,
                }),
              });

              if (!response.ok) {
                throw new Error("Failed to create receiver email");
              }

              const newEmail = await response.json();
              setReceiverEmails([
                ...receiverEmails,
                {
                  value: newEmail.email,
                  label: newEmail.email,
                },
              ]);
              setSelectedReceiverEmail({
                value: newEmail.email,
                label: newEmail.email,
              });
              setValue("receiver.email", newEmail.email);
              return {
                value: newEmail.email,
                label: newEmail.email,
              };
            } catch (error) {
              console.error("Error creating receiver email:", error);
              return null;
            }
          }}
          isSearchable={true}
          isClearable={true}
        />

        <AppSelect
          label="Receiver Address"
          value={selectedReceiverAddress}
          options={receiverAddresses}
          placeholder="Select or create address"
          onChange={(option: any) => {
            setSelectedReceiverAddress(option);
            if (!option) {
              setValue("receiver.address", "");
            } else if (option?.__isNew__) {
              setValue("receiver.address", option.label);
            } else {
              setValue("receiver.address", option.value);
            }
          }}
          onCreateOption={async (inputValue: string) => {
            try {
              const response = await fetch("/api/receiver-addresses", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  address: inputValue,
                }),
              });

              if (!response.ok) {
                throw new Error("Failed to create receiver address");
              }

              const newAddress = await response.json();
              setReceiverAddresses([
                ...receiverAddresses,
                {
                  value: newAddress.address,
                  label: newAddress.address,
                },
              ]);
              setSelectedReceiverAddress({
                value: newAddress.address,
                label: newAddress.address,
              });
              setValue("receiver.address", newAddress.address);
              return {
                value: newAddress.address,
                label: newAddress.address,
              };
            } catch (error) {
              console.error("Error creating receiver address:", error);
              return null;
            }
          }}
          isSearchable={true}
          isClearable={true}
        />
      </div>
    </SectionContainer>
  );
};
