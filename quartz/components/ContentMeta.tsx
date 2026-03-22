import { Date } from "./Date"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import readingTime from "reading-time"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { JSX } from "preact"
import style from "./styles/contentMeta.scss"

interface ContentMetaOptions {
  /**
   * Whether to display reading time
   */
  showReadingTime: boolean
  showComma: boolean
}

const defaultOptions: ContentMetaOptions = {
  showReadingTime: true,
  showComma: true,
}

export default ((opts?: Partial<ContentMetaOptions>) => {
  // Merge options with defaults
  const options: ContentMetaOptions = { ...defaultOptions, ...opts }

  function ContentMetadata({ cfg, fileData, displayClass }: QuartzComponentProps) {
    const text = fileData.text

    // Don't show metadata on index pages
    const slug = fileData.slug
    if (!slug || slug === "index" || slug.endsWith("/index")) return null

    if (text) {
      const segments: (string | JSX.Element)[] = []

      if (fileData.dates?.created) {
        segments.push(
          <span>
            created <Date date={fileData.dates.created} locale={cfg.locale} />
          </span>,
        )
      }

      if (
        fileData.dates?.modified &&
        fileData.dates.modified.toISOString() !== fileData.dates.created?.toISOString()
      ) {
        segments.push(
          <span>
            modified <Date date={fileData.dates.modified} locale={cfg.locale} />
          </span>,
        )
      }

      // Display reading time if enabled
      if (options.showReadingTime) {
        const { minutes, words: _words } = readingTime(text)
        const displayedTime = i18n(cfg.locale).components.contentMeta.readingTime({
          minutes: Math.ceil(minutes),
        })
        segments.push(<span>{displayedTime}</span>)
      }

      if (segments.length === 0) return null

      return (
        <p show-comma={options.showComma} class={classNames(displayClass, "content-meta")}>
          {segments}
        </p>
      )
    } else {
      return null
    }
  }

  ContentMetadata.css = style

  return ContentMetadata
}) satisfies QuartzComponentConstructor
