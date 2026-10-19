import { useCallback, useMemo, useState } from "react";
import { filterGroups } from "@/features/recipes/recipeLogic";
import { DEFAULT_PANTRY } from "@/data/ingredients";
import { type IngredientGroup, type IngredientId } from "@/types/catalog";

/** What the visitor has at home, the search box, and which category tab is open. */
export function usePantry(groups: IngredientGroup[]) {
  const [have, setHave] = useState<ReadonlySet<IngredientId>>(() => new Set(DEFAULT_PANTRY));
  const [query, setQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState(groups[0]?.title ?? "");

  const searching = query.trim().length > 0;
  const matches = useMemo(() => filterGroups(groups, query).flatMap((g) => g.items), [groups, query]);

  const toggle = useCallback(
    (id: IngredientId) =>
      setHave((h) => {
        const next = new Set(h);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      }),
    [],
  );

  const clear = useCallback(() => {
    setHave(new Set());
    setQuery("");
  }, []);

  /** Enter in the search box ticks the first match and empties the box. */
  const addFirstMatch = useCallback(() => {
    const first = matches[0];
    if (!searching || !first) return;
    setHave((h) => new Set(h).add(first.id));
    setQuery("");
  }, [matches, searching]);

  /** Does this category have anything ticked? (a small dot on its tab) */
  const hasTicked = (group: IngredientGroup) => group.items.some((i) => have.has(i.id));

  return { have, query, setQuery, searching, matches, activeGroup, setActiveGroup, toggle, clear, addFirstMatch, hasTicked };
}

export type PantryState = ReturnType<typeof usePantry>;
