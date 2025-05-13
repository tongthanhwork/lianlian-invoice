"use client";

import { useEffect } from "react";

// RHF
import { FieldArrayWithId, useFormContext, useWatch } from "react-hook-form";

// DnD
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// ShadCn
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Components
import { BaseButton, FormInput, FormTextarea } from "@/app/components";

// Contexts
import { useTranslationContext } from "@/contexts/TranslationContext";

// Icons
import { ChevronDown, ChevronUp, GripVertical, Trash2 } from "lucide-react";

// Types
import { ItemType, NameType } from "@/types";

type SingleItemProps = {
  name: NameType;
  index: number;
  fields: ItemType[];
  field: FieldArrayWithId<ItemType>;
  moveFieldUp: (index: number) => void;
  moveFieldDown: (index: number) => void;
  removeField: (index: number) => void;
};

const SingleItem = ({
  name,
  index,
  fields,
  field,
  moveFieldUp,
  moveFieldDown,
  removeField,
}: SingleItemProps) => {
  const { control, setValue } = useFormContext();

  const { _t } = useTranslationContext();

  // Items
  const itemName = useWatch({
    name: `${name}[${index}].name`,
    control,
  });

  const rate = useWatch({
    name: `${name}[${index}].unitPrice`,
    control,
  });

  const quantity = useWatch({
    name: `${name}[${index}].quantity`,
    control,
  });

  const total = useWatch({
    name: `${name}[${index}].total`,
    control,
  });

  // Currency
  const currency = useWatch({
    name: `details.currency`,
    control,
  });

  useEffect(() => {
    // Calculate total when rate or quantity changes
    if (rate != undefined && quantity != undefined) {
      const calculatedTotal = (rate * quantity).toFixed(2);
      setValue(`${name}[${index}].total`, calculatedTotal);
    }
  }, [rate, quantity]);

  // DnD
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const boxDragClasses = isDragging
    ? "border-2 bg-gray-200 border-blue-600 dark:bg-slate-900 z-10"
    : "border";

  const gripDragClasses = isDragging
    ? "opacity-0 group-hover:opacity-100 transition-opacity cursor-grabbing"
    : "cursor-grab";

  return (
    <div
      style={style}
      {...attributes}
      className={`${boxDragClasses} group flex flex-col gap-y-5 p-3 my-2 cursor-default rounded-xl bg-white border border-gray-300 !important`}
    >
      <div className="flex flex-wrap justify-between">
        {itemName !== "" ? (
          <p className="font-medium text-black !important">
            #{index + 1} - {itemName}
          </p>
        ) : (
          <p className="font-medium text-black !important">
            #{index + 1} - Empty name
          </p>
        )}

        <div className="flex gap-3">
          <div
            className={`${gripDragClasses} flex justify-center items-center`}
            ref={setNodeRef}
            {...listeners}
          >
            <GripVertical className="hover:text-blue-600 !important" />
          </div>

          <BaseButton
            size="icon"
            tooltipLabel="Move the item up"
            onClick={() => moveFieldUp(index)}
            disabled={index === 0}
          >
            <ChevronUp />
          </BaseButton>

          <BaseButton
            size="icon"
            tooltipLabel="Move the item down"
            onClick={() => moveFieldDown(index)}
            disabled={index === fields.length - 1}
          >
            <ChevronDown />
          </BaseButton>
        </div>
      </div>

      <div
        className="
            grid grid-cols-2 gap-4 
            lg:flex lg:flex-row lg:items-start lg:justify-between lg:gap-y-0 lg:gap-x-2
            py-4 px-2 lg:px-0 border-b border-gray-200 !important
          "
        key={index}
      >
        {/* No */}
        <div className="col-span-2 lg:w-[2rem] flex flex-col gap-2">
          <Label className="text-sm font-medium text-black mb-1 !important">
            No
          </Label>
          <div className="text-base text-black !important">{index + 1}</div>
        </div>

        {/* Description */}
        <div className="col-span-2 lg:flex-1 flex flex-col gap-2">
          <FormInput
            name={`${name}[${index}].description`}
            label={_t("form.steps.lineItems.description")}
            placeholder="Item description"
            vertical
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black bg-white !important"
          />
        </div>

        {/* Unit Price */}
        <div className="col-span-1 flex flex-col gap-2">
          <FormInput
            name={`${name}[${index}].unitPrice`}
            type="number"
            label={_t("form.steps.lineItems.rate")}
            placeholder={_t("form.steps.lineItems.rate")}
            vertical
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black bg-white  !important"
          />
        </div>
        {/* quantity */}
        <div className="col-span-1 flex flex-col gap-2">
          <Label className="text-sm font-medium text-black mb-1 !important">
            {_t("form.steps.lineItems.quantity")}
          </Label>
          <FormInput
            name={`${name}[${index}].quantity`}
            type="number"
            placeholder="Item quantity"
            className="w-full px-3 py-2 border border-gray-300 rounded-md font-medium text-lg text-black bg-white !important"
            size={10}
          />
        </div>

        {/* Total */}
        <div className="col-span-1 flex flex-col gap-2">
          <Label className="text-sm font-medium text-black mb-1 !important">
            {_t("form.steps.lineItems.total")}
          </Label>
          <Input
            value={`${total}`}
            readOnly
            placeholder="Item total"
            className="w-full px-3 py-2 border border-gray-300 rounded-md font-medium text-lg text-black bg-white !important"
            size={10}
          />
        </div>
      </div>

      <div className="flex justify-end mt-4 lg:mt-0 !important">
        {fields.length > 0 && (
          <BaseButton variant="destructive" onClick={() => removeField(index)}>
            <Trash2 />
            {_t("form.steps.lineItems.removeItem")}
          </BaseButton>
        )}
      </div>
    </div>
  );
};

export default SingleItem;
