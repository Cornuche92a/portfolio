import About from "@/components/about";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import HackTheBox from "@/components/hackthebox";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import SectionDivider from "@/components/section-divider";
import Skills from "@/components/skills";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4 sm:px-6">
      <Intro />
      <SectionDivider />
      <About />
      <HackTheBox />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </main>
  );
}
