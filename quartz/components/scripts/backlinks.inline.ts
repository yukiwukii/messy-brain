document.addEventListener("nav", () => {
  // Calculate when TOC finishes so backlinks start after
  const tocItems = document.querySelectorAll(".toc-content > li")
  const tocDuration = tocItems.length > 0 ? (tocItems.length - 1) * 40 + 250 : 0

  document.querySelectorAll<HTMLElement>(".backlinks ul.overflow > li").forEach((li, i) => {
    li.style.setProperty("--backlink-base-delay", `${tocDuration}ms`)
    li.style.setProperty("--i", String(i))
    li.classList.remove("backlink-animate")
    void li.offsetWidth
    li.classList.add("backlink-animate")
  })
})
