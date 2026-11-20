import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "./index";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | JKS Crop Health" },
      {
        name: "description",
        content:
          "Learn about JKS Crop Health, an agricultural products company based in Hisar, Haryana.",
      },
    ],
  }),
  component: () => <SitePage page="about" />,
});
