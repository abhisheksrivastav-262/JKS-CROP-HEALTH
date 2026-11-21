import { describe, expect, it } from "vitest";

import { getWhatsAppEnquiryUrl } from "@/lib/whatsapp";

describe("WhatsApp enquiries", () => {
  it.each(["Seeds Wholesale", "Magic Boond", "Teen Baan", "ESPA-80", "Silicon Super Spreader"])(
    "sends a %s enquiry to the existing WhatsApp number with the product name",
    (productName) => {
      const url = new URL(getWhatsAppEnquiryUrl(productName));

      expect(url.origin).toBe("https://wa.me");
      expect(url.pathname).toBe("/918059963113");
      expect(url.searchParams.get("text")).toBe(
        `Hello JKS Crop Health, I am interested about ${productName}. Please share more information.`,
      );
    },
  );

  it("keeps the generic WhatsApp enquiry message", () => {
    const url = new URL(getWhatsAppEnquiryUrl());

    expect(url.pathname).toBe("/918059963113");
    expect(url.searchParams.get("text")).toBe(
      "Hello JKS Crop Health, I am interested about your agricultural products. Please share more information.",
    );
  });

  it("includes submitted product enquiry details in the WhatsApp message", () => {
    const url = new URL(
      getWhatsAppEnquiryUrl("ESPA-80", {
        name: "Asha Farmer",
        phone: "98765 43210",
        message: "Please share availability.",
      }),
    );

    expect(url.searchParams.get("text")).toBe(
      "Hello JKS Crop Health, I am interested about ESPA-80. Please share more information.\n" +
        "\nEnquiry details:\nName: Asha Farmer\nMobile: 98765 43210\nMessage: Please share availability.",
    );
  });
});
