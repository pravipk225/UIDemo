import React from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface CodeSnippetProps {
  code?: string;
  language?: string;
  showCopy?: boolean;
  className?: string;
}

const CodeSnippet = ({
  code = 'const example = "Hello World";\nconsole.log(example);',
  language = "typescript",
  showCopy = true,
  className,
}: CodeSnippetProps) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("relative rounded-lg bg-slate-950 p-4", className)}>
      <pre className="overflow-x-auto">
        <code className="text-sm text-slate-50 block">{code}</code>
      </pre>
      {showCopy && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 h-8 w-8 hover:bg-slate-800"
          onClick={handleCopy}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4 text-slate-400" />
          )}
        </Button>
      )}
      {language && (
        <div className="absolute left-3 top-3 text-xs text-slate-400">
          {language}
        </div>
      )}
    </div>
  );
};

export default CodeSnippet;
