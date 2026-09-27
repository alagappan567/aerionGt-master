import Hero from "@/components/Hero";
import CarShowcase from "@/components/CarShowcase";
import FeaturedVehicles from "@/components/FeaturedVehicles";
import CarDetail from "@/components/CarDetail";
import { CARS } from "@/data/cars";

export default function Home() {
  return (
    <>
      <Hero />
      <CarShowcase />
      <FeaturedVehicles />
      <CarDetail car={CARS[0]} embedded />
    </>
  );
}
