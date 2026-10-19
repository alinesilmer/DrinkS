import { useState } from "react";
import { useScrollFrame } from "@/hooks/useScrollFrame";

/**
 * The id of the last section whose top has passed the middle of the viewport.
 * Looked up on every scroll frame, so sections that mount later (lazy chunks) are found too.
 */
export function useActiveSection(ids: readonly string[]): string | undefined {
  const [active, setActive] = useState(ids[0]);

  useScrollFrame(() => {
    let current = ids[0];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top < innerHeight * 0.5) current = id;
    });
    setActive(current);
  });

  return active;
}
