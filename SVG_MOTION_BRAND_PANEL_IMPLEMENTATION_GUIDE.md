# NamoNexus SVG Motion Brand Panel — Implementation Guide

## Purpose

Use the SVG Motion Brand Panel as a decorative Hero enhancement, not as a navigation gate, product demonstration, metrics surface, or source of business claims. The Hero must communicate the service without motion, and the panel must remain optional.

## 1. Prepare the approved assets

Before implementation, obtain an owner-approved master SVG for the compact N mark and the horizontal wordmark. Confirm the geometry, clear space, minimum size, monochrome variants, font rights, commercial usage rights, and whether the source file contains embedded raster images. Until approval is recorded, keep the existing prototype mark labelled as `prototype` and do not replace it in production.

Do not use the watermarked logo images or videos from the reference package. Do not embed remote video, audio, external scripts, or unapproved third-party media in the panel.

## 2. Create the component boundary

Create a presentational component such as `MotionBrandPanel.tsx` with no fetch calls, analytics hooks, business state, router side effects, or form dependencies. The component should accept only visual props:

```ts
type MotionBrandPanelProps = {
  label?: string;
  reducedMotionFallback?: "static" | "hide";
};
```

Keep the Hero copy before the component in DOM order. A component failure must not remove the headline, subheadline, or CTA.

## 3. Use a stable DOM contract

```tsx
export function MotionBrandPanel({
  label = "Decorative orbital system representing a stable, accountable AI core",
  reducedMotionFallback = "static",
}: MotionBrandPanelProps) {
  return (
    <div
      className={`nn-motion-panel nn-fallback-${reducedMotionFallback}`}
      role="img"
      aria-label={label}
    >
      <svg className="nn-motion-svg" viewBox="0 0 400 320" aria-hidden="true" focusable="false">
        <ellipse className="nn-orbit nn-orbit-primary" cx="200" cy="160" rx="146" ry="74" />
        <ellipse className="nn-orbit nn-orbit-secondary" cx="200" cy="160" rx="92" ry="126" />
        <circle className="nn-core-ring" cx="200" cy="160" r="56" />
        <text className="nn-core-letter" x="200" y="174" textAnchor="middle">N</text>
        <circle className="nn-particle nn-particle-a" cx="90" cy="110" r="2" />
        <circle className="nn-particle nn-particle-b" cx="318" cy="214" r="2" />
      </svg>
      <span className="sr-only">Stable core and accountable system</span>
    </div>
  );
}
```

If the panel is only atmosphere and the Hero already explains the same idea, use `aria-hidden="true"` on the wrapper instead of adding redundant narration. Never place orbit paths, particles, or decorative SVG elements in the tab order.

## 4. CSS and motion rules

Animate only `transform` and `opacity`. Keep the primary ring slow, for example 18 seconds per rotation, and the secondary ring slower, for example 24 seconds in reverse. Do not animate width, height, top, left, margin, layout, or high-frequency box-shadow. Use Deep Navy `#0A0F2C`, Electric Cyan `#00E0FF`, white for the stable core, and Magenta only as a restrained secondary highlight.

```css
.nn-motion-panel {
  position: relative;
  width: 100%;
  max-width: 520px;
  min-height: 320px;
  overflow: hidden;
  border: 1px solid rgb(0 224 255 / 0.30);
  background: radial-gradient(circle at center, rgb(0 224 255 / 0.12), transparent 56%);
}

.nn-motion-svg {
  display: block;
  width: 100%;
  height: auto;
  min-height: 260px;
}

.nn-orbit {
  fill: none;
  stroke: #00E0FF;
  stroke-width: 1;
  transform-box: fill-box;
  transform-origin: center;
}

.nn-orbit-primary { animation: nn-orbit-primary 18s linear infinite; }
.nn-orbit-secondary { stroke: #B86CFF; opacity: .7; animation: nn-orbit-secondary 24s linear infinite reverse; }
.nn-particle-a { animation: nn-particle-a 8s ease-in-out infinite alternate; }
.nn-particle-b { animation: nn-particle-b 11s ease-in-out infinite alternate; }

@keyframes nn-orbit-primary {
  from { transform: rotate(-18deg); }
  to { transform: rotate(342deg); }
}

@keyframes nn-orbit-secondary {
  from { transform: rotate(48deg); }
  to { transform: rotate(408deg); }
}

@media (prefers-reduced-motion: reduce) {
  .nn-orbit,
  .nn-particle-a,
  .nn-particle-b { animation: none; }
  .nn-motion-panel { background: rgb(0 224 255 / 0.05); }
}

@media (max-width: 767px) {
  .nn-motion-panel { min-height: 260px; max-width: 100%; }
}
```

## 5. Integrate into the Hero

Use a two-column layout at desktop and a single-column layout below the repository’s mobile breakpoint. Keep copy first in the DOM and place the panel second. The panel should have a constrained pixel height, `max-width: 100%`, and no negative margin that could create overflow at 390px.

```tsx
<section className="hero-grid">
  <div className="hero-copy">
    <p className="eyebrow">SOVEREIGN AI SYSTEMS STUDIO</p>
    <h1>AI systems for decisions that matter.</h1>
    <p>NamoNexus designs private, human-centered AI systems for care, learning, and organizations operating in sensitive environments.</p>
    <div className="hero-actions">
      <a href="/capability">View capabilities</a>
      <a href="/contact">Start a conversation</a>
    </div>
  </div>
  <MotionBrandPanel reducedMotionFallback="static" />
</section>
```

The motion panel must never be the only way to understand NamoNexus, and it must not delay navigation or content rendering. Prefer inline SVG or an optimized local asset. Avoid `position: fixed`, full-screen intro animation, autoplay video, sound, and blocking loaders.

## 6. Verification checklist

Run the frontend type check and production frontend build. Verify the Hero at desktop, tablet, and 390px mobile. Confirm the page has no horizontal overflow, the panel is not focusable, real CTA links are reachable by keyboard, and the headline remains readable when animation is disabled. Emulate `prefers-reduced-motion: reduce` and verify that computed animation names are `none` or that the static fallback is displayed.

Use browser console and network inspection to confirm that the component creates no network request, analytics event, image fetch to an unapproved domain, or external script dependency. Test on a low-power mobile device or throttled CPU if the approved SVG becomes complex.

## 7. Production gate

Do not replace the prototype logo, publish the animation, or attach analytics until the brand owner approves the master SVG, motion behavior, asset rights, accessibility treatment, performance budget, and rollback plan. Record the approval with a version, date, owner, and asset checksum.
