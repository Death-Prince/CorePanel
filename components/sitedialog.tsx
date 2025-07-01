// components/sitedialog.tsx

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import type { z } from "zod";
import { schema } from "@/components/data-table";

type SiteFormValues = z.infer<typeof schema>;

interface SiteDialogProps {
  children: React.ReactNode;
  mode: "add" | "edit";
  initialValues?: Partial<SiteFormValues>;
  onSubmit: (values: SiteFormValues) => void;
}

export function SiteDialog({
  children,
  mode,
  initialValues = {
    site_name: "",
    site_link: "",
    ribon_tooltip: "",
    category_name: "",
    site_image: "",
    access_category: "",
    ribon_style: "",
    ribon_color: "",
  },
  onSubmit,
}: SiteDialogProps) {
  const [siteName, setSiteName] = useState(initialValues.site_name);
  const [siteLink, setSiteLink] = useState(initialValues.site_link);
  const [tooltip, setTooltip] = useState(initialValues.ribon_tooltip);
  const [category, setCategory] = useState(initialValues.category_name || "");
  const [image, setImage] = useState(initialValues.site_image || "");
  const [accessCategory, setAccessCategory] = useState(
    initialValues.access_category || ""
  );
  const [ribonStyle, setRibonStyle] = useState(initialValues.ribon_style || "");
  const [ribonColor, setRibonColor] = useState(initialValues.ribon_color || "");

  const isEdit = mode === "edit";
  const [open, setOpen] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const body = {
      ...(isEdit && initialValues?.id ? { id: initialValues.id } : {}),
      site_name: siteName,
      site_link: siteLink,
      ribon_tooltip: tooltip,
      category_name: category,
      site_image: image,
      access_category: accessCategory,
      ribon_style: ribonStyle,
      ribon_color: ribonColor,
    };

    const promise = async () => {
      const method = mode === "edit" ? "PUT" : "POST";

      const res = await fetch("/api/stackshelf", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || "Request failed");
      }

      const data = await res.json();

      setOpen(false);
      setSiteName("");
      setSiteLink("");
      setTooltip("");
      setCategory("");
      setImage("");
      setAccessCategory("");
      setRibonStyle("");
      setRibonColor("");

      onSubmit(data.data);
      return data;
    };

    toast.promise(promise, {
      loading: isEdit ? "Saving changes..." : "Adding site...",
      success: (data) =>
        `${data.data?.site_name || "Site"} ${
          isEdit ? "has been updated" : "has been added"
        }! 🎉`,
      error: isEdit ? "Failed to update site." : "Failed to add site.",
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEdit ? "Edit Site" : "Add New Site"}</DialogTitle>
            <DialogDescription>
              {isEdit
                ? "Modify your site information."
                : "Enter the new site details."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Basic Inputs */}
            <div className="grid gap-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="siteLink">Site Link</Label>
                <Input
                  id="siteLink"
                  value={siteLink}
                  onChange={(e) => setSiteLink(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Site Image URL</Label>
                <Input
                  id="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
            </div>

            {/* Additional Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ribonStyle">Ribbon Style</Label>
                <Input
                  id="ribonStyle"
                  value={ribonStyle}
                  onChange={(e) => setRibonStyle(e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="accessCategory">
                Access Category (SVG or text)
              </Label>
              <Textarea
                id="accessCategory"
                value={accessCategory}
                onChange={(e) => setAccessCategory(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="ribonColor">Ribbon Color</Label>
              <Input
                id="ribonColor"
                type="color"
                value={ribonColor}
                onChange={(e) => setRibonColor(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="tooltip">Tooltip Description</Label>
              <Textarea
                id="tooltip"
                value={tooltip}
                onChange={(e) => setTooltip(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">
              {isEdit ? "Save Changes" : "Add Site"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
