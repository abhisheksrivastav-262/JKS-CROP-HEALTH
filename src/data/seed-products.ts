export type SeedProduct = {
  title: string;
  images: { src: string; alt: string }[];
  details?: string;
};

export type SeedCategory = {
  title: string;
  subtitle?: string;
  products: SeedProduct[];
};

const image = (number: number, alt: string) => ({
  src: `/images/seeds/${String(number).padStart(2, "0")}.webp`,
  alt,
});

export const seedCategories: SeedCategory[] = [
  {
    title: "Fodder & Forage Seeds",
    subtitle: "Jowar and SSG seed varieties with the pack sizes you provided.",
    products: [
      { title: "Single Cut Hybrid Jowar", images: [image(1, "Single cut hybrid jowar seed bag")] },
      { title: "Multicut Jowar · 2 kg", images: [image(2, "Multicut jowar seed bag")] },
      { title: "Multicut Jowar · 4 kg", images: [image(3, "Multicut jowar seed bag")] },
      { title: "Red SSG · 5 kg", images: [image(4, "Red SSG fodder seed bag")] },
      { title: "Multicut Jowar · 3 kg & 4 kg", images: [image(5, "Multicut jowar seed bag")] },
      { title: "Red SSG · 5 kg", images: [image(6, "Red SSG seed bag")] },
      { title: "White SSG · 5 kg", images: [image(7, "White SSG fodder seed bag")] },
      { title: "Single Cut Jowar · 1 kg", images: [image(8, "Single cut jowar seed bag")] },
      { title: "Single Cut SSG · 1 kg", images: [image(9, "Single cut SSG seed bag")] },
      { title: "Rye Grass · 500 g", images: [image(27, "Rye grass seed bag")] },
    ],
  },
  {
    title: "Bajra Seeds",
    subtitle: "Hybrid bajra seed varieties; images 12–15 are listed as 1.5 kg packs.",
    products: [
      { title: "Bajra Seed Range", images: [image(11, "Bajra seed range poster")] },
      {
        title: "Sarpanch Hybrid Bajra · 1.5 kg",
        images: [image(12, "Sarpanch hybrid bajra seed bag")],
      },
      {
        title: "Govinda Hybrid Bajra · 1.5 kg",
        images: [image(13, "Govinda hybrid bajra seed bag")],
      },
      {
        title: "Super-555 (Sarpanch) Hybrid Bajra · 1.5 kg",
        images: [image(14, "Super-555 Sarpanch hybrid bajra seeds")],
      },
      {
        title: "94 B94 (Govinda) Hybrid Bajra · 1.5 kg",
        images: [image(15, "94 B94 Govinda hybrid bajra seeds")],
      },
    ],
  },
  {
    title: "Wheat Seeds",
    subtitle: "Research wheat seed packs · 20 kg each.",
    products: [
      {
        title: "Kanchan Manak Wheat · 20 kg",
        images: [image(20, "Kanchan Manak research wheat bag")],
      },
      { title: "Super Gold Wheat · 20 kg", images: [image(21, "Super Gold research wheat bag")] },
      { title: "Kanchan Gold Wheat · 20 kg", images: [image(22, "Kanchan Gold wheat seed bag")] },
    ],
  },
  {
    title: "Berseem Seeds",
    subtitle: "Berseem packs · 1 kg each.",
    products: [
      { title: "PG-51 Gold Berseem · 1 kg", images: [image(23, "PG-51 Gold berseem seed bag")] },
      { title: "PG-51 Haadu Berseem · 1 kg", images: [image(24, "PG-51 Haadu berseem seed bag")] },
    ],
  },
  {
    title: "Maize Seeds",
    subtitle: "Single cross, double cross, and triple cross available.",
    products: [
      {
        title: "Hybrid Maize Seeds",
        images: [
          image(25, "PGM-8899 Early Two hybrid maize bag"),
          image(26, "PGM-1551 Early One hybrid maize range poster"),
        ],
        details:
          "PGM-8899 Early Two · PGM-1551 Early One · Single Cross · Double Cross · Triple Cross",
      },
    ],
  },
  {
    title: "Pulses & Pea Seeds",
    products: [
      {
        title: "Research Moong · Green Wonder · 1 kg",
        images: [
          image(10, "Research Green Gram Green Wonder seed bag"),
          image(37, "Green Wonder moong crop and seed poster"),
        ],
      },
      { title: "Green Pea · PG-10 · 1–5 kg", images: [image(28, "PG-10 green pea seeds poster")] },
    ],
  },
  {
    title: "Vegetable & Kitchen Garden Seeds",
    subtitle: "Individual varieties and the Kitchen Garden (KGP) seed assortment.",
    products: [
      {
        title: "Kitchen Garden Seeds (KGP)",
        images: [
          image(16, "Kitchen Garden seed packet assortment"),
          image(41, "Kitchen garden seed pack poster"),
          image(44, "Kitchen garden vegetable seed packet assortment"),
        ],
      },
      {
        title: "Red Star Carrot Seeds · 250 g, 500 g & 1 kg",
        images: [
          image(29, "Red Star carrot seed bag"),
          image(32, "Red Star carrot seed product poster"),
        ],
      },
      {
        title: "INOX Hybrid F1 Cucumber Seeds",
        images: [image(33, "INOX hybrid F1 cucumber seed packet")],
      },
      {
        title: "Mudhurima-911 Hybrid F1 Muskmelon Seeds",
        images: [image(34, "Mudhurima-911 hybrid F1 muskmelon seed packet")],
      },
      {
        title: "Sonam Hybrid F1 Bottle Gourd Seeds",
        images: [image(35, "Sonam hybrid F1 bottle gourd seed packet")],
      },
    ],
  },
  {
    title: "Kasni & Other Seeds",
    products: [
      {
        title: "MilkVita Kasni · 1 kg",
        images: [image(30, "MilkVita Kasni seed bag; the pack says Double Filter")],
        details: "Double Filter (as printed on the supplied pack)",
      },
      {
        title: "Chicory 111 (Imported Kasni) · 100 g",
        images: [image(31, "Chicory 111 imported Kasni seed bag")],
      },
      { title: "Imported Coriander Seeds", images: [image(36, "Imported coriander seed bag")] },
    ],
  },
  {
    title: "Mustard & Oilseed Crops",
    subtitle: "Mustard and sesame seed varieties; supplied mustard packs are 1 kg.",
    products: [
      {
        title: "Til (Sesame) Seeds",
        images: [image(38, "Sesame crop and seed product poster")],
      },
      {
        title: "Govinda Hybrid Mustard · 1 kg",
        images: [
          image(39, "Govinda hybrid mustard product poster"),
          image(43, "Govinda hybrid mustard seed packet"),
        ],
      },
      {
        title: "56-46 Hybrid Mustard · 1 kg",
        images: [
          image(40, "56-46 hybrid mustard product poster"),
          image(42, "Supergene 56-46 hybrid mustard poster"),
        ],
      },
    ],
  },
  {
    title: "Paddy Seeds",
    subtitle: "Available varieties: 1509, 1121, 1692, 1847, and 1718.",
    products: [
      { title: "Paddy Seeds · 1509", images: [image(45, "Paddy seed packet")] },
      { title: "Paddy Seeds · 1121", images: [image(46, "Paddy seed packet")] },
      { title: "Paddy Seeds · 1692", images: [image(45, "Paddy seed packet")] },
      { title: "Paddy Seeds · 1847", images: [image(46, "Paddy seed packet")] },
      { title: "Paddy Seeds · 1718", images: [image(45, "Paddy seed packet")] },
    ],
  },
  {
    title: "Natural Feed",
    products: [
      {
        title: "Natural Feed · 500 g",
        images: [image(47, "Natural feed seed product bag")],
      },
    ],
  },
];
