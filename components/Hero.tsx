'use client';
import { useDeviceOrientation } from '@/hooks/useDeviceOrientation';

interface HeroProps {
  title: string;
  subtitle: string;
  showButton?: boolean;
}

export default function Hero({ title, subtitle, showButton }: HeroProps) {
  const { orientation, permission, isMobile, requestPermission } = useDeviceOrientation();

  // Clamp tilt values to a subtle range
  const tiltX = orientation.gamma !== null
    ? Math.max(-14, Math.min(14, (orientation.gamma / 90) * 14))
    : 0;
  const tiltY = orientation.beta !== null
    ? Math.max(-8, Math.min(8, ((orientation.beta - 45) / 90) * 8))
    : 0;

  const motionStyle = isMobile && permission === 'granted'
    ? { transform: `translate(${tiltX}px, ${tiltY}px)`, transition: 'transform 0.1s linear' }
    : {};

  return (
    <section className="hero">
      <div style={motionStyle}>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        {showButton && <a href="/projects" className="explore-btn">Explore My Work</a>}
      </div>

      {isMobile && permission === 'pending' && (
        <button
          onClick={requestPermission}
          className="motion-permission-btn"
          aria-label="Enable motion effects"
        >
          ✦ Enable Motion
        </button>
      )}
    </section>
  );
}
