# Estructura del Proyecto

## Organización de Directorios

```
/app                    # Páginas y componentes de Next.js App Router
  /actions              # Server actions para manejo de formularios
  /components           # Componentes de React (client-side)
  layout.tsx            # Layout raíz con fuentes y metadata
  page.tsx              # Página principal
  globals.css           # Estilos globales

/lib                    # Utilidades compartidas y lógica de negocio
  /ai                   # Integración con servicios de IA
    bedrock-config.ts   # Configuración del cliente AWS Bedrock
    calaverita-service.ts # Servicio principal de generación con IA
    mock-service.ts     # Servicio mock para testing
  /config               # Utilidades de configuración
  /constants            # Constantes de la aplicación (rasgos de mascotas, etc.)
  /errors               # Clases de error personalizadas y códigos de error
  /utils                # Utilidades generales (logger, etc.)
  /validation           # Schemas de Zod para validación de entrada

/public                 # Assets estáticos
```

## Patrones de Arquitectura

### Server Actions

- Los envíos de formularios usan server actions de Next.js (`app/actions/`)
- Los server actions manejan validación, procesamiento de archivos y llamadas al servicio de IA
- Retornan respuestas con streaming para generación de poemas en tiempo real

### Capa de Servicio

- Lógica de negocio aislada en el directorio `/lib`
- La clase `CalaveritaService` maneja la generación con IA con lógica de reintentos y timeouts
- Configuración separada de la implementación (bedrock-config.ts)

### Estrategia de Validación

- Los schemas de Zod definen las reglas de validación de entrada (`lib/validation/`)
- Validación del lado del cliente en componentes de formulario
- Validación del lado del servidor en server actions
- Mensajes de error consistentes en español

### Manejo de Errores

- Clase personalizada `CalaveritaError` con códigos de error
- Mensajes de error centralizados en español
- Códigos de estado HTTP mapeados a tipos de error
- Degradación elegante con lógica de reintentos

### Patrones de Componentes

- Componentes de cliente marcados con directiva `"use client"`
- Estado del formulario manejado con hooks de React (`useState`, `useTransition`)
- Inputs controlados con retroalimentación de validación
- Manejo de respuestas con streaming usando ReadableStream API

## Convenciones de Nomenclatura

- **Archivos**: kebab-case (ej: `calaverita-service.ts`)
- **Componentes**: PascalCase (ej: `CalaveritaForm.tsx`)
- **Types/Interfaces**: PascalCase (ej: `CalaveritaInput`)
- **Constantes**: SCREAMING_SNAKE_CASE (ej: `MAX_FILE_SIZE`)
- **Funciones**: camelCase (ej: `generateCalaverita`)

## Estilo de Código

- Modo estricto de TypeScript habilitado
- Comentarios JSDoc para APIs públicas y funciones complejas
- Español para contenido de cara al usuario y mensajes de error
- Inglés para código, comentarios y documentación técnica
- Tipos de retorno explícitos en funciones
- Validación exhaustiva de entrada en los límites
