import { GenerateCalaveritaInput } from "./calaverita-service";

/**
 * Servicio mock para pruebas sin consumir créditos de API
 * Simula el comportamiento del servicio real con respuestas predefinidas
 */
export class MockCalaveritaService {
  /**
   * Genera una calaverita mock basada en los datos de entrada
   * @param input - Datos de entrada (nombre, rasgos, imagen)
   * @returns Stream simulado de texto con la calaverita
   */
  async generateCalaverita(
    input: GenerateCalaveritaInput
  ): Promise<ReadableStream<string>> {
    // Construir calaverita mock personalizada
    const mockCalaverita = this.buildMockCalaverita(
      input.petName,
      input.traits
    );

    // Simular streaming con delays
    return this.createMockStream(mockCalaverita);
  }

  /**
   * Construye una calaverita mock personalizada
   * @param petName - Nombre de la mascota
   * @param traits - Rasgos de personalidad
   * @returns Texto de la calaverita
   */
  private buildMockCalaverita(petName: string, traits: string[]): string {
    const trait1 = traits[0] || "especial";
    const trait2 = traits[1] || "único";

    return `La muerte buscaba a ${petName}
${this.getTraitLine(trait1)}
pero al verlo tan ${trait2}
decidió dejarlo un rato más

Con sus maneras tan ${trait1}
y su mirada tan especial
la calaca dijo "¡qué ternura!"
y lo dejó en paz total

${petName} siguió su vida
${this.getTraitLine(trait2)}
y la muerte se fue contenta
sabiendo que volverá algún día`;
  }

  /**
   * Genera una línea de verso basada en un rasgo
   * @param trait - Rasgo de personalidad
   * @returns Línea de verso
   */
  private getTraitLine(trait: string): string {
    const traitLines: Record<string, string> = {
      jugueton: "jugando con su pelota",
      tranquilo: "descansando en su lugar",
      hiperactivo: "corriendo sin parar",
      dormilon: "durmiendo sin cesar",
      carinoso: "dando amor sin medida",
      independiente: "viviendo a su manera",
      travieso: "haciendo travesuras",
      timido: "escondiéndose con gracia",
      valiente: "enfrentando sus miedos",
      miedoso: "temblando de emoción",
      gloton: "comiendo con pasión",
      ladrador: "ladrando con fervor",
      protector: "cuidando su hogar",
      curioso: "explorando sin cesar",
      obediente: "siguiendo las reglas",
      rebelde: "rompiendo las normas",
      elegante: "luciendo su belleza",
      payaso: "haciendo reír a todos",
      grunon: "gruñendo con razón",
      consentido: "siendo el rey del hogar",
    };

    return traitLines[trait] || "viviendo su vida";
  }

  /**
   * Crea un stream simulado que emite texto progresivamente
   * @param text - Texto completo a transmitir
   * @returns ReadableStream que simula streaming
   */
  private createMockStream(text: string): ReadableStream<string> {
    const words = text.split(" ");
    let index = 0;

    return new ReadableStream({
      async pull(controller) {
        if (index < words.length) {
          // Emitir palabra con espacio
          controller.enqueue(words[index] + " ");
          index++;

          // Simular delay de red (50ms por palabra)
          await new Promise((resolve) => setTimeout(resolve, 50));
        } else {
          // Finalizar stream
          controller.close();
        }
      },
    });
  }
}
