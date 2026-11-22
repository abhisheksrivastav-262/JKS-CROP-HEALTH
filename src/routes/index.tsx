import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, useRouterState } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Droplets,
  FlaskConical,
  Handshake,
  Instagram,
  Leaf,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Package,
  Phone,
  Send,
  Sprout,
  Star,
  Wheat,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { seedCategories } from "@/data/seed-products";
import { getWhatsAppEnquiryUrl, getWhatsAppFeedbackUrl } from "@/lib/whatsapp";

const businessName = "JKS CROP HEALTH";
const phoneNumber = "918059963113";
const products = [
  {
    number: "01",
    icon: Wheat,
    title: "Seeds Wholesale",
    imageSrc: "/images/hisar-crop-fields.webp",
    imageAlt: "Green agricultural fields representing seed and crop supply",
    description:
      "Agricultural seed wholesale for farmers and businesses looking for dependable crop essentials.",
  },
  {
    number: "02",
    icon: Droplets,
    title: "Magic Boond",
    imageSrc: "/images/magic-boond-poster.webp",
    description:
      "A non-ionic, silicon-based adjuvant concentrate for effective, uniform and quick spreading.",
    featured: true,
  },
  {
    number: "03",
    icon: FlaskConical,
    title: "Teen Baan",
    imageSrc: "/images/deen-baan-500ml.webp",
    description: "Silicon Super Spreader · 500 ml.",
  },
  {
    number: "04",
    icon: Droplets,
    title: "ESPA-80",
    imageSrc: "/images/espa-80-1l.webp",
    description: "All Purpose Spray Adjuvant Concentrate for plants and crops · 1 Litre.",
  },
  {
    number: "05",
    icon: FlaskConical,
    title: "Silicon Super Spreader",
    imageSrc: "/images/deen-baan-500ml.webp",
    imageAlt: "Teen Baan silicon super spreader bottle",
    description:
      "Manufacturing and supply of silicon super spreader products for agricultural crop care.",
  },
];

const assurances = [
  {
    icon: Sprout,
    number: "01",
    title: "Agricultural product expertise",
    description: "A business focused on seeds and crop health products.",
  },
  {
    icon: Leaf,
    number: "02",
    title: "Crop health solutions",
    description: "Product categories selected for everyday agricultural needs.",
  },
  {
    icon: FlaskConical,
    number: "03",
    title: "Focused manufacturing",
    description: "Silicon-based crop spreading solutions from our product range.",
  },
  {
    icon: Handshake,
    number: "04",
    title: "Customer support",
    description: "Get in touch with our team for product and availability enquiries.",
  },
];

const frequentlyAskedQuestions = [
  {
    question: "What products does JKS Crop Health offer?",
    answer:
      "Our range includes agricultural seeds wholesale, silicon-based spreader products, and crop health products such as Magic Boond, Teen Baan, and ESPA-80.",
  },
  {
    question: "What is Magic Boond?",
    answer:
      "Magic Boond is a non-ionic, silicon-based adjuvant concentrate designed for effective, uniform, and quick spreading. See the product page or contact us for product information.",
  },
  {
    question: "How can I ask about availability or product use?",
    answer:
      "Send an enquiry through WhatsApp or call us at 80599-63113. Our team can help with product and availability questions.",
  },
  {
    question: "Where is JKS Crop Health located?",
    answer:
      "We are at 394-HBC, 4th Miles Stone, Sirsa Road, Hisar – 125001, Haryana, India. The Contact page includes a Google Maps link and map.",
  },
];

const magicBoondBenefits = [
  {
    icon: Droplets,
    title: "Effective spreading",
    description: "A silicon adjuvant concentrate developed for effective spreading.",
  },
  {
    icon: Sprout,
    title: "Uniform coverage",
    description: "Designed to support even coverage across the treated area.",
  },
  {
    icon: ArrowRight,
    title: "Quick spreading",
    description: "The product poster highlights quick spreading as a key feature.",
  },
  {
    icon: Check,
    title: "High compatibility",
    description:
      "Listed for use with fungicides, insecticides, herbicides, and plant growth promoters.",
  },
];

const navigation = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Gallery", href: "/gallery" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

type GallerySource = { title: string; src: string; alt: string; category: string };
type GalleryItem = {
  title: string;
  category: string;
  images: { src: string; alt: string }[];
};

const fodderGalleryItems: GallerySource[] = (
  [
    ["Dairy Power 555", "/images/fodder/dairy-power-555.webp"],
    ["Multicut Jowar", "/images/fodder/multicut-blue.webp"],
    ["Multicut Jowar", "/images/fodder/multicut-red.webp"],
    ["Milkaraj Hybrid Sudan Grass", "/images/fodder/milkaraj-hybrid-sudan-grass.webp"],
    ["Milkaraj 3 kg", "/images/fodder/milkaraj-3kg.webp"],
    ["Chara Beej", "/images/fodder/chara-beej.webp"],
    ["Supergene Fodder Seed", "/images/fodder/supergene-fodder-seed.webp"],
  ] as [string, string][]
).map(([title, src]) => ({ title, src, alt: title, category: "Fodder & forage seeds" }));

