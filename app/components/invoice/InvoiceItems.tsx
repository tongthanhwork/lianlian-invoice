"use client";

// RHF
import { useFormContext, useFieldArray } from "react-hook-form";

// ShadCn
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Types
import { InvoiceType } from "@/types";

const InvoiceItems = () => {
    const { control } = useFormContext<InvoiceType>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "details.items",
    });

    return (
        <div className="space-y-4">
            {fields.map((field, index) => (
                <Card key={field.id}>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={control}
                                name={`details.items.${index}.name`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Item Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter item name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name={`details.items.${index}.description`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name={`details.items.${index}.quantity`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quantity</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Enter quantity"
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name={`details.items.${index}.unitPrice`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Unit Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Enter unit price"
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="mt-4 flex justify-end">
                            <Button
                                type="button"
                                variant="destructive"
                                onClick={() => remove(index)}
                            >
                                Remove Item
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
            <Button
                type="button"
                onClick={() =>
                    append({
                        name: "",
                        description: "",
                        quantity: 1,
                        unitPrice: 0,
                        total: 0,
                    })
                }
            >
                Add Item
            </Button>
        </div>
    );
};

export default InvoiceItems; 