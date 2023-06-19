import { CursorProps } from "react-arborist"

export default function ArboristCursor({ top, left, indent }: CursorProps) {
  return (
    <div
      className="w-full h-0 border-t-2 border-white absolute"
      style={{ top, left, marginLeft: indent }}
    ></div>
  )
}
