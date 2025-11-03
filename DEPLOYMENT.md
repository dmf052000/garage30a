# Deployment Guide - Elite Garage Club

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended - 2 minutes)

**Why Vercel?**
- Built for Next.js (same company)
- Zero configuration
- Automatic HTTPS
- Global CDN
- Free tier available
- Automatic deployments from Git

**Steps:**

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_URL
git push -u origin main
```

2. **Deploy to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "Import Project"
- Connect your GitHub repository
- Click "Deploy"
- Done! ✅

Your site will be live at: `your-project.vercel.app`

**Custom Domain:**
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as shown
4. Wait for propagation (5-10 minutes)

---

### Option 2: Netlify (3 minutes)

**Steps:**

1. **Build the project**
```bash
npm run build
```

2. **Deploy to Netlify**

**Via CLI:**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

**Via UI:**
- Go to [netlify.com](https://netlify.com)
- Drag & drop your `.next` folder
- Or connect GitHub repo

---

### Option 3: Traditional Hosting (VPS/Shared)

**Requirements:**
- Node.js 18+ installed on server
- PM2 or similar process manager
- Nginx or Apache for reverse proxy

**Steps:**

1. **Build locally**
```bash
npm run build
```

2. **Upload files via FTP/SSH**
```bash
# Upload entire project folder
scp -r ./* user@server:/var/www/elite-garage
```

3. **Install dependencies on server**
```bash
ssh user@server
cd /var/www/elite-garage
npm install --production
```

4. **Start with PM2**
```bash
npm install -g pm2
pm2 start npm --name "elite-garage" -- start
pm2 save
pm2 startup
```

5. **Configure Nginx**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

6. **Enable SSL with Let's Encrypt**
```bash
sudo certbot --nginx -d yourdomain.com
```

---

## 🔧 Environment Configuration

### Environment Variables

Create `.env.local`:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=Elite Garage Club

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXX

# Form Handling
NEXT_PUBLIC_FORM_ENDPOINT=https://your-api.com/contact
FORM_API_KEY=your_secret_key

# Email Service (e.g., SendGrid, Mailgun)
EMAIL_API_KEY=your_email_api_key
EMAIL_FROM=info@elitegarage.com
EMAIL_TO=leads@elitegarage.com

# CRM Integration
CRM_API_KEY=your_crm_key
CRM_ENDPOINT=https://your-crm.com/api

# Recaptcha (optional)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key
```

**For Vercel/Netlify:**
Add these in the project settings → Environment Variables

---

## 📊 Analytics Setup

### Google Analytics 4

1. **Create GA4 Property**
   - Go to [analytics.google.com](https://analytics.google.com)
   - Create new property
   - Get measurement ID (G-XXXXXXXXXX)

2. **Add to Project**

Create `lib/gtag.js`:
```javascript
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
```

Update `pages/_app.js`:
```javascript
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'
import '../styles/globals.css'

function EliteGarageApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return <Component {...pageProps} />
}

export default EliteGarageApp
```

---

## 📧 Form Integration

### Option 1: Formspree (Easiest)

```javascript
// In the form component
const handleSubmit = async (e) => {
  e.preventDefault()
  const form = e.target
  const data = new FormData(form)

  try {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    })
    
    if (response.ok) {
      alert('Thank you! We\'ll be in touch soon.')
      form.reset()
    }
  } catch (error) {
    alert('Oops! There was a problem.')
  }
}
```

### Option 2: Custom API Endpoint

Create `pages/api/contact.js`:
```javascript
import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { firstName, lastName, email, phone, message } = req.body

  // Configure email transport
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `New Lead: ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    })

    res.status(200).json({ message: 'Email sent successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error sending email' })
  }
}
```

---

## 🎬 Video Integration

### Option 1: YouTube Embed

```javascript
// Add video modal component
const [videoOpen, setVideoOpen] = useState(false)

// In your JSX
{videoOpen && (
  <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
    <div className="relative w-full max-w-5xl aspect-video">
      <button 
        onClick={() => setVideoOpen(false)}
        className="absolute -top-12 right-0 text-white"
      >
        Close
      </button>
      <iframe
        className="w-full h-full"
        src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  </div>
)}
```

### Option 2: Self-Hosted Video

```javascript
<video
  autoPlay
  muted
  loop
  playsInline
  className="absolute inset-0 w-full h-full object-cover"
>
  <source src="/videos/hero-background.mp4" type="video/mp4" />
</video>
```

---

## 🖼️ Image Optimization

### Using Next.js Image Component

Replace:
```javascript
<div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900">
```

With:
```javascript
import Image from 'next/image'

<div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
  <Image
    src="/images/garage-interior.jpg"
    alt="Climate-controlled garage interior"
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
</div>
```

**Benefits:**
- Automatic optimization
- Lazy loading
- WebP conversion
- Responsive sizing

---

## 🔒 Security Checklist

- [ ] Environment variables set (never commit .env files)
- [ ] Form validation implemented
- [ ] Rate limiting on API routes
- [ ] CORS configured properly
- [ ] SSL certificate installed
- [ ] Security headers configured
- [ ] SQL injection prevention (if using database)
- [ ] XSS protection enabled

### Security Headers

Add to `next.config.js`:
```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ]
      }
    ]
  }
}
```

---

## 📈 Performance Optimization

### Next.js Config

Create `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['your-image-cdn.com'],
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
}

module.exports = nextConfig
```

### Lighthouse Score Goals
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test (if you have tests)
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID}}
          vercel-project-id: ${{ secrets.PROJECT_ID}}
```

---

## 📱 Progressive Web App (Optional)

Add PWA support:

1. **Install next-pwa**
```bash
npm install next-pwa
```

2. **Update next.config.js**
```javascript
const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
  // your existing config
})
```

3. **Create manifest.json**
```json
{
  "name": "Elite Garage Club",
  "short_name": "Elite Garage",
  "description": "Exclusive automotive community",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#09090b",
  "theme_color": "#f59e0b",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## 🧪 Testing Checklist

Before going live:

- [ ] Test on Chrome, Firefox, Safari, Edge
- [ ] Test on iOS (iPhone)
- [ ] Test on Android
- [ ] Test form submissions
- [ ] Test all internal links
- [ ] Test navigation scroll
- [ ] Test on slow 3G
- [ ] Check mobile responsiveness
- [ ] Verify analytics tracking
- [ ] Test contact form emails
- [ ] Check all images load
- [ ] Verify SSL certificate
- [ ] Test 404 page
- [ ] Check meta tags/SEO
- [ ] Validate HTML/CSS
- [ ] Run Lighthouse audit

---

## 🚨 Troubleshooting

### Build Errors

**Issue**: `Module not found`
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

**Issue**: `Image optimization error`
```javascript
// Add to next.config.js
images: {
  unoptimized: true // Only for debugging
}
```

### Runtime Errors

**Issue**: Hydration errors
- Check for mismatched HTML between server/client
- Ensure no window/document usage during SSR

**Issue**: API routes not working
- Verify path: `/pages/api/[filename].js`
- Check Vercel/Netlify function limits

---

## 📞 Support Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Support**: https://vercel.com/support
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Community**: https://github.com/vercel/next.js/discussions

---

## ✅ Post-Deployment Checklist

- [ ] Site loads correctly on custom domain
- [ ] SSL certificate active (https)
- [ ] Analytics tracking confirmed
- [ ] Form submissions working
- [ ] Email notifications received
- [ ] All links functional
- [ ] Mobile view tested
- [ ] Page speed acceptable
- [ ] 404 page working
- [ ] Favicon displaying
- [ ] Meta tags correct
- [ ] Social sharing working
- [ ] Console errors resolved
- [ ] Monitoring set up

---

**Congratulations! Your luxury automotive community website is live! 🎉**
