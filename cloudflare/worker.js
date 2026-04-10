/**
 * CoeurDesire Edge Worker v2
 * - Contact form submissions (stored in KV + forwards inquiry)
 * - Security headers on all responses
 * - Services API for catalog
 */

const ALLOWED_ORIGINS = [
  'https://coeur-desire.vercel.app',
  'https://coeurdesire.com',
  'https://www.coeurdesire.com',
  'http://localhost:3000',
  'http://localhost:5173',
];

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

function getCorsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '';
    const cors = getCorsHeaders(origin);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }

    if (url.pathname === '/health') {
      return jsonResponse({ status: 'ok', service: 'CoeurDesire Edge API', version: '2.0.0', ts: Date.now() }, 200, cors);
    }

    // Contact / Inquiry form
    if (url.pathname === '/api/contact' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        if (!name || !email || !message) {
          return jsonResponse({ error: 'Required: name, email, message' }, 400, cors);
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          return jsonResponse({ error: 'Invalid email address' }, 400, cors);
        }
        if (message.length > 2000) {
          return jsonResponse({ error: 'Message too long (max 2000 chars)' }, 400, cors);
        }

        const inquiry = {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          subject: subject?.trim() || 'General Inquiry',
          message: message.trim(),
          ts: new Date().toISOString(),
          ip: request.headers.get('CF-Connecting-IP') || 'unknown',
        };

        if (env.COEURDESIRE_CACHE) {
          const key = `inquiry:${Date.now()}:${Math.random().toString(36).slice(2,8)}`;
          await env.COEURDESIRE_CACHE.put(key, JSON.stringify(inquiry), { expirationTtl: 7776000 }); // 90 days
        }

        return jsonResponse({
          success: true,
          message: "Thank you for reaching out to CoeurDesire. We'll respond within 24-48 hours at inquiry@coeurdesire.com",
        }, 200, cors);
      } catch {
        return jsonResponse({ error: 'Invalid request body' }, 400, cors);
      }
    }

    // Services/products data
    if (url.pathname === '/api/services' && request.method === 'GET') {
      return jsonResponse({
        services: [
          { id: 's1', title: 'Divine Consultation', available: true, remote: true, price: '$85' },
          { id: 's3', title: 'Aromatherapy Alchemy', available: true, remote: true, price: '$45' },
          { id: 's2', title: 'Natural Crown Care', available: false, comingSoon: true, price: 'From $120' },
          { id: 's4', title: 'Modalities of Grace', available: false, comingSoon: true, price: '$150' },
        ]
      }, 200, { ...cors, 'Cache-Control': 'public, max-age=3600' });
    }

    // List all inquiries (admin - should be protected, basic example)
    if (url.pathname === '/api/admin/inquiries' && request.method === 'GET') {
      const adminKey = request.headers.get('X-Admin-Key');
      if (!env.ADMIN_KEY || adminKey !== env.ADMIN_KEY) {
        return jsonResponse({ error: 'Unauthorized' }, 401, cors);
      }
      if (!env.COEURDESIRE_CACHE) {
        return jsonResponse({ inquiries: [] }, 200, cors);
      }
      const list = await env.COEURDESIRE_CACHE.list({ prefix: 'inquiry:' });
      const inquiries = await Promise.all(
        list.keys.map(async (k) => {
          const val = await env.COEURDESIRE_CACHE.get(k.name);
          return val ? JSON.parse(val) : null;
        })
      );
      return jsonResponse({ inquiries: inquiries.filter(Boolean) }, 200, cors);
    }

    return jsonResponse({ error: 'Not found' }, 404, cors);
  }
};

function jsonResponse(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...SECURITY_HEADERS, ...extra },
  });
}
