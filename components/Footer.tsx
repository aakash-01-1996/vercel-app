'use client';

import { useEffect, useState } from 'react';

export default function Footer() {
  const [year, setYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer>
      <div className="footer-content">
        <div className="footer-year">&copy; {year}</div>
        <div className="footer-links">
          <a
            href="https://linkedin.com/in/aakashambodkar/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a
            href="https://github.com/aakash-01-1996"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://leetcode.com/u/aakash_ambodkar/"
            target="_blank"
            rel="noopener noreferrer"
            title="LeetCode"
          >
            <span className="leetcode-icon">&lt;/&gt;</span>
          </a>
          <a
            href="https://twitter.com/AakashAmbodkar7"
            target="_blank"
            rel="noopener noreferrer"
            title="Twitter"
          >
            <i className="fab fa-twitter"></i>
          </a>
        </div>
        <div className="footer-credit">Built by Aakash</div>
      </div>
    </footer>
  );
}
