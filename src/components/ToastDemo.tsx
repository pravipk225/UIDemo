import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

export function ToastDemo() {
  const { toast } = useToast();

  return (
    <div className="space-y-2">
      <Button
        onClick={() => {
          toast({
            title: "Success!",
            description: "Your action has been completed.",
          });
        }}
      >
        Show Toast
      </Button>
      <Toaster />
    </div>
  );
}
