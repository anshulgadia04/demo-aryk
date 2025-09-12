# Shopify Integration Setup Guide

This guide will help you set up Shopify integration for your Aryk project.

## Prerequisites

1. A Shopify store (you can create a development store for free)
2. Access to your Shopify admin panel

## Step 1: Create a Shopify Store

1. Go to [Shopify.com](https://www.shopify.com) and create an account
2. Choose "Development store" if you're just testing
3. Complete the store setup process

## Step 2: Generate Storefront Access Token

1. In your Shopify admin, go to **Apps** → **App and sales channel settings**
2. Click **Develop apps** → **Create an app**
3. Give your app a name (e.g., "Aryk Storefront")
4. Click **Create app**
5. Go to **Configuration** tab
6. Under **Storefront API access**, click **Configure Storefront API access**
7. Check the following scopes (Storefront API only):
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_tags` (optional)
   - `unauthenticated_read_checkouts`
   - `unauthenticated_write_checkouts`
   
   Note: Do not enable Admin API scopes like `read_orders`, `write_orders`, `read_customers`, `write_customers`, or `write_discounts` unless you are building server-side features. Our current integration is frontend-only and does not require Admin API permissions.
8. Click **Save**
9. Go to **API credentials** tab
10. Copy the **Storefront access token**

## Step 3: Configure Environment Variables

1. Create a `.env` file in your project root (copy from `env.example`)
2. Add your Shopify configuration:

```env
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
VITE_SHOPIFY_API_VERSION=2024-01
```

Replace:
- `your-store.myshopify.com` with your actual store domain
- `your-storefront-access-token` with the token you copied

## Step 4: Add Products to Your Shopify Store

1. In your Shopify admin, go to **Products**
2. Click **Add product**
3. Add your Aryk products with:
   - Product title
   - Description
   - Images
   - Price
   - Product type (category)
   - Tags (for badges)

## Step 5: Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to `/shopify-shop` to see the Shopify-powered shop
3. Test adding products to cart
4. Test the checkout flow

## Features Included

### ✅ Completed
- Product fetching from Shopify
- Product display with filtering and sorting
- Shopping cart functionality
- Checkout integration
- Error handling and loading states
- Responsive design

### 🔄 Available Routes
- `/shop` - Original shop with static products
- `/shopify-shop` - New Shopify-powered shop

## API Endpoints Used

The integration uses Shopify's Storefront API with the following GraphQL queries:
- `getProducts` - Fetch products with pagination
- `getProduct` - Fetch single product by handle
- `cartCreate` - Create new cart
- `cartLinesAdd` - Add items to cart
- `cartLinesUpdate` - Update cart items
- `cartLinesRemove` - Remove items from cart

## Troubleshooting

### Common Issues

1. **"No products found"**
   - Check if your Shopify store has products
   - Verify the store domain is correct
   - Ensure products are published and available

2. **"Failed to create cart"**
   - Check if the Storefront access token has correct permissions
   - Verify the API version is supported

3. **CORS errors**
   - This shouldn't happen with the Storefront API, but if it does, check your domain settings in Shopify

### Debug Mode

To enable debug logging, add this to your `.env`:
```env
VITE_DEBUG_SHOPIFY=true
```

## Next Steps

1. **Customize the design** to match your brand
2. **Add product variants** support (size, color, etc.)
3. **Implement wishlist** functionality
4. **Add product reviews** integration
5. **Set up webhooks** for inventory updates
6. **Add analytics** tracking

## Support

For Shopify-specific issues, refer to:
- [Shopify Storefront API Documentation](https://shopify.dev/api/storefront)
- [Shopify Community](https://community.shopify.com/)

For integration issues, check the browser console for error messages.
