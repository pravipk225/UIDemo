import React from "react";
import { Link } from "react-scroll";
import { cn } from "@/lib/utils";

interface SidebarProps {
  sections?: Array<{
    id: string;
    title: string;
  }>;
  className?: string;
}

const defaultSections = [
  { id: "buttons", title: "Buttons" },
  { id: "inputs", title: "Form Inputs" },
  { id: "cards", title: "Cards" },
  { id: "alerts", title: "Alerts" },
  { id: "modals", title: "Modals" },
  { id: "navigation", title: "Navigation" },
  { id: "dropdown", title: "Dropdown" },
  { id: "calendar", title: "Calendar" },
  { id: "progress", title: "Progress" },
  { id: "command", title: "Command" },
  { id: "skeleton", title: "Skeleton" },
  { id: "carousel", title: "Carousel" },
  { id: "tabs", title: "Tabs" },
  { id: "hover-card", title: "Hover Card" },
  { id: "sheet", title: "Sheet" },
  { id: "collapsible", title: "Collapsible" },
  { id: "resizable", title: "Resizable" },
  { id: "table", title: "Data Table" },
  { id: "upload", title: "File Upload" },
  { id: "toast", title: "Toast" },
  { id: "combobox", title: "Combobox" },
  { id: "aspect-ratio", title: "Aspect Ratio" },
];

const Sidebar = ({ sections = defaultSections, className }: SidebarProps) => {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-30 h-screen w-[280px] bg-background border-r",
        "overflow-y-auto py-8 px-4",
        className,
      )}
    >
      <nav className="space-y-2">
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Components</h2>
          <div className="space-y-1">
            {sections.map((section) => (
              <Link
                key={section.id}
                to={section.id}
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                className="block px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer"
                activeClass="bg-accent text-accent-foreground"
              >
                {section.title}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
