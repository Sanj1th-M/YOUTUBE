const sanitizeHtml = require('sanitize-html');

/**
 * XSS Sanitizer Utility
 * Strips dangerous HTML tags and attributes from user-generated content.
 */
class XSSSanitizer {
  /**
   * Sanitizes a string for safe HTML rendering.
   */
  sanitize(text) {
    if (typeof text !== 'string') return text;
    
    return sanitizeHtml(text, {
      allowedTags: ['b', 'i', 'em', 'strong', 'a'],
      allowedAttributes: {
        'a': ['href']
      },
      allowedIframeHostnames: []
    });
  }

  /**
   * Deeply sanitizes an object's string properties.
   */
  sanitizeObject(obj) {
    if (!obj || typeof obj !== 'object') return obj;

    const sanitized = Array.isArray(obj) ? [] : {};

    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        sanitized[key] = this.sanitize(value);
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = this.sanitizeObject(value);
      } else {
        sanitized[key] = value;
      }
    }

    return sanitized;
  }
}

module.exports = new XSSSanitizer();
