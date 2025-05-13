import React from "react";
import { Items } from "../..";
import { useFormContext } from "react-hook-form";

export const ItemTableSection = () => {
  const { watch } = useFormContext();
  return (
    <>
      <section className="space-y-4">
        <h3 className="text-lg font-semibold tracking-tight text-gray-900">
          Expense Item
        </h3>
        <Items />
      </section>
      <section className="space-y-4">
        <div className="flex flex-col gap-3 items-end">
          <div className="flex justify-between w-full max-w-xs text-lg border-t border-gray-200 pt-2">
            <span className="font-semibold text-gray-900">Total:</span>
            <span className="font-bold text-gray-900">
              {watch("details.subTotal") || 0}
            </span>
          </div>
        </div>
      </section>
    </>
  );
};
