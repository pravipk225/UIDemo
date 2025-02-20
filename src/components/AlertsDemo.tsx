import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import {
  AlertCircle,
  Info,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertItem {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  description: string;
  dismissible?: boolean;
}

export function AlertsDemo() {
  const [alerts, setAlerts] = React.useState<AlertItem[]>([
    {
      id: "1",
      type: "info",
      title: "Information",
      description: "This is an informational alert.",
      dismissible: true,
    },
  ]);

  const alertStyles = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    success: "bg-green-50 border-green-200 text-green-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    error: "bg-red-50 border-red-200 text-red-800",
  };

  const alertIcons = {
    info: Info,
    success: CheckCircle,
    warning: AlertTriangle,
    error: XCircle,
  };

  const addAlert = (type: AlertItem["type"]) => {
    const newAlert: AlertItem = {
      id: Date.now().toString(),
      type,
      title: type.charAt(0).toUpperCase() + type.slice(1),
      description: `This is a ${type} alert message.`,
      dismissible: true,
    };
    setAlerts((prev) => [...prev, newAlert]);
  };

  const removeAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          onClick={() => addAlert("info")}
          className="border-blue-200 hover:border-blue-300 hover:bg-blue-50"
        >
          Add Info
        </Button>
        <Button
          variant="outline"
          onClick={() => addAlert("success")}
          className="border-green-200 hover:border-green-300 hover:bg-green-50"
        >
          Add Success
        </Button>
        <Button
          variant="outline"
          onClick={() => addAlert("warning")}
          className="border-yellow-200 hover:border-yellow-300 hover:bg-yellow-50"
        >
          Add Warning
        </Button>
        <Button
          variant="outline"
          onClick={() => addAlert("error")}
          className="border-red-200 hover:border-red-300 hover:bg-red-50"
        >
          Add Error
        </Button>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => {
          const IconComponent = alertIcons[alert.type];
          return (
            <Alert
              key={alert.id}
              className={cn(
                "transition-all duration-300 animate-in fade-in-0 slide-in-from-right-5",
                alertStyles[alert.type],
              )}
            >
              <IconComponent className="h-4 w-4" />
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription className="flex justify-between items-center">
                {alert.description}
                {alert.dismissible && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAlert(alert.id)}
                    className="ml-2 hover:bg-background/20"
                  >
                    Dismiss
                  </Button>
                )}
              </AlertDescription>
            </Alert>
          );
        })}
      </div>
    </div>
  );
}
