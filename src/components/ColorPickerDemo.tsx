import React from "react";
import { ColorPicker } from "./ui/color-picker";

export function ColorPickerDemo() {
  const [selectedColor, setSelectedColor] = React.useState("#3b82f6");

  return (
    <ColorPicker
      value={selectedColor}
      onChange={(color) => setSelectedColor(color)}
    />
  );
}
