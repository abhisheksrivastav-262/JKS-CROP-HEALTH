import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "./index";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Product Gallery | JKS Crop Health" },
      {
        name: "description",
        content: "View JKS Crop Health seed packs, crop health products, and product posters.",
      },
    ],
  }),
  component: () => <SitePage page="gallery" />,
});
