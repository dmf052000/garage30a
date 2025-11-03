# Elite Garage Club - Quick Reference Cheat Sheet

## 🚀 30-Second Start
```bash
npm install && npm run dev
# Open http://localhost:3000
```

## 📁 File Structure
```
/pages/
  _app.js          ← App wrapper
  index.js         ← Main page (elite-garage-club.jsx)
/styles/
  globals.css      ← Global styles
/public/
  /images/         ← Add your images here
  /videos/         ← Add videos here
package.json       ← Dependencies
tailwind.config.js ← Tailwind setup
```

## 🎨 Key Colors (Tailwind Classes)
```
bg-zinc-950       → Main background (#09090b)
bg-zinc-900       → Card backgrounds (#18181b)
border-zinc-800   → Borders (#27272a)
text-zinc-400     → Secondary text (#a1a1aa)
text-amber-500    → Primary accent (#f59e0b)
from-amber-500    → Gradient start
to-orange-600     → Gradient end
```

## 🔧 Common Customizations

### Change Accent Color:
Find/Replace: `amber-500` → `emerald-500` (or any Tailwind color)

### Change Section Background:
```jsx
className="bg-zinc-950"  →  className="bg-zinc-900"
```

### Update Logo:
```jsx
// In navigation section, replace:
<div className="w-10 h-10 bg-gradient...">
  {/* Your logo here */}
</div>
```

### Change Button Text:
```jsx
<button>Schedule Tour</button>  →  <button>Book Now</button>
```

### Add New Section:
Copy any `<section>` block and modify content

## 📐 Common Spacing Classes
```
p-4   → Padding 16px
p-8   → Padding 32px
p-12  → Padding 48px
gap-4 → Gap 16px
gap-8 → Gap 32px
mb-6  → Margin bottom 24px
mb-12 → Margin bottom 48px
```

## 🎯 Important Sections by ID
```html
#hero         → Hero section
#experience   → Features section
#spaces       → Gallery section
#community    → Community section
#availability → Contact form
```

## 📱 Responsive Breakpoints
```
sm:  → 640px
md:  → 768px
lg:  → 1024px
xl:  → 1280px

Example: md:flex-row (flex-row on screens 768px+)
```

## 🖼️ Replace Image Placeholders
Find gradient divs and replace with:
```jsx
import Image from 'next/image'

<Image 
  src="/images/your-image.jpg"
  alt="Description"
  fill
  className="object-cover"
/>
```

## 📝 Form Handler Template
```javascript
const handleSubmit = async (e) => {
  e.preventDefault()
  const formData = new FormData(e.target)
  
  // Your form logic here
  console.log({
    firstName: formData.get('firstName'),
    email: formData.get('email'),
    // etc...
  })
}
```

## 🎬 Add Video Background
```jsx
<video 
  autoPlay 
  muted 
  loop 
  playsInline
  className="absolute inset-0 w-full h-full object-cover"
>
  <source src="/videos/hero-bg.mp4" type="video/mp4" />
</video>
```

## 🔗 Smooth Scroll (Already Included)
```css
/* In globals.css */
html {
  scroll-behavior: smooth;
}
```

## 📊 Add Google Analytics
```javascript
// Add to _app.js
import Script from 'next/script'

<Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXX');
  `}
</Script>
```

## 🚀 Deploy Commands
```bash
# Vercel
vercel

# Netlify
netlify deploy --prod

# Build for production
npm run build
npm start
```

## 🎨 Gradient Generator
```
from-[color]-[shade] to-[color]-[shade]

Examples:
from-amber-500 to-orange-600  → Current brand
from-blue-500 to-purple-600   → Cool tech
from-red-500 to-pink-600      → Vibrant
from-green-500 to-teal-600    → Fresh
```

## 🔤 Font Sizes
```
text-sm   → 14px
text-base → 16px
text-lg   → 18px
text-xl   → 20px
text-2xl  → 24px
text-4xl  → 36px
text-5xl  → 48px
text-7xl  → 72px
```

## 📦 Install Common Additions
```bash
# Form validation
npm install react-hook-form

