import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir}>{title}</a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  font-size: 1.75rem;
  margin: 0;
  font-family: var(--titleFont);
}
`

PageTitle.afterDOMLoaded = `
const pageTitles = [
  "(｡•́︿•̀｡)",
  "(°·._.·°)",
  "(っ˘ڡ˘ς)",
  "ᕙ( •̀ ᗜ •́ )ᕗ",
  "(｡•ㅅ•｡)~✧",
  "૭( ᵕ•̀ᵕ•́૭)",
  "(૭ •́ ᵕ•̀ )૭",
  "(๑>؂·̀๑)",
  "৻(•̀ᗜ•́৻)",
  "٩(•̤̀ᵕ•̤́๑)",
  "ᕙ(⇀‸↼‶)ᕗ",
  "(˶ᵔ ᵕ ᵔ˶)",
  "( •̀ ω •́ )✧",
  "(⁠ ⁠˘⁠ ⁠³⁠˘⁠)♥",
  "꒰⑅•ᴗ•⑅꒱",
  "₍ᐢ•ﻌ•ᐢ₎",
  "(ฅ•ω•ฅ)",
  "ฅ^•ﻌ•^ฅ",
  "(=^･ω･^=)",
  "( ͡° ͜ʖ ͡°)",
  "(¬‿¬)",
  "(◕‿◕✿)",
  "(づ｡◕‿‿◕｡)づ",
  "✿◠‿◠",
  "(⌐■_■)",
  "¯\\_(ツ)_/¯",
  "(҂◡_◡)",
  "(⊙_⊙)",
  "(●'◡'●)",
  "^( •ω• )^",
  "(｀・ω・´)",
  "(≧◡≦)",
  "(*^▽^*)",
  "(´｡• ω •｡\`)",
  "꒰˶• ༝ •˶꒱",
  "(˘▽˘>ԅ( ˘▽˘)",
  "( •_•)>⌐■-■",
  "ʕ•ᴥ•ʔ",
  "ʕ·ᴥ·ʔ",
  "(ᵔᴥᵔ)",
  "( ˶ˆᗜˆ˵ )",
  "˙ ˖ ✧",
  "✦ ˚ . ✦",
  "⋆｡‧˚ʚ♡ɞ˚‧｡⋆",
  "˚ ⋆ ꕥ ⋆ ˚",
  "✮ ⋆ ˚｡",
  "₊˚⊹♡",
  "˚₊‧꒰ა ♡ ໒꒱‧₊˚",
]

function randomizePageTitle() {
  const el = document.querySelector(".page-title a")
  if (el) {
    el.textContent = pageTitles[Math.floor(Math.random() * pageTitles.length)]
  }
}

randomizePageTitle()
document.addEventListener("nav", randomizePageTitle)
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
