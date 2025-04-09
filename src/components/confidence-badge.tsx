"use client";

import { Shield, ShieldAlert, ShieldCheck } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const confidenceBadgeVariants = cva(
  "inline-flex items-center justify-center rounded-full",
  {
    variants: {
      variant: {
        high: "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400",
        medium:
          "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400",
        low: "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400",
      },
      size: {
        default: "size-6",
        sm: "size-6",
        md: "size-8",
        lg: "size-10",
      },
    },
    defaultVariants: {
      variant: "high",
      size: "default",
    },
  },
);

type ConfidenceVariant = keyof typeof confidenceConfig;

interface ConfidenceBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof confidenceBadgeVariants> {}

const confidenceConfig = {
  high: {
    icon: ShieldCheck,
    tooltip: "High confidence",
    tooltipClass:
      "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400",
  },
  medium: {
    icon: Shield,
    tooltip: "Medium confidence",
    tooltipClass:
      "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400",
  },
  low: {
    icon: ShieldAlert,
    tooltip: "Low confidence",
    tooltipClass:
      "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400",
  },
} as const;

export function ConfidenceBadge({
  className,
  variant = "high",
  size,
  ...props
}: ConfidenceBadgeProps) {
  const config = confidenceConfig[variant as ConfidenceVariant];
  const Icon = config.icon;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(confidenceBadgeVariants({ variant, size, className }))}
          {...props}
        >
          <Icon className="size-4" />
        </div>
      </TooltipTrigger>
      <TooltipContent
        className={cn(config.tooltipClass, "rounded-2xl py-1 font-medium")}
        side="right"
        sideOffset={4}
      >
        <p>{config.tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}
