import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "./index";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | JKS Crop Health" },
      {
        name: "description",
        content: "Contact JKS Crop Health in Hisar, Haryana for product enquiries and support.",
      },
    ],
  }),
  component: () => <SitePage page="contact" />,
});
