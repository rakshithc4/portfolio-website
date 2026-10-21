import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/sections/hero"
import { Marquee } from "@/components/sections/marquee"
import { About } from "@/components/sections/about"
import { Projects } from "@/components/sections/projects"
import { Experience } from "@/components/sections/experience"
import { Skills } from "@/components/sections/skills"
import { EducationCerts } from "@/components/sections/education-certs"
import { ContactFooter } from "@/components/sections/contact-footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <EducationCerts />
      </main>
      <ContactFooter />
    </div>
  )
}
