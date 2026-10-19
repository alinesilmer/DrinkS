import { Button } from "@/components/ui/Button";
import { CheckItem } from "@/components/ui/CheckItem";
import { SearchInput } from "@/components/ui/SearchInput";
import { Tabs } from "@/components/ui/Tabs";
import { type PantryState } from "@/features/recipes/usePantry";
import { RECIPE_BOOK } from "@/data/content";
import { type IngredientGroup, type IngredientId } from "@/types/catalog";

interface NotepadProps {
  pantry: PantryState;
  groups: IngredientGroup[];
  onToggle: (id: IngredientId) => void;
}

/** A wide notepad above the book: what you have at home, ticked off line by line. */
export function Notepad({ pantry, groups, onToggle }: NotepadProps) {
  const shown = pantry.searching
    ? pantry.matches
    : (groups.find((g) => g.title === pantry.activeGroup)?.items ?? []);

  return (
    <aside className="notepad" aria-label={RECIPE_BOOK.notepad}>
      <div className="notepad__sheet">
        <h3 className="notepad__title">{RECIPE_BOOK.notepad}</h3>
        <SearchInput
          value={pantry.query}
          onChange={pantry.setQuery}
          onSubmit={pantry.addFirstMatch}
          label={RECIPE_BOOK.search}
          placeholder={RECIPE_BOOK.search}
        />
        {!pantry.searching && (
          <Tabs
            label={RECIPE_BOOK.notepad}
            items={groups.map((g) => ({ id: g.title, label: g.short, marked: pantry.hasTicked(g) }))}
            active={pantry.activeGroup}
            onChange={pantry.setActiveGroup}
          />
        )}
        {shown.length === 0 ? (
          <p className="notepad__empty">{RECIPE_BOOK.noMatch}</p>
        ) : (
          <ul className="notepad__list" role={pantry.searching ? undefined : "tabpanel"}>
            {shown.map((item) => (
              <CheckItem key={item.id} checked={pantry.have.has(item.id)} onToggle={() => onToggle(item.id)}>
                {item.label}
              </CheckItem>
            ))}
          </ul>
        )}
        <Button variant="link" className="notepad__clear" onClick={pantry.clear}>
          {RECIPE_BOOK.clear}
        </Button>
      </div>
    </aside>
  );
}
