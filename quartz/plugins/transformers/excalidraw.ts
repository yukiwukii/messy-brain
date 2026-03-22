import { QuartzTransformerPlugin } from "../types"

// Rewrites ![[*.excalidraw]] embeds to ![[*.excalidraw.svg]] so Quartz
// displays the auto-exported SVG instead of the raw excalidraw markdown.
export const Excalidraw: QuartzTransformerPlugin = () => ({
  name: "Excalidraw",
  textTransform(_ctx, src) {
    return src.replace(/!\[\[([^\]]+\.excalidraw)\]\]/g, "![[$1.png]]")
  },
})