const uniqueGallerySources: GallerySource[] = Array.from(
  new Map<string, GallerySource>(
    [
      ...products.map((product) => ({
        title: product.title,
        src: product.imageSrc,
        alt: product.imageAlt ?? product.title,
        category: "Crop health products",
      })),
      ...seedCategories.flatMap((category) =>
        category.products.flatMap((product) =>
          product.images.map((productImage) => ({
            title: product.title,
            src: productImage.src,
            alt: productImage.alt,
            category: category.title,
          })),
        ),
      ),
      ...fodderGalleryItems,
    ].map((item) => [item.src, item] as [string, GallerySource]),
  ).values(),
);

const galleryItems = Array.from(
  uniqueGallerySources
    .reduce((itemsByProduct, item) => {
      const key = `${item.category}:${item.title}`;
      const existing = itemsByProduct.get(key);
      if (existing) existing.images.push({ src: item.src, alt: item.alt });
      else
        itemsByProduct.set(key, {
          title: item.title,
          category: item.category,
          images: [{ src: item.src, alt: item.alt }],
        });
      return itemsByProduct;
    }, new Map<string, GalleryItem>())
    .values(),
);
const galleryCategories = Array.from(new Set(galleryItems.map((item) => item.category)));
const productRangeCategories = [
  {
    title: "All products",
    count:
      products.length +
      seedCategories.reduce((total, category) => total + category.products.length, 0),
  },
  { title: "Crop Health Products", count: products.length },
  ...seedCategories.map((category) => ({
    title: category.title,
    count: category.products.length,
  })),
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JKS Crop Health | Agricultural Seeds & Crop Care in Hisar" },
      {
        name: "description",
        content:
          "Explore JKS Crop Health seeds wholesale, silicon super spreader manufacturing, and Magic Boond silicon adjuvant concentrate in Hisar, Haryana.",
      },
      {
        property: "og:title",
        content: "JKS Crop Health | Agricultural Seeds & Crop Care in Hisar",
      },
      {
        property: "og:description",
        content:
          "Agricultural seeds wholesale and silicon-based crop health products from JKS Crop Health, Hisar, Haryana.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <SitePage page="home" />,
});

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      aria-label={`${businessName} home`}
      className={`jks-brand${footer ? " jks-brand-footer" : ""}`}
      href="/"
    >
      <span className="jks-brand-mark" aria-hidden="true">
        <img alt="" className="jks-brand-logo" src="/images/jks-crop-health-logo.webp" />
      </span>
      <span className="jks-brand-name">
        <strong>JKS</strong>
        <span>CROP HEALTH</span>
      </span>
    </a>
  );
}

export type SitePageName = "home" | "about" | "products" | "gallery" | "services" | "contact";

