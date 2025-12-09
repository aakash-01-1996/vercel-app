'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Check localStorage and system preference
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = saved ? saved === 'dark' : prefersDark;
    
    setIsDark(shouldBeDark);
    applyTheme(shouldBeDark);
  }, []);

  const applyTheme = (dark: boolean) => {
    if (dark) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  };

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    applyTheme(newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header>
      <div className="title-bar">
        <div className="name">
          <Link href="/">Aakash</Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/skills">Skills</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>

        {/* Right side container - hamburger and theme toggle */}
        <div className="header-right">
          {/* Mobile Menu */}
          <div className="mobile-menu-container">
            <button 
              className="hamburger-menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              title="Menu"
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            
            {isMenuOpen && (
              <nav className="mobile-nav">
                <ul>
                  <li><Link href="/" onClick={closeMenu}>Home</Link></li>
                  <li><Link href="/projects" onClick={closeMenu}>Projects</Link></li>
                  <li><Link href="/skills" onClick={closeMenu}>Skills</Link></li>
                  <li><Link href="/contact" onClick={closeMenu}>Contact</Link></li>
                </ul>
              </nav>
            )}
          </div>

          <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
            <span className="material-icons">{isDark ? 'light_mode' : 'dark_mode'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
