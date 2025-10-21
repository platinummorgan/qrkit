# AdSense Integration Guide for QR Kit

This document outlines how AdSense is integrated into QR Kit and provides instructions for managing ad settings.

## Overview

QR Kit uses a **gated ad rendering strategy** to comply with AdSense policies requiring substantial content alongside ads. Ads are never rendered on first page load—they only appear after meaningful user interaction.

## Gating Mechanism

Ads are controlled by the `SafeAd` component which implements two gates:

1. **QR Code Generation Event**: When a user successfully generates a QR code, a `qr-generated` DOM event is dispatched
2. **FAQ Scroll Intersection**: When the user scrolls to the FAQ section (element with `id="faq"`) and it becomes ≥30% visible in the viewport

When either condition is met, the ad becomes eligible to render.

## Environment Variables

The following environment variables must be set in `.env.local`:

```bash
NEXT_PUBLIC_BASE_URL=https://qrkit.app
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-1190913191003622
NEXT_PUBLIC_AD_SLOT_INLINE=2650523804            # Ad slot for all ad placements
NEXT_PUBLIC_ADS_TEST=on                           # Set to "on" during testing to avoid policy violations
```

**Important**: Set `NEXT_PUBLIC_ADS_TEST=on` while testing to add `data-adtest="on"` to ad units. Remove or set to `off` in production after AdSense approval.

## Component Structure

### `components/AdScript.tsx`
Injects the AdSense loader script. Only include this component on pages where ads may render (home page, guide articles). **Do not** include on legal/utility pages (privacy, terms, contact, FAQ standalone page).

### `components/SafeAd.tsx`
The gated ad component that:
- Returns `null` until gating conditions are met
- Uses Intersection Observer API with 30% threshold
- Listens for `qr-generated` custom event
- Only pushes ad requests after `canShow` state becomes `true`
- Respects `NEXT_PUBLIC_ADS_TEST` environment variable

### `lib/isBrowser.ts`
Simple helper to guard `window` usage: `export const isBrowser = typeof window !== 'undefined';`

## Page-by-Page Ad Strategy

### Home Page (`app/page.tsx`)
- **Ad Placement**: Inside FAQ section, below all Q&A content
- **Content Requirements**: ~500-word intro content + ≥800-word FAQ with substantial Q&A pairs
- **Gating**: Ad shows after user generates QR code OR scrolls to FAQ
- **Slot**: `NEXT_PUBLIC_AD_SLOT_INLINE`

### Guide Articles (`app/guides/*/page.tsx`)
- **Ad Placement**: Mid-article, within content-rich sections (after ~1000 words)
- **Content Requirements**: ≥1000 words per article with proper structure (H1-H3 headings, lists, paragraphs)
- **Gating**: Same as home page (event + intersection)
- **Slot**: `NEXT_PUBLIC_AD_SLOT_INLINE`

### Legal/Utility Pages
**No ads**. Pages like `/privacy`, `/terms`, `/contact`, and `/faq` (standalone) have **zero ad markup** to comply with AdSense policies against ads on thin content pages.

## AdSense Configuration Steps

### 1. Initial Setup
- Ensure your AdSense account is approved and in good standing
- Create ad units for HOME and ARTICLE slots in AdSense UI
- Update `.env.local` with correct slot IDs

### 2. Page Exclusions (During Review)
If ads are causing policy warnings during AdSense review:

1. Go to **AdSense UI** → **Ads** → **Page exclusions**
2. Add the home page URL (`https://qrkit.app/`) as an exclusion temporarily
3. Submit for review with guide pages showing ads
4. After approval, remove the exclusion to re-enable home page ads

### 3. Testing Mode
While testing your implementation:
- Set `NEXT_PUBLIC_ADS_TEST=on` in `.env.local`
- This adds `data-adtest="on"` to all ad units
- Test ads won't count against your policy compliance
- **Remove before production launch**

### 4. Verification
Use the provided PowerShell script (`scripts/check_ads.ps1`) to verify ad markup:

```powershell
.\scripts\check_ads.ps1
```

Expected results:
- `/` → 1 match (loader only, ad is gated)
- `/guides/*` → 2-3 matches (loader + ad in content)
- `/privacy`, `/terms`, `/contact`, `/faq` → 0 matches

## Policy Compliance Checklist

- ✅ Ads never render on first paint (gated by user interaction)
- ✅ Ads only appear in content-rich contexts (FAQ section, guide articles)
- ✅ Home page has ≥800 words total content (intro + FAQ)
- ✅ Guide articles have ≥1000 words each
- ✅ Legal/utility pages have zero ad markup
- ✅ FAQ visible by default for crawlers (`showFaq=true`)
- ✅ All QR generation is client-side (privacy-first)
- ✅ Test mode enabled during development (`NEXT_PUBLIC_ADS_TEST=on`)

## Troubleshooting

### Ads not showing after interaction
- Check browser console for errors
- Verify environment variables are set correctly
- Ensure `AdScript` is included on the page
- Confirm `SafeAd` receives valid `slotId` prop

### Policy warnings about thin content
- Verify FAQ has ≥800 words across all Q&A pairs
- Check guide articles have ≥1000 words
- Ensure legal pages have no ad markup
- Use page exclusions during review if needed

### Ads showing on first load
- Verify `SafeAd` component is not modified to bypass gating
- Check that `canShow` state starts as `false`
- Ensure no direct `adsbygoogle.push()` calls outside `SafeAd`

## Support

For AdSense-specific issues, contact Google AdSense support. For implementation questions, refer to this documentation or contact the development team.
