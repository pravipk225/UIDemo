import React from "react";
import { Chip } from "./ui/chip";

export function ChipsDemo() {
  const [selectedChips, setSelectedChips] = React.useState<string[]>([]);
  const [chips, setChips] = React.useState([
    { id: "1", label: "React", variant: "default" },
    { id: "2", label: "TypeScript", variant: "secondary" },
    { id: "3", label: "Success", variant: "success" },
    { id: "4", label: "Warning", variant: "warning" },
    { id: "5", label: "Info", variant: "info" },
    { id: "6", label: "Deletable", variant: "outline" },
  ]);

  const toggleChip = (id: string) => {
    setSelectedChips((prev) =>
      prev.includes(id)
        ? prev.filter((chipId) => chipId !== id)
        : [...prev, id],
    );
  };

  const deleteChip = (id: string) => {
    setChips((prev) => prev.filter((chip) => chip.id !== id));
    setSelectedChips((prev) => prev.filter((chipId) => chipId !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <Chip
            key={chip.id}
            variant={chip.variant as any}
            selected={selectedChips.includes(chip.id)}
            onClick={() => toggleChip(chip.id)}
            onDelete={
              chip.variant === "outline" ? () => deleteChip(chip.id) : undefined
            }
          >
            {chip.label}
          </Chip>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        Selected:{" "}
        {selectedChips.length
          ? chips
              .filter((c) => selectedChips.includes(c.id))
              .map((c) => c.label)
              .join(", ")
          : "None"}
      </p>
    </div>
  );
}
