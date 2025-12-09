'use client';

import Hero from "@/components/Hero";
import { useEffect, useState } from "react";
import { RateLimiter, isValidEmail, logSuspiciousActivity } from "@/lib/security";

const formLimiter = new RateLimiter(3000); // 3 second cooldown between submissions

export default function Contact() {
  const [submissionError, setSubmissionError] = useState('');

  useEffect(() => {
    const form = document.querySelector('.send-message form') as HTMLFormElement;
    if (form) {
      form.addEventListener('submit', function(e) {
        // Security: Check rate limiting
        if (!formLimiter.canSubmit()) {
          e.preventDefault();
          setSubmissionError('Please wait before submitting again');
          logSuspiciousActivity('Rapid form submission detected', {
            timestamp: new Date().toISOString(),
          });
          return;
        }

        // Security: Validate email before submission
        const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement;
        if (emailInput && !isValidEmail(emailInput.value)) {
          e.preventDefault();
          setSubmissionError('Please enter a valid email address');
          logSuspiciousActivity('Invalid email submission attempt', {
            email: emailInput.value,
          });
          return;
        }

        setSubmissionError('');
        
        setTimeout(() => {
          form.reset();
        }, 100);
      });
    }
  }, []);

  return (
    <main>
      <Hero 
        title="Let's Connect"
        subtitle="Whether you have a project in mind or just want to say hello, feel free to reach out — I'm always happy to connect."
      />
      <section style={{ padding: "0", background: "var(--bg-primary)" }}>
        <div className="contact-container">
          {/* Map on the left */}
          <div className="contact-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6045.5462001475835!2d-74.024171!3d40.745018!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259dea07cf7cd%3A0x60ce2871b2230f5!2s1%20Hudson%20St%2C%20Hoboken%2C%20NJ%2007030!5e0!3m2!1sen!2sus!4v1765217136786!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Send message form on the right */}
          <div className="send-message">
            <h2>Send a Message</h2>
            {submissionError && (
              <div style={{
                background: '#fee',
                color: '#c33',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1rem',
                fontSize: '0.95rem'
              }}>
                {submissionError}
              </div>
            )}
            <form action="https://formspree.io/f/movgnpaj" method="POST">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                required
              />

              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your.email@example.com"
                required
              />

              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Your message here..."
                required
              ></textarea>

              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
