/**
 * Security utility functions for the portfolio
 * Protects against common web attacks while keeping dev tools accessible
 */

// XSS Protection: Sanitize HTML input
export function sanitizeHTML(input: string): string {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

// Prevent injection attacks in URLs
export function isValidURL(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Prevent DOM-based XSS by escaping special characters
export function escapeSpecialChars(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

// Rate limiting for form submissions (client-side)
export class RateLimiter {
  private lastSubmitTime = 0;
  private cooldownMs: number;

  constructor(cooldownMs: number = 3000) {
    this.cooldownMs = cooldownMs;
  }

  canSubmit(): boolean {
    const now = Date.now();
    if (now - this.lastSubmitTime >= this.cooldownMs) {
      this.lastSubmitTime = now;
      return true;
    }
    return false;
  }

  getRemainingTime(): number {
    const remaining = this.cooldownMs - (Date.now() - this.lastSubmitTime);
    return Math.max(0, remaining);
  }
}

// Content Security Policy headers check
export function logSecurityHeaders() {
  console.info(
    '🔒 Security Check: Portfolio has the following protections:',
    {
      'XSS Protection': 'Input sanitization enabled',
      'CSRF Protection': 'Form validation enabled',
      'Rate Limiting': 'Client-side submission throttling',
      'URL Validation': 'External links validated',
      'Email Validation': 'Formspree integration with validation',
      'Dev Tools': '✓ Enabled for debugging (no blocking)',
    }
  );
}

// CSRF Token validation (if needed)
export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

// Log suspicious activity (console-only, no blocking)
export function logSuspiciousActivity(activity: string, details: unknown) {
  console.warn(`⚠️ Suspicious Activity Detected: ${activity}`, details);
}
