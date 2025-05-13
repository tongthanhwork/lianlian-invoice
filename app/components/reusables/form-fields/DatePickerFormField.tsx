"use client";

import { useState } from "react";

// RHF
import { useFormContext } from "react-hook-form";

// ShadCn
import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Utils
import { cn } from "@/lib/utils";

// Variables
import { DATE_OPTIONS } from "@/lib/variables";

// Icons
import { CalendarIcon } from "lucide-react";

// Types
import { NameType } from "@/types";

type DatePickerFormFieldProps = {
  name: NameType;
  label?: string;
};

const DatePickerFormField = ({
  name,
  label = "Select date",
}: DatePickerFormFieldProps) => {
  const { control } = useFormContext();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <div className="flex justify-between gap-5 items-center text-sm w-full">
              <div className="w-full">
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full text-foreground bg-white text-neutral-500 font-normal hover:border-blue-400 hover:bg-white hover:text-neutral-500 flex justify-between flex-row-reverse border-neutral-300 rounded-lg"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          new Date(field.value).toLocaleDateString(
                            "en-US",
                            DATE_OPTIONS
                          )
                        ) : (
                          <span>{label}</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white border-0">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown-buttons"
                      defaultMonth={field.value}
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(e) => {
                        field.onChange(e);
                        setIsPopoverOpen(false);
                      }}
                      disabled={(date) => date < new Date("1900-01-01")}
                      fromYear={1960}
                      toYear={new Date().getFullYear() + 30}
                      initialFocus
                      classNames={{
                        button:
                          "bg-white text-neutral-700 hover:text-neutral-700 hover:border-blue-400",
                        root: "rounded-xl border-0 bg-white hover:border-blue-400 text-neutral-700",
                        caption_label: "hidden",
                        day_selected:
                          "bg-blue-100 text-blue-600 hover:!bg-blue-50 hover:!text-neutral-700",
                        day_today: "",
                        nav_button: "",
                        cell: "bg-white",
                        dropdown_month: "bg-white text-neutral-700",
                        months: "bg-white text-neutral-700",
                        month: "bg-white text-neutral-700",
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </div>
            </div>
          </FormItem>
        )}
      />
    </>
  );
};

export default DatePickerFormField;
