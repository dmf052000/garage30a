# Optional Features - Ready to Re-Add Anytime

## What's Currently Active

✅ **Formspree Contact Form** - Working and ready to use
- Just needs your Formspree ID added to line 562 in `pages/index.jsx`
- Replace `YOUR_FORM_ID` with your actual form ID

## What's Been Removed (But Ready to Re-Add)

The following features have been removed from the live site but are fully documented and ready to add back whenever you want:

---

## 1. 🚨 AVAILABILITY ALERT BANNER

**What it does:**
- Eye-catching orange/amber banner at top of page
- Shows "Only X Units Remaining of 56 Total"
- Creates urgency with animated icon
- Includes "Check Availability" CTA button

**To re-add:**

Add this code in `pages/index.jsx` **after line 223** (after Location Section, before Stats Section):

```jsx
        {/* Availability Alert Banner */}
        <section className="py-8 bg-gradient-to-r from-amber-600 to-orange-600">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-white animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <p className="text-white font-medium text-lg">
                  <span className="font-bold">Only 18 Units Remaining</span> of 56 Total
                </p>
              </div>
              <a href="#availability" className="bg-white text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-white/90 transition-all">
                Check Availability
              </a>
            </div>
          </div>
        </section>
```

**Customize:** Change `18` to your actual available units

---

## 2. 📊 STATS SECTION - "SOLD OUT" PERCENTAGE

**What it does:**
- Changes 4th stat from "100% Climate Control" to "68% Sold Out"
- Creates urgency showing how many units are gone

**To re-add:**

In `pages/index.jsx` around **line 242-243**, change:

FROM:
```jsx
<div className="text-5xl md:text-6xl font-thin text-white">100%</div>
<div className="text-sm font-light text-white/60 tracking-widest uppercase">Climate Control</div>
```

TO:
```jsx
<div className="text-5xl md:text-6xl font-thin text-white">68%</div>
<div className="text-sm font-light text-white/60 tracking-widest uppercase">Sold Out</div>
```

**Customize:** Calculate your percentage: (units sold ÷ 56 total × 100)

---

## 3. 📈 AVAILABILITY BREAKDOWN CARD

**What it does:**
- Shows detailed breakdown: Sold / Available / Reserved
- Color-coded display (white/green/amber)
- Professional stats presentation
- Urgency message about pricing

**To re-add:**

In `pages/index.jsx` **after line 557** (after the description paragraph, before Contact Form), add:

```jsx
            {/* Availability Status */}
            <div className="mb-12 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl max-w-2xl mx-auto">
              <div className="grid grid-cols-3 gap-8 text-center">
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
              </div>
              <p className="text-sm text-white/50 mt-6 font-light">
                Units selling fast. Prices increase as inventory decreases.
              </p>
            </div>
```

**Customize:** Change `38`, `18`, and `5` to your actual numbers

**Also update the section heading:**

Change line 550-554 FROM:
```jsx
<div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/80 text-xs font-light tracking-widest uppercase mb-8">
  Your Trusted Partner
</div>
<h2 className="text-4xl md:text-6xl font-thin mb-8 text-white">
  For Garage Ownership
</h2>
```

TO:
```jsx
<div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/80 text-xs font-light tracking-widest uppercase mb-8">
  Limited Availability
</div>
<h2 className="text-4xl md:text-6xl font-thin mb-8 text-white">
  Secure Your Space Today
</h2>
```

And change line 555-557 FROM:
```jsx
<p className="text-lg text-white/70 mb-16 max-w-3xl mx-auto leading-relaxed font-light">
```

TO:
```jsx
<p className="text-lg text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed font-light">
```
(Changes `mb-16` to `mb-8` for better spacing)

---

## 4. 📥 DOWNLOAD BROCHURE BUTTON

**What it does:**
- Professional download button with icon
- Offers PDF brochure to prospects
- Includes descriptive text about what's in the brochure

**To re-add:**

In `pages/index.jsx` **after line 557** (after description paragraph, before Contact Form), add:

```jsx
            {/* Download Brochure CTA */}
            <div className="mb-12">
              <a
                href="/Garage-30A-Brochure.pdf"
                download
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-medium hover:bg-white/20 transition-all duration-300 group"
              >
                <svg className="w-6 h-6 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Full Brochure (PDF)
              </a>
              <p className="text-white/50 text-sm mt-4 font-light">
                Complete details, pricing info, and investment analysis
              </p>
            </div>
```

**Note:** You'll need to create the brochure PDF first (see `BROCHURE-GUIDE.md`)

---

## QUICK RE-ADD ALL FEATURES

If you want to add ALL features back at once:

1. **Alert Banner:** Add code after line 223
2. **Stats Change:** Edit lines 242-243
3. **Availability Card:** Add code after line 557 + update headings (lines 550-557)
4. **Download Button:** Add code after line 557

**OR** just ask me and I'll add them all back in one go!

---

## WHEN TO ADD THESE FEATURES

### Add Alert Banner + Stats Change When:
- You want to create urgency
- You're actively selling units
- Competition heats up
- You want more leads

### Add Availability Breakdown When:
- You want to be transparent about inventory
- You have exact numbers to show
- You want to build trust with data
- Units are selling and you want to show momentum

### Add Download Brochure When:
- You've created the PDF brochure
- You want to provide detailed info
- You want to capture leads (with email gate)
- You have pricing/floor plans ready

---

## DOCUMENTATION AVAILABLE

All documentation is still available:

- **`BROCHURE-GUIDE.md`** - Complete 8-page brochure content & creation guide
- **`IMPLEMENTATION-SUMMARY.md`** - Full details of all features
- **`QUICK-SETUP.md`** - Simple setup instructions
- **`OPTIONAL-FEATURES.md`** (this file) - How to re-add features

---

## CURRENT SITE STATUS

✅ **What's Active:**
- Original clean design
- Working contact form (with Formspree setup)
- All original sections
- Professional appearance

❌ **What's Removed:**
- Availability alert banner
- Sold out percentage stat
- Availability breakdown card
- Download brochure button

🎯 **Ready to Add Back:**
- All features documented above
- Copy/paste ready
- Takes 5-10 minutes

---

## NEED HELP RE-ADDING?

Just ask! I can:
- Add individual features
- Add all features at once
- Customize the content
- Adjust the styling
- Update the numbers

**Simple request examples:**
- "Add back the alert banner"
- "Add all the availability features"
- "Add the download button only"
- "Add everything except the alert banner"

I've got all the code saved and ready to go! 🚀
