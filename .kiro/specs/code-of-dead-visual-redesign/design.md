# Design Document: Code of the Dead Visual Redesign

## Overview

Este documento describe el diseño detallado para transformar la aplicación Calaveritas en "Peludo Huesudo 🎃💀🐶" con la estética pixel-art/retro gaming del Code of the Dead Challenge de JSConf MX 2025. El rediseño se enfoca en actualizar completamente el sistema visual mientras preserva toda la funcionalidad existente.

### Design Goals

1. Implementar una identidad visual coherente con el Code of the Dead Challenge
2. Crear una experiencia pixel-art/retro gaming auténtica
3. Mantener excelente usabilidad y accesibilidad
4. Preservar 100% de la funcionalidad existente
5. Asegurar responsive design en todos los dispositivos

## Architecture

### Visual System Layers

```
┌─────────────────────────────────────┐
│   Typography Layer (Silkscreen)     │
├─────────────────────────────────────┤
│   Color System (Code of Dead)       │
├─────────────────────────────────────┤
│   Component Styles (Pixel-art)      │
├─────────────────────────────────────┤
│   Layout & Spacing                  │
├─────────────────────────────────────┤
│   Existing Functionality (Preserved)│
└─────────────────────────────────────┘
```

### File Structure

```
app/
├── globals.css          # Updated with new design system
├── layout.tsx           # Updated with Silkscreen font
├── page.tsx             # Updated with new branding
└── components/
    └── CalaveritaForm.tsx  # Updated component styles
```

## Components and Interfaces

### 1. Design System Foundation (globals.css)

#### Color Variables

```css
:root {
  /* Code of the Dead Palette */
  --color-primary: #a91a8a; /* Magenta/Pink - Main actions */
  --color-secondary: #e1611a; /* Orange - Accents */
  --color-background: #f6e8f3; /* Light Pink - Main background */
  --color-accent: #fcefe8; /* Peach - Secondary backgrounds */

  /* Semantic Colors */
  --color-text-primary: #2d1b2e; /* Dark purple for main text */
  --color-text-secondary: #5a3a5c; /* Medium purple for secondary text */
  --color-error: #d32f2f; /* Error states */
  --color-success: #388e3c; /* Success states */

  /* Interactive States */
  --color-primary-hover: #8a1570;
  --color-secondary-hover: #c54e15;

  /* Borders and Shadows */
  --border-pixel: 3px solid #2d1b2e;
  --shadow-pixel: 4px 4px 0px #2d1b2e;
}
```

#### Typography System

```css
/* Import Silkscreen */
@import url("https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&display=swap");

/* Font Families */
--font-display: "Silkscreen", monospace; /* Headings, buttons */
--font-body: system-ui, -apple-system, sans-serif; /* Body text */

/* Type Scale */
--text-xs: 0.75rem; /* 12px */
--text-sm: 0.875rem; /* 14px */
--text-base: 1rem; /* 16px */
--text-lg: 1.125rem; /* 18px */
--text-xl: 1.25rem; /* 20px */
--text-2xl: 1.5rem; /* 24px */
--text-3xl: 2rem; /* 32px */
--text-4xl: 2.5rem; /* 40px */
```

#### Pixel-Art Styling Utilities

```css
/* Pixel-perfect borders */
.pixel-border {
  border: 3px solid var(--color-text-primary);
  border-radius: 0;
  image-rendering: pixelated;
}

/* Pixel shadow effect */
.pixel-shadow {
  box-shadow: 4px 4px 0px var(--color-text-primary);
}

/* Pixel button base */
.pixel-button {
  font-family: var(--font-display);
  border: 3px solid var(--color-text-primary);
  box-shadow: 4px 4px 0px var(--color-text-primary);
  transition: transform 0.1s, box-shadow 0.1s;
}

.pixel-button:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px var(--color-text-primary);
}
```

### 2. Layout Component (layout.tsx)

#### Font Integration

```typescript
import { Silkscreen } from "next/font/google";

const silkscreen = Silkscreen({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-silkscreen",
  display: "swap",
});
```

#### Metadata Update

