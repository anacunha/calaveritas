import { z } from "zod";
import { CalaveritaError, ErrorCode } from "../errors/calaverita-error";

/**
 * Schema de validación para variables de entorno
 */
const EnvSchema = z
  .object({
    AWS_REGION: z.string().optional(),
    AWS_ACCESS_KEY_ID: z.string().optional(),
    AWS_SECRET_ACCESS_KEY: z.string().optional(),
    AWS_SESSION_TOKEN: z.string().optional(),
    CLAUDE_MODEL_ID: z
      .string()
      .default("us.anthropic.claude-3-sonnet-20240229-v1:0"),
    AI_TEST_MODE: z
      .string()
      .default("false")
      .transform((val) => val === "true"),
    AI_VISION_TIMEOUT: z.string().default("10").transform(Number),
    AI_GENERATION_TIMEOUT: z.string().default("30").transform(Number),
  })
  .refine(
    (data) => {
      // Requiere credenciales de AWS completas o modo de prueba
      const hasAWSCreds =
        data.AWS_ACCESS_KEY_ID && data.AWS_SECRET_ACCESS_KEY && data.AWS_REGION;
      return hasAWSCreds || data.AI_TEST_MODE;
    },
    {
      message:
        "Se requieren credenciales de AWS completas (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION) o habilitar AI_TEST_MODE",
    }
  );

export type Env = z.infer<typeof EnvSchema>;

/**
 * Valida las variables de entorno requeridas para el sistema
 * @throws {CalaveritaError} Si la configuración es inválida
 * @returns {Env} Variables de entorno validadas y parseadas
 */
export function validateEnv(): Env {
  try {
    return EnvSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("❌ Error de configuración:", error.issues);
      throw new CalaveritaError(
        "Configuración de ambiente inválida",
        ErrorCode.MISSING_CREDENTIALS,
        500
      );
    }
    throw error;
  }
}
