import { useState } from "react"
import { ThemeProvider } from "./ThemeContext"
import Nav from "./components/Nav"
import Hero from "./components/Hero"
import About from "./components/About"
import Skills from "./components/Skills"
import Projects from "./components/Projects"
import Education from "./components/Education"
import Experience from "./components/Experience"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import LoadingScreen from "./components/LoadingScreen"
import StatusBar from "./components/StatusBar"
import FadeIn from "./components/FadeIn"

export default function App() {
  const [booted, setBooted] = useState(false)

  return (
    <ThemeProvider>
      <LoadingScreen onDone={() => setBooted(true)} />
      <div style={{ minHeight: "100vh", backgroundColor: "var(--bg)", paddingBottom: "26px" }}>
        <Nav />
        <main style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Hero />
          <FadeIn ready={booted}><About /></FadeIn>
          <FadeIn ready={booted} delay={50}><Skills /></FadeIn>
          <FadeIn ready={booted}><Projects /></FadeIn>
          <FadeIn ready={booted} delay={50}><Education /></FadeIn>
          <FadeIn ready={booted}><Experience /></FadeIn>
          <FadeIn ready={booted} delay={50}><Contact /></FadeIn>
        </main>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <FadeIn ready={booted} delay={100}><Footer /></FadeIn>
        </div>
        <StatusBar />
      </div>
    </ThemeProvider>
  )
}
