# NamoNexus SVG Motion Brand Panel — Frontend Technical Specification

## Purpose

Implement a restrained, decorative motion panel for the Hero section. The panel must communicate a stable logo core surrounded by quiet orbital motion. It is an atmosphere layer, not a navigation gate, product demo, metric visualization, or source of business claims.

## Brand constraints

Use Deep Navy `#0A0F2C` as the base, Electric Cyan `#00E0FF` as the primary accent, White for the stable core/wordmark, and Magenta only as a secondary highlight. Keep the center stable and legible. Do not use watermarked media, unapproved raster logos, external video, or audio. Treat the current CSS/vector mark as a prototype until the brand owner approves master SVG geometry.

## Required DOM structure

```html
<div class="nn-motion-panel" role="img" aria-label="Decorative orbital system representing a stable, accountable AI core">
  <div class="nn-orbit nn-orbit-primary" aria-hidden="true"></div>
  <div class="nn-orbit nn-orbit-secondary" aria-hidden="true"></div>
  <div class="nn-particle nn-particle-a" aria-hidden="true"></div>
  <div class="nn-particle nn-particle-b" aria-hidden="true"></div>
  <div class="nn-core" aria-hidden="true">N</div>
  <span class="sr-only">Stable core and accountable system</span>
</div>
```

If the panel is purely decorative and the Hero already communicates the same idea in text, use `aria-hidden="true"` on the wrapper instead of a redundant role/label. Do not make animated particles focusable.

## CSS baseline

```css
.nn-motion-panel {
  position: relative;
  min-height: 320px;
  overflow: hidden;
  border: 1px solid rgba(0, 224, 255, .30);
  background: radial-gradient(circle at center, rgba(0,224,255,.12), transparent 56%);
}

.nn-orbit {
  position: absolute;
  left: 50%;
  top: 50%;
  border: 1px solid rgba(0, 224, 255, .45);
  border-radius: 999px;
  transform-origin: center;
}

.nn-orbit-primary {
  width: 72%;
  height: 42%;
  transform: translate(-50%, -50%) rotate(-18deg) scaleX(1.12);
  animation: nn-orbit-primary 18s linear infinite;
}

.nn-orbit-secondary {
  width: 45%;
  height: 72%;
  border-color: rgba(184, 108, 255, .38);
  transform: translate(-50%, -50%) rotate(48deg) scaleY(.72);
  animation: nn-orbit-secondary 24s linear infinite reverse;
}

.nn-core {
  position: absolute;
  left: 50%;
  top: 50%;
  display: grid;
  width: 112px;
  height: 112px;
  place-items: center;
  transform: translate(-50%, -50%);
  border: 1px solid #00E0FF;
  border-radius: 999px;
  background: rgba(10, 15, 44, .90);
  color: #B9F8FF;
  font-size: 2rem;
  font-weight: 700;
  box-shadow: 0 0 50px rgba(0, 224, 255, .18);
}

@keyframes nn-orbit-primary {
  from { transform: translate(-50%, -50%) rotate(-18deg) scaleX(1.12); }
  to { transform: translate(-50%, -50%) rotate(342deg) scaleX(1.12); }
}

@keyframes nn-orbit-secondary {
  from { transform: translate(-50%, -50%) rotate(48deg) scaleY(.72); }
  to { transform: translate(-50%, -50%) rotate(408deg) scaleY(.72); }
}

@media (prefers-reduced-motion: reduce) {
  .nn-orbit { animation: none; }
}
```

The implementation may use inline SVG instead of CSS shapes when the approved master SVG is available. Keep each SVG path non-focusable, add a descriptive `title` only when the graphic conveys information, and avoid embedding scripts inside SVG files.

## React integration contract

Create a `MotionBrandPanel` component with no network dependency and no business state. The component should accept only presentation props, for example:

```ts
type MotionBrandPanelProps = {
  label?: string;
  reducedMotionFallback?: "static" | "hide";
};
```

The Hero must remain usable if the component fails to render. The headline, subheadline, and CTA must appear before or independently from the panel in DOM order. Never require the animation to understand the service or navigate the site.

## Performance requirements

Use CSS transforms and opacity only for animation. Do not animate layout properties such as width, height, top, left, margin, or box-shadow. Keep the panel decorative, avoid continuous high-frequency particle systems, and do not load a remote video for this treatment. If a future approved SVG is complex, optimize it before shipping and test on a low-power mobile device.

## Accessibility requirements

Provide a static equivalent when `prefers-reduced-motion: reduce` is active. Ensure text contrast remains readable over the panel. Do not use flashing, strobing, rapid rotation, or motion that is necessary to understand the page. Preserve keyboard focus on the real CTA links; the panel itself should not be in the tab order.

## Responsive requirements

At desktop width, the panel may sit to the right of the Hero copy. At tablet width, reduce the panel height and keep it below or beside the copy depending on available width. At 390px, use a single-column Hero, keep the panel decorative, and confirm that no element creates horizontal overflow. Suggested minimums: 260px panel height on mobile and `max-width: 100%` for the panel container.

## QA checklist

- [ ] No remote asset or watermarked media is used.
- [ ] Logo geometry is identified as prototype until approved.
- [ ] Headline and CTA remain readable without motion.
- [ ] `prefers-reduced-motion: reduce` removes animation.
- [ ] No horizontal overflow at 390px.
- [ ] Keyboard focus reaches all real links/buttons and not decorative elements.
- [ ] No console errors or network calls originate from the panel.
- [ ] CPU/GPU usage is reasonable on mobile.
- [ ] Fallback still treatment is visually acceptable.
- [ ] Production approval exists for the master logo before replacing the prototype mark.
