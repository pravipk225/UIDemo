import React from "react";
import { cn } from "@/lib/utils";

interface PageLayoutProps {
  children?: React.ReactNode;
  className?: string;
}

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
      <main className="container mx-auto py-8 px-4">{children}</main>
    </div>
  );
}
