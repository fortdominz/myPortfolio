import { createContext, useContext, useState } from "react"

const DomainExpansionContext = createContext()

export function DomainExpansionProvider({ children }) {
  const [expanded, setExpanded] = useState(false)

  const toggle = () => {
    setExpanded(prev => {
      const next = !prev
      document.documentElement.setAttribute("data-domain", next ? "expanded" : "default")
      return next
    })
  }

  return (
    <DomainExpansionContext.Provider value={{ expanded, toggle }}>
      {children}
    </DomainExpansionContext.Provider>
  )
}

export const useDomainExpansion = () => useContext(DomainExpansionContext)
