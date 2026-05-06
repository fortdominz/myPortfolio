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

export default function App() {
  return (
    <ThemeProvider>
      <div style={{ minHeight: "100vh", backgroundColor: "var(--bg)" }}>
        <Nav />
        <main style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Experience />
          <Contact />
        </main>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  )
}