```typescript
export const metadata: Metadata = {
  title: "Peludo Huesudo 🎃💀🐶 | Code of the Dead Challenge",
  description:
    "Genera calaveritas literarias personalizadas para tu mascota con IA. Parte del Code of the Dead Challenge de JSConf MX 2025.",
  keywords: ["calaveritas", "día de muertos", "mascotas", "IA", "JSConf MX"],
};
```

### 3. Main Page (page.tsx)

#### Header Section Design

```tsx
<div className="text-center mb-12 px-4">
  <h1
    className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-4
                 text-[#2d1b2e] pixel-shadow-text"
  >
    Peludo Huesudo 🎃💀🐶
  </h1>
  <p className="text-base sm:text-lg max-w-2xl mx-auto text-[#5a3a5c] leading-relaxed">
    Sube una foto de tu mascota y descubre su calaverita literaria
    personalizada. Usando inteligencia artificial, creamos versos únicos que
    celebran a tu compañero peludo al estilo del Día de Muertos.
  </p>
  <div className="mt-4 inline-block px-4 py-2 bg-[#fcefe8] border-3 border-[#2d1b2e]">
    <p className="font-display text-sm text-[#e1611a]">
      🏆 Code of the Dead Challenge - JSConf MX 2025
    </p>
  </div>
</div>
```

#### Background Design

```tsx
// Replace gradient with solid color + subtle pattern
<div className="min-h-screen bg-[#f6e8f3] relative">
  {/* Optional: Subtle pixel pattern overlay */}
  <div className="absolute inset-0 opacity-5 pixel-pattern"></div>

  <main className="relative container mx-auto px-4 py-12">{/* Content */}</main>
</div>
```

### 4. Form Component (CalaveritaForm.tsx)

#### Input Field Styling

```tsx
// Text Input
<input
  className="w-full px-4 py-3 font-body text-base
             bg-white border-3 border-[#2d1b2e]
             focus:outline-none focus:border-[#a91a8a]
             focus:shadow-[4px_4px_0px_#a91a8a]
             disabled:bg-gray-100 disabled:cursor-not-allowed
             transition-shadow"
/>
```

#### Button Styling

```tsx
// Primary Button (Submit)
<button
  className="w-full py-4 px-6 font-display text-lg font-bold
             bg-[#a91a8a] text-white border-3 border-[#2d1b2e]
             shadow-[4px_4px_0px_#2d1b2e]
             hover:bg-[#8a1570] hover:shadow-[6px_6px_0px_#2d1b2e]
             active:translate-x-[2px] active:translate-y-[2px]
             active:shadow-[2px_2px_0px_#2d1b2e]
             disabled:bg-gray-400 disabled:cursor-not-allowed
             transition-all duration-100"
>
  {isPending ? "⏳ Generando..." : "🎃 Generar Calaverita"}
</button>
```

#### Trait Selection Buttons

