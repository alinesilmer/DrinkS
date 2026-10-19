import { lazy, Suspense } from "react";
import { SectionRail } from "@/components/layout/SectionRail";
import { AsyncContent } from "@/components/ui/AsyncContent";
import { FlavorBands } from "@/features/home/FlavorBands";
import { Mosaic } from "@/features/home/Mosaic";
import { Night } from "@/features/home/Night";
import { Hero } from "@/features/home/Hero";
import { useAsync } from "@/hooks/useAsync";
import { getRecipeBook } from "@/services/catalogService";

// The recipe book loads in its own chunk, after the hero is already on screen.
const Dusk = lazy(() => import("@/features/recipes/Dusk").then((m) => ({ default: m.Dusk })));

/** The cover → colour bands → the promises → the recipe album → the night. */
export default function HomePage() {
  const book = useAsync(getRecipeBook);

  return (
    <>
      <SectionRail />
      <Hero />
      <main>
        <FlavorBands />
        <Mosaic />
        <AsyncContent state={book}>
          {(data) => (
            <Suspense>
              <Dusk recipes={data.recipes} groups={data.ingredientGroups} />
            </Suspense>
          )}
        </AsyncContent>
        <Night />
      </main>
    </>
  );
}
