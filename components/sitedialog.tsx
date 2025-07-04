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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { schema } from "@/components/data-table";
// import { Select } from "@radix-ui/react-select";

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

  const [isInvalidLink, setIsInvalidLink] = useState(false);

  useEffect(() => {
    if (!siteLink) {
      setIsInvalidLink(false);
      return;
    }

    try {
      const url = new URL(siteLink);
      const domain = url.hostname;

      const googleFavicon = `https://www.google.com/s2/favicons?sz=256&domain=${domain}`;
      const clearbitFavicon = `https://logo.clearbit.com/${domain}`;
      const fallbackBase = "https://sitescapes.netlify.app/images/";
      const scriptURL = "https://sitescapes.netlify.app/script.js";

      const setFallbackFromScript = async () => {
        try {
          const response = await fetch(scriptURL);
          const text = await response.text();

          // Match the site_link and extract the site_image
          const regex = new RegExp(
            `{[^}]*['"]site_link['"]:\\s*['"]${siteLink}['"][^}]*['"]site_image['"]:\\s*['"]([^'"]+)['"]`,
            "i"
          );

          const match = text.match(regex);
          if (match && match[1]) {
            const imageFromScript = `${fallbackBase}${match[1]}`;
            setImage(imageFromScript);
          } else {
            setImage(`${fallbackBase}default-icon.png`);
          }
        } catch (e) {
          console.log(e);
          setImage(`${fallbackBase}default-icon.png`);
        }
      };

      const testImage = new Image();
      testImage.src = googleFavicon;

      testImage.onload = () => {
        if (testImage.width >= 64) {
          setImage(googleFavicon);
        } else {
          const clearbitImage = new Image();
          clearbitImage.src = clearbitFavicon;

          clearbitImage.onload = () => {
            setImage(clearbitFavicon);
          };
          clearbitImage.onerror = () => {
            setFallbackFromScript();
          };
        }
      };

      testImage.onerror = () => {
        const clearbitImage = new Image();
        clearbitImage.src = clearbitFavicon;

        clearbitImage.onload = () => {
          setImage(clearbitFavicon);
        };
        clearbitImage.onerror = () => {
          setFallbackFromScript();
        };
      };

      setIsInvalidLink(false);
    } catch (error) {
      setIsInvalidLink(true);
      console.error("Invalid site link", error);
    }
  }, [siteLink]);

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

      const formatted = {
        ...data.data,
        id: data.data._id,
      };

      setOpen(false);
      setSiteName("");
      setSiteLink("");
      setTooltip("");
      setCategory("");
      setImage("");
      setAccessCategory("");
      setRibonStyle("");
      setRibonColor("");

      onSubmit(formatted);
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

          {image && (
            <div className="flex justify-center items-center w-full">
              <img
                src={image}
                alt="Logo preview"
                className="w-10 h-10 mt-1 rounded"
              />
            </div>
          )}

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
                {isInvalidLink && (
                  <Badge variant="destructive">Invalid URL</Badge>
                )}
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
                <Select value={ribonStyle} onValueChange={setRibonStyle}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="slant-up">slant-up</SelectItem>
                    <SelectItem value="slant-down">slant-down</SelectItem>
                    <SelectItem value="up">up</SelectItem>
                    <SelectItem value="down">down</SelectItem>
                    <SelectItem value="check">check</SelectItem>
                  </SelectContent>
                </Select>
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
                className="max-h-32 overflow-auto"
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
                className="max-h-32 overflow-auto"
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
