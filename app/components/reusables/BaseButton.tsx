"use client";

import React from "react";

// ShadCn
import { Button, ButtonProps } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

// Icons
import { Loader2 } from "lucide-react";

type BaseButtonProps = {
    tooltipLabel?: string;
    type?: "button" | "submit" | "reset";
    loading?: boolean;
    loadingText?: string;
    children?: React.ReactNode;
} & ButtonProps;

const BaseButton = React.forwardRef<HTMLButtonElement, BaseButtonProps>(({
    tooltipLabel,
    type = "button",
    loading,
    loadingText = "Loading",
    children,
    ...props
}, ref) => {
    const buttonContent = !loading ? (
        <Button ref={ref} className="flex gap-2" type={type} {...props}>
            {children}
        </Button>
    ) : (
        <Button ref={ref} disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {loadingText}
        </Button>
    );

    if (!tooltipLabel) return buttonContent;

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {buttonContent}
                </TooltipTrigger>
                <TooltipContent>
                    <p>{tooltipLabel}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
});

BaseButton.displayName = "BaseButton";

export default BaseButton;
