import { NodeRendererProps } from "react-arborist"

import { GraphNode } from "@/graph/graph-types.ts"

// function Node({ node, style, dragHandle }: NodeRendererProps<GmailItem>) {
//   const Icon = node.data.icon || BsTree;
//   return (
//     <div
//       ref={dragHandle}
//       style={style}
//       className={clsx(styles.node, node.state)}
//       onClick={() => node.isInternal && node.toggle()}
//     >
//       <FolderArrow node={node} />
//       <span>
//         <Icon />
//       </span>
//       <span>{node.isEditing ? <Input node={node} /> : node.data.name}</span>
//       <span>{node.data.unread === 0 ? null : node.data.unread}</span>
//     </div>
//   );
// }

// function Input({ node }: { node: NodeApi<GmailItem> }) {
//   return (
//     <input
//       autoFocus
//       type="text"
//       defaultValue={node.data.name}
//       onFocus={(e) => e.currentTarget.select()}
//       onBlur={() => node.reset()}
//       onKeyDown={(e) => {
//         if (e.key === "Escape") node.reset();
//         if (e.key === "Enter") node.submit(e.currentTarget.value);
//       }}
//     />
//   );
// }

// function FolderArrow({ node }: { node: NodeApi<GmailItem> }) {
//   if (node.isLeaf) return <span></span>;
//   return (
//     <span>
//       {node.isOpen ? <icons.MdArrowDropDown /> : <icons.MdArrowRight />}
//     </span>
//   );
// }

export function ArboristNode({
  node,
  style,
  dragHandle,
}: NodeRendererProps<GraphNode>) {
  return (
    <div
      style={style}
      ref={dragHandle}
      className="text-green-500"
      data-focused={node.isFocused}
    >
      {node.isLeaf ? "🍁" : "📁"}
      {node.data.name}
    </div>
  )
}
