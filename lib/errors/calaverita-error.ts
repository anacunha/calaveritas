/**
 * Códigos de error para el sistema de generación de calaveritas
 */
export enum ErrorCode {
  INVALID_IMAGE_FORMAT = "INVALID_IMAGE_FORMAT",
  IMAGE_TOO_LARGE = "IMAGE_TOO_LARGE",
  INVALID_INPUT = "INVALID_INPUT",
  AI_SERVICE_ERROR = "AI_SERVICE_ERROR",
  RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",
  TIMEOUT = "TIMEOUT",
  MISSING_CREDENTIALS = "MISSING_CREDENTIALS",
}

/**
 * Mensajes de error en español para cada código de error
 */
export const ERROR_MESSAGES: Record<ErrorCode, string> = {
  [ErrorCode.INVALID_IMAGE_FORMAT]:
    "Formato de imagen no válido. Por favor usa JPEG, PNG o WebP.",
  [ErrorCode.IMAGE_TOO_LARGE]:
    "La imagen es demasiado grande. El tamaño máximo es 5MB.",
  [ErrorCode.INVALID_INPUT]:
    "Los datos proporcionados no son válidos. Verifica el nombre y los rasgos.",
  [ErrorCode.AI_SERVICE_ERROR]:
    "Hubo un problema al generar tu calaverita. Por favor intenta de nuevo.",
  [ErrorCode.RATE_LIMIT_EXCEEDED]:
    "Has alcanzado el límite de solicitudes. Por favor intenta más tarde.",
  [ErrorCode.TIMEOUT]:
    "La generación está tomando demasiado tiempo. Por favor intenta de nuevo.",
  [ErrorCode.MISSING_CREDENTIALS]:
    "Configuración del servicio incompleta. Contacta al administrador.",
};

/**
 * Clase de error personalizada para el sistema de calaveritas
 */
export class CalaveritaError extends Error {
  constructor(
    message: string,
    public code: ErrorCode,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = "CalaveritaError";

    // Mantiene el stack trace correcto en V8
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CalaveritaError);
    }
  }
}
