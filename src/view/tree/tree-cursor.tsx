import { CursorProps } from "react-arborist"

export default function ArboristCursor({ top, left }: CursorProps) {
  return (
    <div
      className="w-full h-0 border-t-2 border-white border-dotted absolute"
      style={{ top, left }}
    ></div>
  )
}
