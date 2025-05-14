import { Label } from "@/components/ui/label";
import React from "react";
import CreatableSelect, { CreatableProps } from "react-select/creatable";

export const AppSelect = ({
  label,
  ...props
}: CreatableProps<any, any, any> & { label: string }) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-neutral-700">{label}</Label>
      <CreatableSelect
        {...props}
        className="w-full bg-white text-gray-900"
        classNames={{
          control: () =>
            "border border-gray-200 hover:!border-blue-400 !shadow-none h-10 px-0 !rounded-lg !outline-0",
          input: () => "text-sm",
          menu: () => "bg-white px-2 py-0 !rounded-lg !shadow-md",
          option: ({ isSelected, isFocused }) =>
            `text-gray-900 hover:text-gray-900 px-3 py-2 hover:bg-gray-100 rounded-lg hover:cursor-pointer my-2 ${
              isSelected
                ? "!bg-blue-100 !text-blue-600 hover:text-blue-600 hover:bg-blue-100"
                : "bg-white"
            } ${isFocused ? "!bg-blue-50" : ""}`,
          placeholder: () => "text-sm",
        }}
      />
    </div>
  );
};
