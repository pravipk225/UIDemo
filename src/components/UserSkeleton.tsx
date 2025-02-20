import React from "react";
import { Skeleton } from "./ui/skeleton";
import { Card } from "./ui/card";

export function UserSkeleton() {
  return (
    <div className="space-y-6">
      {/* User Card 1 - Basic Profile */}
      <Card className="p-4">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[160px]" />
          </div>
        </div>
      </Card>

      {/* User Card 2 - With Stats */}
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-[180px]" />
              <Skeleton className="h-4 w-[140px]" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
      </Card>

      {/* User Card 3 - With Action Buttons */}
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-14 w-14 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-[160px]" />
              <Skeleton className="h-4 w-[120px]" />
            </div>
          </div>
          <div className="flex space-x-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
      </Card>

      {/* User Card 4 - With Bio */}
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[130px]" />
            </div>
          </div>
          <Skeleton className="h-20 w-full" />
        </div>
      </Card>

      {/* User Card 5 - With Social Links */}
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-[170px]" />
              <Skeleton className="h-4 w-[140px]" />
            </div>
          </div>
          <div className="flex space-x-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-8 rounded-full" />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
