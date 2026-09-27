export type FeaturedVehicle = {
  name: string;
  price: string;
  badge: string;
  engine: string;
  power: string;
  transmission: string;
  image: string;
};

const BASE =
  "/Images/stitch_multi_color_car_visualizer/stitch_multi_color_car_visualizer";

export const FEATURED_VEHICLES: FeaturedVehicle[] = [
  {
    name: "2024 Aerion GT Guards Red",
    price: "$298,000",
    badge: "NEW ARRIVAL",
    engine: "4.6L V8",
    power: "608 HP",
    transmission: "Automatic",
    image: `${BASE}/a_high_performance_studio_shot_of_a_porsche_918_spyder_in_guards_red_viewed/screen.png`,
  },
  {
    name: "2023 Aerion GT Metallic Silver",
    price: "$276,500",
    badge: "LOW MILEAGE",
    engine: "4.6L V8",
    power: "608 HP",
    transmission: "Automatic",
    image: `${BASE}/a_high_performance_studio_shot_of_a_porsche_918_spyder_in_metallic_silver/screen.png`,
  },
  {
    name: "2024 Aerion GT Miami Blue",
    price: "$312,000",
    badge: "BEST SELLER",
    engine: "4.6L V8",
    power: "608 HP",
    transmission: "Automatic",
    image: `${BASE}/a_high_performance_studio_shot_of_a_porsche_918_spyder_in_miami_blue_viewed/screen.png`,
  },
  {
    name: "2024 Aerion GT Python Green",
    price: "$305,000",
    badge: "LIMITED STOCK",
    engine: "4.6L V8",
    power: "608 HP",
    transmission: "Automatic",
    image: `${BASE}/a_high_performance_studio_shot_of_a_porsche_918_spyder_in_python_green_viewed/screen.png`,
  },
  {
    name: "2024 Aerion GT Chalk White",
    price: "$289,000",
    badge: "CERTIFIED",
    engine: "4.6L V8",
    power: "608 HP",
    transmission: "Automatic",
    image: `${BASE}/a_high_performance_studio_shot_of_a_porsche_918_spyder_in_chalk_white_viewed/screen.png`,
  },
  {
    name: "2024 Aerion GT Racing Yellow",
    price: "$318,000",
    badge: "TRACK READY",
    engine: "4.6L V8",
    power: "608 HP",
    transmission: "Automatic",
    image: `${BASE}/a_high_performance_studio_shot_of_a_porsche_918_spyder_in_racing_yellow_viewed/screen.png`,
  },
];
