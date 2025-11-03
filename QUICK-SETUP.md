# Quick Setup Guide - 3 Things to Do Right Now

## 1. SET UP FORMSPREE (5 minutes)

**Why:** Make your contact form actually work and start capturing leads TODAY

**Steps:**
1. Go to https://formspree.io
2. Click "Sign Up" (free account)
3. Click "New Form"
4. Name it "Garage 30A Contact Form"
5. Copy your form ID (looks like: `mvoebpaz` or similar)
6. Open `pages/index.jsx`
7. Go to **line 620**
8. Change this:
   ```
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
   To this:
   ```
   action="https://formspree.io/f/mvoebpaz"
   ```
   (use your actual form ID)
9. Save file
10. Test it!

**Cost:** Free (or $10/month for more features)

---

## 2. UPDATE AVAILABILITY NUMBERS (2 minutes)

**Why:** Show accurate inventory to create urgency

**What Numbers to Change:**

If you have different numbers than 38 sold / 18 available / 5 reserved, update these 3 spots:

### Spot 1: Alert Banner (Line 234)
```jsx
<span className="font-bold">Only 18 Units Remaining</span> of 56 Total
```
Change `18` to your actual available units.

### Spot 2: Stats Section (Line 261)
```jsx
<div className="text-5xl md:text-6xl font-thin text-white">68%</div>
<div className="text-sm font-light text-white/60 tracking-widest uppercase">Sold Out</div>
```
Change `68%` to your actual sold percentage.
(Calculate: sold units ÷ 56 total × 100)

### Spot 3: Availability Breakdown (Lines 582-590)
```jsx
<div>
  <div className="text-3xl font-light text-white mb-2">38</div>
  <div className="text-xs text-white/60 uppercase tracking-wider">Units Sold</div>
</div>
<div>
  <div className="text-3xl font-light text-green-400 mb-2">18</div>
  <div className="text-xs text-white/60 uppercase tracking-wider">Available Now</div>
</div>
<div>
  <div className="text-3xl font-light text-amber-400 mb-2">5</div>
  <div className="text-xs text-white/60 uppercase tracking-wider">Reserved</div>
</div>
```
Change `38`, `18`, and `5` to your actual numbers.

**Cost:** Free

---

## 3. CREATE BROCHURE (Choose One Option)

### OPTION A: Hire Designer (Best Quality - 2-3 days)
1. Go to Fiverr.com or Upwork.com
2. Search "real estate brochure design"
3. Choose designer ($200-500)
4. Send them `BROCHURE-GUIDE.md` file
5. Send your photos from `/public/images/`
6. Get PDF in 2-3 days
7. Save as `Garage-30A-Brochure.pdf` in `/public/` folder

**Cost:** $200-500 | **Time:** 2-3 days

### OPTION B: DIY with Canva (Good Quality - 2-3 hours)
1. Go to Canva.com
2. Create free account
3. Search "Real Estate Brochure"
4. Pick a luxury template
5. Follow instructions in `BROCHURE-GUIDE.md`
6. Export as PDF
7. Save as `Garage-30A-Brochure.pdf` in `/public/` folder

**Cost:** Free (or $13/month for Canva Pro) | **Time:** 2-3 hours

### OPTION C: Skip for Now (Fastest)
1. Remove the download button from website
2. Add brochure later when ready

To remove button, delete lines 599-614 in `pages/index.jsx`

**Cost:** Free | **Time:** 2 minutes

---

## THAT'S IT!

After these 3 things:
1. ✅ Forms will work
2. ✅ Availability shows correctly
3. ✅ Brochure downloads (or button removed)

**Total Time:** 10 minutes to 3 hours (depending on brochure choice)

**Total Cost:** $0 to $500 (depending on brochure choice)

---

## Test Your Changes

```bash
npm run dev
```

Then open http://localhost:3000 and test:
- Fill out contact form
- Check availability numbers are correct
- Try downloading brochure (if you added it)

---

## When You're Happy, Deploy!

```bash
npm run build
```

Then push to Vercel or your hosting platform.

**You're done!** 🎉
