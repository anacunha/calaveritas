# Guía de Pruebas Manuales - Code of the Dead Visual Redesign

## Servidor de Desarrollo

```bash
pnpm dev
```

Abre http://localhost:3000 en tu navegador

---

## 1. Pruebas de Carga de Imágenes

### Test 1.1: Formato JPEG

1. Haz clic en "Foto de tu mascota"
2. Selecciona una imagen JPEG
3. ✅ Verifica que aparece el preview
4. ✅ Verifica que no hay mensajes de error

### Test 1.2: Formato PNG

1. Haz clic en "Foto de tu mascota"
2. Selecciona una imagen PNG
3. ✅ Verifica que aparece el preview
4. ✅ Verifica que no hay mensajes de error

### Test 1.3: Formato WebP

1. Haz clic en "Foto de tu mascota"
2. Selecciona una imagen WebP
3. ✅ Verifica que aparece el preview
4. ✅ Verifica que no hay mensajes de error

### Test 1.4: Formato Inválido

1. Intenta seleccionar un archivo GIF o BMP
2. ✅ Verifica mensaje: "Formato no soportado. Usa JPEG, PNG o WebP"

### Test 1.5: Tamaño Excesivo

1. Intenta seleccionar una imagen > 5MB
2. ✅ Verifica mensaje: "La imagen debe ser menor a 5MB"

---

## 2. Pruebas de Validación de Nombre

### Test 2.1: Nombre Vacío

1. Deja el campo de nombre vacío
2. Haz clic en "🎃 Generar Calaverita"
3. ✅ Verifica mensaje: "El nombre es requerido"

### Test 2.2: Nombre Muy Largo

1. Ingresa más de 50 caracteres
2. ✅ Verifica que el input limita a 50 caracteres (maxLength)
3. Haz clic en "🎃 Generar Calaverita"
4. ✅ Verifica mensaje: "El nombre debe tener máximo 50 caracteres"

### Test 2.3: Caracteres Inválidos

1. Ingresa "Firulais123" o "Firulais@"
2. Haz clic en "🎃 Generar Calaverita"
3. ✅ Verifica mensaje: "El nombre solo puede contener letras"

### Test 2.4: Nombre Válido con Acentos

1. Ingresa "José" o "María"
2. ✅ Verifica que se acepta sin errores

### Test 2.5: Nombre Válido con Ñ

1. Ingresa "Niño" o "Peña"
2. ✅ Verifica que se acepta sin errores

---

## 3. Pruebas de Selección de Traits

### Test 3.1: Menos de 2 Traits

1. Selecciona solo 1 rasgo
2. Haz clic en "🎃 Generar Calaverita"
3. ✅ Verifica mensaje: "Selecciona al menos 2 rasgos"

### Test 3.2: Exactamente 2 Traits

1. Selecciona 2 rasgos
2. ✅ Verifica que el contador muestra "2/3"
3. ✅ Verifica que no hay mensaje de error

### Test 3.3: Exactamente 3 Traits

1. Selecciona 3 rasgos
2. ✅ Verifica que el contador muestra "3/3"
3. ✅ Verifica que no hay mensaje de error

### Test 3.4: Intentar Seleccionar 4 Traits

1. Selecciona 3 rasgos
2. Intenta seleccionar un 4to rasgo
3. ✅ Verifica mensaje: "Puedes seleccionar máximo 3 rasgos"
4. ✅ Verifica que el 4to rasgo NO se selecciona

### Test 3.5: Deseleccionar Traits

1. Selecciona 3 rasgos
2. Haz clic en uno seleccionado para deseleccionarlo
3. ✅ Verifica que se deselecciona correctamente
4. ✅ Verifica que el contador se actualiza

### Test 3.6: Estados Visuales

