# Shopify Integration Setup Guide

## Current Issues Identified

1. **Missing Environment Variables** - Your `.env` file is not configured
2. **API Configuration** - Store domain and access token are undefined
3. **Product Data Handling** - Some products might not have variants or images

## Step-by-Step Setup

### 1. Create Environment File

Create a `.env` file in your project root with the following content:

```bash
# Shopify Configuration
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
VITE_SHOPIFY_API_VERSION=2024-01
```

### 2. Get Your Shopify Credentials

#### A. Get Your Store Domain
- Go to your Shopify Admin Panel
- Your store domain is: `your-store-name.myshopify.com`

#### B. Get Storefront Access Token
1. Go to **Apps** > **App and sales channel settings** > **Develop apps**
2. Click **Create an app**
3. Give it a name like "Aryk Storefront"
4. Click **Configure Storefront API scopes**
5. Enable these permissions:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`
6. Click **Save**
7. Click **Install app**
8. Copy the **Storefront access token**

### 3. Update Your .env File

Replace the placeholder values with your actual credentials:

```bash
VITE_SHOPIFY_STORE_DOMAIN=aryk-beauty.myshopify.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_SHOPIFY_API_VERSION=2024-01
```

### 4. Add Products to Your Shopify Store

1. Go to **Products** in your Shopify Admin
2. Click **Add product**
3. Fill in:
   - **Title**: Product name
   - **Description**: Product description
   - **Images**: Upload product images
   - **Pricing**: Set price
   - **Inventory**: Set quantity
   - **Product type**: e.g., "Skincare", "Makeup", "Hair Care"
   - **Tags**: Add relevant tags
4. Click **Save**

### 5. Test the Integration

1. Restart your development server:
   ```bash
   npm run dev
   ```
2. Open your browser console (F12)
3. Navigate to the Shopify shop page
4. Check for any error messages

## Common Issues and Solutions

### Issue: "Shopify configuration is missing"
**Solution**: Make sure your `.env` file exists and has the correct values

### Issue: "HTTP error! status: 401"
**Solution**: Your access token is invalid or doesn't have the right permissions

### Issue: "HTTP error! status: 404"
**Solution**: Your store domain is incorrect

### Issue: "No products found"
**Solution**: 
- Make sure you have products in your Shopify store
- Check that products are published and available for sale
- Verify the Storefront API permissions

### Issue: "Product has no variants"
**Solution**: This is handled in the code now, but make sure your products have at least one variant

## Testing Your Setup

1. Open browser console (F12)
2. Look for these log messages:
   - ✅ "Shopify Configuration:" with your store details
   - ✅ "GraphQL Endpoint:" with your API URL
   - ✅ "Found products: X" where X is the number of products

If you see error messages, follow the solutions above.

## Need Help?

If you're still having issues:
1. Check the browser console for specific error messages
2. Verify your Shopify store has products
3. Make sure your access token has the right permissions
4. Try creating a new access token if the current one doesn't work
