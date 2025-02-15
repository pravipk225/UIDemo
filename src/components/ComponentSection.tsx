import React from "react";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";

interface ComponentSectionProps {
  title?: string;
  description?: string;
  code?: string;
  children?: React.ReactNode;
}

const ComponentSection = ({
  title = "Example Component",
  description = "This is an example component section that demonstrates the usage and implementation of a UI component.",
  code = "<Button>Example Button</Button>",
  children = (
    <div className="p-4 text-center text-muted-foreground">
      Component example goes here
    </div>
  ),
}: ComponentSectionProps) => {
  return (
    <Card className="w-full bg-background p-6 mb-8">
      <div className="space-y-4">
        {/* Section Header */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <p className="text-muted-foreground mt-2">{description}</p>
        </div>

        <Separator />

        {/* Component Demo */}
        <div className="py-6">
          <div className="rounded-lg border bg-card p-8">{children}</div>
        </div>

        <Separator />

        {/* Code Example */}
        <div className="pt-4">
          <h3 className="text-lg font-semibold mb-2">Implementation</h3>
          <pre className="p-4 rounded-lg bg-muted overflow-x-auto">
            <code>{code}</code>
          </pre>
        </div>
      </div>
    </Card>
  );
};

export default ComponentSection;
