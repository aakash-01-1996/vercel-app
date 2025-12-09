/**
 * Test suite for portfolio security and functionality
 * Run with: npm test
 */

import {
  sanitizeHTML,
  isValidURL,
  isValidEmail,
  escapeSpecialChars,
  RateLimiter,
  generateCSRFToken,
} from '../lib/security';

describe('Security Functions', () => {
  describe('sanitizeHTML', () => {
    test('should remove script tags', () => {
      const input = '<script>alert("xss")</script>';
      const result = sanitizeHTML(input);
      expect(result).not.toContain('<script>');
    });

    test('should handle normal text', () => {
      const input = 'Hello World';
      const result = sanitizeHTML(input);
      expect(result).toBe('Hello World');
    });

    test('should escape HTML entities', () => {
      const input = '<div>Test</div>';
      const result = sanitizeHTML(input);
      expect(result).toContain('&lt;');
      expect(result).toContain('&gt;');
    });
  });

  describe('isValidURL', () => {
    test('should accept valid https URLs', () => {
      expect(isValidURL('https://github.com/aakash-01-1996')).toBe(true);
    });

    test('should accept valid http URLs', () => {
      expect(isValidURL('http://example.com')).toBe(true);
    });

    test('should reject invalid URLs', () => {
      expect(isValidURL('not a url')).toBe(false);
    });

    test('should reject javascript: protocol', () => {
      expect(isValidURL('javascript:alert("xss")')).toBe(false);
    });

    test('should reject data: protocol', () => {
      expect(isValidURL('data:text/html,<script>alert("xss")</script>')).toBe(
        false
      );
    });
  });

  describe('isValidEmail', () => {
    test('should accept valid emails', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
    });

    test('should reject invalid emails', () => {
      expect(isValidEmail('invalid.email')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
    });

    test('should reject emails with spaces', () => {
      expect(isValidEmail('test @example.com')).toBe(false);
    });
  });

  describe('escapeSpecialChars', () => {
    test('should escape ampersands', () => {
      expect(escapeSpecialChars('A & B')).toBe('A &amp; B');
    });

    test('should escape angle brackets', () => {
      expect(escapeSpecialChars('<script>')).toBe('&lt;script&gt;');
    });

    test('should escape quotes', () => {
      expect(escapeSpecialChars('He said "Hi"')).toBe(
        'He said &quot;Hi&quot;'
      );
    });

    test('should escape single quotes', () => {
      expect(escapeSpecialChars("It's great")).toBe("It&#039;s great");
    });
  });

  describe('RateLimiter', () => {
    test('should allow first submission', () => {
      const limiter = new RateLimiter(1000);
      expect(limiter.canSubmit()).toBe(true);
    });

    test('should block rapid submissions', (done) => {
      const limiter = new RateLimiter(1000);
      limiter.canSubmit(); // First one allowed
      expect(limiter.canSubmit()).toBe(false);

      setTimeout(() => {
        expect(limiter.canSubmit()).toBe(true);
        done();
      }, 1100);
    });

    test('should track remaining cooldown time', () => {
      const limiter = new RateLimiter(1000);
      limiter.canSubmit();
      const remaining = limiter.getRemainingTime();
      expect(remaining).toBeGreaterThan(0);
      expect(remaining).toBeLessThanOrEqual(1000);
    });
  });

  describe('generateCSRFToken', () => {
    test('should generate a token', () => {
      const token = generateCSRFToken();
      expect(token).toBeDefined();
      expect(token.length).toBeGreaterThan(0);
    });

    test('should generate different tokens each time', () => {
      const token1 = generateCSRFToken();
      const token2 = generateCSRFToken();
      expect(token1).not.toBe(token2);
    });

    test('should generate hexadecimal strings', () => {
      const token = generateCSRFToken();
      expect(/^[0-9a-f]+$/.test(token)).toBe(true);
    });
  });
});

describe('Portfolio Functionality', () => {
  describe('Navigation', () => {
    test('all navigation links should be valid', () => {
      const links = [
        '/',
        '/projects',
        '/skills',
        '/contact',
      ];
      links.forEach((link) => {
        expect(isValidURL(`http://localhost:3000${link}`) || link === '/').toBe(
          true
        );
      });
    });
  });

  describe('Form Validation', () => {
    test('should validate contact form email', () => {
      expect(isValidEmail('contact@example.com')).toBe(true);
    });

    test('should reject invalid contact form email', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
    });
  });

  describe('External Links', () => {
    test('GitHub URL should be valid', () => {
      expect(isValidURL('https://github.com/aakash-01-1996')).toBe(true);
    });

    test('LinkedIn URL should be valid', () => {
      expect(isValidURL('https://linkedin.com/in/aakashambodkar/')).toBe(true);
    });

    test('LeetCode URL should be valid', () => {
      expect(isValidURL('https://leetcode.com/u/aakash_ambodkar/')).toBe(true);
    });

    test('Twitter URL should be valid', () => {
      expect(isValidURL('https://twitter.com/AakashAmbodkar7')).toBe(true);
    });
  });
});

describe('Security Threats Protection', () => {
  test('should prevent XSS via script injection', () => {
    const maliciousInput = '<img src=x onerror="alert(\'xss\')">';
    const sanitized = sanitizeHTML(maliciousInput);
    expect(sanitized).not.toContain('onerror');
  });

  test('should prevent SQL injection patterns in URLs', () => {
    const sqlInjection = "' OR '1'='1";
    const escaped = escapeSpecialChars(sqlInjection);
    expect(escaped).not.toBe(sqlInjection);
  });

  test('should prevent open redirect attacks', () => {
    const maliciousURL = 'javascript:void(0)';
    expect(isValidURL(maliciousURL)).toBe(false);
  });

  test('should rate limit form submissions', () => {
    const limiter = new RateLimiter(500);
    expect(limiter.canSubmit()).toBe(true);
    expect(limiter.canSubmit()).toBe(false);
    expect(limiter.canSubmit()).toBe(false);
  });
});
