import React from "react";
import { DateRangePicker } from "./ui/date-range-picker";
import { addDays, format } from "date-fns";

export function DateRangePickerDemo() {
  const [date, setDate] = React.useState({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  return (
    <div className="space-y-4">
      <DateRangePicker date={date} onDateChange={setDate} />
      {date.from && date.to && (
        <p className="text-sm text-muted-foreground text-center">
          Selected range: {format(date.from, "PPP")} - {format(date.to, "PPP")}
        </p>
      )}
    </div>
  );
}
