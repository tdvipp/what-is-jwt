# Minimalist Black & White Presentation Style Guide

This document serves as a guideline for AI agents to build slide-based presentation pages in the exact same style as this deck.

---

## 1. Design Aesthetic & Palette

The page must use a **strict, high-contrast, monochrome (Black & White)** theme. All background glows, gradients, shadows, cards blurs, and colors must be completely removed.

### Color Tokens
- **Page Background**: `#000000` (pure black)
- **Cards Background**: `#000000` (pure black)
- **Text Color**: `#ffffff` (pure white, solid) for all headings, body text, lists, and comments. **No gray, faded, or muted text is allowed.**
- **Borders & Separators**: `#333333` or `#222222` (dark flat grays) for card borders and line separations.
- **Button / Active Element Background**: `#ffffff` (white) with `#000000` (black) text.

### Visual Accents (No Colors)
To differentiate elements (such as parts of a token or code structures) without using color:
- **Header**: Underlined with a thin solid line (`border-bottom: 1px solid #ffffff;`).
- **Payload**: Underlined with a dashed line (`border-bottom: 1px dashed #ffffff;`).
- **Signature**: Underlined with a double solid line (`border-bottom: 2px double #ffffff;`).

---

## 2. Page & Layout Structure

### Viewport Layout
- Set `body` to `height: 100vh; width: 100vw; overflow: hidden;` to lock the viewport.
- Position slides absolutely so they overlay each other.

### Slide Card Layout
- **Container**: Max-width of `1050px`, centering elements vertically. Card border is `1px solid #333333` with smooth rounded edges (`border-radius: 20px`).
- **Rounded Corners**: All structural components must have rounded borders to avoid sharp edges:
  - Slide cards: `border-radius: 20px;`
  - Info cards & FAQ items: `border-radius: 16px;`
  - Code blocks, warning callouts, menu buttons, and dropdown links: `border-radius: 10px` or `12px;`
  - Circular elements (avatars, step badges, accordion toggles): `border-radius: 50%;`
- **Slide 1 (Welcome)** & **Slide 11 (Thank You)**: Centered layouts (`.slide-card.center-slide`) with center-aligned text. Slide 1 displays the presenter's avatar (`avatar.png`), name, and social links (flat white container with black text) aligned vertically.
- **Content Slides (Slide 2 - 10)**: Flexbox or grid systems with left-aligned headings and plain list bullet points.

---

## 3. Verbatim Content Policy

All text across content slides must map **exactly verbatim** to the source documentation (`README.md`). 
- Do not introduce filler words, customized outline items, or explanatory descriptions.
- Use plain HTML elements (e.g. `<ul>` and `<li>`) with solid white text.
- Grayscale filters must be applied to images (`filter: grayscale(100%) contrast(1.2);`) to fit the monochrome aesthetic.

---

## 4. Code Highlight Standard

Do not use colored syntax highlighting (e.g. green, pink, or yellow keyword colors). Use monochrome style classes to highlight syntax through font weight or minimal text shades:
- `.token-key`: `#ffffff` (font-weight: 600)
- `.token-keyword`: `#ffffff` (font-weight: bold)
- `.token-string`: `#ffffff`
- `.token-number`: `#ffffff`
- `.token-boolean`: `#ffffff` (font-weight: bold)
- `.token-ident`: `#ffffff`
- `.token-comment`: `#ffffff` (font-style: italic)

---

## 5. Slide Navigation & Controls

Slide transitions must be **instantaneous** (`transition: none` or duration `0s`) with no fading opacity, sliding offsets (translates), or scale zooms.

### Top Left Hamburger Menu
- A fixed button at the top-left showing `☰` (`.menu-btn`).
- Clicking it opens an absolute overlay list of slides (`.menu-nav`).
- Selecting an item goes directly to that slide and closes the menu overlay.
- Clicking outside of the menu overlay collapses it automatically.

### Bottom Index Overlay
- Simple centered text at the bottom overlay indicating progress (e.g., `1/11`).
- No arrows, progress line gauges, or bottom bar panels.

### Key & Gesture Handlers
- **Keyboard Navigation**: Listener to handle next slide (`ArrowRight`, `Space`, `PageDown`) and previous slide (`ArrowLeft`, `PageUp`).
- **Touch Swipe**: Simple delta-X swipe thresholds on mobile screens.
- **State Preservation**: Sync current slide internal index with the URL hash (`#slide-X`) to maintain position on reload.
