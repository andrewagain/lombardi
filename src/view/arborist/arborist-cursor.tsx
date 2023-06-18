import { CursorProps } from "react-arborist";

export default function ArboristCursor({ top, left }: CursorProps) {
  return (
    <div
      className="w-full h-2 bg-slate-800 dark:bg-slate-200"
      style={{ top, left }}
    ></div>
  );
}
