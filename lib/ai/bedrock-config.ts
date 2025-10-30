import { createAmazonBedrock } from "@ai-sdk/amazon-bedrock";
import { awsCredentialsProvider } from "@vercel/functions/oidc";

/**
 * Configuración de Amazon Bedrock para integración con Claude
 * Soporta dos métodos de autenticación:
 * 1. OIDC con IAM Role (recomendado en producción) - usa AWS_ROLE_ARN
 * 2. Credenciales estáticas - usa AWS_ACCESS_KEY_ID y AWS_SECRET_ACCESS_KEY
 */

// Determinar método de autenticación
const useOIDC = !!process.env.AWS_ROLE_ARN;
const region = process.env.AWS_REGION || "us-east-1";

console.log(
  `[Bedrock] Initializing with ${
    useOIDC ? "OIDC" : "static credentials"
  } in region: ${region}`
);

if (useOIDC) {
  console.log(`[Bedrock] Using IAM Role: ${process.env.AWS_ROLE_ARN}`);
}

export const bedrock = createAmazonBedrock({
  region,
  // Si AWS_ROLE_ARN está definido, usa OIDC; si no, usa credenciales estáticas
  ...(useOIDC
    ? {
        credentials: awsCredentialsProvider({
          roleArn: process.env.AWS_ROLE_ARN!,
        }),
      }
    : {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        sessionToken: process.env.AWS_SESSION_TOKEN, // Opcional para credenciales temporales
      }),
});

/**
 * ID del modelo Claude en Amazon Bedrock
 * Nota: Los modelos en Bedrock tienen IDs específicos con sufijo -v1:0
 */
export const CLAUDE_MODEL_ID =
  process.env.CLAUDE_MODEL_ID || "us.anthropic.claude-3-sonnet-20240229-v1:0";

console.log(`[Bedrock] Using model: ${CLAUDE_MODEL_ID}`);