# Animations
npm install framer-motion

# Icons
npm install lucide-react

# Email service
npm install nodemailer
```

## 🐛 Common Issues & Fixes

### Issue: Page not loading
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run dev
```

### Issue: Styles not applying
```bash
# Check Tailwind is processing
# Ensure imports in _app.js:
import '../styles/globals.css'
```

### Issue: Images not showing
```bash
# Check file path
# Use /images/ not ./images/
# Ensure file is in /public/images/
```

## 🎯 Performance Quick Wins
1. Use Next.js `<Image>` component
2. Add loading="lazy" to images
3. Minimize third-party scripts
4. Enable Vercel analytics
5. Compress images before upload

## 📞 Emergency Contact Points
```
Support Docs: README.md
Design Specs: DESIGN-DOCS.md
Deployment:   DEPLOYMENT.md
Full Guide:   PROJECT-SUMMARY.md
Visual Guide: VISUAL-SHOWCASE.md
```

## 💡 Pro Tips

1. **Test Mobile First**: Most visitors will be on phone
2. **Use Real Content ASAP**: Placeholder content doesn't convert
3. **A/B Test CTAs**: Try different button text
4. **Monitor Analytics**: Set up day one
5. **Optimize Images**: Use WebP format, compress files
6. **Add Social Proof**: Testimonials increase trust
7. **Fast Loading**: Aim for <2 second load time
8. **Clear CTAs**: Make next steps obvious
9. **Professional Photos**: Worth the investment
10. **Regular Updates**: Keep content fresh

## 🎨 Color Mood Guide
```
Amber/Gold     → Luxury, Prestige, Warmth
Blue           → Trust, Technology, Cool
Green          → Growth, Eco, Fresh
Purple         → Royal, Creative, Modern
Red            → Energy, Passion, Bold
```

## 🔥 Hot Keys
```
Ctrl/Cmd + S   → Save
Ctrl/Cmd + C   → Copy
Ctrl/Cmd + F   → Find in file
Ctrl/Cmd + /   → Comment code
F12            → Open DevTools
```

## 📈 Metrics to Track
```
□ Page Views
□ Time on Site
□ Form Submissions
□ Button Clicks
□ Scroll Depth
□ Bounce Rate
□ Mobile vs Desktop
□ Video Plays
```

## ✅ Pre-Launch Checklist
```
□ All text reviewed
□ All images replaced
□ Contact form tested
□ Mobile responsive checked
□ All links work
□ Analytics installed
□ SSL certificate active
□ Meta tags updated
□ Favicon added
□ 404 page tested
□ Performance tested (Lighthouse)
□ Cross-browser tested
```

## 🎁 Bonus Components to Add
```
□ Testimonials slider
□ FAQ accordion
□ Image lightbox
□ Video modal
□ Loading animation
□ 404 page
□ Success page
□ Cookie banner
□ Live chat
□ Blog section
```

## 🔐 Security Checklist
```
□ Environment variables set
□ .env in .gitignore
□ Form validation
□ Rate limiting
□ HTTPS enabled
□ CORS configured
□ XSS protection
□ Input sanitization
```

## 📚 Learning Resources
```
Next.js:   nextjs.org/docs
Tailwind:  tailwindcss.com/docs
React:     react.dev
Vercel:    vercel.com/docs
```

---

## 🎯 Most Common Tasks

### 1. Change a color:
Find: `amber-500` → Replace: `blue-500`

### 2. Add a section:
Copy existing `<section>` block, paste, edit content

### 3. Change text:
Search for current text, replace directly in JSX

### 4. Add image:
```jsx
<Image src="/images/name.jpg" alt="..." fill />
```

### 5. Update form:
Find `<form>`, modify inputs, update `handleSubmit`

### 6. Deploy:
```bash
git add . && git commit -m "Update" && git push
# Auto-deploys on Vercel
```

---

**Save this file! Your quick reference for everything Elite Garage Club.**

Pro tip: Keep this open in a second monitor while coding! 🚀
