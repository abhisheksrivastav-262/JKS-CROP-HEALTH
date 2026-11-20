import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "./index";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | JKS Crop Health" },
      {
        name: "description",
        content:
          "Agricultural seeds wholesale, crop health products, and silicon spreader solutions from JKS Crop Health.",
      },
    ],
  }),
  component: () => <SitePage page="services" />,
});
