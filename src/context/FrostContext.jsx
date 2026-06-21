import { createContext, useContext, useEffect, useState } from "react"

const FrostContext = createContext()

/**
 * Frost mode — the portfolio's "supreme form".
 * Sets data-frost="on" on <html>, which (a) swaps the entire CSS-variable
 * palette to the glacial theme in index.css and (b) reveals the FrostBg
 * atmosphere by making the page shell transparent. Persists across reloads.
 */
export function FrostProvider({ children }) {
  const [frost, setFrost] = useState(() => {
    try { return localStorage.getItem("frost") === "on" } catch { return false }
  })

  useEffect(() => {
    document.documentElement.setAttribute("data-frost", frost ? "on" : "off")
    try { localStorage.setItem("frost", frost ? "on" : "off") } catch { /* ignore */ }
  }, [frost])

  return (
    <FrostContext.Provider value={{ frost, toggle: () => setFrost(f => !f) }}>
      {children}
    </FrostContext.Provider>
  )
}

export const useFrost = () => useContext(FrostContext)
