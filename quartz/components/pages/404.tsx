import { i18n } from "../../i18n"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const NotFound: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
  const baseDir = url.pathname

  return (
    <article class="popover-hint">
      <pre class="not-found-ascii">{`
    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
    ░░   you fell off the map.   ░░
    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

        ∧＿∧
       （；ŏ＿ŏ）   < this page
       ／|    |＼       doesn't exist
      (  |    |  )
         ＼＿／

      4  0  4  not found
    `}</pre>
      <a href={baseDir}>{i18n(cfg.locale).pages.error.home}</a>
    </article>
  )
}

NotFound.css = `
.not-found-ascii {
  font-family: var(--codeFont);
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--darkgray);
  background: none;
  border: none;
  padding: 0;
  margin: 2rem 0;
  white-space: pre;
}
`

export default (() => NotFound) satisfies QuartzComponentConstructor