export function SitePage({ page }: { page: SitePageName }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState<string | null>(null);
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState("All products");
  const [selectedProductCategory, setSelectedProductCategory] = useState("All products");
  const [productsInView, setProductsInView] = useState(false);
  const [visitorRating, setVisitorRating] = useState(0);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    if (page !== "home" && page !== "products") {
      setProductsInView(false);
      return;
    }

    const shoppingSections = ["products", "fodder-seeds"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    if (shoppingSections.length === 0) return;

    const visibleSections = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visibleSections.add(entry.target);
        else visibleSections.delete(entry.target);
      }
      setProductsInView(visibleSections.size > 0);
    });
    shoppingSections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [page]);

  const handleProductEnquirySubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!enquiryProduct) return;

    const formData = new FormData(event.currentTarget);
    const enquiryUrl = getWhatsAppEnquiryUrl(enquiryProduct, {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      message: String(formData.get("message") ?? ""),
    });

    window.location.assign(enquiryUrl);
  };

  const handleContactEnquirySubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const enquiryUrl = getWhatsAppEnquiryUrl(undefined, {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      message: String(formData.get("message") ?? ""),
    });
    window.location.assign(enquiryUrl);
  };

  return (
    <>
      <div className="jks-topline">
        <div className="jks-container jks-topline-inner">
          <span>
            <MapPin aria-hidden="true" />
            <span>394-HBC, Sirsa Road, Hisar, Haryana</span>
          </span>
          <a href="tel:+918059963113">
            <Phone aria-hidden="true" />
            <span>+91 80599 63113</span>
          </a>
        </div>
      </div>

      <header className="jks-header">
        <div className="jks-container jks-header-inner">
          <Brand />
          <Button
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            className="jks-menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            size="icon"
            variant="ghost"
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
          <nav aria-label="Main navigation" className="jks-nav-links" data-open={menuOpen}>
            {navigation.map(({ label, href }) => (
              <a
                aria-current={pathname === href ? "page" : undefined}
                className="jks-nav-link"
                href={href}
                key={href}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
            <Button asChild className="jks-nav-cta" size="sm" variant="whatsapp">
              <a href={getWhatsAppEnquiryUrl()} rel="noreferrer" target="_blank">
                <Phone aria-hidden="true" />
                WhatsApp enquiry
                <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
          </nav>
        </div>
      </header>

      <main>
        {page === "gallery" && (
          <section aria-labelledby="gallery-title" className="jks-gallery jks-section">
            <div className="jks-container">
              <div className="jks-section-header">
                <div>
                  <p className="jks-eyebrow">
                    <span className="jks-eyebrow-dash" />
                    Product gallery
                  </p>
                  <h1 id="gallery-title">
                    Our products,
                    <br />
                    <span>in full view.</span>
                  </h1>
                </div>
                <p className="jks-section-aside">
                  Browse our seed packs, crop health products, and product posters. Each unique
                  image appears once.
                </p>
              </div>
              <nav aria-label="Gallery categories" className="jks-gallery-categories">
                {[
                  { title: "All products", count: galleryItems.length },
                  ...galleryCategories.map((category) => ({
                    title: category,
                    count: galleryItems.filter((item) => item.category === category).length,
                  })),
                ].map(({ title, count }) => {
                  const isSelected = selectedGalleryCategory === title;
                  return (
                    <button
                      aria-pressed={isSelected}
                      className={`jks-gallery-category${isSelected ? " is-active" : ""}`}
                      key={title}
                      onClick={() => setSelectedGalleryCategory(title)}
                      type="button"
                    >
                      <span>{title}</span>
                      <small>{count}</small>
                    </button>
                  );
                })}
              </nav>
              <div aria-live="polite" className="jks-gallery-grid">
                {galleryItems
                  .filter(
                    (item) =>
                      selectedGalleryCategory === "All products" ||
                      item.category === selectedGalleryCategory,
                  )
                  .map(({ title, images, category }) => (
                    <figure className="jks-gallery-card" key={`${category}-${title}`}>
                      <div
                        className="jks-gallery-image"
                        data-image-count={images.length > 1 ? "multiple" : "single"}
                      >
                        {images.map(({ src, alt }) => (
                          <img alt={alt} key={src} loading="lazy" src={src} />
                        ))}
                      </div>
                      <figcaption>
                        <span>{category}</span>
                        <strong>{title}</strong>
                        <Button
                          className="jks-fodder-enquire"
                          onClick={() => setEnquiryProduct(title)}
                          size="sm"
                          variant="gold"
                        >
                          Enquire about {title} <ArrowRight aria-hidden="true" />
                        </Button>
                      </figcaption>
                    </figure>
                  ))}
              </div>
            </div>
          </section>
        )}
        {page === "home" && (
          <>
            <section aria-labelledby="hero-title" className="jks-hero" id="home">
              <img
                alt="Bright green crop fields and yellow mustard blossoms"
                className="jks-hero-image"
                fetchPriority="high"
                src="/images/hisar-crop-fields.webp"
              />
              <div aria-hidden="true" className="jks-hero-wash" />
              <div className="jks-container jks-hero-inner">
                <div className="jks-hero-copy">
                  <p className="jks-eyebrow jks-eyebrow-hero">
                    <span className="jks-eyebrow-dash" />
                    Agricultural solutions · Hisar, Haryana
                  </p>
                  <h1 id="hero-title">
                    Healthy crops.
                    <br />
                    Better growth.
                    <br />
                    <span>Better farming.</span>
                  </h1>
                  <p className="jks-hero-description">
                    Your trusted partner in agricultural seeds and advanced crop health solutions.
                  </p>
                  <div className="jks-hero-actions">
                    <Button asChild className="jks-button-gold" size="lg" variant="gold">
                      <a href="/products">
                        Explore our products <ArrowRight aria-hidden="true" />
                      </a>
                    </Button>
                    <Button asChild className="jks-button-outline" size="lg" variant="hero-outline">
                      <a href={getWhatsAppEnquiryUrl()} rel="noreferrer" target="_blank">
                        <Phone aria-hidden="true" /> WhatsApp us
                      </a>
                    </Button>
                  </div>
                  <div className="jks-hero-footnote">
                    <span className="jks-hero-footnote-mark" aria-hidden="true">
                      <Sprout />
                    </span>
                    <span>
                      <strong>JKS Crop Health</strong>
                      <span>Seeds · Spreader solutions · Crop care</span>
                    </span>
                  </div>
                </div>
              </div>
              <a aria-label="Discover JKS Crop Health" className="jks-hero-scroll" href="/about">
                <ArrowDown aria-hidden="true" />
              </a>
              <span className="jks-hero-index" aria-hidden="true">
                29°08′N&nbsp; 75°43′E
              </span>
            </section>

            <section aria-label="JKS Crop Health business focus" className="jks-intro-band">
              <div className="jks-container jks-intro-items">
                <div>
                  <Wheat aria-hidden="true" />
                  <span>Seeds wholesale</span>
                </div>
                <span aria-hidden="true" className="jks-intro-divider" />
                <div>
                  <Droplets aria-hidden="true" />
                  <span>Silicon spreader solutions</span>
                </div>
                <span aria-hidden="true" className="jks-intro-divider" />
                <div>
                  <Sprout aria-hidden="true" />
                  <span>Crop health products</span>
                </div>
              </div>
            </section>
          </>
        )}
        {page === "about" && (
          <>
            <section aria-labelledby="about-title" className="jks-about jks-section" id="about">
              <div className="jks-container jks-about-grid">
                <div className="jks-section-heading jks-about-heading">
                  <p className="jks-eyebrow">
                    <span className="jks-eyebrow-dash" />
                    Local knowledge. Crop-focused products.
                  </p>
                  <h2 id="about-title">
                    Rooted in agriculture.
                    <br />
                    <span>Focused on crop health.</span>
                  </h2>
                </div>
                <div className="jks-about-copy">
                  <p className="jks-about-lead">About JKS Crop Health</p>
                  <p>
                    JKS Crop Health is an agricultural products company based in Hisar, Haryana. We
                    focus on agricultural seeds wholesale and manufacturing silicon-based crop
                    spreading solutions.
                  </p>
                  <p>
                    From crop health products to silicon adjuvant concentrates, our range brings key
                    agricultural product categories together.
                  </p>
                  <a className="jks-text-link" href="/contact">
                    Get in touch <ArrowRight aria-hidden="true" />
                  </a>
                </div>
                <div aria-label="Our areas of focus" className="jks-focus-strip">
                  <div>
                    <span className="jks-focus-num">01</span>
                    <Wheat aria-hidden="true" />
                    <strong>Seeds wholesale</strong>
                  </div>
                  <div>
                    <span className="jks-focus-num">02</span>
                    <Droplets aria-hidden="true" />
                    <strong>Silicon-based spreaders</strong>
                  </div>
                  <div>
                    <span className="jks-focus-num">03</span>
                    <Sprout aria-hidden="true" />
                    <strong>Crop health products</strong>
                  </div>
                  <div>
                    <span className="jks-focus-num">04</span>
                    <FlaskConical aria-hidden="true" />
                    <strong>Agricultural solutions</strong>
                  </div>
                </div>
              </div>
              <div className="jks-container">
                <article
                  aria-labelledby="about-sales-contact-name"
                  className="jks-sales-contact jks-about-sales-contact"
                >
                  <div className="jks-sales-contact-image">
                    <img
                      alt="Dr. Yaman Sharma, Development Manager for Haryana"
                      loading="lazy"
                      src="/images/sales/dr-yaman-sharma.webp"
                    />
                  </div>
                  <div className="jks-sales-contact-details">
                    <span className="jks-detail-label">Sales · Haryana</span>
                    <h3 id="about-sales-contact-name">Dr. Yaman Sharma</h3>
                    <p>B.Sc. Agricultural</p>
                    <p>Punjab University</p>
                    <p>Development Manager (Haryana)</p>
                    <a href="tel:+919817999899">Mobile: 9817999899</a>
                  </div>
                </article>
              </div>
            </section>
            <section aria-labelledby="about-more-title" className="jks-about-more jks-section">
              <div className="jks-container">
                <div className="jks-section-header">
                  <div>
                    <p className="jks-eyebrow">
                      <span className="jks-eyebrow-dash" />A focused agricultural range
                    </p>
                    <h2 id="about-more-title">
                      Practical categories.
                      <br />
                      <span>One local point of contact.</span>
                    </h2>
                  </div>
                  <p className="jks-section-aside">
                    JKS Crop Health brings seeds wholesale and crop health products together, with
                    silicon-based spreading solutions as a core part of its range.
                  </p>
                </div>
                <div className="jks-about-poster-feature">
                  <img
                    alt="Magic Boond silicon adjuvant concentrate product poster"
                    className="jks-about-poster"
                    loading="lazy"
                    src="/images/magic-boond-poster.webp"
                  />
                  <div>
                    <p className="jks-eyebrow">
                      <span className="jks-eyebrow-dash" />
                      Featured crop health product
                    </p>
                    <h3>Magic Boond</h3>
                    <p>
                      A non-ionic, silicon-based adjuvant concentrate designed for effective,
                      uniform, and quick spreading with high compatibility.
                    </p>
                    <a className="jks-text-link" href="/products#magic-boond">
                      View product details <ArrowRight aria-hidden="true" />
                    </a>
                  </div>
                </div>
                <div className="jks-about-pillars">
                  <article>
                    <Wheat aria-hidden="true" />
                    <h3>Seeds for agricultural needs</h3>
                    <p>
                      We offer agricultural seeds wholesale for farmers and businesses seeking
                      dependable crop essentials.
                    </p>
                  </article>
                  <article>
                    <Droplets aria-hidden="true" />
                    <h3>Silicon-based spreaders</h3>
                    <p>
                      Our range includes silicon adjuvant concentrates and spreader products for
                      crop care.
                    </p>
                  </article>
                  <article>
                    <Handshake aria-hidden="true" />
                    <h3>Support from Hisar</h3>
                    <p>
                      Contact our Hisar team for questions about products, availability, and the
                      range we offer.
                    </p>
                  </article>
                </div>
                <a className="jks-text-link" href="/products">
                  Explore the product range <ArrowRight aria-hidden="true" />
                </a>
              </div>
            </section>
          </>
        )}
        {(page === "home" || page === "products") && (
          <>
            <section
              aria-labelledby="products-title"
              className="jks-products jks-section"
              id="products"
            >
              <div className="jks-container">
                <div className="jks-section-header">
                  <div>
                    <p className="jks-eyebrow">
                      <span className="jks-eyebrow-dash" />
                      What we offer
                    </p>
                    <h2 id="products-title">
                      Products with a
                      <br />
                      <span>purpose in every drop.</span>
                    </h2>
                  </div>
                  <p className="jks-section-aside">
                    Explore our agricultural product range, from seeds wholesale to silicon-based
                    spreading solutions.
                  </p>
                </div>

                <nav
                  aria-label="Product categories"
                  className="jks-gallery-categories jks-product-category-tabs"
                >
                  {productRangeCategories.map(({ title, count }) => {
                    const isSelected = selectedProductCategory === title;
                    return (
                      <button
                        aria-pressed={isSelected}
                        className={`jks-gallery-category${isSelected ? " is-active" : ""}`}
                        key={title}
                        onClick={() => setSelectedProductCategory(title)}
                        type="button"
                      >
                        <span>{title}</span>
                        <small>{count}</small>
                      </button>
                    );
                  })}
                </nav>

                {(selectedProductCategory === "All products" ||
                  selectedProductCategory === "Crop Health Products") && (
                  <div className="jks-product-grid">
                    {products.map(
                      ({
                        number,
                        icon: Icon,
                        imageSrc,
                        imageAlt,
                        title,
                        description,
                        featured,
                      }) => (
                        <article
                          className={`jks-product${featured ? " jks-product-featured" : ""}`}
                          key={title}
                        >
                          <div className="jks-product-topline">
                            <span>{number} / 05</span>
                            <ArrowUpRight aria-hidden="true" />
                          </div>
                          {imageSrc ? (
                            <span className="jks-product-image">
                              <img
                                alt={imageAlt ?? `${title} product`}
                                loading="lazy"
                                src={imageSrc}
                              />
                            </span>
                          ) : (
                            <span className="jks-product-icon" aria-hidden="true">
                              <Icon />
                            </span>
                          )}
                          <div className="jks-product-actions">
                            <Button
                              className="jks-product-enquire"
                              onClick={() => setEnquiryProduct(title)}
                              size="sm"
                              variant="gold"
                            >
                              Enquire about {title} <ArrowRight aria-hidden="true" />
                            </Button>
                            <div className="jks-product-quick-actions">
                              <Button asChild size="sm" variant="whatsapp">
                                <a
                                  href={getWhatsAppEnquiryUrl(title)}
                                  rel="noreferrer"
                                  target="_blank"
                                >
                                  <MessageCircle aria-hidden="true" /> WhatsApp
                                </a>
                              </Button>
                              <Button asChild size="sm" variant="outline">
                                <a href="tel:+918059963113">
                                  <Phone aria-hidden="true" /> Call
                                </a>
                              </Button>
                            </div>
                          </div>
                          {featured ? (
                            <span className="jks-product-tag">Featured product</span>
                          ) : null}
                          <h3>{title}</h3>
                          <p>{description}</p>
                        </article>
                      ),
                    )}
                  </div>
                )}
                {page === "home" && selectedProductCategory === "All products" ? (
                  <a className="jks-text-link jks-home-products-link" href="/products">
                    View all products <ArrowRight aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            </section>
          </>
        )}

        {(page === "home" || page === "products") &&
          selectedProductCategory !== "Crop Health Products" && (
            <section
              aria-labelledby="seed-catalog-title"
              className="jks-fodder jks-section"
              id="fodder-seeds"
            >
              <div className="jks-container">
                <div className="jks-section-header jks-fodder-heading">
                  <div>
                    <p className="jks-eyebrow">
                      <span className="jks-eyebrow-dash" />
                      Agricultural seed range
                    </p>
                    <h2 id="seed-catalog-title">
                      Seeds for every
                      <br />
                      <span>growing need.</span>
                    </h2>
                  </div>
                  <p className="jks-section-aside">
                    Browse fodder, field crop, and kitchen garden seeds. Tap any product enquiry to
                    share its name and your details with our team on WhatsApp.
                  </p>
                </div>

                <div className="jks-seed-categories">
                  {seedCategories
                    .filter(
                      (category) =>
                        selectedProductCategory === "All products" ||
                        category.title === selectedProductCategory,
                    )
                    .map((category) => (
                      <section
                        aria-label={category.title}
                        className="jks-seed-category"
                        key={category.title}
                      >
                        <div className="jks-seed-category-heading">
                          <h3>{category.title}</h3>
                          {category.subtitle ? <p>{category.subtitle}</p> : null}
                        </div>
                        <div className="jks-fodder-grid">
                          {category.products.map(({ title, images, details }) => (
                            <article className="jks-fodder-card" key={`${title}-${images[0]?.src}`}>
                              <div
                                className="jks-fodder-image"
                                data-image-count={images.length > 1 ? "multiple" : "single"}
                              >
                                {images.map(({ src, alt }) => (
                                  <img alt={alt} key={src} loading="lazy" src={src} />
                                ))}
                              </div>
                              <div className="jks-fodder-card-body">
                                <Button
                                  className="jks-fodder-enquire"
                                  onClick={() => setEnquiryProduct(title)}
                                  size="sm"
                                  variant="gold"
                                >
                                  Enquire about {title} <ArrowRight aria-hidden="true" />
                                </Button>
                                <h4>{title}</h4>
                                {details ? <p>{details}</p> : null}
                              </div>
                            </article>
                          ))}
                        </div>
                      </section>
                    ))}
                </div>

                <div aria-label="C and F partners" className="jks-fodder-partners">
                  <p className="jks-detail-label">C&amp;F by</p>
                  <div className="jks-fodder-partner">
                    <img
                      alt="Puregene Agri Seeds brand mark"
                      loading="lazy"
                      src="/images/fodder/puregene-agri-logo.webp"
                    />
                    <p>
                      <strong>PUREGENE AGRITECH SEEDS PVT LTD</strong>
                      <span>Jaipur</span>
                    </p>
                  </div>
                  <span aria-hidden="true" className="jks-fodder-partner-divider" />
                  <div className="jks-fodder-partner">
                    <img
                      alt="Supergene Seeds brand mark"
                      loading="lazy"
                      src="/images/fodder/supergene-logo.webp"
                    />
                    <p>
                      <strong>SUPERGENE INFOTECH LLP</strong>
                      <span>Jaipur</span>
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

        {page === "home" && (
          <section aria-labelledby="benefits-title" className="jks-benefits jks-section">
            <div className="jks-container">
              <div className="jks-section-header">
                <div>
                  <p className="jks-eyebrow">
                    <span className="jks-eyebrow-dash" />
                    Product spotlight · Magic Boond
                  </p>
                  <h2 id="benefits-title">
                    Benefits made for
                    <br />
                    <span>uniform spreading.</span>
                  </h2>
                </div>
                <p className="jks-section-aside">
                  Magic Boond is a non-ionic, silicon-based adjuvant concentrate. Explore its stated
                  product features and compatibility.
                </p>
              </div>
              <div className="jks-benefit-grid">
                {magicBoondBenefits.map(({ icon: Icon, title, description }) => (
                  <article className="jks-benefit-card" key={title}>
                    <Icon aria-hidden="true" />
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </article>
                ))}
              </div>
              <a className="jks-text-link" href="/products#magic-boond">
                See Magic Boond product details <ArrowRight aria-hidden="true" />
              </a>
            </div>
          </section>
        )}

        {(page === "home" || page === "about") && (
          <section aria-labelledby="faq-title" className="jks-faq jks-section">
            <div className="jks-container jks-faq-layout">
              <div className="jks-faq-intro">
                <p className="jks-eyebrow">
                  <span className="jks-eyebrow-dash" />
                  Helpful information
                </p>
                <h2 id="faq-title">
                  Frequently asked
                  <br />
                  <span>questions.</span>
                </h2>
                <p>Find quick answers about our products, location, and how to reach our team.</p>
                {page === "home" ? (
                  <div className="jks-rating-card">
                    <span className="jks-detail-label">Share your experience</span>
                    <strong>How was your visit?</strong>
                    <div
                      aria-label="Rate this website from 1 to 5 stars"
                      className="jks-rating-stars"
                      role="group"
                    >
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          aria-label={`${star} ${star === 1 ? "star" : "stars"}`}
                          aria-pressed={visitorRating === star}
                          className={star <= visitorRating ? "is-selected" : ""}
                          key={star}
                          onClick={() => setVisitorRating(star)}
                          type="button"
                        >
                          <Star aria-hidden="true" />
                        </button>
                      ))}
                    </div>
                    {visitorRating > 0 ? (
                      <a
                        className="jks-rating-submit"
                        href={getWhatsAppFeedbackUrl(visitorRating)}
                        rel="noreferrer"
                        target="_blank"
                      >
                        Share {visitorRating}-star rating on WhatsApp{" "}
                        <ArrowUpRight aria-hidden="true" />
                      </a>
                    ) : (
                      <span className="jks-rating-hint">
                        Choose a star to share your rating with us.
                      </span>
                    )}
                  </div>
                ) : null}
              </div>
              <div className="jks-faq-list">
                {frequentlyAskedQuestions.map(({ question, answer }) => (
                  <details key={question}>
                    <summary>
                      {question}
                      <ArrowDown aria-hidden="true" />
                    </summary>
                    <p>{answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {page === "products" && (
          <>
            <section
              aria-labelledby="magic-title"
              className="jks-magic jks-section"
              id="magic-boond"
            >
              <div className="jks-container jks-magic-layout">
                <img
                  alt="Magic Boond silicon adjuvant concentrate product poster"
                  className="jks-magic-poster"
                  loading="lazy"
                  src="/images/magic-boond-poster.webp"
                />

                <div className="jks-magic-content">
                  <p className="jks-eyebrow">
                    <span className="jks-eyebrow-dash" />
                    Introducing Magic Boond
                  </p>
                  <h2 id="magic-title">
                    Small drops.
                    <br />
                    <span>Thoughtful spreading.</span>
                  </h2>
                  <p className="jks-magic-description">
                    मैजिक बूंद (Magic Boond) is a non-ionic, silicon-based spreader concentrate for
                    effective, uniform and quick spreading, with high compatibility.
                  </p>

                  <div className="jks-magic-features">
                    {[
                      "Effective spreading",
                      "Uniform coverage",
                      "Quick spreading",
                      "High compatibility",
                    ].map((feature) => (
                      <div key={feature}>
                        <span aria-hidden="true">
                          <Check />
                        </span>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="jks-magic-compatible">
                    <span className="jks-detail-label">Compatible with</span>
                    <div>
                      {["Fungicides", "Insecticides", "Herbicides", "Plant growth promoters"].map(
                        (item) => (
                          <span className="jks-chip" key={item}>
                            {item}
                          </span>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="jks-magic-bottom">
                    <div className="jks-packaging">
                      <span className="jks-detail-label">Available packaging</span>
                      <div>
                        {["1 Litre", "250 ml", "100 ml"].map((size) => (
                          <span key={size}>
                            <Package aria-hidden="true" />
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Button asChild className="jks-magic-cta" variant="default">
                      <a
                        href={getWhatsAppEnquiryUrl("Magic Boond")}
                        rel="noreferrer"
                        target="_blank"
                      >
                        Ask about Magic Boond <ArrowRight aria-hidden="true" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
        {page === "services" && (
          <>
            <section
              aria-labelledby="approach-title"
              className="jks-approach jks-section"
              id="approach"
            >
              <div className="jks-container">
                <div className="jks-section-header jks-approach-heading">
                  <div>
                    <p className="jks-eyebrow jks-eyebrow-light">
                      <span className="jks-eyebrow-dash" />
                      What guides our work
                    </p>
                    <h2 id="approach-title">
                      Agricultural needs,
                      <br />
                      <span>at the heart of it.</span>
                    </h2>
                  </div>
                  <p className="jks-section-aside jks-approach-aside">
                    We bring seeds, silicon spreaders and crop health products together under one
                    local agricultural business.
                  </p>
                </div>

                <div className="jks-assurance-grid">
                  {assurances.map(({ icon: Icon, number, title, description }) => (
                    <article className="jks-assurance" key={number}>
                      <span className="jks-assurance-number">{number}</span>
                      <Icon aria-hidden="true" className="jks-assurance-icon" />
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </article>
                  ))}
                </div>
                <a className="jks-approach-link" href="/contact">
                  Have a product question? Talk to our team
                  <ArrowRight aria-hidden="true" />
                </a>
              </div>
            </section>
          </>
        )}
        {page === "contact" && (
          <>
            <section
              aria-labelledby="contact-title"
              className="jks-contact jks-section"
              id="contact"
            >
              <div className="jks-container">
                <div className="jks-section-header jks-contact-heading">
                  <div>
                    <p className="jks-eyebrow">
                      <span className="jks-eyebrow-dash" />
                      We’re here to help
                    </p>
                    <h2 id="contact-title">
                      Let’s talk
                      <br />
                      <span>about your needs.</span>
                    </h2>
                  </div>
                  <Button asChild className="jks-contact-whatsapp" size="lg" variant="whatsapp">
                    <a href={getWhatsAppEnquiryUrl()} rel="noreferrer" target="_blank">
                      <Phone aria-hidden="true" />
                      Enquire on WhatsApp <ArrowUpRight aria-hidden="true" />
                    </a>
                  </Button>
                </div>

                <div className="jks-contact-layout">
                  <address className="jks-contact-details">
                    <a
                      className="jks-contact-item jks-address-item"
                      href="https://www.google.com/maps/search/?api=1&query=394-HBC%2C+4th+Miles+Stone%2C+Sirsa+Road%2C+Hisar+125001%2C+Haryana%2C+India"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <span className="jks-contact-icon">
                        <MapPin aria-hidden="true" />
                      </span>
                      <span>
                        <span className="jks-detail-label">Visit us</span>
                        <strong>394-HBC, 4th Miles Stone, Sirsa Road</strong>
                        <span>Hisar – 125001, Haryana, India</span>
                      </span>
                      <ArrowUpRight aria-hidden="true" className="jks-contact-arrow" />
                    </a>
                    <a className="jks-contact-item" href="tel:+918059963113">
                      <span className="jks-contact-icon">
                        <Phone aria-hidden="true" />
                      </span>
                      <span>
                        <span className="jks-detail-label">Call us</span>
                        <strong>+91 80599 63113</strong>
                      </span>
                      <ArrowUpRight aria-hidden="true" className="jks-contact-arrow" />
                    </a>
                    <a className="jks-contact-item" href="mailto:jkscrophealth@gmail.com">
                      <span className="jks-contact-icon">
                        <Mail aria-hidden="true" />
                      </span>
                      <span>
                        <span className="jks-detail-label">Email us</span>
                        <strong>jkscrophealth@gmail.com</strong>
                      </span>
                      <ArrowUpRight aria-hidden="true" className="jks-contact-arrow" />
                    </a>
                    <a
                      className="jks-contact-item"
                      href="https://www.instagram.com/jks_crop_health/"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <span className="jks-contact-icon">
                        <Instagram aria-hidden="true" />
                      </span>
                      <span>
                        <span className="jks-detail-label">Follow along</span>
                        <strong>@jks_crop_health</strong>
                      </span>
                      <ArrowUpRight aria-hidden="true" className="jks-contact-arrow" />
                    </a>
                  </address>

                  <div className="jks-map-panel">
                    <div className="jks-map-heading">
                      <div>
                        <span className="jks-detail-label">Find us in Hisar</span>
                        <strong>JKS Crop Health</strong>
                      </div>
                      <a
                        aria-label="Open directions to JKS Crop Health"
                        className="jks-map-open"
                        href="https://www.google.com/maps/search/?api=1&query=394-HBC%2C+4th+Miles+Stone%2C+Sirsa+Road%2C+Hisar+125001%2C+Haryana%2C+India"
                        rel="noreferrer"
                        target="_blank"
                      >
                        <ArrowUpRight aria-hidden="true" />
                      </a>
                    </div>
                    <iframe
                      allowFullScreen
                      className="jks-map-frame"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      src="https://maps.google.com/maps?q=394-HBC%2C%204th%20Miles%20Stone%2C%20Sirsa%20Road%2C%20Hisar%20125001%2C%20Haryana%2C%20India&output=embed"
                      title="Map showing the address of JKS Crop Health in Hisar, Haryana"
                    />
                  </div>
                </div>
                <div className="jks-contact-form-panel">
                  <div className="jks-contact-form-heading">
                    <span className="jks-detail-label">Send us an enquiry</span>
                    <h3>How can we help?</h3>
                    <p>Share your details and we’ll continue the conversation on WhatsApp.</p>
                  </div>
                  <form className="jks-enquiry-form" onSubmit={handleContactEnquirySubmit}>
                    <label className="jks-enquiry-field">
                      Name
                      <Input autoComplete="name" name="name" placeholder="Your name" required />
                    </label>
                    <label className="jks-enquiry-field">
                      Mobile number
                      <Input
                        autoComplete="tel"
                        inputMode="tel"
                        name="phone"
                        placeholder="Your mobile number"
                        required
                        type="tel"
                      />
                    </label>
                    <label className="jks-enquiry-field">
                      Message
                      <Textarea name="message" placeholder="Tell us what you need" rows={4} />
                    </label>
                    <Button className="jks-enquiry-submit" type="submit" variant="whatsapp">
                      Send enquiry on WhatsApp <Send aria-hidden="true" />
                    </Button>
                  </form>
                </div>
                <article aria-labelledby="sales-contact-name" className="jks-sales-contact">
                  <div className="jks-sales-contact-image">
                    <img
                      alt="Dr. Yaman Sharma, Development Manager for Haryana"
                      loading="lazy"
                      src="/images/sales/dr-yaman-sharma.webp"
                    />
                  </div>
                  <div className="jks-sales-contact-details">
                    <span className="jks-detail-label">Sales · Haryana</span>
                    <h3 id="sales-contact-name">Dr. Yaman Sharma</h3>
                    <p>B.Sc. Agricultural</p>
                    <p>Punjab University</p>
                    <p>Development Manager (Haryana)</p>
                    <a href="tel:+919817999899">Mobile: 9817999899</a>
                  </div>
                </article>
              </div>
            </section>
          </>
        )}
      </main>

      {enquiryProduct === null && !productsInView ? (
        <div aria-label="Quick contact" className="jks-floating-contact">
          <a
            aria-label="Contact JKS Crop Health on WhatsApp"
            className="jks-floating-contact-button jks-floating-whatsapp"
            href={getWhatsAppEnquiryUrl()}
            rel="noreferrer"
            target="_blank"
          >
            <svg aria-hidden="true" viewBox="0 0 32 32" fill="currentColor">
              <path d="M16.02 3.2A12.69 12.69 0 0 0 5.16 22.46L3.4 28.9l6.6-1.73A12.72 12.72 0 1 0 16.02 3.2Zm0 23.31c-1.9 0-3.77-.51-5.4-1.47l-.39-.23-3.92 1.03 1.05-3.82-.25-.4a10.58 10.58 0 1 1 8.91 4.89Zm5.81-7.93c-.32-.16-1.9-.94-2.2-1.05-.3-.11-.51-.16-.73.16-.22.32-.84 1.05-1.03 1.27-.19.22-.38.24-.7.08-.32-.16-1.36-.5-2.59-1.6-.96-.86-1.61-1.92-1.8-2.24-.19-.32-.02-.5.14-.66.14-.14.32-.38.48-.57.16-.19.22-.32.32-.54.11-.22.05-.41-.03-.57-.08-.16-.73-1.76-1-2.41-.26-.63-.53-.55-.73-.56h-.62c-.22 0-.57.08-.86.4-.3.32-1.13 1.1-1.13 2.7 0 1.6 1.16 3.15 1.32 3.37.16.22 2.28 3.48 5.52 4.88.77.33 1.37.53 1.84.68.77.24 1.47.21 2.03.13.62-.1 1.9-.78 2.17-1.54.27-.75.27-1.4.19-1.54-.08-.13-.3-.21-.62-.37Z" />
            </svg>
            <span>WhatsApp</span>
          </a>
          <a
            aria-label="Call JKS Crop Health"
            className="jks-floating-contact-button jks-floating-call"
            href="tel:+918059963113"
          >
            <Phone aria-hidden="true" />
            <span>Call</span>
          </a>
        </div>
      ) : null}

      <Dialog
        onOpenChange={(open) => {
          if (!open) setEnquiryProduct(null);
        }}
        open={enquiryProduct !== null}
      >
        <DialogContent className="jks-enquiry-dialog">
          <DialogHeader className="jks-enquiry-header">
            <DialogTitle>Enquire about {enquiryProduct}</DialogTitle>
            <DialogDescription>
              Share your contact details and continue the enquiry on WhatsApp.
            </DialogDescription>
          </DialogHeader>
          <form className="jks-enquiry-form" onSubmit={handleProductEnquirySubmit}>
            <label className="jks-enquiry-field">
              Name
              <Input autoComplete="name" name="name" placeholder="Your name" required />
            </label>
            <label className="jks-enquiry-field">
              Mobile number
              <Input
                autoComplete="tel"
                inputMode="tel"
                name="phone"
                placeholder="Your mobile number"
                required
                type="tel"
              />
            </label>
            <label className="jks-enquiry-field">
              Message
              <Textarea name="message" placeholder="What would you like to know?" rows={3} />
            </label>
            <Button className="jks-enquiry-submit" type="submit" variant="whatsapp">
              Continue to WhatsApp <Send aria-hidden="true" />
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <footer className="jks-footer">
        <div className="jks-container">
          <div className="jks-footer-main">
            <div className="jks-footer-about">
              <Brand footer />
              <p>Seeds wholesale and silicon-based crop health solutions from Hisar, Haryana.</p>
            </div>
            <div className="jks-footer-links">
              <span className="jks-detail-label">Explore</span>
              {navigation.map(({ label, href }) => (
                <a href={href} key={href}>
                  {label}
                </a>
              ))}
            </div>
            <div className="jks-footer-contact">
              <span className="jks-detail-label">Say hello</span>
              <a href="tel:+918059963113">+91 80599 63113</a>
              <a href="mailto:jkscrophealth@gmail.com">jkscrophealth@gmail.com</a>
              <a href="https://www.instagram.com/jks_crop_health/" rel="noreferrer" target="_blank">
                <Instagram aria-hidden="true" /> @jks_crop_health
              </a>
            </div>
          </div>
          <div className="jks-footer-bottom">
            <span>© 2026 JKS CROP HEALTH. All rights reserved.</span>
            <a href="/">
              Back to top <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
