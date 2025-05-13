import React from "react";
import { Items } from "../..";
import { useFormContext } from "react-hook-form";

export const ItemTableSection = () => {
  const { watch } = useFormContext();
  return (
    <>
      <section className="space-y-4">
        <Items />
      </section>
      <section className="space-y-4">
        <div className="flex flex-col gap-3 items-end">
          <div className="flex justify-between w-full max-w-xs text-lg bg-neutral-50 p-2 rounded-lg ">
            <span className="font-medium text-base text-gray-700">Total:</span>
            <span className="font-bold text-gray-900">
              {watch("details.subTotal") || 0}
            </span>
          </div>
        </div>
      </section>
    </>
  );
};
