import * as React from "react";
import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  precision?: 0.5 | 1;
  readonly?: boolean;
  onChange?: (value: number) => void;
  className?: string;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

export function Rating({
  value = 0,
  max = 5,
  size = "md",
  precision = 1,
  readonly = false,
  onChange,
  className,
}: RatingProps) {
  const [hoverValue, setHoverValue] = React.useState<number | null>(null);
  const [isHovering, setIsHovering] = React.useState(false);

  const displayValue = isHovering ? (hoverValue ?? value) : value;

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number,
  ) => {
    if (readonly) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percent = x / rect.width;

    let newValue = index + 1;
    if (precision === 0.5 && percent <= 0.5) {
      newValue -= 0.5;
    }

    setHoverValue(newValue);
  };

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number,
  ) => {
    if (readonly) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percent = x / rect.width;

    let newValue = index + 1;
    if (precision === 0.5 && percent <= 0.5) {
      newValue -= 0.5;
    }

    onChange?.(newValue);
  };

  return (
    <div
      className={cn("flex gap-1", className)}
      onMouseLeave={() => {
        setIsHovering(false);
        setHoverValue(null);
      }}
    >
      {Array.from({ length: max }).map((_, index) => {
        const isActive = index + 1 <= displayValue;
        const isHalf =
          precision === 0.5 &&
          Math.ceil(displayValue) === index + 1 &&
          displayValue % 1 !== 0;

        return (
          <div
            key={index}
            className={cn(
              "cursor-pointer transition-colors",
              readonly && "cursor-default",
            )}
            onMouseEnter={() => setIsHovering(true)}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onClick={(e) => handleClick(e, index)}
          >
            {isHalf ? (
              <StarHalf
                className={cn(
                  sizeClasses[size],
                  "text-yellow-400 fill-yellow-400",
                )}
              />
            ) : (
              <Star
                className={cn(
                  sizeClasses[size],
                  isActive
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-muted-foreground",
                )}
                fill={isActive ? "currentColor" : "none"}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
