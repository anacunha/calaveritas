# 🎃 Calaveritas

Generador de calaveritas literarias personalizadas para mascotas usando IA. Celebra a tu mascota con poesía tradicional mexicana del Día de Muertos.

## 🚀 Características

- 📸 Carga de fotos de mascotas (JPEG, PNG, WebP)
- 🎨 Selección de rasgos de personalidad
- 🤖 Generación con IA usando Claude 3 Sonnet vía Amazon Bedrock
- ⚡ Streaming en tiempo real de poemas
- 🇲🇽 Interfaz completamente en español

## 🛠️ Stack Tecnológico

- **Next.js 16** con App Router
- **React 19** y **TypeScript 5**
- **Tailwind CSS 4**
- **Amazon Bedrock** + **Claude 3 Sonnet**
- **Vercel AI SDK**
- **Zod** para validación

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/calaveritas.git
cd calaveritas

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env.local
# Edita .env.local con tus credenciales
```

## 🔧 Configuración

### Desarrollo Local

Para desarrollo local, puedes usar credenciales de AWS o el modo de prueba:

```bash
# .env.local

# Opción 1: Modo de prueba (sin AWS)
AI_TEST_MODE=true

# Opción 2: Con credenciales de AWS
AI_TEST_MODE=false
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=tu_access_key
AWS_SECRET_ACCESS_KEY=tu_secret_key
CLAUDE_MODEL_ID=us.anthropic.claude-3-sonnet-20240229-v1:0
```

### Desarrollo

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🚢 Deployment en Vercel

### Opción 1: OIDC con IAM Role (Recomendado)

La forma más segura de deployar es usando OIDC para autenticación sin credenciales estáticas.

**Guía rápida:**

1. **Configurar AWS OIDC** (usa el script helper):

```bash
./scripts/setup-aws-oidc.sh [TU_TEAM_SLUG] [TU_AWS_ACCOUNT_ID]
```

2. **Configurar variables en Vercel**:

```bash
vercel env add AWS_REGION production
vercel env add AWS_ROLE_ARN production
vercel env add CLAUDE_MODEL_ID production
vercel env add AI_TEST_MODE production
```

3. **Deploy**:

```bash
vercel --prod
```

📖 **Guía completa**: Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para instrucciones detalladas.

### Opción 2: Credenciales Estáticas

Si prefieres usar credenciales estáticas (no recomendado para producción):

1. Configura las variables de entorno en Vercel Dashboard
2. Deploy con `vercel --prod`

## 📁 Estructura del Proyecto

```
/app
  /actions          # Server actions
  /components       # Componentes React
  layout.tsx        # Layout raíz
  page.tsx          # Página principal

/lib
  /ai               # Integración con IA
  /config           # Configuración
  /constants        # Constantes
  /errors           # Manejo de errores
  /utils            # Utilidades
  /validation       # Schemas de validación

/scripts            # Scripts de utilidad
```

## 🔐 Seguridad

- ✅ Usa OIDC en producción (sin credenciales estáticas)
- ✅ Permisos IAM mínimos necesarios
- ✅ Validación de entrada con Zod
- ✅ Variables de entorno para configuración sensible

## 📝 Comandos Disponibles

```bash
pnpm dev          # Servidor de desarrollo
pnpm build        # Build para producción
pnpm start        # Servidor de producción
pnpm lint         # Linter
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 🙏 Agradecimientos

- Tradición mexicana de las calaveritas literarias
- Amazon Bedrock y Anthropic Claude
- Vercel y el equipo de Next.js