1. ✅ Verifica que los rasgos seleccionados tienen fondo magenta (#a91a8a)
2. ✅ Verifica que los rasgos no seleccionados tienen fondo blanco
3. ✅ Verifica que hay hover effect en rasgos no seleccionados

---

## 4. Pruebas de Generación con Streaming

### Test 4.1: Generación Exitosa (Modo Mock)

1. Asegúrate de que `AI_TEST_MODE=true` en `.env.local`
2. Completa el formulario correctamente:
   - Nombre: "Firulais"
   - Traits: 2-3 rasgos
   - Imagen: cualquier JPEG/PNG/WebP válido
3. Haz clic en "🎃 Generar Calaverita"
4. ✅ Verifica que aparece el spinner pixel-art
5. ✅ Verifica que el botón cambia a "⏳ Generando..."
6. ✅ Verifica que el botón se deshabilita
7. ✅ Verifica que aparece el texto "⏳ Generando tu calaverita..."
8. ✅ Verifica que la calaverita aparece gradualmente (streaming)
9. ✅ Verifica que el contenedor tiene fondo durazno (#fcefe8)
10. ✅ Verifica que el título "Tu Calaverita" tiene emojis 💀

### Test 4.2: Generación con AWS Bedrock (Producción)

1. Configura credenciales AWS válidas en `.env.local`
2. Establece `AI_TEST_MODE=false`
3. Completa el formulario correctamente
4. Haz clic en "🎃 Generar Calaverita"
5. ✅ Verifica el mismo comportamiento que Test 4.1
6. ✅ Verifica que la calaverita es única y personalizada

### Test 4.3: Error de Generación

1. Configura credenciales AWS inválidas (si es posible)
2. Intenta generar una calaverita
3. ✅ Verifica que aparece mensaje de error
4. ✅ Verifica que el botón "🎃 Reintentar" aparece
5. ✅ Verifica que el botón de reintentar funciona

---

## 5. Pruebas de Accesibilidad - Contraste de Colores

### Herramienta Recomendada

- Chrome DevTools > Lighthouse > Accessibility
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/

### Test 5.1: Verificar Contraste con Lighthouse

1. Abre Chrome DevTools (F12)
2. Ve a la pestaña "Lighthouse"
3. Selecciona "Accessibility"
4. Haz clic en "Analyze page load"
5. ✅ Verifica que el score de accesibilidad es ≥ 90
6. ✅ Verifica que no hay errores de contraste

### Test 5.2: Verificar Pares de Colores Manualmente

Usa WebAIM Contrast Checker para verificar:

1. **Texto principal sobre fondo**

   - Foreground: `#2d1b2e`
   - Background: `#f6e8f3`
   - ✅ Ratio esperado: ~12.8:1 (AAA)

2. **Botón primary**

   - Foreground: `#ffffff`
   - Background: `#a91a8a`
   - ✅ Ratio esperado: ~5.8:1 (AA)

3. **Botón secondary**

   - Foreground: `#ffffff`
   - Background: `#e1611a`
   - ✅ Ratio esperado: ~4.7:1 (AA)

4. **Texto en calaverita**
   - Foreground: `#2d1b2e`
   - Background: `#fcefe8`
   - ✅ Ratio esperado: ~13.1:1 (AAA)

---

## 6. Pruebas de Navegación por Teclado

### Test 6.1: Orden de Tabulación

1. Recarga la página
2. Presiona Tab repetidamente
3. ✅ Verifica el orden:
   - Campo de nombre
   - Botones de traits (en orden)
   - Input de archivo
   - Botón de submit
   - (Botón de reintentar si visible)

### Test 6.2: Navegación en Campo de Nombre

1. Presiona Tab hasta llegar al campo de nombre
2. ✅ Verifica que el focus es visible (borde magenta + sombra)
3. Escribe un nombre
4. ✅ Verifica que puedes escribir normalmente

### Test 6.3: Navegación en Botones de Traits

1. Presiona Tab hasta llegar a los botones de traits
2. ✅ Verifica que cada botón recibe focus visible
3. Presiona Space o Enter en un botón
4. ✅ Verifica que el trait se selecciona/deselecciona
5. Continúa con Tab para navegar entre traits
6. ✅ Verifica que puedes seleccionar múltiples traits con teclado

### Test 6.4: Navegación en Input de Archivo

1. Presiona Tab hasta llegar al input de archivo
2. ✅ Verifica que el focus es visible
3. Presiona Space o Enter
4. ✅ Verifica que se abre el diálogo de selección de archivo

### Test 6.5: Navegación en Botón de Submit

1. Presiona Tab hasta llegar al botón de submit
2. ✅ Verifica que el focus es visible
3. Presiona Enter
4. ✅ Verifica que el formulario se envía (si está completo)

### Test 6.6: Navegación sin Mouse

1. Intenta completar todo el formulario usando solo el teclado
2. ✅ Verifica que puedes:
   - Ingresar nombre
   - Seleccionar 2-3 traits
   - Seleccionar archivo
   - Enviar formulario
3. ✅ Verifica que nunca pierdes el indicador de focus

---

## 7. Pruebas de Estados Focus Visibles

### Test 7.1: Focus en Input de Texto

1. Haz clic en el campo de nombre
2. ✅ Verifica que aparece:
   - Borde magenta (#a91a8a)
   - Sombra pixel-art magenta (4px 4px 0px)
3. Haz clic fuera
4. ✅ Verifica que el borde vuelve a negro

### Test 7.2: Focus en Botones

1. Presiona Tab para navegar a un botón
2. ✅ Verifica que hay un indicador visual claro
3. ✅ Verifica que el indicador es diferente del estado hover

### Test 7.3: Focus en Input de Archivo

1. Presiona Tab hasta el input de archivo
2. ✅ Verifica que el botón de selección tiene focus visible
3. ✅ Verifica que el indicador es claro y distinguible

---

## 8. Pruebas de Touch Targets (Móvil)

### Herramienta

- Chrome DevTools > Device Toolbar (Ctrl+Shift+M)
- Selecciona un dispositivo móvil (ej: iPhone 12 Pro)

### Test 8.1: Botones de Traits en Móvil

1. Activa el modo móvil en DevTools
2. Inspecciona un botón de trait
3. ✅ Verifica que la altura es ≥ 44px
4. ✅ Verifica que el ancho es suficiente para tocar fácilmente

### Test 8.2: Botón de Submit en Móvil

1. Inspecciona el botón "🎃 Generar Calaverita"
2. ✅ Verifica que la altura es ≥ 56px (excede el mínimo)
3. ✅ Verifica que ocupa todo el ancho disponible

### Test 8.3: Input de Archivo en Móvil

1. Inspecciona el botón de selección de archivo
2. ✅ Verifica que la altura es ≥ 44px
3. ✅ Verifica que es fácil de tocar

### Test 8.4: Espaciado entre Elementos

1. ✅ Verifica que hay suficiente espacio entre botones de traits
2. ✅ Verifica que no hay elementos muy juntos que puedan causar toques accidentales

---

## 9. Pruebas de Responsive Design

### Test 9.1: Vista Móvil (< 640px)

1. Establece viewport a 375px de ancho (iPhone)
2. ✅ Verifica que el título es text-4xl (40px)
3. ✅ Verifica que las sombras son más pequeñas (2px)
4. ✅ Verifica que el padding es reducido
5. ✅ Verifica que todo el contenido es visible sin scroll horizontal
6. ✅ Verifica que los botones de traits se ajustan en 2 columnas

### Test 9.2: Vista Tablet (640px - 1024px)

1. Establece viewport a 768px de ancho (iPad)
2. ✅ Verifica que el título es text-5xl (48px)
3. ✅ Verifica que las sombras son intermedias (3px)
4. ✅ Verifica que el layout es cómodo y espacioso
5. ✅ Verifica que los botones de traits se distribuyen bien

### Test 9.3: Vista Desktop (> 1024px)

1. Establece viewport a 1440px de ancho
2. ✅ Verifica que el título es text-6xl (60px)
3. ✅ Verifica que las sombras son completas (6px)
4. ✅ Verifica que el contenedor tiene max-width (no se expande infinitamente)
5. ✅ Verifica que el layout está centrado

### Test 9.4: Transiciones entre Breakpoints

1. Redimensiona la ventana lentamente de móvil a desktop
2. ✅ Verifica que las transiciones son suaves
3. ✅ Verifica que no hay saltos bruscos en el layout
4. ✅ Verifica que todos los elementos se adaptan correctamente

---

## 10. Pruebas de Estética Pixel-Art

### Test 10.1: Fuente Silkscreen

1. ✅ Verifica que el título principal usa Silkscreen
2. ✅ Verifica que los labels usan Silkscreen
3. ✅ Verifica que los botones usan Silkscreen
4. ✅ Verifica que el texto de la calaverita usa fuente body (legibilidad)

### Test 10.2: Bordes y Sombras

1. ✅ Verifica que todos los bordes son sólidos (3-4px)
2. ✅ Verifica que las sombras son offset sin blur
3. ✅ Verifica que no hay border-radius (esquinas rectas)

### Test 10.3: Colores del Code of the Dead

1. ✅ Verifica que el botón principal es magenta (#a91a8a)
2. ✅ Verifica que el botón de archivo es naranja (#e1611a)
3. ✅ Verifica que el fondo es rosa claro (#f6e8f3)
4. ✅ Verifica que el contenedor de calaverita es durazno (#fcefe8)

### Test 10.4: Efectos de Interacción

1. Haz hover sobre un botón
2. ✅ Verifica que la sombra aumenta
3. Haz clic en un botón
4. ✅ Verifica el efecto de "presionar" (translate + shadow reduction)
5. ✅ Verifica que la transición es rápida (100ms)

---

## 11. Pruebas de Rendimiento

### Test 11.1: Lighthouse Performance

1. Abre Chrome DevTools > Lighthouse
2. Selecciona "Performance"
3. Haz clic en "Analyze page load"
4. ✅ Verifica que el score es ≥ 90

### Test 11.2: Carga de Fuentes

1. Abre Chrome DevTools > Network
2. Filtra por "Font"
3. Recarga la página
4. ✅ Verifica que Silkscreen se carga correctamente
5. ✅ Verifica que no hay FOIT (Flash of Invisible Text)

### Test 11.3: Tamaño de Bundle

1. Ejecuta `pnpm build`
2. ✅ Verifica que el build se completa sin errores
3. ✅ Verifica que no hay warnings críticos

---

## 12. Pruebas de Compatibilidad de Navegadores

### Test 12.1: Chrome/Edge (Chromium)

1. Abre la aplicación en Chrome
2. ✅ Verifica que todo funciona correctamente
3. ✅ Verifica que los estilos se renderizan correctamente

### Test 12.2: Firefox

1. Abre la aplicación en Firefox
2. ✅ Verifica que todo funciona correctamente
3. ✅ Verifica que los estilos se renderizan correctamente
4. ✅ Verifica que las sombras pixel-art se ven bien

### Test 12.3: Safari (si disponible)

1. Abre la aplicación en Safari
2. ✅ Verifica que todo funciona correctamente
3. ✅ Verifica que la fuente Silkscreen se carga
4. ✅ Verifica que los estilos se renderizan correctamente

---

## Checklist Final

### Funcionalidad

- [ ] Carga de imágenes (JPEG, PNG, WebP)
- [ ] Validación de nombre
- [ ] Selección de traits (2-3)
- [ ] Generación con streaming
- [ ] Manejo de errores

### Accesibilidad

- [ ] Contraste de colores (WCAG AA)
- [ ] Navegación por teclado
- [ ] Estados focus visibles
- [ ] Touch targets ≥ 44px
- [ ] Lighthouse Accessibility ≥ 90

### Responsive

- [ ] Vista móvil (< 640px)
- [ ] Vista tablet (640-1024px)
- [ ] Vista desktop (> 1024px)

### Estética

- [ ] Fuente Silkscreen
- [ ] Bordes pixel-art
- [ ] Sombras offset
- [ ] Colores Code of the Dead
- [ ] Efectos de interacción

### Rendimiento

- [ ] Lighthouse Performance ≥ 90
- [ ] Build sin errores
- [ ] Fuentes cargan correctamente

### Compatibilidad

- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (opcional)

---

## Notas

- Todas las pruebas deben realizarse con el servidor de desarrollo corriendo (`pnpm dev`)
- Para pruebas de producción, ejecuta `pnpm build && pnpm start`
- Documenta cualquier problema encontrado en el archivo de issues
- Toma screenshots de los resultados de Lighthouse para referencia
