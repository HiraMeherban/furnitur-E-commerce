/* =========================================================
   PRODUCT DATA — single source of truth for the whole site.
   Every product card on every page is generated FROM this
   array by JavaScript — nothing is hard-coded in the HTML.
   Image paths point to /images/imgN.png — drop your own
   "images" folder (the one from your screenshot) into the
   project root and every picture will resolve automatically.
   ========================================================= */

const PRODUCTS = [
  {
    id: 1,
    name: "Urban Lux High Chair",
    category: "chair",
    tags: ["all", "on-sale"],
    price: 2668.15,
    oldPrice: null,
    rating: 5,
    image: "images/img6.png",
    gallery: ["images/img6.png", "images/img14.png", "images/img15.png"],
    material: "Oak wood",
    sold: 261,
    watched: "3.1k",
    description:
      "Introducing our minimal high chair — a sleek and stylish addition to any modern home. With its clean lines and simple design, this chair is perfect for those who value both form and function.",
    features: [
      "Sleek design with sturdy frame and firm cushions.",
      "Neutral-colored upholstery made of leather or high-quality fabric.",
      "Some designs may have modular components or hidden storage.",
      "Practical, versatile, and timeless.",
      "Upgrade your living space with a minimal chair today."
    ]
  },
  {
    id: 2,
    name: "Mordern Black Hanging Light",
    category: "hanging-light",
    tags: ["all", "hanging-light"],
    price: 1595.6,
    oldPrice: null,
    rating: 5,
    image: "images/img7.png",
    gallery: ["images/img7.png", "images/img2.png", "images/img11.png"],
    material: "Stainless metal",
    sold: 190,
    watched: "2.4k",
    description:
      "A geometric wire-frame pendant light with a warm exposed bulb — modern industrial style that upgrades any dining or living space.",
    features: [
      "Energy-efficient LED compatible.",
      "Adjustable hanging height.",
      "Sturdy metal frame construction.",
      "Perfect for dining rooms and kitchen islands.",
      "Easy self-installation kit included."
    ]
  },
  {
    id: 3,
    name: "Metro Fusion Table",
    category: "table",
    tags: ["all"],
    price: 2238.3,
    oldPrice: null,
    rating: 5,
    image: "images/img8.png",
    gallery: ["images/img8.png", "images/img14.png", "images/img6.png"],
    material: "Alloy",
    sold: 140,
    watched: "1.8k",
    description:
      "A true marvel of engineering and design — this durable table frame can support the heaviest of loads while keeping a sleek, minimal profile.",
    features: [
      "High-quality metal frame and composite top.",
      "Scratch resistant lacquered finish.",
      "Stylish addition to any dining or office space.",
      "Easy to clean and maintain.",
      "Built to last for years."
    ]
  },
  {
    id: 4,
    name: "Lumin Desk Lamp",
    category: "lamp",
    tags: ["all"],
    price: 1477.8,
    oldPrice: null,
    rating: 5,
    image: "images/img9.png",
    gallery: ["images/img9.png", "images/img2.png"],
    material: "Titanium",
    sold: 98,
    watched: "980",
    description:
      "An adjustable articulating desk lamp with a matte finish — designed to bring focused, comfortable lighting to any work space.",
    features: [
      "Fully adjustable arm and head.",
      "Soft, even light distribution.",
      "Minimal footprint on your desk.",
      "Durable powder-coated steel.",
      "Available in multiple finishes."
    ]
  },
  {
    id: 5,
    name: "Timeless Edge Hanging Clock",
    category: "decor",
    tags: ["all"],
    price: 1071.6,
    oldPrice: null,
    rating: 5,
    image: "images/img10.png",
    gallery: ["images/img10.png", "images/img17.png"],
    material: "Ceramic",
    sold: 76,
    watched: "640",
    description:
      "A minimalist wall clock with a bold black rim and crisp white face — the perfect finishing touch for a modern interior.",
    features: [
      "Silent sweep movement — no ticking noise.",
      "Scratch resistant glass lens.",
      "Easy wall mount.",
      "Battery operated (not included).",
      "Timeless design fits any room."
    ]
  },
  {
    id: 6,
    name: "Zenith Pendant Light",
    category: "hanging-light",
    tags: ["all", "hanging-light"],
    price: 2069.59,
    oldPrice: null,
    rating: 5,
    image: "images/img2.png",
    gallery: ["images/img2.png", "images/img7.png", "images/img11.png"],
    material: "Alloy",
    sold: 205,
    watched: "2.9k",
    description:
      "A dome-shaped pendant light in soft grey — casts a warm, even glow and suits both contemporary and industrial interiors.",
    features: [
      "Dimmable LED compatible.",
      "Durable powder-coated shade.",
      "Adjustable cord length.",
      "Simple ceiling mount kit included.",
      "A striking centerpiece for any room."
    ]
  },
  {
    id: 7,
    name: "Mordern Bronze Hanging Light",
    category: "hanging-light",
    tags: ["all", "on-sale", "hanging-light"],
    price: 2352.41,
    oldPrice: 3252.41,
    rating: 5,
    image: "images/img11.png",
    gallery: ["images/img11.png", "images/img7.png", "images/img2.png"],
    material: "Bronze",
    sold: 312,
    watched: "4.2k",
    description:
      "Stunning lighting fixture that combines contemporary style with timeless elegance. Featuring a sleek and minimalist design, this hanging light is crafted from high-quality bronze and finished with a smooth and lustrous surface.",
    features: [
      "Solid bronze construction with lustrous finish.",
      "Cluster design — five adjustable pendant heads.",
      "Dimmable and energy-efficient.",
      "Statement piece for open-plan living rooms.",
      "Professional installation recommended."
    ]
  },
  {
    id: 8,
    name: "Zenith Modern Chair",
    category: "chair",
    tags: ["all", "on-sale"],
    price: 2352.41,
    oldPrice: null,
    rating: 4,
    image: "images/img16.png",
    gallery: ["images/img16.png", "images/img16.png", "images/img16.png", "images/img16.png", "images/img16.png", "images/img16.png"],
    material: "Oak wood",
    sold: 261,
    watched: "3.1k",
    onSale: true,
    types: ["Long", "Medium", "Short"],
    colors: ["#8f9a9c", "#2f4f43", "#9a9a97", "#5c3a4a"],
    description:
      "Introducing our minimal armchair — a sleek and stylish addition to any modern home. With its clean lines and simple design, this chair is perfect for those who value both form and function. The neutral color palette and understated profile allow it to blend seamlessly into any living space.",
    features: [
      "Minimal design with sturdy frame and firm cushions.",
      "Neutral-colored upholstery made of leather or high-quality fabric.",
      "Some designs may have modular components or hidden storage.",
      "Practical, versatile, and timeless.",
      "Upgrade your living space with a minimal chair today."
    ]
  },
  {
    id: 9,
    name: "Radiance Modern Sofa",
    category: "sofa",
    tags: ["all", "on-sale", "sofa"],
    price: 2352.41,
    oldPrice: null,
    rating: 4,
    image: "images/img4.png",
    gallery: ["images/img4.png", "images/img4.png", "images/img4.png", "images/img4.png"],
    material: "Oak wood",
    sold: 261,
    watched: "3.1k",
    onSale: true,
    types: ["Long", "Medium", "Short"],
    colors: ["#a9c3dd", "#2f4f43", "#9a9a97", "#5c3a4a"],
    description:
      "Introducing our minimal sofa product — a sleek and stylish addition to any modern home. With its clean lines and simple design, this sofa is perfect for those who value both form and function. The neutral color palette and understated profile allow it to blend seamlessly into any living space, while the sturdy frame and comfortable cushioning ensure maximum comfort and durability.",
    features: [
      "Minimal sofas have sleek designs with sturdy frames and firm cushions.",
      "They feature neutral-colored upholstery made of leather or high-quality fabric.",
      "Some designs may have modular components or hidden storage.",
      "Minimal sofas are practical, versatile, and timeless.",
      "Upgrade your living space with a minimal sofa today."
    ]
  },
  {
    id: 10,
    name: "Nova Chair",
    category: "chair",
    tags: ["all"],
    price: 1899.0,
    oldPrice: null,
    rating: 5,
    image: "images/img5.png",
    gallery: ["images/img5.png"],
    material: "Stainless metal",
    sold: 88,
    watched: "1.1k",
    description:
      "A stylish and comfortable addition to any room, with its sleek design and plush cushions creating the ultimate seating experience.",
    features: [
      "Ergonomic seat shape.",
      "Powder-coated steel legs.",
      "Stain-resistant fabric.",
      "Stackable for easy storage.",
      "Indoor / outdoor use."
    ]
  },
  {
    id: 11,
    name: "Petal Vase Stand",
    category: "decor",
    tags: ["all"],
    price: 235.41,
    oldPrice: null,
    rating: 5,
    image: "images/img18.png",
    gallery: ["images/img18.png"],
    material: "Ceramic",
    sold: 52,
    watched: "410",
    description:
      "A minimal ceramic vase with a single stem — a small but elegant accent piece for a shelf, console, or dining table.",
    features: [
      "Hand-finished ceramic glaze.",
      "Water-tight interior.",
      "Compact footprint.",
      "Pairs well with any decor style.",
      "Flower not included."
    ]
  },
  {
    id: 12,
    name: "Halo White Stool",
    category: "chair",
    tags: ["all"],
    price: 645.0,
    oldPrice: null,
    rating: 5,
    image: "images/img19.png",
    gallery: ["images/img19.png"],
    material: "Oak wood",
    sold: 64,
    watched: "530",
    description:
      "A light, minimal stool with a whitewashed finish — equally at home as extra seating or a side table.",
    features: [
      "Solid wood construction.",
      "Whitewashed matte finish.",
      "Lightweight and easy to move.",
      "Stackable design.",
      "Indoor use recommended."
    ]
  },
  {
    id: 13,
    name: "Square Face Wall Clock",
    category: "decor",
    tags: ["all"],
    price: 352.41,
    oldPrice: null,
    rating: 5,
    image: "images/img17.png",
    gallery: ["images/img17.png"],
    material: "Alloy",
    sold: 71,
    watched: "690",
    description:
      "A square-framed analog wall clock with a clean silver rim — a quiet, precise statement piece.",
    features: [
      "Silent sweep movement.",
      "Brushed metal frame.",
      "Easy wall mount.",
      "Battery operated (not included).",
      "Fits modern and industrial interiors."
    ]
  },
  {
    id: 14,
    name: "Sleekline Modulus Sofa",
    category: "sofa",
    tags: ["all", "sofa"],
    price: 3120.0,
    oldPrice: null,
    rating: 5,
    image: "images/img4.png",
    gallery: ["images/img4.png"],
    material: "Oak wood",
    sold: 175,
    watched: "2.0k",
    description:
      "True marvel of engineering and design — a durable frame that can support the heaviest of loads, with high-quality fabrics, metal frames, and innovative composites.",
    features: [
      "High-quality fabrics, metal frames and innovative composites.",
      "Durable frame supports heavy daily use.",
      "Stylish addition to any living room.",
      "Also suited to functional outdoor patio spaces.",
      "Available in multiple upholstery colors."
    ]
  }
];

/* Category list used for sidebar / filter navigation */
const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "chair", label: "Chair" },
  { key: "sofa", label: "Sofa" },
  { key: "table", label: "Table" },
  { key: "lamp", label: "Lamp / Desk" },
  { key: "hanging-light", label: "Hanging Light" },
  { key: "decor", label: "Decor" }
];
