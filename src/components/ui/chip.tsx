import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const chipVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/80",
        success: "bg-green-500 text-white hover:bg-green-600",
        warning: "bg-yellow-500 text-white hover:bg-yellow-600",
        info: "bg-blue-500 text-white hover:bg-blue-600",
      },
      selected: {
        true: "ring-2 ring-ring ring-offset-2",
      },
    },
    defaultVariants: {
      variant: "default",
      selected: false,
    },
  },
);

export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
  onDelete?: () => void;
  selected?: boolean;
  icon?: React.ReactNode;
}

export function Chip({
  className,
  variant,
  selected,
  onDelete,
  children,
  icon,
  ...props
}: ChipProps) {
  return (
    <div
      className={cn(
        chipVariants({ variant, selected }),
        "group transition-all duration-200 hover:scale-105",
        className,
      )}
      {...props}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {children}
      {selected && <Check className="ml-1 h-3 w-3" />}
      {onDelete && (
        <button
          className="ml-1 rounded-full outline-none hover:bg-background/20 focus:ring-2 focus:ring-ring focus:ring-offset-2"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}
