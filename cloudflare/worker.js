/**
 * CoeurDesire Edge Worker
 * - Handles contact form submissions
 * - Adds security headers to all responses
 * - Serves as an API layer for the beauty & wellness app
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://coeur-desire.vercel.app',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    // Health check
    if (url.pathname === '/health') {
      return jsonResponse({ status: 'ok', service: 'CoeurDesire Edge API', ts: Date.now() });
    }

    // Contact form endpoint
    if (url.pathname === '/api/contact' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { name, email, message } = body;

        if (!name || !email || !message) {
          return jsonResponse({ error: 'Missing required fields: name, email, message' }, 400);
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          return jsonResponse({ error: 'Invalid email address' }, 400);
        }

        // Store in KV for now (can wire to email service later)
        if (env.COEURDESIRE_CACHE) {
          const key = `contact:${Date.now()}`;
          await env.COEURDESIRE_CACHE.put(key, JSON.stringify({ name, email, message, ts: new Date().toISOString() }), { expirationTtl: 2592000 });
        }

        return jsonResponse({ success: true, message: 'Thank you for reaching out. We will respond within 24 hours.' });
      } catch {
        return jsonResponse({ error: 'Invalid request body' }, 400);
      }
    }

    // Products/services info endpoint (static data cache)
    if (url.pathname === '/api/services' && request.method === 'GET') {
      const services = [
        { id: 'hair', name: 'Natural Hair Care', description: 'Nourishing treatments for your natural crown', category: 'hair' },
        { id: 'oils', name: 'Scented Healing Oils', description: 'Hand-crafted aromatic oils for body and spirit', category: 'wellness' },
        { id: 'rituals', name: 'Self-Love Rituals', description: 'Guided wellness rituals for inner healing', category: 'wellness' },
        { id: 'consultations', name: 'Beauty Consultations', description: 'Personalized beauty and wellness guidance', category: 'beauty' },
      ];
      return jsonResponse({ services }, 200, { 'Cache-Control': 'public, max-age=3600' });
    }

    return jsonResponse({ error: 'Not found' }, 404);
  }
};

function jsonResponse(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...CORS_HEADERS,
      ...SECURITY_HEADERS,
      ...extra,
    },
  });
}
