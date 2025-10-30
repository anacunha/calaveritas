import { z } from "zod";

export const CalaveritaInputSchema = z.object({
  petName: z
    .string()
    .min(1, "El nombre es requerido")
    .max(50, "El nombre debe tener máximo 50 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El nombre solo puede contener letras"),

  traits: z
    .array(z.string())
    .min(2, "Selecciona al menos 2 rasgos")
    .max(3, "Selecciona máximo 3 rasgos"),

  imageSize: z.number().max(5 * 1024 * 1024, "La imagen debe ser menor a 5MB"),

  imageMimeType: z.enum(["image/jpeg", "image/png", "image/webp"], {
    message: "Formato no soportado. Usa JPEG, PNG o WebP",
  }),
});

export type CalaveritaInput = z.infer<typeof CalaveritaInputSchema>;
