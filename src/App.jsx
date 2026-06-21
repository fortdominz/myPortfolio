import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./ThemeContext"
import { FrostProvider } from "./context/FrostContext"
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
import FrostBg from "./components/FrostBg"
import FrostToggle from "./components/FrostToggle"
import LifeJourney   from "./pages/lifepeek/LifeJourney"
import OpenWorld     from "./pages/lifepeek/OpenWorld"
import TouchingGrass from "./pages/lifepeek/TouchingGrass"
import ProjectDetail from "./pages/projects/ProjectDetail"
import ScrollToTop from "./components/ScrollToTop"
import CommandDeck from "./components/CommandDeck"

function Portfolio({ booted, onBoot }) {
  useEffect(() => {
    document.title = "Dominion Eze — AI Engineer & System Architect"
  }, [])

  return (
    <>
      {!booted && <LoadingScreen onDone={onBoot} />}
      {/* Glacial atmosphere — only renders while Frost mode is engaged */}
      <FrostBg />
      <div className="frost-shell" style={{ minHeight: "100vh", backgroundColor: "var(--bg)", paddingBottom: "26px", position: "relative", zIndex: 1 }}>
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
      {/* Add Frost / Release control */}
      <FrostToggle />
    </>
  )
}

export default function App() {
  const [booted, setBooted] = useState(false)

  return (
    <BrowserRouter>
      <ThemeProvider>
        <FrostProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/"         element={<Portfolio booted={booted} onBoot={() => setBooted(true)} />} />
            <Route path="/projects/:id"             element={<ProjectDetail />}  />
            <Route path="/lifepeek"                element={<CommandDeck />}    />
            <Route path="/lifepeek/life-journey"   element={<LifeJourney />}    />
            <Route path="/lifepeek/open-world"     element={<OpenWorld />}      />
            <Route path="/lifepeek/touching-grass" element={<TouchingGrass />}  />
          </Routes>
        </FrostProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
