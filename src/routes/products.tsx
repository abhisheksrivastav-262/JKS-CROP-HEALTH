import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "./index";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products | JKS Crop Health" },
      {
        name: "description",
        content: "Explore agricultural seeds and crop health products from JKS Crop Health.",
      },
    ],
  }),
  component: () => <SitePage page="products" />,
});
