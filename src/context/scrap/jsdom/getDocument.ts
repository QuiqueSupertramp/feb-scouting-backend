import { JSDOM } from "jsdom"

export const getDocument = async (url: string) => {
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } })
    const html = await res.text()
    if (!html) return

    const dom = new JSDOM(html, {
      resources: "usable",
      pretendToBeVisual: false,
    })

    dom.window.document.querySelectorAll('link[rel="stylesheet"]').forEach((l) => l.remove())
    dom.window.document.querySelectorAll("style").forEach((s) => s.remove())

    return dom.window.document
  } catch {
    return undefined
  }
}
