import Hero from "@/components/Hero";

export const metadata = {
  title: "Aakash Ambodkar - Software Engineer",
  description: "Full Stack Developer | AI/ML | System Design",
};

export default function Home() {
  return (
    <main>
      <Hero 
        title="Aakash Ambodkar"
        subtitle="Software Engineer @ Optum | Full Stack & AI/ML | System Design"
        showButton={true}
      />
      <div className="body-content">
        {/* First section: Intro para 1-2 */}
        <div className="intro-section">
          <div className="intro">
            <h2>Hey there!</h2>
            <p>
              I'm Aakash — a passionate Software Engineer focused on Full-Stack
              development, AI/ML engineering, and distributed systems. I enjoy
              turning ideas into real products, improving systems, and learning
              whatever it takes to build better software.
            </p>
            <p>
              Most of my work revolves around full-stack development, backend
              systems, and building AI/ML driven applications. I'm comfortable
              designing APIs, working with databases, and building end-to-end
              features. When something is new, I learn it quickly and apply it
              without overthinking — that's just how I operate.
            </p>
          </div>
          <div className="image-placeholder mobile-image">
            <img
              src="https://camo.githubusercontent.com/9e7e054f97008a0e71e75db243d40d2e92b713c13e8f19ac28fc1f216e9345ad/68747470733a2f2f63646e2e6472696262626c652e636f6d2f75736572732f313136323037372f73637265656e73686f74732f333834383931342f70726f6772616d6d65722e676966"
              alt="Developer Image"
              loading="lazy"
            />
          </div>
        </div>

        {/* Second section: Intro para 3-4 */}
        <div className="intro-section">
          <div className="intro">
            <p>
              I am confident that my technical skills, combined with my zeal to
              learn and contribute, make me a valuable addition to any team. I am
              excited about the possibility of engaging in innovative projects and
              becoming an integral part of your talented team.
            </p>
            <p>
              Outside of coding, I stay active through fitness routines, playing
              soccer, and exploring new hiking trails. It helps me reset, stay
              focused, and keep my mind sharp. I'm always looking for ways to grow
              my skills and stay updated with the latest in tech. Let's connect!
            </p>
          </div>
        </div>

        {/* Desktop layout: Intro + Image side by side */}
        <div className="desktop-layout">
          <div className="intro">
            <h2>Hey there!</h2>
            <p>
              I'm Aakash — a passionate Software Engineer focused on Full-Stack
              development, AI/ML engineering, and distributed systems. I enjoy
              turning ideas into real products, improving systems, and learning
              whatever it takes to build better software.
            </p>
            <p>
              Most of my work revolves around full-stack development, backend
              systems, and building AI/ML driven applications. I'm comfortable
              designing APIs, working with databases, and building end-to-end
              features. When something is new, I learn it quickly and apply it
              without overthinking — that's just how I operate.
            </p>
            <p>
              I am confident that my technical skills, combined with my zeal to
              learn and contribute, make me a valuable addition to any team. I am
              excited about the possibility of engaging in innovative projects and
              becoming an integral part of your talented team.
            </p>
            <p>
              Outside of coding, I stay active through fitness routines, playing
              soccer, and exploring new hiking trails. It helps me reset, stay
              focused, and keep my mind sharp. I'm always looking for ways to grow
              my skills and stay updated with the latest in tech. Let's connect!
            </p>
          </div>
          <div className="image-placeholder">
            <img
              src="https://camo.githubusercontent.com/9e7e054f97008a0e71e75db243d40d2e92b713c13e8f19ac28fc1f216e9345ad/68747470733a2f2f63646e2e6472696262626c652e636f6d2f75736572732f313136323037372f73637265656e73686f74732f333834383931342f70726f6772616d6d65722e676966"
              alt="Developer Image"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
