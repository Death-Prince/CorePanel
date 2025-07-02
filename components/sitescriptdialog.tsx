// components/sitescriptdialog.tsx

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import type { z } from "zod";
import { schema } from "@/components/data-table";

type SiteFormValues = z.infer<typeof schema>;

interface SiteScriptDialogProps {
  children: React.ReactNode;
  initialValues?: Partial<SiteFormValues>;
  onSubmit: (values: SiteFormValues) => void;
}

export function SiteScriptDialog({
  children,
  onSubmit,
}: SiteScriptDialogProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let parsedData;
    try {
      // Use eval to allow JS-style array input
      parsedData = eval("(" + inputValue + ")");

      if (!Array.isArray(parsedData)) {
        throw new Error("Input must be an array of objects.");
      }
    } catch (err) {
      toast.error("Invalid script format. Check syntax." + err);
      return;
    }

    const promise = async () => {
      const results = [];

      for (const item of parsedData) {
        const res = await fetch("/api/stackshelf", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(errText || "Upload failed");
        }

        const saved = await res.json();
        results.push({ ...saved.data, id: saved.data._id });
      }

      setOpen(false);
      setInputValue("");
      results.forEach(onSubmit);
      return results;
    };

    toast.promise(promise, {
      loading: "Uploading scripts...",
      success: () => "Scripts uploaded successfully 🎉",
      error: "One or more scripts failed to upload.",
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Paste Site Script</DialogTitle>
            <DialogDescription>
              Use JavaScript-style syntax (single quotes, backticks allowed).
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="scriptInput">Site Scripts</Label>
              <Textarea
                id="scriptInput"
                className="min-h-[200px] max-h-[400px] font-mono text-sm"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={`[\n  {\n    "site_name": "ChatGPT",\n    "site_link": "https://chat.openai.com/",\n    "site_image": "Chatgpt.png",\n    "category_name": "AI",\n    "access_category": "<svg...>",\n    "ribon_style": "down",\n    "ribon_color": "#fd9c2e",\n    "ribon_tooltip": "Over Power"\n  }\n]`}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Upload</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
