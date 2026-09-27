export type WheelSpec = { cx: number; cy: number; d: number };

export type RentCost = { label: string; price: string };

export type ColorOption = { name: string; hex: string; image: string };

export type QuickSpec = { label: string; value: string };

export type Car = {
  slug: string;
  name: string;
  model: string;
  image: string;
  wheels: [WheelSpec, WheelSpec];
  performance: string;
  construction: string;
  rentCosts: RentCost[];
  tagline?: string;
  price?: string;
  status?: string;
  quickSpecs?: [QuickSpec, QuickSpec, QuickSpec, QuickSpec];
  colors?: ColorOption[];
  interiorImage?: string;
  interiorLabel?: string;
  gallery?: string[];
  perfBars?: { label: string; value: number; max: string }[];
  features?: { label: string; sub: string }[];
};

const STITCH_DIR =
  "/Images/stitch_multi_color_car_visualizer/stitch_multi_color_car_visualizer";

export const STITCH_COLORS: ColorOption[] = [
  {
    name: "Racing Yellow",
    hex: "#F2C10E",
    image: `${STITCH_DIR}/a_high_performance_studio_shot_of_a_porsche_918_spyder_in_racing_yellow_viewed/screen.png`,
  },
  {
    name: "Guards Red",
    hex: "#C51E27",
    image: `${STITCH_DIR}/a_high_performance_studio_shot_of_a_porsche_918_spyder_in_guards_red_viewed/screen.png`,
  },
  {
    name: "Miami Blue",
    hex: "#1E6FBF",
    image: `${STITCH_DIR}/a_high_performance_studio_shot_of_a_porsche_918_spyder_in_miami_blue_viewed/screen.png`,
  },
  {
    name: "Python Green",
    hex: "#2F6B3A",
    image: `${STITCH_DIR}/a_high_performance_studio_shot_of_a_porsche_918_spyder_in_python_green_viewed/screen.png`,
  },
  {
    name: "Metallic Silver",
    hex: "#B9BEC3",
    image: `${STITCH_DIR}/a_high_performance_studio_shot_of_a_porsche_918_spyder_in_metallic_silver/screen.png`,
  },
  {
    name: "Chalk White",
    hex: "#0A0A0A",
    image: `${STITCH_DIR}/a_high_performance_studio_shot_of_a_porsche_918_spyder_in_chalk_white_viewed/screen.png`,
  },
];

const DEFAULT_FEATURES = [
  { label: "Carbon Fiber Body", sub: "Lightweight & Strong" },
  { label: "Active Aero", sub: "Adaptive Downforce" },
  { label: "Track Mode", sub: "Max Performance" },
  { label: "Brembo Brakes", sub: "Carbon Ceramic" },
  { label: "Premium Sound", sub: "Titanium Exhaust" },
  { label: "Limited Edition", sub: "1 of 500" },
];

// All source photos are 1264x848, but each recolor was rendered with a slightly different
// camera framing, so the wheels do not sit at identical pixel coordinates across cars. Every
// car below carries its own measured [front, rear] wheel {cx, cy, d} (px) so the rotating
// circle can cover the full tire on each one without clipping into the body paint.
export const IMG_W = 1264;
export const IMG_H = 848;

