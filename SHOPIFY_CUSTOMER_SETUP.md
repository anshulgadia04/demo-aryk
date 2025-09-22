# Shopify Customer API Integration Setup

## Overview
This guide explains how to set up Shopify Customer API integration using the Storefront API to automatically create and manage customer data when users sign up or sign in to your ARYK application.

## Prerequisites
- Shopify store with Storefront API access
- Storefront API access token
- Basic understanding of Shopify APIs

## Step 1: Create Storefront API Access Token

### Using Shopify Admin
1. Go to your Shopify Admin → Apps → App and sales channel settings
2. Click "Develop apps" → "Create an app"
3. Name your app (e.g., "ARYK Storefront")
4. Configure Storefront API access scopes:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_product_tags`
   - `unauthenticated_read_selling_plans`
   - `unauthenticated_read_checkouts`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_customers`
   - `unauthenticated_write_customers`
5. Install the app and copy the Storefront API access token

## Step 2: Environment Configuration

Create a `.env` file in your project root:

```env
# Shopify Admin API (backend use only)
SHOPIFY_ADMIN_API_TOKEN=shpat_your-admin-token

# Shopify Storefront API (frontend safe)
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-token

# Store domain and version
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_API_VERSION=2024-01
```

## Step 3: API Endpoints Used

The integration uses these Shopify Storefront API GraphQL endpoints:

### Create Customer
```graphql
mutation customerCreate($input: CustomerCreateInput!) {
  customerCreate(input: $input) {
    customer { ... }
    customerUserErrors { ... }
  }
}
```

### Authenticate Customer
```graphql
mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
  customerAccessTokenCreate(input: $input) {
    customerAccessToken { ... }
    customerUserErrors { ... }
  }
}
```

### Get Customer Data
```graphql
query getCustomer($customerAccessToken: String!) {
  customer(customerAccessToken: $customerAccessToken) { ... }
}
```

## Step 4: Customer Data Structure

When a customer signs up, the following data is sent to Shopify:

```json
{
  "input": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "securepassword",
    "acceptsMarketing": true
  }
}
```

### Customer Access Token
After successful authentication, customers receive a dynamic access token:

```json
{
  "customerAccessToken": {
    "accessToken": "gid://shopify/CustomerAccessToken/...",
    "expiresAt": "2024-12-31T23:59:59Z"
  }
}
```

## Step 5: Features Implemented

### ✅ Customer Registration
- Automatically creates customer in Shopify when user signs up
- Sends welcome email to customer
- Stores customer data locally for quick access

### ✅ Customer Login
- Searches for existing customer in Shopify
- Falls back to local authentication if not found
- Syncs customer data between local and Shopify

### ✅ Customer Data Sync
- Converts Shopify customer data to local format
- Maintains customer ID mapping
- Preserves customer preferences and settings

### ✅ Error Handling
- Graceful fallback to local authentication
- User-friendly error messages
- Automatic retry mechanisms

## Step 6: Security Considerations

### ⚠️ Important Security Notes

1. **Access Token Security**: Never expose your Admin API access token in client-side code
2. **Backend Implementation**: For production, implement customer authentication on your backend
3. **Password Handling**: Customer passwords should never be handled on the frontend
4. **HTTPS Only**: Always use HTTPS for API calls

### Recommended Backend Implementation

For production, create a backend API that handles:

```javascript
// Backend API endpoint example
app.post('/api/auth/signup', async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  
  // Create customer in Shopify
  const shopifyCustomer = await createCustomer({
    customer: {
      first_name: firstName,
      last_name: lastName,
      email: email,
      // Don't include password in frontend
    }
  });
  
  // Handle password separately (Shopify Customer Account API)
  // or implement your own authentication system
  
  res.json({ customer: shopifyCustomer });
});
```

## Step 7: Testing the Integration

### Test Customer Creation
1. Start your development server: `npm run dev`
2. Go to any page and click the user icon
3. Click "Sign Up" tab
4. Fill in the form and submit
5. Check your Shopify Admin → Customers to see the new customer

### Test Customer Login
1. Try to sign in with an existing customer email
2. The system should find the customer in Shopify
3. Customer data should be synced locally

### Test Error Handling
1. Disconnect from internet
2. Try to sign up - should fallback to local authentication
3. Check console for error messages

## Step 8: Advanced Features (Optional)

### Customer Address Management
```javascript
// Add customer address
const address = await addCustomerAddress(customerId, {
  address: {
    first_name: "John",
    last_name: "Doe",
    address1: "123 Main St",
    city: "New York",
    province: "NY",
    country: "United States",
    zip: "10001",
    phone: "555-123-4567"
  }
});
```

### Customer Order History
```javascript
// Get customer orders
const orders = await getCustomerOrders(customerId);
```

### Customer Tags and Notes
```javascript
// Update customer with tags
await updateCustomer(customerId, {
  customer: {
    tags: "vip, newsletter-subscriber",
    note: "Preferred customer"
  }
});
```

## Troubleshooting

### Common Issues

1. **403 Forbidden Error**
   - Check API access token permissions
   - Verify store domain is correct

2. **Customer Not Found**
   - Check email spelling
   - Verify customer exists in Shopify Admin

3. **CORS Errors**
   - Implement backend proxy for API calls
   - Use proper CORS headers

4. **Rate Limiting**
   - Implement request throttling
   - Use Shopify's rate limit headers

### Debug Mode

Enable debug logging by adding to your components:

```javascript
console.log('Shopify Customer API Debug:', {
  storeDomain: SHOPIFY_STORE_DOMAIN,
  hasAccessToken: !!SHOPIFY_CUSTOMER_ACCESS_TOKEN,
  customerData: customerData
});
```

## Next Steps

1. **Implement Backend Authentication**: Move customer auth to backend
2. **Add Customer Dashboard**: Show order history, addresses, etc.
3. **Implement Password Reset**: Use Shopify's customer account API
4. **Add Customer Segmentation**: Use tags for marketing
5. **Implement Customer Reviews**: Connect with product reviews

## Support

For issues with Shopify Customer API:
- [Shopify Customer API Documentation](https://shopify.dev/api/admin-rest/2024-01/resources/customer)
- [Shopify Community Forums](https://community.shopify.com/)
- [Shopify Partner Support](https://partners.shopify.com/support)
