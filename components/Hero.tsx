interface HeroProps {
  title: string;
  subtitle: string;
  showButton?: boolean;
}

export default function Hero({ title, subtitle, showButton }: HeroProps) {
  return (
    <section className="hero">
      <h1>{title}</h1>
      <p>{subtitle}</p>
      {showButton && <a href="/projects" className="explore-btn">Explore My Work</a>}
    </section>
  );
}
