# Implementation Plan

- [x] 1. Actualizar el sistema de diseño base en globals.css

  - Implementar las variables CSS del Code of the Dead (colores primary, secondary, background, accent)
  - Agregar el import de la fuente Silkscreen desde Google Fonts
  - Crear las variables de tipografía (font-display, font-body, escalas de texto)
  - Implementar las clases utilitarias pixel-art (pixel-border, pixel-shadow, pixel-button)
  - Definir las variables de espaciado y sombras
  - Actualizar los estilos del body con el nuevo background color
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 3.2, 4.1, 4.2, 4.3_

- [x] 2. Actualizar el layout raíz con nueva tipografía y metadata

  - Reemplazar las fuentes Geist por Silkscreen en layout.tsx
  - Importar Silkscreen con pesos 400 y 700 desde Google Fonts
  - Configurar la variable CSS --font-silkscreen
  - Actualizar el metadata con el nuevo título "Peludo Huesudo 🎃💀🐶"
  - Actualizar la descripción del metadata para incluir Code of the Dead Challenge
  - Agregar keywords relevantes al metadata
  - _Requirements: 1.1, 1.2, 3.1, 3.2_

- [x] 3. Rediseñar la página principal (page.tsx)

  - Actualizar el background del contenedor principal con el color #f6e8f3
  - Reemplazar el título con "Peludo Huesudo 🎃💀🐶" usando la fuente Silkscreen
  - Aplicar estilos pixel-art al título (sombras, colores del design system)
  - Actualizar los estilos del párrafo descriptivo con los nuevos colores de texto
  - Agregar un badge/banner indicando "Code of the Dead Challenge - JSConf MX 2025"
  - Aplicar estilos responsive al header (text-4xl en móvil, text-6xl en desktop)
  - Actualizar el footer con los nuevos colores
  - _Requirements: 1.1, 1.3, 2.1, 2.2, 2.3, 2.4, 4.1, 4.2, 6.1, 6.2, 8.1_

- [x] 4. Actualizar estilos de inputs y campos de texto en CalaveritaForm

  - Aplicar bordes pixel-art (3px solid) a los campos de texto
  - Implementar sombras pixel-art en estado focus
  - Actualizar colores de borde usando el color primary (#a91a8a) en focus
  - Aplicar la fuente body a los inputs para mantener legibilidad
  - Actualizar estados disabled con los nuevos colores
  - Implementar transiciones rápidas (100ms) para efectos pixel-art
  - _Requirements: 2.1, 2.2, 4.1, 4.2, 4.3, 7.2, 8.1, 9.1, 9.2_

- [x] 5. Rediseñar botones del formulario con estética pixel-art

  - Actualizar el botón principal de submit con color primary (#a91a8a)
  - Aplicar fuente Silkscreen a todos los botones
  - Implementar bordes de 3px y sombras pixel-art (4px 4px 0px)
  - Crear efecto de "presionar" con transform y shadow en estado active
  - Actualizar estados hover con color primary-hover (#8a1570)
  - Agregar emojis temáticos a los textos de botones (🎃, ⏳)
  - Actualizar estados disabled con los nuevos colores
  - _Requirements: 2.1, 3.3, 3.4, 4.1, 4.2, 4.3, 7.1, 8.2, 9.3_

- [x] 6. Actualizar botones de selección de rasgos

  - Aplicar estilos pixel-art a los botones de traits (bordes 3px, sombras)
  - Usar color primary (#a91a8a) para estado seleccionado
  - Usar background blanco con hover a accent (#fcefe8) para no seleccionados
  - Aplicar fuente Silkscreen a los labels de traits
  - Implementar efecto de presionar (translate + shadow reduction)
  - Mantener la funcionalidad de selección múltiple (2-3 traits)
  - Asegurar responsive layout de los botones
  - _Requirements: 2.1, 2.2, 3.3, 3.4, 4.1, 4.2, 7.3, 8.3, 9.3_

- [x] 7. Rediseñar el input de archivo y preview de imagen

  - Aplicar estilos pixel-art al botón de file input
  - Usar color secondary (#e1611a) para el botón de selección de archivo
  - Aplicar fuente Silkscreen al texto del botón
  - Implementar bordes y sombras pixel-art
  - Actualizar el contenedor del preview con bordes pixel-art y sombra
  - Usar background blanco para el contenedor del preview
  - Mantener image-rendering: auto para las fotos de mascotas
  - _Requirements: 2.1, 2.2, 4.1, 4.2, 7.1, 8.4_

- [x] 8. Actualizar el contenedor de calaverita generada

  - Usar background color accent (#fcefe8) para el contenedor
  - Aplicar bordes gruesos (4px) con estilo pixel-art
  - Implementar sombra pixel-art grande (6px 6px 0px)
  - Actualizar el título "Tu Calaverita" con fuente Silkscreen y color primary
  - Agregar emojis decorativos (💀) al título
  - Mantener fuente body para el texto de la calaverita (legibilidad)
  - Aplicar colores de texto del design system
  - Asegurar responsive padding (p-6 en móvil, p-8 en desktop)
  - _Requirements: 2.1, 2.4, 3.3, 4.1, 4.2, 4.4, 5.1, 5.2, 7.4, 8.4, 9.1, 9.2_

- [x] 9. Actualizar mensajes de error y estados de carga

  - Rediseñar contenedores de error con bordes pixel-art
  - Usar colores de error apropiados manteniendo accesibilidad
  - Aplicar fuente Silkscreen a los títulos de error
  - Agregar emoji de advertencia (⚠️) a los mensajes de error
  - Actualizar el spinner de carga con estilo pixel-art
  - Aplicar fuente Silkscreen al texto de loading
  - Agregar emoji de reloj (⏳) al indicador de carga
  - Mantener toda la funcionalidad de manejo de errores
  - _Requirements: 2.1, 3.3, 4.1, 4.2, 5.1, 7.5, 8.5_

- [x] 10. Actualizar labels y textos auxiliares

  - Aplicar fuente Silkscreen a todos los labels de formulario
  - Usar uppercase y tracking-wide para labels
  - Actualizar colores de texto usando la paleta del design system
  - Aplicar fuente Silkscreen a los headers de categorías de traits
  - Mantener fuente body para textos de ayuda y descripciones
  - Actualizar colores de textos secundarios (#5a3a5c)
  - _Requirements: 2.1, 2.2, 3.3, 3.5, 9.1_

- [x] 11. Implementar responsive design y ajustes finales

  - Verificar breakpoints responsive (móvil, tablet, desktop)
  - Ajustar tamaños de texto según viewport (text-4xl a text-6xl)
  - Asegurar que todos los touch targets sean mínimo 44x44px en móvil
  - Reducir sombras y padding en móvil para optimizar espacio
  - Verificar que el layout se adapte correctamente en todos los tamaños
  - Probar navegación y usabilidad en dispositivos móviles
  - _Requirements: 6.1, 6.2, 6.3, 9.2, 9.3, 9.4_

- [x] 12. Verificación de funcionalidad y accesibilidad
  - Probar carga de imágenes con diferentes formatos (JPEG, PNG, WebP)
  - Verificar validación de nombre de mascota
  - Probar selección de traits (mínimo 2, máximo 3)
  - Verificar generación de calaverita con streaming
  - Probar todos los mensajes de error y validaciones
  - Verificar contraste de colores (WCAG AA mínimo)
  - Probar navegación por teclado en todos los elementos interactivos
  - Verificar que los estados focus sean visibles
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 9.4_
