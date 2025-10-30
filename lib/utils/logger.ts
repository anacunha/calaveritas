import { ErrorCode } from "../errors/calaverita-error";

/**
 * Contexto de logging para eventos de generación de calaveritas
 */
export interface LogContext {
  requestId: string;
  timestamp: string;
  userId?: string;
  petName?: string;
  errorCode?: ErrorCode;
  duration?: number;
  [key: string]: string | number | undefined;
}

/**
 * Niveles de logging
 */
export type LogLevel = "info" | "error" | "warn";

/**
 * Registra eventos de generación de calaveritas con contexto estructurado
 * @param context - Contexto del evento a registrar
 * @param level - Nivel de severidad del log
 */
export function logCalaveritaGeneration(
  context: LogContext,
  level: LogLevel = "info"
) {
  const logEntry = {
    level,
    service: "calaverita-generation",
    ...context,
  };

  // Usar el método de console apropiado según el nivel
  console[level](JSON.stringify(logEntry));
}

/**
 * Genera un ID único para la solicitud
 * @returns ID único basado en timestamp y random
 */
export function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Obtiene timestamp en formato ISO
 * @returns Timestamp actual en formato ISO
 */
export function getTimestamp(): string {
  return new Date().toISOString();
}
