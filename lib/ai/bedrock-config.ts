import { createAmazonBedrock } from "@ai-sdk/amazon-bedrock";

/**
 * Configuración de Amazon Bedrock para integración con Claude
 * Las credenciales se obtienen de variables de entorno por seguridad
 */
export const bedrock = createAmazonBedrock({
  region: process.env.AWS_REGION || "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN, // Opcional para credenciales temporales
});

/**
 * ID del modelo Claude en Amazon Bedrock
 * Nota: Los modelos en Bedrock tienen IDs específicos con sufijo -v1:0
 */
export const CLAUDE_MODEL_ID =
  process.env.CLAUDE_MODEL_ID || "us.anthropic.claude-3-sonnet-20240229-v1:0";
