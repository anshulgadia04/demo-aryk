// Shopify Customer API integration using Storefront API
// This module will now proxy through our backend for any customer-auth-required actions.
// Direct Storefront calls for customer auth are removed to avoid exposing tokens client-side.

// Storefront API Customer types
export interface ShopifyCustomer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  acceptsMarketing: boolean;
  createdAt: string;
  updatedAt: string;
  defaultAddress?: {
    id: string;
    firstName: string;
    lastName: string;
    company?: string;
    address1: string;
    address2?: string;
    city: string;
    province: string;
    country: string;
    zip: string;
    phone?: string;
  };
  addresses: {
    edges: Array<{
      node: {
        id: string;
        firstName: string;
        lastName: string;
        company?: string;
        address1: string;
        address2?: string;
        city: string;
        province: string;
        country: string;
        zip: string;
        phone?: string;
      };
    }>;
  };
  orders: {
    edges: Array<{
      node: {
        id: string;
        orderNumber: number;
        processedAt: string;
        totalPrice: {
          amount: string;
          currencyCode: string;
        };
        fulfillmentStatus: string;
        financialStatus: string;
      };
    }>;
  };
}

export interface CustomerAccessToken {
  accessToken: string;
  expiresAt: string;
}

export interface CustomerCreateInput {
  input: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    acceptsMarketing?: boolean;
  };
}

export interface CustomerAccessTokenCreateInput {
  input: {
    email: string;
    password: string;
  };
}

// GraphQL queries for Storefront API
const CUSTOMER_CREATE_MUTATION = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
        firstName
        lastName
        phone
        acceptsMarketing
        createdAt
        updatedAt
        defaultAddress {
          id
          firstName
          lastName
          company
          address1
          address2
          city
          province
          country
          zip
          phone
        }
        addresses(first: 10) {
          edges {
            node {
              id
              firstName
              lastName
              company
              address1
              address2
              city
              province
              country
              zip
              phone
            }
          }
        }
        orders(first: 10) {
          edges {
            node {
              id
              orderNumber
              processedAt
              totalPrice {
                amount
                currencyCode
              }
              fulfillmentStatus
              financialStatus
            }
          }
        }
      }
      customerUserErrors {
        field
        message
      }
    }
  }
`;

const CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION = `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        field
        message
      }
    }
  }
`;

const CUSTOMER_QUERY = `
  query getCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      email
      firstName
      lastName
      phone
      acceptsMarketing
      createdAt
      updatedAt
      defaultAddress {
        id
        firstName
        lastName
        company
        address1
        address2
        city
        province
        country
        zip
        phone
      }
      addresses(first: 10) {
        edges {
          node {
            id
            firstName
            lastName
            company
            address1
            address2
            city
            province
            country
            zip
            phone
          }
        }
      }
      orders(first: 10) {
        edges {
          node {
            id
            orderNumber
            processedAt
            totalPrice {
              amount
              currencyCode
            }
            fulfillmentStatus
            financialStatus
          }
        }
      }
    }
  }
`;

// Helper to call our backend Shopify proxy when needed
const callBackendShopify = async (query: string, variables: any = {}) => {
  const response = await fetch('/api/shopify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ query, variables })
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Proxy error ${response.status}: ${errorText}`);
  }
  const data = await response.json();
  return data.data;
};

// Create a new customer
export const createCustomer = async (customerData: CustomerCreateInput): Promise<{ customer: ShopifyCustomer }> => {
  try {
    if (!customerData.input.email || !customerData.input.password) {
      throw new Error('Email and password are required');
    }
    const resp = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email: customerData.input.email,
        password: customerData.input.password,
        firstName: customerData.input.firstName,
        lastName: customerData.input.lastName,
      })
    });
    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(text || 'Signup failed');
    }
    const data = await resp.json();
    return { customer: data.customer };
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};

// Authenticate customer and get access token
export const authenticateCustomer = async (email: string, password: string): Promise<{ customer: ShopifyCustomer }> => {
  try {
    const resp = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });
    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(text || 'Authentication failed');
    }
    const data = await resp.json();
    return { customer: data.customer };
  } catch (error) {
    console.error('Error authenticating customer:', error);
    throw error;
  }
};

// Get customer data using access token
export const getCustomer = async (): Promise<ShopifyCustomer | null> => {
  const resp = await fetch('/api/auth/me', { credentials: 'include' });
  if (!resp.ok) return null;
  const data = await resp.json();
  return data.loggedIn ? data.customer : null;
};

// Convert Shopify customer to our local user format
export const convertToLocalUser = (shopifyCustomer: ShopifyCustomer) => {
  return {
    id: shopifyCustomer.id,
    email: shopifyCustomer.email,
    name: `${shopifyCustomer.firstName} ${shopifyCustomer.lastName}`,
    firstName: shopifyCustomer.firstName,
    lastName: shopifyCustomer.lastName,
    phone: shopifyCustomer.phone,
    isShopifyCustomer: true,
    shopifyCustomerId: shopifyCustomer.id,
    acceptsMarketing: shopifyCustomer.acceptsMarketing,
    createdAt: shopifyCustomer.createdAt,
    defaultAddress: shopifyCustomer.defaultAddress,
    ordersCount: shopifyCustomer.orders.edges.length,
  };
};
