import { type ReactNode } from "react";
import { type AsyncState } from "@/hooks/useAsync";
import { STATUS } from "@/data/content";

interface AsyncContentProps<T> {
  state: AsyncState<T>;
  children: (data: T) => ReactNode;
}

/** Loading text, error text, or the content once the data is in. */
export function AsyncContent<T>({ state, children }: AsyncContentProps<T>) {
  if (state.status === "loading") return <p className="loading">{STATUS.loading}</p>;
  if (state.status === "error") return <p className="loading">{STATUS.error}</p>;
  return <>{children(state.data)}</>;
}
