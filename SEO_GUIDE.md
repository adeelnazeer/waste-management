# SEO Setup Guide for Accountants4SME

## ✅ What's Been Implemented

### 1. **Enhanced Metadata** (`app/layout.tsx`)
   - Comprehensive title and description
   - Ireland-specific keywords
   - Open Graph tags for social sharing
   - Twitter Card metadata
   - Geographic metadata (Ireland location)
   - Canonical URLs

### 2. **Structured Data (Schema.org)** (`components/StructuredData.tsx`)
   - Organization schema
   - LocalBusiness schema (for Google My Business)
   - Service schema with all 6 services
   - Location data (Portlaoise, Co. Laois)
   - Contact information

### 3. **Sitemap** (`app/sitemap.ts`)
   - Automatic sitemap generation
   - Includes all pages and blog posts
   - Proper priority and change frequency

### 4. **Robots.txt** (`app/robots.ts`)
   - Allows search engine crawling
   - Points to sitemap
   - Blocks API routes

### 5. **SEO Optimizations**
   - Semantic HTML structure
   - Alt text on images
   - Proper heading hierarchy (H1, H2, H3)
   - Internal linking
   - Fast loading times

## 🚀 Next Steps to Get Indexed in Google Search Console

### Step 1: Verify Your Domain in Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property: `https://accountants4sme.com`
3. Choose verification method:
   - **HTML file upload** (recommended for static sites)
   - **HTML tag** (add to layout.tsx)
   - **DNS verification** (if you have domain access)

### Step 2: Submit Your Sitemap

1. In Google Search Console, go to "Sitemaps"
2. Add: `https://accountants4sme.com/sitemap.xml`
3. Click "Submit"

### Step 3: Request Indexing

1. In Google Search Console, use "URL Inspection" tool
2. Enter your homepage: `https://accountants4sme.com`
3. Click "Request Indexing"
4. Repeat for important pages:
   - `/blogs`
   - `/blogs/[id]` (for each blog post)

### Step 4: Add Google Verification Code (Optional)

If you choose HTML tag verification, add this to `app/layout.tsx` in the `<head>`:

```tsx
<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
```

### Step 5: Create Google My Business Profile

1. Go to [Google Business Profile](https://www.google.com/business/)
2. Create/claim your business listing
3. Add:
   - Business name: Accountants4SME
   - Address: Vision 85, Clonminam Business Park, Portlaoise, Co. Laois, R32 F5T6
   - Phone: 057 850 7018
   - Website: https://accountants4sme.com
   - Category: Accounting Service
   - Hours of operation
   - Photos

### Step 6: Build Backlinks

- List on Irish business directories
- Register with professional accounting associations
- Get listed on local business directories
- Create social media profiles (LinkedIn, Facebook)

## 📊 Ireland-Specific SEO Keywords Targeted

- accountant Ireland
- accounting services Ireland
- tax advisor Ireland
- SME accountant
- bookkeeping services Ireland
- payroll services Ireland
- tax consultation Ireland
- company formation Ireland
- business advisory Ireland
- accountant Portlaoise
- accountant Laois
- small business accountant
- sole trader accountant
- corporate tax Ireland
- VAT returns Ireland

## 🔍 Monitoring & Optimization

1. **Google Analytics**: Set up to track visitors
2. **Search Console**: Monitor search performance
3. **Page Speed**: Ensure fast loading (already optimized)
4. **Mobile-Friendly**: Already responsive
5. **Content Updates**: Regularly update blog with Ireland-specific content

## 📝 Important Notes

- The sitemap will automatically update when you add new blog posts
- Structured data helps Google understand your business
- Geographic metadata helps with local search results
- All pages are optimized for Ireland (en_IE locale)

## 🎯 Expected Results

- Appear in Google search results within 1-2 weeks
- Better visibility for Ireland-specific searches
- Improved local search rankings (Portlaoise, Laois)
- Rich snippets in search results (with structured data)
