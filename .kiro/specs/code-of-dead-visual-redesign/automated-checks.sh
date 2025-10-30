#!/bin/bash

# Script de Verificación Automatizada - Code of the Dead Visual Redesign
# Este script ejecuta verificaciones técnicas automatizadas

echo "🎃 Code of the Dead - Verificación Automatizada 💀"
echo "=================================================="
echo ""

# Colores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Contador de tests
PASSED=0
FAILED=0

# Función para reportar éxito
pass() {
    echo -e "${GREEN}✅ PASS${NC}: $1"
    ((PASSED++))
}

# Función para reportar fallo
fail() {
    echo -e "${RED}❌ FAIL${NC}: $1"
    ((FAILED++))
}

# Función para reportar advertencia
warn() {
    echo -e "${YELLOW}⚠️  WARN${NC}: $1"
}

echo "1. Verificando estructura de archivos..."
echo "----------------------------------------"

# Verificar que existen los archivos principales
if [ -f "app/components/CalaveritaForm.tsx" ]; then
    pass "CalaveritaForm.tsx existe"
else
    fail "CalaveritaForm.tsx no encontrado"
fi

if [ -f "app/page.tsx" ]; then
    pass "page.tsx existe"
else
    fail "page.tsx no encontrado"
fi

if [ -f "app/globals.css" ]; then
    pass "globals.css existe"
else
    fail "globals.css no encontrado"
fi

if [ -f "app/layout.tsx" ]; then
    pass "layout.tsx existe"
else
    fail "layout.tsx no encontrado"
fi

echo ""
echo "2. Verificando imports de fuentes..."
echo "-------------------------------------"

# Verificar import de Silkscreen en globals.css
if grep -q "Silkscreen" app/globals.css; then
    pass "Fuente Silkscreen importada en globals.css"
else
    fail "Fuente Silkscreen NO importada en globals.css"
fi

# Verificar import de Silkscreen en layout.tsx
if grep -q "Silkscreen" app/layout.tsx; then
    pass "Fuente Silkscreen importada en layout.tsx"
else
    fail "Fuente Silkscreen NO importada en layout.tsx"
fi

echo ""
echo "3. Verificando paleta de colores..."
echo "------------------------------------"

# Verificar colores del Code of the Dead en globals.css
if grep -q "#a91a8a" app/globals.css; then
    pass "Color primary (#a91a8a) definido"
else
    fail "Color primary (#a91a8a) NO definido"
fi

if grep -q "#e1611a" app/globals.css; then
    pass "Color secondary (#e1611a) definido"
else
    fail "Color secondary (#e1611a) NO definido"
fi

if grep -q "#f6e8f3" app/globals.css; then
    pass "Color background (#f6e8f3) definido"
else
    fail "Color background (#f6e8f3) NO definido"
fi

if grep -q "#fcefe8" app/globals.css; then
    pass "Color accent (#fcefe8) definido"
else
    fail "Color accent (#fcefe8) NO definido"
fi

echo ""
echo "4. Verificando branding..."
echo "--------------------------"

# Verificar nuevo título "Peludo Huesudo"
if grep -q "Peludo Huesudo" app/page.tsx; then
    pass "Título 'Peludo Huesudo' presente en page.tsx"
else
    fail "Título 'Peludo Huesudo' NO encontrado en page.tsx"
fi

# Verificar emojis temáticos
if grep -q "🎃💀🐶" app/page.tsx; then
    pass "Emojis temáticos (🎃💀🐶) presentes"
else
    fail "Emojis temáticos NO encontrados"
fi

# Verificar badge del Code of the Dead Challenge
if grep -q "Code of the Dead Challenge" app/page.tsx; then
    pass "Badge del Code of the Dead Challenge presente"
else
    fail "Badge del Code of the Dead Challenge NO encontrado"
fi

echo ""
echo "5. Verificando validaciones..."
echo "-------------------------------"

# Verificar constantes de validación en CalaveritaForm
if grep -q "MAX_TRAITS = 3" app/components/CalaveritaForm.tsx; then
    pass "MAX_TRAITS = 3 definido"
else
    fail "MAX_TRAITS = 3 NO definido correctamente"
fi

if grep -q "MIN_TRAITS = 2" app/components/CalaveritaForm.tsx; then
    pass "MIN_TRAITS = 2 definido"
else
    fail "MIN_TRAITS = 2 NO definido correctamente"
fi

if grep -q "MAX_FILE_SIZE = 5 \* 1024 \* 1024" app/components/CalaveritaForm.tsx; then
    pass "MAX_FILE_SIZE = 5MB definido"
else
    fail "MAX_FILE_SIZE = 5MB NO definido correctamente"
fi

