import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Sparkles, Copy, RotateCcw, Loader2, Check } from "lucide-react";
import { streamAi, type AiTool } from "@/lib/ai";

type Field = {
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
};

export function AiWorkspace({
  tool,
  title,
  description,
  fields,
  buildPrompt,
  outputLabel = "AI Output",
  examplePrompt,
}: {
  tool: AiTool;
  title: string;
  description: string;
  fields: Field[];
  buildPrompt: (values: Record<string, string>) => string;
  outputLabel?: string;
  examplePrompt?: () => Record<string, string>;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    for (const f of fields) {
      if (f.required && !values[f.name]?.trim()) {
        toast.error(`Please fill in: ${f.label}`);
        return;
      }
    }
    setLoading(true);
    setOutput("");
    try {
      await streamAi({
        tool,
        input: buildPrompt(values),
        onDelta: (chunk) => setOutput((p) => p + chunk),
      });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">Inputs</h3>
            {examplePrompt && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setValues(examplePrompt())}
                className="text-xs h-7"
              >
                Try example
              </Button>
            )}
          </div>
          {fields.map((f) => (
            <div key={f.name} className="space-y-1.5">
              <Label htmlFor={f.name} className="text-xs font-medium">
                {f.label} {f.required && <span className="text-destructive">*</span>}
              </Label>
              <Textarea
                id={f.name}
                placeholder={f.placeholder}
                rows={f.rows ?? 3}
                value={values[f.name] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
                className="resize-y"
              />
            </div>
          ))}
          <Button onClick={generate} disabled={loading} className="w-full">
            {loading ? (
              <><Loader2 className="size-4 mr-2 animate-spin" />Generating…</>
            ) : (
              <><Sparkles className="size-4 mr-2" />Generate</>
            )}
          </Button>
        </Card>

        <Card className="p-5 space-y-3 flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">{outputLabel}</h3>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setOutput("")}
                disabled={!output || loading}
                className="h-7"
              >
                <RotateCcw className="size-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={copy}
                disabled={!output}
                className="h-7"
              >
                {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              </Button>
            </div>
          </div>
          <Textarea
            value={output}
            onChange={(e) => setOutput(e.target.value)}
            placeholder={loading ? "Generating…" : "AI output will appear here. You can edit it freely."}
            className="flex-1 min-h-[320px] font-mono text-sm resize-y"
          />
          <p className="text-[11px] text-muted-foreground">
            Output is editable. Always review for accuracy before using.
          </p>
        </Card>
      </div>
    </div>
  );
}
