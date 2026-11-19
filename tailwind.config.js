module.exports = {
  content: ['./index.html', './en/index.html', './main.js'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "surface": "var(--st-surface)",
        "surface-container-lowest": "var(--st-surface-lowest)",
        "surface-container-low": "var(--st-surface-low)",
        "surface-container": "var(--st-surface-container)",
        "surface-container-high": "var(--st-surface-high)",
        "surface-container-highest": "var(--st-surface-highest)",
        "on-surface": "var(--st-on-surface)",
        "on-surface-variant": "var(--st-on-surface-variant)",
        "primary": "var(--st-primary)",
        "on-primary": "var(--st-on-primary)",
        "primary-container": "var(--st-primary-container)",
        "on-primary-container": "var(--st-on-primary-container)",
        "primary-fixed": "var(--st-primary-fixed)",
        "on-primary-fixed": "var(--st-on-primary-fixed)",
        "secondary": "var(--st-secondary)",
        "on-secondary": "var(--st-on-secondary)",
        "secondary-container": "var(--st-secondary-container)",
        "on-secondary-container": "var(--st-on-secondary-container)",
        "secondary-fixed": "var(--st-secondary-fixed)",
        "on-secondary-fixed": "var(--st-on-secondary-fixed)",
        "tertiary": "var(--st-tertiary)",
        "tertiary-container": "var(--st-tertiary-container)",
        "tertiary-fixed": "var(--st-tertiary-fixed)",
        "on-tertiary-fixed": "var(--st-on-tertiary-fixed)",
        "tertiary-fixed-dim": "var(--st-tertiary-fixed-dim)",
        "outline": "var(--st-outline)",
        "outline-variant": "var(--st-outline-variant)",
        "error": "#ba1a1a"
      },
      fontFamily: {
        "display-lg": ["Playfair Display", "Georgia", "serif"],
        "display-md": ["Playfair Display", "Georgia", "serif"],
        "headline-lg": ["Playfair Display", "Georgia", "serif"],
        "headline-md": ["Playfair Display", "Georgia", "serif"],
        "headline-sm": ["Playfair Display", "Georgia", "serif"],
        "body-lg": ["Golos Text", "system-ui", "sans-serif"],
        "body-md": ["Golos Text", "system-ui", "sans-serif"],
        "body-sm": ["Golos Text", "system-ui", "sans-serif"],
        "label-lg": ["Golos Text", "system-ui", "sans-serif"],
        "label-md": ["Golos Text", "system-ui", "sans-serif"],
        "label-sm": ["Golos Text", "system-ui", "sans-serif"]
      },
      fontSize: {
        "display-lg": ["clamp(2.35rem, 4.8vw, 3.6rem)", { "lineHeight": "1.12", "letterSpacing": "-0.02em", "fontWeight": "600" }],
        "display-md": ["clamp(2rem, 4vw, 2.85rem)", { "lineHeight": "1.16", "letterSpacing": "-0.015em", "fontWeight": "600" }],
        "headline-lg": ["clamp(1.75rem, 3.2vw, 2.35rem)", { "lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "600" }],
        "headline-md": ["clamp(1.35rem, 2.2vw, 1.75rem)", { "lineHeight": "1.28", "fontWeight": "600" }],
        "headline-sm": ["1.35rem", { "lineHeight": "1.32", "fontWeight": "600" }],
        "body-lg": ["1.125rem", { "lineHeight": "1.7", "fontWeight": "400" }],
        "body-md": ["0.96rem", { "lineHeight": "1.6", "fontWeight": "400" }],
        "body-sm": ["0.85rem", { "lineHeight": "1.5", "fontWeight": "400" }],
        "label-lg": ["0.92rem", { "lineHeight": "1.4", "letterSpacing": "0.01em", "fontWeight": "600" }],
        "label-md": ["0.8rem", { "lineHeight": "1.35", "letterSpacing": "0.03em", "fontWeight": "600" }],
        "label-sm": ["0.72rem", { "lineHeight": "1.3", "letterSpacing": "0.05em", "fontWeight": "700" }]
      }
    }
  }
};
