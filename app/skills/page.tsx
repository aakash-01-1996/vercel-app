import Hero from "@/components/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills - Aakash Ambodkar",
  description: "Technical skills and expertise in Full Stack Development, AI/ML, and Cloud Technologies.",
};

const skills = [
  {
    title: "Programming Languages",
    items: ["Python", "JavaScript", "Java", "C++", "TypeScript"],
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "HTML/CSS", "Vue.js"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "Django", "Spring Boot", "FastAPI"],
  },
  {
    title: "Databases & Cloud",
    items: ["PostgreSQL", "MongoDB", "AWS", "Firebase", "Docker"],
  },
  {
    title: "AI/ML",
    items: ["TensorFlow", "PyTorch", "Scikit-learn", "NLP", "LLMs"],
  },
  {
    title: "Mobile",
    items: ["React Native", "Flutter", "Swift", "Kotlin"],
  },
  {
    title: "Tools & Technologies",
    items: ["Git", "GitHub", "CI/CD", "RESTful APIs", "GraphQL"],
  },
];

export default function Skills() {
  return (
    <main>
      <Hero title="Skills & Technologies" subtitle="An overview of the technologies, languages, and tools I use in my day-to-day development." />
      <section style={{ padding: "2rem 3rem", background: "var(--bg-primary)", color: "var(--text-primary)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div className="skills-tiles">
            {skills.map((skillGroup, index) => (
              <div key={skillGroup.title} className={`skill-tile ${index === skills.length - 1 ? 'tools-tile' : ''}`}>
                <h3>{skillGroup.title}</h3>
                <div className="skill-tags">
                  {skillGroup.items.map((item) => (
                    <span key={item} className="skill-tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
