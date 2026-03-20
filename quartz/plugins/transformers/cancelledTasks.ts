import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"
import { Element, Text } from "hast"

/**
 * Transforms Obsidian-style cancelled tasks `- [-] text` into styled list items
 * with a visual X checkbox and strikethrough, since remark-gfm only handles [ ] and [x].
 */
export const CancelledTasks: QuartzTransformerPlugin = () => {
  return {
    name: "CancelledTasks",
    htmlPlugins() {
      return [
        () => (tree) => {
          visit(tree, "element", (node: Element) => {
            if (node.tagName !== "li") return

            // The text may be directly in the li or wrapped in a <p>
            const firstChild = node.children[0]
            if (!firstChild) return

            let textNode: Text | null = null
            let insertTarget: Element = node

            if (
              firstChild.type === "element" &&
              (firstChild as Element).tagName === "p"
            ) {
              insertTarget = firstChild as Element
              const first = insertTarget.children[0]
              if (first?.type === "text") textNode = first as Text
            } else if (firstChild.type === "text") {
              textNode = firstChild as Text
            }

            if (!textNode || !textNode.value.startsWith("[-] ")) return

            // Strip the [-] prefix from the text
            textNode.value = textNode.value.slice(4)

            // Mark the <li> as a cancelled task
            const existing = (node.properties?.className as string[]) ?? []
            node.properties = {
              ...node.properties,
              className: [...existing, "task-list-item", "task-cancelled"],
            }

            // Insert a disabled checkbox before the text
            const checkbox: Element = {
              type: "element",
              tagName: "input",
              properties: {
                type: "checkbox",
                disabled: true,
                "data-task": "-",
              },
              children: [],
            }

            insertTarget.children.unshift(checkbox)
          })
        },
      ]
    },
  }
}
