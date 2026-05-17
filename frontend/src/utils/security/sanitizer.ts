import DOMPurify from 'dompurify';

/**
 * Frontend XSS Sanitizer
 * Protects against XSS when rendering external content or user-generated text.
 */
class Sanitizer {
  /**
   * Sanitizes HTML strings for safe rendering.
   */
  public sanitizeHTML(html: string): string {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
      ALLOWED_ATTR: ['href', 'target', 'rel'],
    });
  }

  /**
   * Sanitizes plain text (strips all HTML).
   */
  public sanitizeText(text: string): string {
    return DOMPurify.sanitize(text, { ALLOWED_TAGS: [] });
  }

  /**
   * Prevents unsafe URL schemes in strings.
   */
  public validateURL(url: string): string {
    const isSafe = /^https?:\/\//i.test(url) || url.startsWith('/');
    return isSafe ? url : '#';
  }
}

export const sanitizer = new Sanitizer();
