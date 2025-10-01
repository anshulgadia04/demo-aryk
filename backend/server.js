import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

// Config
const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN; // e.g. your-store.myshopify.com
const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION || '2024-01';
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN; // public token from Storefront API

if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
  console.warn('[Shopify] Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_ACCESS_TOKEN');
}

const STOREFRONT_ENDPOINT = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:8081',
  credentials: true,
}));

app.set('trust proxy', 1);
app.use(session({
  secret: process.env.SESSION_SECRET || 'super_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
}));

// Helpers
async function shopifyRequest(query, variables) {
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    const err = 'Shopify is not configured (missing SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_ACCESS_TOKEN)';
    throw new Error(err);
  }
  const resp = await fetch(STOREFRONT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Shopify HTTP ${resp.status}: ${text}`);
  }
  const data = await resp.json();
  if (data.errors) {
    throw new Error(`Shopify GraphQL errors: ${JSON.stringify(data.errors)}`);
  }
  return data.data;
}

// Auth routes
app.post('/api/auth/login', async (req, res) => {
  try {
    if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
      return res.status(503).json({ message: 'Shopify not configured on server' });
    }
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

    const tokenMutation = `
      mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
        customerAccessTokenCreate(input: $input) {
          customerAccessToken { accessToken expiresAt }
          customerUserErrors { field message }
        }
      }
    `;
    const tokenData = await shopifyRequest(tokenMutation, { input: { email, password } });
    const err = tokenData.customerAccessTokenCreate.customerUserErrors?.[0];
    if (err) return res.status(401).json({ message: err.message });
    const accessToken = tokenData.customerAccessTokenCreate.customerAccessToken?.accessToken;
    if (!accessToken) return res.status(500).json({ message: 'Failed to obtain customer token' });

    const meQuery = `
      query getCustomer($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
          id email firstName lastName
        }
      }
    `;
    const meData = await shopifyRequest(meQuery, { customerAccessToken: accessToken });
    const customer = meData.customer;
    if (!customer) return res.status(401).json({ message: 'Invalid customer token' });

    req.session.customerAccessToken = accessToken;
    req.session.customer = customer;
    return res.status(200).json({ customer });
  } catch (e) {
    console.error('Login error:', e);
    return res.status(500).json({ message: e instanceof Error ? e.message : 'Internal server error' });
  }
});

app.post('/api/auth/signup', async (req, res) => {
  try {
    if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
      return res.status(503).json({ message: 'Shopify not configured on server' });
    }
    const { email, password, firstName, lastName } = req.body;
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: 'Email, password, firstName, lastName required' });
    }

    const createMutation = `
      mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
          customer { id email firstName lastName }
          customerUserErrors { field message }
        }
      }
    `;
    const createData = await shopifyRequest(createMutation, { input: { email, password, firstName, lastName } });
    const createErr = createData.customerCreate.customerUserErrors?.[0];
    if (createErr) return res.status(400).json({ message: createErr.message });

    // Authenticate immediately
    const tokenMutation = `
      mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
        customerAccessTokenCreate(input: $input) {
          customerAccessToken { accessToken expiresAt }
          customerUserErrors { field message }
        }
      }
    `;
    const tokenData = await shopifyRequest(tokenMutation, { input: { email, password } });
    const err = tokenData.customerAccessTokenCreate.customerUserErrors?.[0];
    if (err) return res.status(401).json({ message: err.message });
    const accessToken = tokenData.customerAccessTokenCreate.customerAccessToken?.accessToken;
    if (!accessToken) return res.status(500).json({ message: 'Failed to obtain customer token' });

    req.session.customerAccessToken = accessToken;
    req.session.customer = createData.customerCreate.customer;
    return res.status(200).json({ customer: req.session.customer });
  } catch (e) {
    console.error('Signup error:', e);
    return res.status(500).json({ message: e instanceof Error ? e.message : 'Internal server error' });
  }
});

app.get('/api/auth/me', (req, res) => {
  try {
    if (req.session && req.session.customer) {
      return res.status(200).json({ loggedIn: true, customer: req.session.customer });
    }
    return res.status(200).json({ loggedIn: false });
  } catch (e) {
    // Never break the app on /me; always return a safe payload
    return res.status(200).json({ loggedIn: false });
  }
});

app.post('/api/auth/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ message: 'Failed to log out' });
    }
    res.status(200).json({ message: 'Logged out' });
  });
});

// Optional: proxy Storefront API using session customer token when needed
app.post('/api/shopify', async (req, res) => {
  try {
    // If Shopify is not configured, return a clear service-unavailable response
    if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
      return res.status(503).json({ message: 'Shopify not configured on server' });
    }
    const { query, variables } = req.body || {};
    if (!query) return res.status(400).json({ message: 'Missing query' });
    // For customer queries that require token, ensure session has it and pass as variable
    const mergedVariables = { ...variables };
    if (query.includes('customer(') && !mergedVariables.customerAccessToken) {
      if (!req.session.customerAccessToken) return res.status(401).json({ message: 'Not authenticated' });
      mergedVariables.customerAccessToken = req.session.customerAccessToken;
    }
    // If updating cart buyer identity, inject session customer token
    if (query.includes('cartBuyerIdentityUpdate') && (!mergedVariables.input || !mergedVariables.input.buyerIdentity || !mergedVariables.input.buyerIdentity.customerAccessToken)) {
      if (!req.session.customerAccessToken) return res.status(401).json({ message: 'Not authenticated' });
      mergedVariables.input = mergedVariables.input || {};
      mergedVariables.input.buyerIdentity = mergedVariables.input.buyerIdentity || {};
      mergedVariables.input.buyerIdentity.customerAccessToken = req.session.customerAccessToken;
    }
    const data = await shopifyRequest(query, mergedVariables);
    return res.status(200).json({ data });
  } catch (e) {
    console.error('Shopify proxy error:', e);
    return res.status(500).json({ message: 'Error proxying request' });
  }
});

// Returns the Shopify customer registration URL without exposing the domain in the frontend
app.get('/api/shopify/register-url', (req, res) => {
  try {
    if (!SHOPIFY_STORE_DOMAIN) {
      return res.status(503).json({ message: 'Shopify not configured on server' });
    }
    const baseUrl = `https://${SHOPIFY_STORE_DOMAIN}/account/register`;
    const params = new URLSearchParams();
    const email = (req.query.email || req.query["customer[email]"] || req.query["checkout[email]"]);
    const phone = (req.query.phone || req.query["customer[phone]"] || req.query["checkout[shipping_address][phone]"]);

    // Hint the form type for some themes
    params.set('form_type', 'customer');

    if (email && /@/.test(email)) {
      params.set('email', email);
      params.set('customer[email]', email);
      params.set('checkout[email]', email);
    }
    if (phone && /\d{7,}/.test(phone)) {
      params.set('phone', phone);
      params.set('customer[phone]', phone);
      params.set('checkout[shipping_address][phone]', phone);
    }
    const finalUrl = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
    return res.status(200).json({ url: finalUrl });
  } catch (e) {
    return res.status(500).json({ message: 'Failed to build register url' });
  }
});

// Returns the Shopify customer login URL without exposing the domain in the frontend
app.get('/api/shopify/login-url', (req, res) => {
  try {
    if (!SHOPIFY_STORE_DOMAIN) {
      return res.status(503).json({ message: 'Shopify not configured on server' });
    }
    const baseUrl = `https://${SHOPIFY_STORE_DOMAIN}/account/login`;
    const params = new URLSearchParams();
    const email = (req.query.email || req.query["customer[email]"] || req.query["checkout[email]"]);

    // Some themes respect prefilled email
    if (email && /@/.test(email)) {
      params.set('email', email);
      params.set('customer[email]', email);
      params.set('checkout[email]', email);
    }

    const finalUrl = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
    return res.status(200).json({ url: finalUrl });
  } catch (e) {
    return res.status(500).json({ message: 'Failed to build login url' });
  }
});

// Simple health endpoint to help debug proxy connectivity without requiring Shopify config
app.get('/api/health', (_req, res) => {
  return res.status(200).json({
    ok: true,
    shopifyConfigured: Boolean(SHOPIFY_STORE_DOMAIN && SHOPIFY_STOREFRONT_ACCESS_TOKEN),
    port: PORT,
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});