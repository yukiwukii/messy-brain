import { i18n } from "../../i18n"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const NotFound: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
  const baseDir = url.pathname

  return (
    <article class="popover-hint">
      <h1 class="not-found-title">404 — Page Not Found</h1>
      <pre class="not-found-ascii">{`
    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
    ░░   you fell off the map.   ░░
    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

     ∧,,∧  ／|    ∧＿∧  ／
    (ﾟДﾟ；)＜  |   (╥﹏╥)＜  help
    ／|   |＼  |   ／|   |＼
  _( |   | )_|  （  |   |  ）
      ＼＿／        ＼＿／

  (ノಠ益ಠ)ノ彡┻━┻    ┬─┬ノ(º _ ºノ)

    ˙◠˙  ← this page doesn't exist
    `}</pre>
      <a href={baseDir}>{i18n(cfg.locale).pages.error.home}</a>
    </article>
  )
}

NotFound.css = `
.not-found-title {
  font-size: 2rem;
  margin-bottom: 0;
}

.not-found-ascii {
  font-family: var(--codeFont);
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--darkgray);
  background: none;
  border: none;
  padding: 0;
  margin: 1rem 0 2rem 0;
  white-space: pre;
}
`

export default (() => NotFound) satisfies QuartzComponentConstructor
