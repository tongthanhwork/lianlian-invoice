"use client";

import { useMemo, useEffect, useState } from "react";
import SelectReact from 'react-select';
// RHF
import { useFormContext, useWatch } from "react-hook-form";
import CreatableSelect from 'react-select/creatable';

// ShadCn
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Components
import {
    FormInput,
    DatePickerFormField,
    Items,
} from "@/app/components";

// Contexts
import { useTranslationContext } from "@/contexts/TranslationContext";
import { useInvoiceContext } from "@/contexts/InvoiceContext";



interface Payer {
    id: string;
    name: string;
    emails: string[];
    addresses: string[];
}

interface Receiver {
    id: string;
    name: string;
    emails: string[];
}

interface SelectOption {
    value: string;
    label: string;
    __isNew__?: boolean;
}

const InvoiceForm = () => {
    const { _t } = useTranslationContext();
    const { control, setValue, watch, getValues } = useFormContext();
    const context = useInvoiceContext();
    const { setInvoiceData } = context;
    const [payers, setPayers] = useState<Payer[]>([]);
    const [payerEmails, setPayerEmails] = useState<SelectOption[]>([]);
    const [payerAddresses, setPayerAddresses] = useState<SelectOption[]>([]);
    const [receivers, setReceivers] = useState<Receiver[]>([]);

    const [receiverEmails, setReceiverEmails] = useState<SelectOption[]>([]);
    const [receiverAddresses, setReceiverAddresses] = useState<SelectOption[]>([]);
    const [selectedPayer, setSelectedPayer] = useState<SelectOption | null>(null);
    const [selectedReceiver, setSelectedReceiver] = useState<SelectOption | null>(null);
    const [selectedPayerEmail, setSelectedPayerEmail] = useState<SelectOption | null>(null);
    const [selectedReceiverEmail, setSelectedReceiverEmail] = useState<SelectOption | null>(null);
    const [selectedPayerAddress, setSelectedPayerAddress] = useState<SelectOption | null>(null);
    const [selectedReceiverAddress, setSelectedReceiverAddress] = useState<SelectOption | null>(null);
    const [selectedInvoiceNumber, setSelectedInvoiceNumber] = useState<SelectOption | null>(null);

    // Fetch all data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [payersResponse, receiversResponse, payerEmailsResponse, payerAddressesResponse, receiverEmailsResponse, receiverAddressesResponse] = await Promise.all([
                    fetch('/api/payers'),
                    fetch('/api/receivers'),
                    fetch('/api/payer-emails'),
                    fetch('/api/payer-addresses'),
                    fetch('/api/receiver-emails'),
                    fetch('/api/receiver-addresses')
                ]);

                if (payersResponse.ok) {
                    const payersData = await payersResponse.json();
                    setPayers(payersData);
                }

                if (receiversResponse.ok) {
                    const receiversData = await receiversResponse.json();
                    setReceivers(receiversData);
                }

                if (payerEmailsResponse.ok) {
                    const emails = await payerEmailsResponse.json();
                    setPayerEmails(emails.map((email: any) => ({
                        value: email.email,
                        label: email.email
                    })));
                }

                if (payerAddressesResponse.ok) {
                    const addresses = await payerAddressesResponse.json();
                    setPayerAddresses(addresses.map((address: any) => ({
                        value: address.address,
                        label: address.address
                    })));
                }

                if (receiverEmailsResponse.ok) {
                    const emails = await receiverEmailsResponse.json();
                    setReceiverEmails(emails.map((email: any) => ({
                        value: email.email,
                        label: email.email
                    })));
                }

                if (receiverAddressesResponse.ok) {
                    const addresses = await receiverAddressesResponse.json();
                    setReceiverAddresses(addresses.map((address: any) => ({
                        value: address.address,
                        label: address.address
                    })));
                }

                // Initialize select states from form values
                const formValues = getValues();

                // Initialize payer select
                if (formValues.payer?.name) {
                    const payer = payers.find((p: Payer) => p.name === formValues.payer.name);
                    if (payer) {
                        setSelectedPayer({
                            value: payer.id,
                            label: payer.name
                        });
                    }
                }

                // Initialize payer email select
                if (formValues.payer?.email) {
                    setSelectedPayerEmail({
                        value: formValues.payer.email,
                        label: formValues.payer.email
                    });
                }

                // Initialize payer address select
                if (formValues.payer?.address) {
                    setSelectedPayerAddress({
                        value: formValues.payer.address,
                        label: formValues.payer.address
                    });
                }

                // Initialize receiver select
                if (formValues.receiver?.name) {
                    const receiver = receivers.find((r: Receiver) => r.name === formValues.receiver.name);
                    if (receiver) {
                        setSelectedReceiver({
                            value: receiver.id,
                            label: receiver.name
                        });
                    }
                }

                // Initialize receiver email select
                if (formValues.receiver?.email) {
                    setSelectedReceiverEmail({
                        value: formValues.receiver.email,
                        label: formValues.receiver.email
                    });
                }

                // Initialize receiver address select
                if (formValues.receiver?.address) {
                    setSelectedReceiverAddress({
                        value: formValues.receiver.address,
                        label: formValues.receiver.address
                    });
                }

                // Initialize invoice number select
                if (formValues.details?.invoiceNumber) {
                    setSelectedInvoiceNumber({
                        value: formValues.details.invoiceNumber,
                        label: formValues.details.invoiceNumber
                    });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [getValues]);

    // Get invoice number variable
    const invoiceNumber = useWatch({
        name: "details.invoiceNumber",
        control,
    });

    // Watch all form fields for changes

    // Update invoice data whenever form values change
    useEffect(() => {
        const currentValues = getValues();
        setInvoiceData({
            payer: {
                name: currentValues.payer?.name || '',
                email: currentValues.payer?.email || '',
                address: currentValues.payer?.address || '',
            },
            receiver: {
                name: currentValues.receiver?.name || '',
                address: currentValues.receiver?.address || '',
                zipCode: currentValues.receiver?.zipCode || '',
                city: currentValues.receiver?.city || '',
                country: currentValues.receiver?.country || '',
                email: currentValues.receiver?.email || '',
                phone: currentValues.receiver?.phone || '',
                customInputs: currentValues.receiver?.customInputs || []
            },
            details: {
                currency: currentValues.details?.currency || '',
                invoiceNumber: currentValues.details?.invoiceNumber || '',
                invoiceDate: currentValues.details?.invoiceDate || '',
                dueDate: currentValues.details?.dueDate || '',
                language: currentValues.details?.language || '',
                items: currentValues.details?.items || [],
                subTotal: currentValues.details?.subTotal || 0,
                totalAmount: currentValues.details?.totalAmount || 0,
                totalAmountInWords: currentValues.details?.totalAmountInWords || '',
                paymentTerms: currentValues.details?.paymentTerms || '',
                pdfTemplate: currentValues.details?.pdfTemplate || '1',
                updatedAt: currentValues.details?.updatedAt || ''
            }
        });
    }, [getValues, setInvoiceData]);

    // Auto-fill payer details when selected
    const handlePayerChange = (payerId: string) => {
        const selectedPayer = payers.find(p => p.id === payerId);
        if (selectedPayer) {
            setSelectedPayer({
                value: selectedPayer.id,
                label: selectedPayer.name
            });
            setValue("payer.name", selectedPayer.name);

        }
    };

    // Auto-fill receiver details when selected
    const handleReceiverChange = (receiverId: string) => {
        const selectedReceiver = receivers.find(r => r.id === receiverId);
        if (selectedReceiver) {
            setSelectedReceiver({
                value: selectedReceiver.id,
                label: selectedReceiver.name
            });
            setValue("receiver.name", selectedReceiver.name);
            setValue("receiver.email", selectedReceiver.emails[0] || "");
        }
    };

    // Get payer addresses for the selected payer




    const invoiceLabel = useMemo(() => {
        if (invoiceNumber) {
            return `#${invoiceNumber}`;
        } else {
            return "New Invoice";
        }
    }, [invoiceNumber]);

    return (
        <div className="max-w-[1200px] mx-auto">
            <Card className="border-border/40 shadow-sm bg-white">
                <CardHeader className="border-b border-border/40 bg-white">
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-3">
                            <span className="text-xl font-semibold tracking-tight text-gray-900">Payment Voucher</span>
                        </CardTitle>
                        <Badge variant="secondary" className="h-8 rounded-md px-3 bg-gray-100">
                            <p className="text-sm font-medium text-gray-900">{invoiceLabel}</p>
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-6 bg-white">
                    <div className="space-y-8">
                        {/* Payer Details */}
                        <section className="space-y-4">
                            <h3 className="text-lg font-semibold tracking-tight text-gray-900">Payer Details</h3>
                            <div className="flex flex-col space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700">Payer</Label>
                                    <CreatableSelect
                                        value={selectedPayer}
                                        options={payers.map((payer: Payer) => ({
                                            value: payer.id,
                                            label: payer.name
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
                                                const response = await fetch('/api/payers', {
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                    },
                                                    body: JSON.stringify({
                                                        name: inputValue
                                                    })
                                                });

                                                if (!response.ok) {
                                                    throw new Error('Failed to create payer');
                                                }

                                                const newPayer = await response.json();
                                                setPayers([...payers, newPayer]);
                                                setSelectedPayer({
                                                    value: newPayer.id,
                                                    label: newPayer.name
                                                });
                                                setValue("payer.name", newPayer.name);
                                                return {
                                                    value: newPayer.id,
                                                    label: newPayer.name
                                                };
                                            } catch (error) {
                                                console.error('Error creating payer:', error);
                                                return null;
                                            }
                                        }}
                                        className="w-full bg-white text-gray-900"
                                        classNames={{
                                            control: () => "border border-gray-200 h-10 px-3 rounded-md",
                                            input: () => "text-sm",
                                            menu: () => "bg-white mt-1 border border-gray-200 rounded-md",
                                            option: () => "text-gray-900 px-3 py-2 hover:bg-gray-100"
                                        }}
                                        isSearchable={true}
                                        isClearable={true}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700">Payer Email</Label>
                                    <CreatableSelect
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
                                                const response = await fetch('/api/payer-emails', {
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                    },
                                                    body: JSON.stringify({
                                                        email: inputValue
                                                    })
                                                });

                                                if (!response.ok) {
                                                    throw new Error('Failed to create payer email');
                                                }

                                                const newEmail = await response.json();
                                                setPayerEmails([...payerEmails, {
                                                    value: newEmail.email,
                                                    label: newEmail.email
                                                }]);
                                                setSelectedPayerEmail({
                                                    value: newEmail.email,
                                                    label: newEmail.email
                                                });
                                                setValue("payer.email", newEmail.email);
                                                return {
                                                    value: newEmail.email,
                                                    label: newEmail.email
                                                };
                                            } catch (error) {
                                                console.error('Error creating payer email:', error);
                                                return null;
                                            }
                                        }}
                                        className="w-full bg-white text-gray-900"
                                        classNames={{
                                            control: () => "border border-gray-200 h-10 px-3 rounded-md",
                                            input: () => "text-sm",
                                            menu: () => "bg-white mt-1 border border-gray-200 rounded-md",
                                            option: () => "text-gray-900 px-3 py-2 hover:bg-gray-100"
                                        }}
                                        isSearchable={true}
                                        isClearable={true}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700">Payer Address</Label>
                                    <CreatableSelect
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
                                                const response = await fetch('/api/payer-addresses', {
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                    },
                                                    body: JSON.stringify({
                                                        address: inputValue
                                                    })
                                                });

                                                if (!response.ok) {
                                                    throw new Error('Failed to create payer address');
                                                }

                                                const newAddress = await response.json();
                                                setPayerAddresses([...payerAddresses, {
                                                    value: newAddress.address,
                                                    label: newAddress.address
                                                }]);
                                                setSelectedPayerAddress({
                                                    value: newAddress.address,
                                                    label: newAddress.address
                                                });
                                                setValue("payer.address", newAddress.address);
                                                return {
                                                    value: newAddress.address,
                                                    label: newAddress.address
                                                };
                                            } catch (error) {
                                                console.error('Error creating payer address:', error);
                                                return null;
                                            }
                                        }}
                                        className="w-full bg-white text-gray-900"
                                        classNames={{
                                            control: () => "border border-gray-200 h-10 px-3 rounded-md",
                                            input: () => "text-sm",
                                            menu: () => "bg-white mt-1 border border-gray-200 rounded-md",
                                            option: () => "text-gray-900 px-3 py-2 hover:bg-gray-100"
                                        }}
                                        isSearchable={true}
                                        isClearable={true}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Receiver Details */}
                        <section className="space-y-4">
                            <h3 className="text-lg font-semibold tracking-tight text-gray-900">Receiver Details</h3>
                            <div className="flex flex-col space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700">Receiver</Label>
                                    <CreatableSelect
                                        value={selectedReceiver}
                                        options={receivers.map((receiver: Receiver) => ({
                                            value: receiver.id,
                                            label: receiver.name
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
                                                const response = await fetch('/api/receivers', {
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                    },
                                                    body: JSON.stringify({
                                                        name: inputValue
                                                    })
                                                });

                                                if (!response.ok) {
                                                    throw new Error('Failed to create receiver');
                                                }

                                                const newReceiver = await response.json();
                                                setReceivers([...receivers, newReceiver]);
                                                setSelectedReceiver({
                                                    value: newReceiver.id,
                                                    label: newReceiver.name
                                                });
                                                setValue("receiver.name", newReceiver.name);
                                                return {
                                                    value: newReceiver.id,
                                                    label: newReceiver.name
                                                };
                                            } catch (error) {
                                                console.error('Error creating receiver:', error);
                                                return null;
                                            }
                                        }}
                                        className="w-full bg-white text-gray-900"
                                        classNames={{
                                            control: () => "border border-gray-200 h-10 px-3 rounded-md",
                                            input: () => "text-sm",
                                            menu: () => "bg-white mt-1 border border-gray-200 rounded-md",
                                            option: () => "text-gray-900 px-3 py-2 hover:bg-gray-100"
                                        }}
                                        isSearchable={true}
                                        isClearable={true}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700">Receiver Email</Label>
                                    <CreatableSelect
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
                                                const response = await fetch('/api/receiver-emails', {
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                    },
                                                    body: JSON.stringify({
                                                        email: inputValue
                                                    })
                                                });

                                                if (!response.ok) {
                                                    throw new Error('Failed to create receiver email');
                                                }

                                                const newEmail = await response.json();
                                                setReceiverEmails([...receiverEmails, {
                                                    value: newEmail.email,
                                                    label: newEmail.email
                                                }]);
                                                setSelectedReceiverEmail({
                                                    value: newEmail.email,
                                                    label: newEmail.email
                                                });
                                                setValue("receiver.email", newEmail.email);
                                                return {
                                                    value: newEmail.email,
                                                    label: newEmail.email
                                                };
                                            } catch (error) {
                                                console.error('Error creating receiver email:', error);
                                                return null;
                                            }
                                        }}
                                        className="w-full bg-white text-gray-900"
                                        classNames={{
                                            control: () => "border border-gray-200 h-10 px-3 rounded-md",
                                            input: () => "text-sm",
                                            menu: () => "bg-white mt-1 border border-gray-200 rounded-md",
                                            option: () => "text-gray-900 px-3 py-2 hover:bg-gray-100"
                                        }}
                                        isSearchable={true}
                                        isClearable={true}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700">Receiver Address</Label>
                                    <CreatableSelect
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
                                                const response = await fetch('/api/receiver-addresses', {
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                    },
                                                    body: JSON.stringify({
                                                        address: inputValue
                                                    })
                                                });

                                                if (!response.ok) {
                                                    throw new Error('Failed to create receiver address');
                                                }

                                                const newAddress = await response.json();
                                                setReceiverAddresses([...receiverAddresses, {
                                                    value: newAddress.address,
                                                    label: newAddress.address
                                                }]);
                                                setSelectedReceiverAddress({
                                                    value: newAddress.address,
                                                    label: newAddress.address
                                                });
                                                setValue("receiver.address", newAddress.address);
                                                return {
                                                    value: newAddress.address,
                                                    label: newAddress.address
                                                };
                                            } catch (error) {
                                                console.error('Error creating receiver address:', error);
                                                return null;
                                            }
                                        }}
                                        className="w-full bg-white text-gray-900"
                                        classNames={{
                                            control: () => "border border-gray-200 h-10 px-3 rounded-md",
                                            input: () => "text-sm",
                                            menu: () => "bg-white mt-1 border border-gray-200 rounded-md",
                                            option: () => "text-gray-900 px-3 py-2 hover:bg-gray-100"
                                        }}
                                        isSearchable={true}
                                        isClearable={true}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Voucher Details */}
                        <section className="space-y-4">
                            <h3 className="text-lg font-semibold tracking-tight text-gray-900">Voucher Details</h3>
                            <div className="flex flex-col space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700">Voucher Number</Label>
                                    <FormInput
                                        name="details.invoiceNumber"
                                        placeholder="Enter voucher number"
                                        className="bg-white text-gray-900 placeholder:text-gray-900"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700">Date</Label>
                                    <div className="bg-white text-gray-900">
                                        <DatePickerFormField
                                            name="details.invoiceDate"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Items Table */}
                        <section className="space-y-4">
                            <h3 className="text-lg font-semibold tracking-tight text-gray-900">Expense Item</h3>
                            <Items />
                        </section>

                        {/* Totals */}
                        <section className="space-y-4">
                            <div className="flex flex-col gap-3 items-end">
                                <div className="flex justify-between w-full max-w-xs text-lg border-t border-gray-200 pt-2">
                                    <span className="font-semibold text-gray-900">Total:</span>
                                    <span className="font-bold text-gray-900">{(watch("details.subTotal") || 0) * 1.1}</span>
                                </div>
                            </div>
                        </section>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default InvoiceForm;
