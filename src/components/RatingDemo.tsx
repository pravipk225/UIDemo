import React from "react";
import { Rating } from "./ui/rating";
import { Label } from "./ui/label";

export function RatingDemo() {
  const [rating1, setRating1] = React.useState(3);
  const [rating2, setRating2] = React.useState(2.5);
  const [rating3, setRating3] = React.useState(4);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Label>Basic Rating</Label>
        <div className="flex items-center gap-4">
          <Rating value={rating1} onChange={setRating1} />
          <span className="text-sm text-muted-foreground">
            Selected: {rating1}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Half Stars</Label>
        <div className="flex items-center gap-4">
          <Rating
            value={rating2}
            onChange={setRating2}
            precision={0.5}
            size="lg"
          />
          <span className="text-sm text-muted-foreground">
            Selected: {rating2}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Read Only</Label>
        <div className="flex items-center gap-4">
          <Rating value={rating3} readonly size="sm" />
          <span className="text-sm text-muted-foreground">
            Fixed at: {rating3}
          </span>
        </div>
      </div>
    </div>
  );
}
