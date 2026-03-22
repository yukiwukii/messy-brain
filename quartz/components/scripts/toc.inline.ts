const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    const slug = entry.target.id
    const tocEntryElements = document.querySelectorAll(`a[data-for="${slug}"]`)
    const windowHeight = entry.rootBounds?.height
    if (windowHeight && tocEntryElements.length > 0) {
      if (entry.boundingClientRect.y < windowHeight) {
        tocEntryElements.forEach((tocEntryElement) => tocEntryElement.classList.add("in-view"))
      } else {
        tocEntryElements.forEach((tocEntryElement) => tocEntryElement.classList.remove("in-view"))
      }
    }
  }
})

function toggleToc(this: HTMLElement) {
  this.classList.toggle("collapsed")
  this.setAttribute(
    "aria-expanded",
    this.getAttribute("aria-expanded") === "true" ? "false" : "true",
  )
  const content = this.nextElementSibling as HTMLElement | undefined
  if (!content) return
  content.classList.toggle("collapsed")
}

function handleTocLinkClick(this: HTMLAnchorElement, e: Event) {
  e.preventDefault()
  e.stopPropagation()
  const targetId = this.getAttribute("data-for")
  if (!targetId) return

  // Remove active from all TOC links
  document.querySelectorAll(".toc-content a.active").forEach((el) => el.classList.remove("active"))
  this.classList.add("active")

  const target = document.getElementById(targetId)
  if (target) {
    const rect = target.getBoundingClientRect()
    const offset = window.scrollY + rect.top - window.innerHeight * 0.25
    window.scrollTo({ top: offset, behavior: "smooth" })
    history.pushState({}, "", `#${targetId}`)

    // Flash highlight the header
    target.classList.add("toc-highlight")
    setTimeout(() => target.classList.remove("toc-highlight"), 3000)
  }
}

function setupToc() {
  for (const toc of document.getElementsByClassName("toc")) {
    const button = toc.querySelector(".toc-header")
    const content = toc.querySelector(".toc-content")
    if (!button || !content) return
    button.addEventListener("click", toggleToc)
    window.addCleanup(() => button.removeEventListener("click", toggleToc))
  }

  const tocLinks = document.querySelectorAll<HTMLAnchorElement>(".toc-content a[data-for]")
  tocLinks.forEach((link) => {
    link.addEventListener("click", handleTocLinkClick)
    window.addCleanup(() => link.removeEventListener("click", handleTocLinkClick))
  })
}

document.addEventListener("nav", () => {
  setupToc()

  // staggered entrance animation
  document.querySelectorAll<HTMLElement>(".toc-content > li").forEach((li, i) => {
    li.style.setProperty("--i", String(i))
    li.classList.remove("toc-animate")
    // force reflow so re-navigation replays the animation
    void li.offsetWidth
    li.classList.add("toc-animate")
  })

  // update toc entry highlighting
  observer.disconnect()
  const headers = document.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]")
  headers.forEach((header) => observer.observe(header))
})
