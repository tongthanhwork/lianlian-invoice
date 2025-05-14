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
import { BaseButton } from "@/app/components";

// Contexts
import { useTranslationContext } from "@/contexts/TranslationContext";

// Icons
import { ChevronDown, ChevronUp, GripVertical, Trash2 } from "lucide-react";

// Types
import { ItemType, NameType } from "@/types";
import FormInput from "../../reusables/form-fields/FormInput/FormInput";

type SingleItemProps = {
  name: NameType;
  index: number;
  fields: ItemType[];
  field: FieldArrayWithId<ItemType>;
  moveFieldUp: (index: number) => void;
  moveFieldDown: (index: number) => void;
  removeField: (index: number) => void;
};

const VoucherSingleItem = ({
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

  const boxDragClasses = isDragging ? "bg-blue-50 z-10" : "";

  const gripDragClasses = isDragging
    ? "opacity-0 group-hover:opacity-100 transition-opacity cursor-grabbing"
    : "cursor-grab";

  return (
    <div
      style={style}
      {...attributes}
      className={` rounded-lg p-2 ${boxDragClasses}`}
    >
      <div
        className="
        flex flex-row gap-3  
        "
        key={index}
      >
        <div className="w-10 text-center flex items-center  justify-center">
          {index + 1}
        </div>
        <div className="w-1/2">
          <FormInput
            name={`${name}[${index}].description`}
            placeholder="Item description"
            vertical
          />
        </div>

        <div className="w-1/4">
          <FormInput
            name={`${name}[${index}].unitPrice`}
            type="number"
            placeholder={_t("form.steps.lineItems.rate")}
            vertical
          />
        </div>

        <div className="flex flex-row gap-2">
          {fields.length > 0 && (
            <BaseButton
              className="px-2 bg-white text-red-500 hover:bg-red-50 size-10"
              variant="destructive"
              onClick={() => removeField(index)}
            >
              <Trash2 className="w-5 h-5" />
            </BaseButton>
          )}
          <div
            className={`${gripDragClasses} flex justify-center items-center`}
            ref={setNodeRef}
            {...listeners}
          >
            <GripVertical className=" hover:text-blue-600 text-neutral-700 w-4 h-4 cursor-pointer !important" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherSingleItem;
