# Urban Solace · ಅರ್ಬನ್ ಸೊಲೇಸ್ — website redesign demo

A proposed website for **Urban Solace**, the American café opposite Ulsoor Lake, Bengaluru. Built as a sales demo.

## Run it
It's a static site with no build step:

- Open `index.html` in a browser, **or**
- Serve the folder: `python3 -m http.server` and visit http://localhost:8000
- It also deploys as-is to GitHub Pages, Netlify or Vercel.

## Structure
```
index.html        All sections and content
css/styles.css    Design system, layout, responsive and reduced-motion rules
js/main.js        Menu data, interactions and GSAP motion
vendor/           GSAP + ScrollTrigger and Lenis, copied locally so the demo needs no CDN
```

## Motion
Includes a loader, a cinematic hero entrance, Lenis smooth scrolling, masked text and image reveals, parallax,
a layered Ulsoor Lake parallax, 3D tilt on cards, magnetic CTAs, animated menu tabs, a FLIP lightbox,
rating counters, an events equalizer and waveform, ambient particles, a scroll-progress bar,
a glass navbar and a floating Reserve button.
- Particles, parallax, tilt and magnetic effects turn off on mobile and touch devices.
- `prefers-reduced-motion` turns off all of the motion.

## Demo placeholders (replace before going live)
- **Photography**: Unsplash stock images. If an image fails to load, a warm gradient is shown in its place.
- **Menu**: no prices. Descriptions are illustrative.
- **Events**: dates and times are marked TBA.
- **Reviews**: paraphrased themes, not quotes.
- **Reservation form**: demo only (shows a confirmation). Connect it to the café's booking system.
- **Social links**: `#` placeholders.