# Verificar tipos de archivo permitidos
if grep -q "image/jpeg" app/components/CalaveritaForm.tsx && \
   grep -q "image/png" app/components/CalaveritaForm.tsx && \
   grep -q "image/webp" app/components/CalaveritaForm.tsx; then
    pass "Tipos de archivo permitidos (JPEG, PNG, WebP) definidos"
else
    fail "Tipos de archivo permitidos NO definidos correctamente"
fi

echo ""
echo "6. Verificando accesibilidad..."
echo "--------------------------------"

# Verificar labels con htmlFor
if grep -q 'htmlFor="petName"' app/components/CalaveritaForm.tsx; then
    pass "Label asociado al input de nombre (htmlFor)"
else
    fail "Label NO asociado al input de nombre"
fi

if grep -q 'htmlFor="image"' app/components/CalaveritaForm.tsx; then
    pass "Label asociado al input de imagen (htmlFor)"
else
    fail "Label NO asociado al input de imagen"
fi

# Verificar IDs únicos
if grep -q 'id="petName"' app/components/CalaveritaForm.tsx; then
    pass "ID único para input de nombre"
else
    fail "ID único para input de nombre NO encontrado"
fi

if grep -q 'id="image"' app/components/CalaveritaForm.tsx; then
    pass "ID único para input de imagen"
else
    fail "ID único para input de imagen NO encontrado"
fi

# Verificar min-height para touch targets
if grep -q "min-h-\[44px\]" app/components/CalaveritaForm.tsx; then
    pass "Touch targets mínimos (44px) implementados"
else
    warn "Touch targets mínimos (44px) podrían no estar implementados"
fi

echo ""
echo "7. Verificando estilos pixel-art..."
echo "------------------------------------"

# Verificar clases pixel-art en globals.css
if grep -q "\.pixel-border" app/globals.css; then
    pass "Clase .pixel-border definida"
else
    fail "Clase .pixel-border NO definida"
fi

if grep -q "\.pixel-shadow" app/globals.css; then
    pass "Clase .pixel-shadow definida"
else
    fail "Clase .pixel-shadow NO definida"
fi

if grep -q "\.pixel-button" app/globals.css; then
    pass "Clase .pixel-button definida"
else
    fail "Clase .pixel-button NO definida"
fi

# Verificar bordes de 3px
if grep -q "border-\[3px\]" app/components/CalaveritaForm.tsx; then
    pass "Bordes de 3px implementados"
else
    fail "Bordes de 3px NO implementados"
fi

# Verificar sombras offset
if grep -q "shadow-\[.*px_.*px_0px" app/components/CalaveritaForm.tsx; then
    pass "Sombras offset (pixel-art) implementadas"
else
    fail "Sombras offset NO implementadas"
fi

echo ""
echo "8. Verificando responsive design..."
echo "------------------------------------"

# Verificar clases responsive en page.tsx
if grep -q "text-4xl sm:text-5xl md:text-6xl" app/page.tsx; then
    pass "Tipografía responsive implementada"
else
    fail "Tipografía responsive NO implementada correctamente"
fi

# Verificar breakpoints en CalaveritaForm
if grep -q "sm:" app/components/CalaveritaForm.tsx; then
    pass "Breakpoints responsive (sm:) utilizados"
else
    fail "Breakpoints responsive NO utilizados"
fi

echo ""
echo "9. Verificando linting y build..."
echo "----------------------------------"

# Ejecutar linting
echo "Ejecutando pnpm lint..."
if pnpm lint > /dev/null 2>&1; then
    pass "Linting sin errores"
else
    fail "Linting con errores"
fi

# Verificar que el build funciona
echo "Ejecutando pnpm build..."
if pnpm build > /dev/null 2>&1; then
    pass "Build de producción exitoso"
else
    fail "Build de producción con errores"
fi

echo ""
echo "10. Verificando TypeScript..."
echo "------------------------------"

# Verificar que no hay errores de TypeScript
echo "Verificando tipos de TypeScript..."
if pnpm tsc --noEmit > /dev/null 2>&1; then
    pass "Sin errores de TypeScript"
else
    warn "Posibles errores de TypeScript (verificar manualmente)"
fi

echo ""
echo "=================================================="
echo "📊 RESUMEN DE VERIFICACIÓN"
echo "=================================================="
echo -e "${GREEN}✅ Tests Pasados: $PASSED${NC}"
echo -e "${RED}❌ Tests Fallidos: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 ¡TODAS LAS VERIFICACIONES PASARON!${NC}"
    echo "La aplicación está lista para producción."
    exit 0
else
    echo -e "${RED}⚠️  ALGUNAS VERIFICACIONES FALLARON${NC}"
    echo "Por favor revisa los errores arriba."
    exit 1
fi