```tsx
// Trait Button (Unselected)
<button
  className={`px-4 py-2 font-display text-sm font-bold
              border-3 border-[#2d1b2e]
              transition-all duration-100
              ${
                isSelected
                  ? "bg-[#a91a8a] text-white shadow-[3px_3px_0px_#2d1b2e]"
                  : "bg-white text-[#2d1b2e] shadow-[2px_2px_0px_#2d1b2e] hover:bg-[#fcefe8]"
              }
              active:translate-x-[1px] active:translate-y-[1px]
              disabled:opacity-50 disabled:cursor-not-allowed`}
>
  {trait.label}
</button>
```

#### File Input Styling

```tsx
<div className="relative">
  <input
    type="file"
    className="w-full text-sm text-[#2d1b2e] font-body
               file:mr-4 file:py-3 file:px-6
               file:font-display file:font-bold
               file:border-3 file:border-[#2d1b2e]
               file:bg-[#e1611a] file:text-white
               file:shadow-[3px_3px_0px_#2d1b2e]
               file:cursor-pointer
               hover:file:bg-[#c54e15]
               disabled:opacity-50"
  />
</div>
```

#### Image Preview

```tsx
<div
  className="mt-4 inline-block border-3 border-[#2d1b2e]
                shadow-[4px_4px_0px_#2d1b2e] bg-white p-2"
>
  <img
    src={formState.imagePreview}
    alt="Preview de tu mascota"
    className="max-w-xs w-full h-auto"
    style={{ imageRendering: "auto" }}
  />
</div>
```

#### Calaverita Display Container

```tsx
<div
  className="bg-[#fcefe8] border-4 border-[#2d1b2e]
                shadow-[6px_6px_0px_#2d1b2e] p-6 sm:p-8"
>
  <div className="flex items-center gap-3 mb-4">
    <span className="text-3xl">💀</span>
    <h3 className="font-display text-xl sm:text-2xl font-bold text-[#a91a8a]">
      Tu Calaverita
    </h3>
    <span className="text-3xl">💀</span>
  </div>
  <div
    className="font-body text-base sm:text-lg leading-relaxed
                  text-[#2d1b2e] whitespace-pre-wrap"
  >
    {formState.generatedCalaverita}
  </div>
</div>
```

#### Error Message Styling

```tsx
<div
  className="bg-red-50 border-3 border-red-600
                shadow-[4px_4px_0px_#2d1b2e] p-4"
>
  <div className="flex items-start gap-3">
    <span className="text-2xl">⚠️</span>
    <div className="flex-1">
      <p className="font-display text-sm font-bold text-red-800 mb-1">Error</p>
      <p className="font-body text-sm text-red-700">{formState.error}</p>
    </div>
  </div>
</div>
```

#### Loading Indicator

```tsx
<div className="flex flex-col items-center justify-center gap-4 py-8">
  <div className="relative w-16 h-16">
    {/* Pixel-art style spinner */}
    <div
      className="absolute inset-0 border-4 border-[#2d1b2e]
                    border-t-[#a91a8a] animate-spin"
    ></div>
  </div>
  <p className="font-display text-base text-[#5a3a5c]">
    ⏳ Generando tu calaverita...
  </p>
</div>
```

### 5. Section Labels and Headers

```tsx
// Form Section Label
<label className="block font-display text-sm font-bold
                  text-[#2d1b2e] mb-2 uppercase tracking-wide">
  Nombre de tu mascota
</label>

// Category Header
<h3 className="font-display text-xs font-bold
               text-[#5a3a5c] uppercase tracking-wider mb-2">
  {category}
</h3>

// Helper Text
<p className="font-body text-xs text-[#5a3a5c] mt-1">
  Formatos: JPEG, PNG, WebP. Máximo 5MB
</p>
```

## Data Models

No se requieren cambios en los modelos de datos existentes. El rediseño es puramente visual.

### Preserved Data Structures

- `FormState` interface - Sin cambios
- `CalaveritaInput` validation schema - Sin cambios
- Server action responses - Sin cambios

## Error Handling

### Visual Error States

Los mensajes de error mantienen su funcionalidad pero con nuevo estilo:

```tsx
// Error Container
<div className="bg-red-50 border-3 border-red-600 shadow-[4px_4px_0px_#2d1b2e] p-4">
  <div className="flex items-start gap-3">
    <span className="text-2xl">⚠️</span>
    <div>
      <p className="font-display text-sm font-bold text-red-800">Error</p>
      <p className="font-body text-sm text-red-700">{errorMessage}</p>
    </div>
  </div>
</div>

// Success State (if needed)
<div className="bg-green-50 border-3 border-green-600 shadow-[4px_4px_0px_#2d1b2e] p-4">
  <div className="flex items-start gap-3">
    <span className="text-2xl">✅</span>
    <p className="font-body text-sm text-green-700">{successMessage}</p>
  </div>
</div>
```

## Testing Strategy

### Visual Regression Testing

1. **Manual Testing Checklist**

   - Verificar colores en todos los componentes
   - Confirmar tipografía Silkscreen en headings y botones
   - Validar efectos pixel-art (bordes, sombras)
   - Probar estados interactivos (hover, active, disabled)
   - Verificar responsive design en móvil, tablet, desktop

2. **Functional Testing**

   - Validar que la carga de imágenes funciona correctamente
   - Confirmar que la selección de rasgos funciona
   - Verificar que la generación de calaveritas funciona
   - Probar validaciones de formulario
   - Confirmar manejo de errores

3. **Cross-Browser Testing**

   - Chrome/Edge (Chromium)
   - Firefox
   - Safari (macOS/iOS)

4. **Accessibility Testing**
   - Contraste de colores (WCAG AA mínimo)
   - Navegación por teclado
   - Lectores de pantalla
   - Touch targets (mínimo 44x44px)

### Testing Approach

```bash
# Development server
pnpm dev

# Build test
pnpm build

# Lint check
pnpm lint
```

## Responsive Design Specifications

### Breakpoints

```css
/* Mobile First Approach */
--breakpoint-sm: 640px; /* Small tablets */
--breakpoint-md: 768px; /* Tablets */
--breakpoint-lg: 1024px; /* Desktops */
--breakpoint-xl: 1280px; /* Large desktops */
```

### Mobile (< 640px)

- Title: text-4xl (40px)
- Single column layout
- Full-width buttons
- Stacked trait buttons (2 per row)
- Reduced padding and shadows

### Tablet (640px - 1024px)

- Title: text-5xl (48px)
- Comfortable spacing
- Trait buttons in flexible grid
- Standard shadows and borders

### Desktop (> 1024px)

- Title: text-6xl (60px)
- Maximum width container (max-w-4xl)
- Optimal spacing
- Full pixel-art effects

## Implementation Notes

### CSS Custom Properties Strategy

Usar CSS custom properties para facilitar mantenimiento:

```css
:root {
  /* Spacing Scale */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;

  /* Border Widths */
  --border-thin: 2px;
  --border-medium: 3px;
  --border-thick: 4px;

  /* Shadow Offsets */
  --shadow-sm: 2px 2px 0px;
  --shadow-md: 4px 4px 0px;
  --shadow-lg: 6px 6px 0px;
}
```

### Tailwind Configuration

Extender Tailwind con los valores del design system:

```javascript
// tailwind.config.js additions
theme: {
  extend: {
    colors: {
      'cod-primary': '#a91a8a',
      'cod-secondary': '#e1611a',
      'cod-background': '#f6e8f3',
      'cod-accent': '#fcefe8',
    },
    fontFamily: {
      'display': ['var(--font-silkscreen)', 'monospace'],
    },
    boxShadow: {
      'pixel-sm': '2px 2px 0px #2d1b2e',
      'pixel': '4px 4px 0px #2d1b2e',
      'pixel-lg': '6px 6px 0px #2d1b2e',
    },
  }
}
```

### Performance Considerations

1. **Font Loading**: Usar `display: swap` para evitar FOIT
2. **CSS Optimization**: Purgar clases no utilizadas en producción
3. **Image Rendering**: Mantener `image-rendering: auto` para fotos de mascotas
4. **Transitions**: Limitar a propiedades de bajo costo (transform, opacity)

## Design Rationale

### Color Choices

- **Primary (#a91a8a)**: Color distintivo del Code of the Dead Challenge, usado para acciones principales
- **Secondary (#e1611a)**: Naranja vibrante que evoca el Día de Muertos y crea contraste
- **Background (#f6e8f3)**: Rosa claro que proporciona un lienzo suave y acogedor
- **Accent (#fcefe8)**: Durazno para destacar contenido importante sin competir con el primary

### Typography Rationale

- **Silkscreen**: Fuente pixel-art auténtica que establece inmediatamente la estética retro gaming
- **System Fonts para Body**: Mantiene legibilidad en textos largos (calaveritas) mientras conserva el tema en headings

### Pixel-Art Aesthetic Implementation

- **Bordes sólidos**: 3-4px borders crean el look pixel-art sin comprometer usabilidad
- **Sombras offset**: Box-shadows con offset fijo (sin blur) simulan profundidad pixel-art
- **Transiciones rápidas**: 100ms transitions mantienen la sensación "snappy" de juegos retro
- **Esquinas rectas**: Eliminación de border-radius excepto donde sea absolutamente necesario

### Accessibility Considerations

- **Contraste**: Todos los pares de colores cumplen WCAG AA (4.5:1 para texto normal)
- **Touch Targets**: Botones mínimo 44x44px en móvil
- **Focus States**: Indicadores visuales claros con border color change
- **Font Sizes**: Mínimo 16px para body text, escalado apropiado para headings
