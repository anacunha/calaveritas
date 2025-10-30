import { streamText, type CoreUserMessage } from "ai";
import { bedrock, CLAUDE_MODEL_ID } from "./bedrock-config";
import { CalaveritaError, ErrorCode } from "../errors/calaverita-error";

/**
 * Input para la generación de calaveritas
 */
export interface GenerateCalaveritaInput {
  petName: string;
  traits: string[];
  imageBuffer: Buffer;
  imageMimeType: string;
}

/**
 * Configuración del servicio de calaveritas
 */
export interface CalaveritaServiceConfig {
  model: string;
  maxTokens: number;
  temperature: number;
  testMode: boolean;
}

/**
 * Configuración por defecto del servicio
 */
const DEFAULT_CONFIG: CalaveritaServiceConfig = {
  model: CLAUDE_MODEL_ID,
  maxTokens: 500,
  temperature: 0.8,
  testMode: process.env.AI_TEST_MODE === "true",
};

/**
 * Prompt del sistema para guiar la generación de calaveritas
 */
const CALAVERITA_SYSTEM_PROMPT = `Eres un poeta mexicano experto en escribir calaveritas literarias.
Las calaveritas son poemas humorísticos tradicionales mexicanos sobre la muerte, escritos típicamente
para el Día de Muertos. Deben ser alegres, ingeniosas y usar referencias juguetonas a la muerte.

REGLAS ESTRICTAS:
1. Escribe SOLO en español mexicano
2. Usa estructura de cuartetas (estrofas de 4 líneas)
3. Mantén esquema de rima consistente (ABAB o ABCB)
4. Incluye humor y referencias alegres a la muerte
5. Longitud: 2-4 cuartetas (8-16 líneas)
6. Incorpora el nombre de la mascota y sus características
7. Usa lenguaje poético pero accesible`;

/**
 * Servicio principal para generación de calaveritas con IA
 */
export class CalaveritaService {
  private config: CalaveritaServiceConfig;
  private readonly GENERATION_TIMEOUT = 30000; // 30 segundos
  private readonly MAX_RETRIES = 1;

  constructor(config?: Partial<CalaveritaServiceConfig>) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Genera una calaverita basada en la imagen y rasgos de la mascota
   * Incluye manejo de timeouts y reintentos
   * @param input - Datos de entrada (nombre, rasgos, imagen)
   * @returns Stream de texto con la calaverita generada
   */
  async generateCalaverita(input: GenerateCalaveritaInput) {
    return this.generateWithRetry(input, 0);
  }

  /**
   * Genera calaverita con lógica de reintento
   * @param input - Datos de entrada
   * @param attempt - Número de intento actual
   * @returns Stream de texto con la calaverita
   */
  private async generateWithRetry(
    input: GenerateCalaveritaInput,
    attempt: number
  ): Promise<ReadableStream<string>> {
    try {
      // Convertir imagen a base64
      const imageBase64 = this.convertImageToBase64(
        input.imageBuffer,
        input.imageMimeType
      );

      // Construir prompt del usuario con imagen
      const userPrompt = this.buildUserPrompt(
        input.petName,
        input.traits,
        imageBase64
      );

      // Generar calaverita con streaming y timeout
      const result = await this.generateWithTimeout(userPrompt);

      return result.textStream;
    } catch (error) {
      // Reintentar una vez si es el primer intento
      if (attempt < this.MAX_RETRIES) {
        console.warn(
          `[CalaveritaService] Retrying generation (attempt ${attempt + 1})`
        );
        return this.generateWithRetry(input, attempt + 1);
      }

      // Si ya se reintentó, lanzar error apropiado
      if (error instanceof CalaveritaError) {
        throw error;
      }

      console.error("[CalaveritaService] Error generating calaverita:", error);
      throw new CalaveritaError(
        "Error al generar la calaverita",
        ErrorCode.AI_SERVICE_ERROR,
        500
      );
    }
  }

  /**
   * Genera calaverita con timeout
   * @param userPrompt - Prompt del usuario
   * @returns Resultado del streaming
   */
  private async generateWithTimeout(userPrompt: CoreUserMessage["content"]) {
    return Promise.race([
      streamText({
        model: bedrock(this.config.model),
        system: CALAVERITA_SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: userPrompt,
          },
        ],
        temperature: this.config.temperature,
      }),
      this.createTimeoutPromise(this.GENERATION_TIMEOUT),
    ]);
  }

  /**
   * Crea una promesa que rechaza después del timeout especificado
   * @param ms - Milisegundos de timeout
   * @returns Promesa que rechaza con error de timeout
   */
  private createTimeoutPromise(ms: number): Promise<never> {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(
          new CalaveritaError(
            "La generación excedió el tiempo límite",
            ErrorCode.TIMEOUT,
            408
          )
        );
      }, ms);
    });
  }

  /**
   * Convierte un buffer de imagen a string base64
   * @param buffer - Buffer de la imagen
   * @param mimeType - Tipo MIME de la imagen
   * @returns String base64 de la imagen
   */
  private convertImageToBase64(buffer: Buffer, mimeType: string): string {
    const base64 = buffer.toString("base64");
    return `data:${mimeType};base64,${base64}`;
  }

  /**
   * Construye el prompt del usuario con imagen y contexto
   * @param petName - Nombre de la mascota
   * @param traits - Rasgos de personalidad
   * @param imageBase64 - Imagen en formato base64
   * @returns Array de contenido del mensaje
   */
  private buildUserPrompt(
    petName: string,
    traits: string[],
    imageBase64: string
  ) {
    return [
      {
        type: "image" as const,
        image: imageBase64,
      },
      {
        type: "text" as const,
        text: `Analiza esta imagen y escribe una calaverita literaria para ${petName}.

Rasgos de personalidad: ${traits.join(", ")}

Incorpora tanto las características visuales que observes en la imagen como los rasgos de personalidad proporcionados.
La calaverita debe ser auténtica, divertida y respetuosa con la tradición mexicana.`,
      },
    ];
  }
}
