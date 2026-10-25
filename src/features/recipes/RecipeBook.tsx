import { useEffect, useMemo, useRef, useState } from "react";
import { Pager } from "@/components/ui/Pager";
import { RecipeDetail } from "@/features/recipes/RecipeDetail";
import { StampSpread } from "@/features/recipes/StampSpread";
import { indexIngredients, productsFor, rankRecipes } from "@/features/recipes/recipeLogic";
import { useFlash } from "@/hooks/useFlash";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { isWiderThanTablet } from "@/lib/breakpoints";
import { RECIPE_BOOK } from "@/data/content";
import { type IngredientGroup, type IngredientId, type Recipe } from "@/types/catalog";

/** Stamps on each page of the album; a spread shows two pages. */
const PER_PAGE = 6;

type TurnDirection = "forward" | "back";

/** The turn lasts 1 s; the pages change at 450 ms, while the sheet stands nearly edge-on. */
const TURN_MS = 1000;
const SWAP_MS = 450;

interface RecipeBookProps {
  recipes: Recipe[];
  groups: IngredientGroup[];
  have: ReadonlySet<IngredientId>;
  spread: number;
  onSpread: (spread: number) => void;
}

/**
 * A stamp album: every recipe a stamp, the ones you can make first. Turning the pages of the
 * album turns a two-sided sheet over the spine; opening a stamp lays a paper notepad with the
 * recipe in its place.
 */
export function RecipeBook({ recipes, groups, have, spread, onSpread }: RecipeBookProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [turning, startTurn] = useFlash(TURN_MS);
  const reduced = useReducedMotion();
  const swap = useRef<number | undefined>(undefined);
  const [direction, setDirection] = useState<TurnDirection>("forward");

  const ingredients = useMemo(() => indexIngredients(groups), [groups]);
  const ranked = useMemo(() => rankRecipes(recipes, have), [recipes, have]);
  const open = ranked.find((r) => r.recipe.id === openId);

  const spreads = Math.max(1, Math.ceil(ranked.length / (PER_PAGE * 2)));
  const current = Math.min(spread, spreads - 1);
  const first = current * PER_PAGE * 2;

  useEffect(() => () => window.clearTimeout(swap.current), []);

  const turnTo = (dir: TurnDirection, next: () => void) => {
    if (turning) return;
    if (reduced || !isWiderThanTablet()) return next();
    setDirection(dir);
    startTurn();
    swap.current = window.setTimeout(next, SWAP_MS);
  };

  return (
    <div className="book-wrap" aria-live="polite">
      {open ? (
        <RecipeDetail
          recipe={open.recipe}
          have={have}
          missing={open.missing}
          buyable={productsFor(open.missing, ingredients)}
          ingredients={ingredients}
          onBack={() => setOpenId(null)}
        />
      ) : (
        <>
          <div className="book">
            <StampSpread
              left={ranked.slice(first, first + PER_PAGE)}
              right={ranked.slice(first + PER_PAGE, first + PER_PAGE * 2)}
              perPage={PER_PAGE}
              ghost={recipes[0]}
              onOpen={setOpenId}
            />
            {turning && (
              <div className={`book__sheet book__sheet--${direction}`} aria-hidden="true">
                <span className="book__face book__face--front" />
                <span className="book__face book__face--back" />
              </div>
            )}
          </div>
          <Pager
            page={current}
            pages={spreads}
            onChange={(p) => turnTo(p > current ? "forward" : "back", () => onSpread(p))}
            label={RECIPE_BOOK.pages}
          />
        </>
      )}
    </div>
  );
}
