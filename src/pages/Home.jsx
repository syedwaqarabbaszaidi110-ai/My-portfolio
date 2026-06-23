import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Marquee from "../components/Marquee";
import Service from "../components/Service";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Service/>
      <Projects />
      <Contact />
    </>
  );
}
