import { notFound } from "next/navigation";
import CarDetail from "@/components/CarDetail";
import { CARS } from "@/data/cars";

export function generateStaticParams() {
  return CARS.map((car) => ({ slug: car.slug }));
}

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const car = CARS.find((c) => c.slug === slug);

  if (!car) {
    notFound();
  }

  return <CarDetail car={car} />;
}
