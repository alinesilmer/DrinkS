import { AsyncContent } from "@/components/ui/AsyncContent";
import { Dusk } from "@/features/recipes/Dusk";
import { useAsync } from "@/hooks/useAsync";
import { getRecipeBook } from "@/services/catalogService";

/** Recetas: "¿Qué preparo hoy?", the notepad of what you have at home and the album of recipes you can make. */
export default function RecipesPage() {
  const book = useAsync(getRecipeBook);

  return (
    <main className="page">
      <AsyncContent state={book}>{(data) => <Dusk recipes={data.recipes} groups={data.ingredientGroups} />}</AsyncContent>
    </main>
  );
}
