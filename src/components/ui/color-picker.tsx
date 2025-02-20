import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";

interface ColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
}

const predefinedColors = [
  { hex: "#000000", name: "Black" },
  { hex: "#ffffff", name: "White" },
  { hex: "#ff0000", name: "Red" },
  { hex: "#00ff00", name: "Green" },
  { hex: "#0000ff", name: "Blue" },
  { hex: "#ffff00", name: "Yellow" },
  { hex: "#ff00ff", name: "Magenta" },
  { hex: "#00ffff", name: "Cyan" },
  { hex: "#808080", name: "Gray" },
  { hex: "#800000", name: "Maroon" },
  { hex: "#808000", name: "Olive" },
  { hex: "#008000", name: "Dark Green" },
  { hex: "#800080", name: "Purple" },
  { hex: "#008080", name: "Teal" },
  { hex: "#000080", name: "Navy" },
];

export function ColorPicker({ value = "#000000", onChange }: ColorPickerProps) {
  const [selectedColorName, setSelectedColorName] = React.useState(
    predefinedColors.find((c) => c.hex === value)?.name || "Custom",
  );

  const handleColorChange = (hex: string, name: string) => {
    onChange?.(hex);
    setSelectedColorName(name);
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value;
    onChange?.(hex);
    setSelectedColorName("Custom");
  };

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[80px] h-[40px] p-1"
            style={{ backgroundColor: value }}
          />
        </PopoverTrigger>
        <PopoverContent className="w-[280px]">
          <div className="grid grid-cols-5 gap-2 p-2">
            {predefinedColors.map(({ hex, name }) => (
              <button
                key={hex}
                className="w-10 h-10 rounded-md border hover:scale-110 transition-transform relative group"
                style={{ backgroundColor: hex }}
                onClick={() => handleColorChange(hex, name)}
                title={name}
              >
                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 text-white text-xs rounded-md">
                  {name}
                </span>
              </button>
            ))}
          </div>
          <div className="p-2 border-t">
            <input
              type="color"
              value={value}
              onChange={handleCustomColorChange}
              className="w-full h-8"
            />
          </div>
        </PopoverContent>
      </Popover>
      <span className="text-sm text-muted-foreground min-w-[80px]">
        {selectedColorName}
      </span>
    </div>
  );
}
