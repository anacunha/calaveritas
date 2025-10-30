# Stack Tecnológico

## Framework y Runtime

- **Next.js 16.0.0** - Framework de React con App Router
- **React 19.2.0** - Librería de UI
- **TypeScript 5** - Desarrollo con tipado seguro
- **Node.js 20+** - Entorno de ejecución

## Sistema de Build y Gestor de Paquetes

- **pnpm** - Gestor de paquetes (preferido)
- **Tailwind CSS 4** - Estilos utility-first con PostCSS

## IA y Servicios en la Nube

- **Amazon Bedrock** - Hosting de modelos de IA
- **Claude 3 Sonnet** - Modelo de IA por defecto para generación de poemas
- **Vercel AI SDK** - Generación de texto con streaming (paquete `ai` v5.0.81)
- **@ai-sdk/amazon-bedrock** - Integración con Bedrock

## Validación y Utilidades

- **Zod 4.1.12** - Validación de tipos en runtime y definición de schemas
- **dotenv** - Gestión de variables de entorno

## Comandos Comunes

```bash
# Desarrollo
pnpm dev              # Iniciar servidor de desarrollo en localhost:3000

# Producción
pnpm build            # Construir para producción
pnpm start            # Iniciar servidor de producción

# Calidad de Código
pnpm lint             # Ejecutar ESLint
```

## Configuración de Entorno

Variables de entorno requeridas (ver `.env.example`):

- `AWS_REGION` - Región de AWS para Bedrock
- `AWS_ACCESS_KEY_ID` - Credenciales de AWS
- `AWS_SECRET_ACCESS_KEY` - Credenciales de AWS
- `CLAUDE_MODEL_ID` - Identificador del modelo Claude
- `AI_TEST_MODE` - Activar modo mock para desarrollo
