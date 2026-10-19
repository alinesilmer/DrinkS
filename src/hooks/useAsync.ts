import { useEffect, useState } from "react";

export type AsyncState<T> = { status: "loading" } | { status: "ready"; data: T } | { status: "error"; error: Error };

/** Loads data once on mount and ignores the result if the component unmounted meanwhile. */
export function useAsync<T>(load: () => Promise<T>): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ status: "loading" });

  useEffect(() => {
    let alive = true;
    load()
      .then((data) => alive && setState({ status: "ready", data }))
      .catch((e: unknown) => alive && setState({ status: "error", error: e instanceof Error ? e : new Error(String(e)) }));
    return () => {
      alive = false;
    };
  }, [load]);

  return state;
}
