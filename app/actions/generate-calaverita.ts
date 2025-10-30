"use server";

import { z } from "zod";
import { CalaveritaService } from "@/lib/ai/calaverita-service";
import { MockCalaveritaService } from "@/lib/ai/mock-service";
import { CalaveritaInputSchema } from "@/lib/validation/calaverita-schema";
import {
  CalaveritaError,
  ErrorCode,
  ERROR_MESSAGES,
} from "@/lib/errors/calaverita-error";
import { validateEnv } from "@/lib/config/validate-env";
import {
  logCalaveritaGeneration,
  generateRequestId,
  getTimestamp,
} from "@/lib/utils/logger";

/**
 * Resultado de la generación de calaverita
 */
export interface GenerateCalaveritaResult {
  success: boolean;
  stream?: ReadableStream<string>;
  error?: string;
}

/**
 * Server Action para generar calaveritas con IA
 * Valida la entrada, procesa la imagen y llama al servicio apropiado
 * @param formData - FormData con nombre, rasgos e imagen de la mascota
 * @returns Resultado con stream de texto o error
 */
export async function generateCalaverita(
  formData: FormData
): Promise<GenerateCalaveritaResult> {
  const requestId = generateRequestId();
  const startTime = Date.now();

  try {
    // Validar configuración de entorno
    const env = validateEnv();

    // Extraer y validar datos del FormData
    const validatedInput = await extractAndValidateFormData(formData);

    // Log inicio de generación
    logCalaveritaGeneration(
      {
        requestId,
        timestamp: getTimestamp(),
        petName: validatedInput.petName,
        traits: validatedInput.traits.join(", "),
        testMode: env.AI_TEST_MODE ? "true" : "false",
      },
      "info"
    );

    // Seleccionar servicio apropiado (real o mock)
    const service = env.AI_TEST_MODE
      ? new MockCalaveritaService()
      : new CalaveritaService();

    // Generar calaverita
    const stream = await service.generateCalaverita({
      petName: validatedInput.petName,
      traits: validatedInput.traits,
      imageBuffer: validatedInput.imageBuffer,
      imageMimeType: validatedInput.imageMimeType,
    });

    // Log éxito
    const duration = Date.now() - startTime;
    logCalaveritaGeneration(
      {
        requestId,
        timestamp: getTimestamp(),
        petName: validatedInput.petName,
        duration,
        status: "success",
      },
      "info"
    );

    return {
      success: true,
      stream,
    };
  } catch (error) {
    const duration = Date.now() - startTime;

    // Manejar errores de calaverita
    if (error instanceof CalaveritaError) {
      logCalaveritaGeneration(
        {
          requestId,
          timestamp: getTimestamp(),
          errorCode: error.code,
          duration,
          status: "error",
        },
        "error"
      );

      return {
        success: false,
        error: ERROR_MESSAGES[error.code],
      };
    }

    // Manejar errores de validación
    if (error instanceof z.ZodError) {
      logCalaveritaGeneration(
        {
          requestId,
          timestamp: getTimestamp(),
          errorCode: ErrorCode.INVALID_INPUT,
          duration,
          status: "validation_error",
        },
        "error"
      );

      return {
        success: false,
        error: error.issues[0].message,
      };
    }

    // Error desconocido
    logCalaveritaGeneration(
      {
        requestId,
        timestamp: getTimestamp(),
        duration,
        status: "unknown_error",
        errorMessage: error instanceof Error ? error.message : "Unknown error",
      },
      "error"
    );

    return {
      success: false,
      error: "Ocurrió un error inesperado. Por favor intenta de nuevo.",
    };
  }
}

/**
 * Extrae y valida datos del FormData
 * @param formData - FormData recibido del cliente
 * @returns Datos validados con buffer de imagen
 */
async function extractAndValidateFormData(formData: FormData) {
  // Extraer campos del FormData
  const petName = formData.get("petName") as string;
  const traitsJson = formData.get("traits") as string;
  const imageFile = formData.get("image") as File;

  // Validar que los campos existan
  if (!petName || !traitsJson || !imageFile) {
    throw new CalaveritaError(
      "Faltan campos requeridos",
      ErrorCode.INVALID_INPUT,
      400
    );
  }

  // Parsear rasgos
  let traits: string[];
  try {
    traits = JSON.parse(traitsJson);
  } catch {
    throw new CalaveritaError(
      "Formato de rasgos inválido",
      ErrorCode.INVALID_INPUT,
      400
    );
  }

  // Validar tipo MIME de la imagen
  const imageMimeType = imageFile.type;
  if (!["image/jpeg", "image/png", "image/webp"].includes(imageMimeType)) {
    throw new CalaveritaError(
      ERROR_MESSAGES[ErrorCode.INVALID_IMAGE_FORMAT],
      ErrorCode.INVALID_IMAGE_FORMAT,
      400
    );
  }

  // Validar tamaño de la imagen
  const imageSize = imageFile.size;
  if (imageSize > 5 * 1024 * 1024) {
    throw new CalaveritaError(
      ERROR_MESSAGES[ErrorCode.IMAGE_TOO_LARGE],
      ErrorCode.IMAGE_TOO_LARGE,
      400
    );
  }

  // Validar con schema de Zod
  const validationResult = CalaveritaInputSchema.safeParse({
    petName,
    traits,
    imageSize,
    imageMimeType,
  });

  if (!validationResult.success) {
    throw validationResult.error;
  }

  // Convertir imagen a buffer
  const imageBuffer = Buffer.from(await imageFile.arrayBuffer());

  return {
    petName: validationResult.data.petName,
    traits: validationResult.data.traits,
    imageBuffer,
    imageMimeType: validationResult.data.imageMimeType,
  };
}
