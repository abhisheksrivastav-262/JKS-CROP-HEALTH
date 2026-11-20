const WHATSAPP_NUMBER = "918059963113";

export type WhatsAppEnquiryDetails = {
  name: string;
  phone: string;
  message?: string;
};

export function getWhatsAppEnquiryUrl(
  productName?: string,
  details?: WhatsAppEnquiryDetails,
): string {
  const subject = productName ? ` about ${productName}` : " about your agricultural products";
  const baseMessage = `Hello JKS Crop Health, I am interested${subject}. Please share more information.`;
  const detailsMessage = details
    ? [
        "",
        "",
        "Enquiry details:",
        `Name: ${details.name.trim()}`,
        `Mobile: ${details.phone.trim()}`,
        ...(details.message?.trim() ? [`Message: ${details.message.trim()}`] : []),
      ].join("\n")
    : "";
  const message = `${baseMessage}${detailsMessage}`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppFeedbackUrl(rating: number): string {
  const message = `Hello JKS Crop Health, I would like to share a ${rating}-star rating for my visit to your website.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