export const CARS: Car[] = [
  {
    slug: "cobalt",
    name: "GT COBALT",
    model: "AERION",
    image: "/Images/CarImages/aerion-cobalt.png",
    wheels: [
      { cx: 292, cy: 538, d: 178 },
      { cx: 1000, cy: 541, d: 178 },
    ],
    performance:
      "The Cobalt high speed performance. The perfect balance between top drag and downforce improves performance and stability, even at speeds over 420 km/h. The iconic W16 8.0-litre engine now delivers an output of 1,479 kW/2,000 HP, exceeding the Cobalt by 100 HP.",
    construction:
      "The car features carbon fibre bodywork finished in matte Steel Blue exterior colour. The body is also accented with Steel Blue lines, carbon fibre. The exhaust system of the car is finished in matte black colour.",
    rentCosts: [
      { label: "12 Hours", price: "$10,000" },
      { label: "24 Hours", price: "$18,000" },
      { label: "3 Days", price: "$25,000" },
      { label: "7 Days", price: "$40,000" },
      { label: "14 Days", price: "$70,000" },
    ],
    tagline:
      "Engineered for those who demand more. The Aerion GT Cobalt combines breathtaking performance with precision craftsmanship and a design that commands attention.",
    price: "$342,000",
    status: "TRACK READY",
    quickSpecs: [
      { label: "8.0L W16", value: "ENGINE" },
      { label: "2,000 HP", value: "MAX POWER" },
      { label: "2.4 s", value: "0-100 KM/H" },
      { label: "Automatic", value: "TRANSMISSION" },
    ],
    colors: STITCH_COLORS,
    interiorImage: STITCH_COLORS[2].image,
    interiorLabel: "Sport Leather Interior — Black with Cobalt Stitching",
    gallery: [
      STITCH_COLORS[0].image,
      STITCH_COLORS[1].image,
      STITCH_COLORS[3].image,
      STITCH_COLORS[4].image,
    ],
    perfBars: [
      { label: "Top Speed", value: 92, max: "420 km/h" },
      { label: "0-100 km/h", value: 88, max: "2.4 s" },
      { label: "Power", value: 100, max: "2000 HP" },
      { label: "Torque", value: 95, max: "1600 Nm" },
    ],
    features: DEFAULT_FEATURES,
  },
  {
    slug: "emerald",
    name: "GT EMERALD",
    model: "AERION",
    image: "/Images/CarImages/aerion-emerald.png",
    wheels: [
      { cx: 327, cy: 494, d: 130 },
      { cx: 1000, cy: 505, d: 172 },
    ],
    performance:
      "The Emerald high speed performance. The perfect balance between top drag and downforce improves performance and stability, even at speeds over 418 km/h. The hybrid W16 powertrain now delivers an output of 1,400 kW/1,877 HP, exceeding the previous Emerald by 90 HP.",
    construction:
      "The car features carbon fibre bodywork finished in gloss British Racing Green exterior colour. The body is also accented with Emerald Green lines, carbon fibre. The exhaust system of the car is finished in matte black colour.",
    rentCosts: [
      { label: "12 Hours", price: "$9,900" },
      { label: "24 Hours", price: "$17,800" },
      { label: "3 Days", price: "$24,900" },
      { label: "7 Days", price: "$39,600" },
      { label: "14 Days", price: "$69,000" },
    ],
    tagline:
      "Engineered for those who demand more. The Aerion GT Emerald combines breathtaking performance with precision craftsmanship and a design that commands attention.",
    price: "$329,000",
    status: "TRACK READY",
    quickSpecs: [
      { label: "6.5L V12", value: "ENGINE" },
      { label: "1,877 HP", value: "MAX POWER" },
      { label: "2.6 s", value: "0-100 KM/H" },
      { label: "Automatic", value: "TRANSMISSION" },
    ],
    colors: STITCH_COLORS,
    interiorImage: STITCH_COLORS[3].image,
    interiorLabel: "Sport Leather Interior — Black with Emerald Stitching",
    gallery: [
      STITCH_COLORS[0].image,
      STITCH_COLORS[2].image,
      STITCH_COLORS[1].image,
      STITCH_COLORS[4].image,
    ],
    perfBars: [
      { label: "Top Speed", value: 90, max: "418 km/h" },
      { label: "0-100 km/h", value: 86, max: "2.6 s" },
      { label: "Power", value: 94, max: "1877 HP" },
      { label: "Torque", value: 90, max: "1500 Nm" },
    ],
    features: DEFAULT_FEATURES,
  },
  {
    slug: "slate",
    name: "GT SLATE",
    model: "AERION",
    image: "/Images/CarImages/aerion-gunmetal.png",
    wheels: [
      { cx: 340, cy: 580, d: 164 },
      { cx: 965, cy: 575, d: 168 },
    ],
    performance:
      "The Slate high speed performance. The perfect balance between top drag and downforce improves performance and stability, even at speeds over 415 km/h. The twin-turbo V8 now delivers an output of 1,250 kW/1,675 HP, exceeding the previous Slate by 95 HP.",
    construction:
      "The car features carbon fibre bodywork finished in satin Gunmetal Grey exterior colour. The body is also accented with Titanium Grey lines, carbon fibre. The exhaust system of the car is finished in matte black colour.",
    rentCosts: [
      { label: "12 Hours", price: "$9,800" },
      { label: "24 Hours", price: "$17,500" },
      { label: "3 Days", price: "$24,800" },
      { label: "7 Days", price: "$39,200" },
      { label: "14 Days", price: "$68,000" },
    ],
    tagline:
      "Engineered for those who demand more. The Aerion GT Slate combines breathtaking performance with precision craftsmanship and a design that commands attention.",
    price: "$318,000",
    status: "TRACK READY",
    quickSpecs: [
      { label: "4.0L V8", value: "ENGINE" },
      { label: "1,675 HP", value: "MAX POWER" },
      { label: "2.9 s", value: "0-100 KM/H" },
      { label: "Automatic", value: "TRANSMISSION" },
    ],
    colors: STITCH_COLORS,
    interiorImage: STITCH_COLORS[4].image,
    interiorLabel: "Sport Leather Interior — Black with Slate Stitching",
    gallery: [
      STITCH_COLORS[0].image,
      STITCH_COLORS[1].image,
      STITCH_COLORS[3].image,
      STITCH_COLORS[2].image,
    ],
    perfBars: [
      { label: "Top Speed", value: 87, max: "415 km/h" },
      { label: "0-100 km/h", value: 82, max: "2.9 s" },
      { label: "Power", value: 84, max: "1675 HP" },
      { label: "Torque", value: 80, max: "1350 Nm" },
    ],
    features: DEFAULT_FEATURES,
  },
  {
    slug: "onyx",
    name: "GT ONYX",
    model: "AERION",
    image: "/Images/CarImages/aerion-white.png",
    wheels: [
      { cx: 382, cy: 555, d: 146 },
      { cx: 1000, cy: 548, d: 178 },
    ],
    performance:
      "The Onyx high speed performance. The perfect balance between top drag and downforce improves performance and stability, even at speeds over 410 km/h. The naturally aspirated flat-six now delivers an output of 1,120 kW/1,500 HP, exceeding the previous Onyx by 80 HP.",
    construction:
      "The car features carbon fibre bodywork finished in gloss Pearl White exterior colour. The body is also accented with Onyx Black lines, carbon fibre. The exhaust system of the car is finished in matte black colour.",
    rentCosts: [
      { label: "12 Hours", price: "$9,500" },
      { label: "24 Hours", price: "$17,000" },
      { label: "3 Days", price: "$24,000" },
      { label: "7 Days", price: "$38,000" },
      { label: "14 Days", price: "$66,000" },
    ],
    tagline:
      "Engineered for those who demand more. The Aerion GT Onyx combines breathtaking performance with precision craftsmanship and a design that commands attention.",
    price: "$298,000",
    status: "TRACK READY",
    quickSpecs: [
      { label: "3.8L Flat-6", value: "ENGINE" },
      { label: "1,500 HP", value: "MAX POWER" },
      { label: "3.2 s", value: "0-100 KM/H" },
      { label: "Automatic", value: "TRANSMISSION" },
    ],
    colors: STITCH_COLORS,
    interiorImage: STITCH_COLORS[5].image,
    interiorLabel: "Sport Leather Interior — Black with Onyx Stitching",
    gallery: [
      STITCH_COLORS[0].image,
      STITCH_COLORS[1].image,
      STITCH_COLORS[2].image,
      STITCH_COLORS[3].image,
    ],
    perfBars: [
      { label: "Top Speed", value: 84, max: "410 km/h" },
      { label: "0-100 km/h", value: 78, max: "3.2 s" },
      { label: "Power", value: 75, max: "1500 HP" },
      { label: "Torque", value: 72, max: "1200 Nm" },
    ],
    features: DEFAULT_FEATURES,
  },
];

export const wheelPercent = (cxPx: number, cyPx: number, dPx: number) => {
  const cx = (cxPx / IMG_W) * 100;
  const cy = (cyPx / IMG_H) * 100;
  const w = (dPx / IMG_W) * 100;
  const h = (dPx / IMG_H) * 100;
  return {
    cx,
    cy,
    w,
    h,
    innerWidth: (100 / w) * 100,
    innerHeight: (100 / h) * 100,
    offsetX: 50 - (cx / w) * 100,
    offsetY: 50 - (cy / h) * 100,
  };
};
