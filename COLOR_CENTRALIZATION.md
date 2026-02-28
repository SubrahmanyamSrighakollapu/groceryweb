# Color Centralization - Marketing Website

## Overview
All colors used across the marketing website pages have been centralized into a single file for easier maintenance and consistency.

## Location
**File:** `src/styles/colors.js`

## Color Palette

### Primary Colors
- `primary`: `#EC5B13` - Main green (buttons, highlights, borders)
- `primaryDark`: `#EC5B13` - Dark green (buttons, links, emphasis)
- `primaryLight`: `#EC5B13` - Light green variant (subtitles, accents)

### Secondary Colors
- `secondary`: `#F8F7F0` - Beige/cream background
- `secondaryLight`: `#F7EEEA` - Light green card background

### Tertiary/Accent Colors
- `tertiary`: `#C5D63C` - Yellow-green accent
- `tertiaryAlt`: `#F2C94C` - Yellow accent

### Text Colors
- `textPrimary`: `#1F1E17` - Dark text (headings)
- `textSecondary`: `#878680` - Gray text (body)
- `textTertiary`: `#565656` - Medium gray
- `textLight`: `#666666` - Light gray

### Background Colors
- `bgWhite`: `#FFFFFF`
- `bgCream`: `#F8F7F0`
- `bgLightGreen`: `#F7EEEA`
- `bgPurpleLight`: `#C2BEFF47`

### UI Colors
- `border`: `#959595`
- `shadow`: `rgba(0, 0, 0, 0.1)`
- `overlay`: `rgba(0, 0, 0, 0.45)`

## Updated Files

### HomePages
- ✅ `BusinessAsAgent.jsx`
- ✅ `MainPage.jsx`
- ✅ `WhatWeOffer.jsx`

### About Pages
- ✅ `GetToKnowUs.jsx`
- ✅ `OurPurpose.jsx`
- ✅ `OurTestimonials.jsx`
- ✅ `WhatMakesUsDifferent.jsx`

### Service Pages
- ✅ `AffordableTools.jsx`
- ✅ `Education.jsx`
- ✅ `OurServices.jsx`
- ✅ `SupportForFarmers.jsx`

### Other Pages
- ✅ `ContactUs.jsx`
- ✅ `shop/OfferCard.jsx`

### Global Styles
- ✅ `index.css` - Updated with CSS variable references

## Usage

### In JSX Files
```javascript
import colors from '../../styles/colors';

// In inline styles
<div style={{ backgroundColor: colors.primary }}>

// In template literals
const styles = `
  .my-class {
    background-color: ${colors.bgCream};
    color: ${colors.textPrimary};
  }
`;
```

### Benefits
1. **Single Source of Truth** - All colors defined in one place
2. **Easy Updates** - Change a color once, updates everywhere
3. **Consistency** - No more color variations across pages
4. **Maintainability** - Clear naming conventions
5. **Scalability** - Easy to add new colors or themes

## Notes
- All hardcoded color values have been replaced with references to `colors.js`
- The color naming follows a semantic approach (primary, secondary, tertiary)
- Text colors are organized by usage (primary, secondary, tertiary, light)
- Background colors are clearly separated for easy identification
