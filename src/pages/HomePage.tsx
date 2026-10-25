import { FlavorSpin } from "@/features/home/FlavorSpin";
import { Hero } from "@/features/home/Hero";
import { Mosaic } from "@/features/home/Mosaic";

/** The cover → the three colour screens → the promises. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <main>
        <FlavorSpin />
        <Mosaic />
      </main>
    </>
  );
}
