---
inclusion: always
---

# Verificación de Documentación Oficial

## Regla Principal

**SIEMPRE verifica la documentación oficial antes de proporcionar soluciones que involucren:**

- Configuración de servicios en la nube (AWS, Vercel, etc.)
- Integración de SDKs de terceros
- Configuración de autenticación (OIDC, OAuth, etc.)
- APIs de frameworks (Next.js, React, etc.)

## Tecnologías Específicas

### Vercel

Cuando trabajes con Vercel, SIEMPRE usa el tool `mcp_vercel_search_vercel_documentation` para:

- Configuración de OIDC
- Variables de entorno
- Configuración de deployments
- Integración con servicios de AWS
- Límites y configuraciones de serverless functions

### AWS

Cuando trabajes con AWS, SIEMPRE usa el tool `mcp_aws_knowledge_mcp_server_aws___search_documentation` o `mcp_aws_knowledge_mcp_server_aws___read_documentation` para:

- Configuración de IAM roles y policies
- Configuración de OIDC providers
- Integración con Bedrock
- Configuración de credenciales
- Trust policies

### SDKs de Terceros

Cuando uses SDKs como:

- `@ai-sdk/amazon-bedrock`
- `@vercel/oidc-aws-credentials-provider`
- Cualquier SDK de AWS

SIEMPRE usa `mcp_fetch_fetch` para leer la documentación oficial del paquete antes de implementar.

## Proceso de Verificación

1. **Antes de dar una solución**: Busca en la documentación oficial
2. **Lee los ejemplos de código**: No asumas la API, verifica la sintaxis exacta
3. **Verifica versiones**: Asegúrate de que la documentación corresponda a la versión usada
4. **Compara con el código actual**: Si algo no funciona, vuelve a verificar la documentación

## Lecciones Aprendidas

### Error: `credentials` vs `credentialProvider`

- ❌ Incorrecto: Asumir que `credentials` es el parámetro correcto
- ✅ Correcto: Verificar en la documentación que `@ai-sdk/amazon-bedrock` usa `credentialProvider`

### Error: `@vercel/functions/oidc` vs `@vercel/oidc-aws-credentials-provider`

- ❌ Incorrecto: Asumir que el paquete correcto es `@vercel/functions/oidc`
- ✅ Correcto: Verificar en la documentación de Vercel que el paquete correcto es `@vercel/oidc-aws-credentials-provider`

### Error: `serverActions` en `next.config.ts`

- ❌ Incorrecto: Poner `serverActions` directamente en el config
- ✅ Correcto: Verificar que debe estar dentro de `experimental.serverActions`

## Cuando NO Verificar

- Lógica de negocio específica del proyecto
- Código que ya está funcionando y solo necesita refactoring
- Utilidades simples que no dependen de APIs externas
