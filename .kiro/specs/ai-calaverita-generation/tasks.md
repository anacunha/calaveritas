# Plan de Implementación

- [x] 1. Configurar dependencias y estructura base del proyecto

  - Instalar paquetes necesarios: `@ai-sdk/amazon-bedrock`, `ai`, `zod`
  - Crear estructura de directorios: `lib/ai`, `lib/validation`, `lib/constants`, `lib/config`, `app/actions`, `app/components`
  - _Requerimientos: 7.1, 7.2_

- [x] 2. Implementar configuración de Amazon Bedrock y validación de entorno

  - [x] 2.1 Crear archivo de configuración de Bedrock
    - Implementar `lib/ai/bedrock-config.ts` con `createAmazonBedrock`
    - Exportar instancia de bedrock y constante de modelo ID
    - _Requerimientos: 7.1, 7.2, 7.5_
  - [x] 2.2 Implementar validación de variables de entorno
    - Crear `lib/config/validate-env.ts` con schema de Zod
    - Validar credenciales de AWS requeridas
    - Manejar modo de prueba
    - _Requerimientos: 7.2, 7.3_
  - [x] 2.3 Crear tipos y clases de error personalizadas
    - Implementar `lib/errors/calaverita-error.ts` con ErrorCode enum
    - Definir mensajes de error en español
    - _Requerimientos: 6.1, 6.2, 6.4_

- [x] 3. Implementar constantes y validación de datos

  - [x] 3.1 Definir rasgos de personalidad predefinidos
    - Crear `lib/constants/pet-traits.ts` con categorías de rasgos
    - Exportar tipos TypeScript para rasgos
    - _Requerimientos: 2.2_
  - [x] 3.2 Crear schemas de validación con Zod
    - Implementar `lib/validation/calaverita-schema.ts`
    - Validar nombre de mascota, rasgos, tamaño de imagen y tipo MIME
    - _Requerimientos: 1.1, 1.2, 1.3, 1.4, 2.1, 2.3, 2.4_

- [x] 4. Implementar servicio de generación de calaveritas

  - [x] 4.1 Crear servicio principal de IA
    - Implementar `lib/ai/calaverita-service.ts` con clase CalaveritaService
    - Método para convertir imagen a base64
    - Método para construir prompt del sistema y usuario
    - Método principal `generateCalaverita` que usa `streamText` de AI SDK
    - _Requerimientos: 3.1, 3.2, 3.3, 4.1, 4.2, 4.3, 4.4, 4.5, 5.1_
  - [x] 4.2 Implementar servicio mock para pruebas
    - Crear `lib/ai/mock-service.ts` con MockCalaveritaService
    - Simular streaming de respuesta con delays
    - _Requerimientos: 8.1, 8.2, 8.4, 8.5_
  - [x] 4.3 Agregar manejo de timeouts y reintentos
    - Implementar timeout de 10 segundos para análisis de visión
    - Implementar timeout de 30 segundos para generación completa
    - Agregar lógica de reintento una vez en caso de fallo
    - _Requerimientos: 3.4, 3.5, 5.3, 5.4_

- [x] 5. Crear Server Action para generación

  - [x] 5.1 Implementar Server Action principal
    - Crear `app/actions/generate-calaverita.ts`
    - Extraer y validar datos de FormData
    - Validar imagen (formato, tamaño)
    - Llamar al servicio de IA apropiado (real o mock)
    - Manejar errores y retornar respuestas estructuradas
    - _Requerimientos: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.3, 2.4, 2.5, 6.1, 6.2, 6.5_
  - [x] 5.2 Agregar logging estructurado
    - Implementar función de logging en `lib/utils/logger.ts`
    - Registrar eventos de generación con contexto
    - _Requerimientos: 6.5_

- [x] 6. Implementar componente de formulario del cliente

  - [x] 6.1 Crear componente CalaveritaForm
    - Implementar `app/components/CalaveritaForm.tsx`
    - Estado para nombre, rasgos, imagen, preview, loading, error
    - Input para nombre de mascota con validación
    - Selector de rasgos de personalidad (máximo 3)
    - Input de archivo con preview de imagen
    - Validación de formato y tamaño en cliente
    - _Requerimientos: 1.1, 1.2, 2.1, 2.2_
  - [x] 6.2 Implementar manejo de streaming de respuesta
    - Usar `useTransition` para estado de carga
    - Mostrar calaverita progresivamente mientras se genera
    - Mostrar indicador de carga durante generación
    - _Requerimientos: 5.1, 5.2, 5.5_
  - [x] 6.3 Agregar manejo de errores en UI
    - Mostrar mensajes de error amigables
    - Permitir reintentar después de error
    - _Requerimientos: 6.1, 6.2, 6.3_

- [x] 7. Crear página principal de la aplicación

  - Implementar `app/page.tsx` con diseño básico
  - Integrar CalaveritaForm
  - Agregar título y descripción de la app
  - Estilizar con Tailwind CSS
  - _Requerimientos: 1.1, 2.1, 5.5_

- [x] 8. Configurar variables de entorno

  - Crear archivo `.env.example` con todas las variables necesarias
  - Documentar cada variable de entorno
  - Agregar `.env.local` al `.gitignore`
  - _Requerimientos: 7.1, 7.2, 7.5_

- [x] 9. Integrar todo y verificar flujo completo
  - Verificar que el formulario envía datos correctamente
  - Confirmar que el Server Action procesa la imagen
  - Validar que el servicio de IA se conecta a Bedrock
  - Probar streaming de respuesta al cliente
  - Verificar manejo de errores end-to-end
  - _Requerimientos: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 3.2, 3.3, 3.4, 3.5, 4.1, 4.2, 4.3, 4.4, 4.5, 5.1, 5.2, 5.3, 5.4, 5.5, 6.1, 6.2, 6.3, 6.4, 6.5_
