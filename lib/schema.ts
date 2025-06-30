import { z } from "zod";

export const schema = z.object({
  _id: z.number(),
  category_name: z.string(),
  site_link: z.string(),
  site_image: z.string(),
  site_name: z.string(),
  access_category: z.string(),
  ribon_style: z.string(),
  ribon_color: z.string(),
  ribon_tooltip: z.string(),
});
