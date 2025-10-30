"use client";

import { useState, useTransition, FormEvent, ChangeEvent } from "react";
import { PET_TRAITS, TraitCategory } from "@/lib/constants/pet-traits";
import { generateCalaverita } from "@/app/actions/generate-calaverita";

interface CalaveritaFormProps {
  className?: string;
}

interface FormState {
  petName: string;
  selectedTraits: string[];
  imageFile: File | null;
  imagePreview: string | null;
  generatedCalaverita: string;
  error: string | null;
}

const MAX_TRAITS = 3;
const MIN_TRAITS = 2;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function CalaveritaForm({
  className = "",
}: CalaveritaFormProps) {
  const [isPending, startTransition] = useTransition();
  const [formState, setFormState] = useState<FormState>({
    petName: "",
    selectedTraits: [],
    imageFile: null,
    imagePreview: null,
    generatedCalaverita: "",
    error: null,
  });

  // Validación de nombre de mascota
  const validatePetName = (name: string): string | null => {
    if (!name.trim()) {
      return "El nombre es requerido";
    }
    if (name.length > 50) {
      return "El nombre debe tener máximo 50 caracteres";
    }
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name)) {
      return "El nombre solo puede contener letras";
    }
    return null;
  };

  // Manejar cambio de nombre
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormState((prev) => ({
      ...prev,
      petName: name,
      error: null,
    }));
  };

  // Manejar selección de rasgos
  const handleTraitToggle = (traitValue: string) => {
    setFormState((prev) => {
      const isSelected = prev.selectedTraits.includes(traitValue);
      let newTraits: string[];

      if (isSelected) {
        // Deseleccionar
        newTraits = prev.selectedTraits.filter((t) => t !== traitValue);
      } else {
        // Seleccionar solo si no se ha alcanzado el máximo
        if (prev.selectedTraits.length >= MAX_TRAITS) {
          return {
            ...prev,
            error: `Puedes seleccionar máximo ${MAX_TRAITS} rasgos`,
          };
        }
        newTraits = [...prev.selectedTraits, traitValue];
      }

      return {
        ...prev,
        selectedTraits: newTraits,
        error: null,
      };
    });
  };

  // Validar archivo de imagen
  const validateImageFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return "Formato no soportado. Usa JPEG, PNG o WebP";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "La imagen debe ser menor a 5MB";
    }
    return null;
  };

  // Manejar selección de imagen
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validationError = validateImageFile(file);
    if (validationError) {
      setFormState((prev) => ({
        ...prev,
        error: validationError,
        imageFile: null,
        imagePreview: null,
      }));
      return;
    }

    // Crear preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormState((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: reader.result as string,
        error: null,
      }));
    };
    reader.readAsDataURL(file);
  };

  // Validar formulario completo
  const validateForm = (): string | null => {
    const nameError = validatePetName(formState.petName);
    if (nameError) return nameError;

    if (formState.selectedTraits.length < MIN_TRAITS) {
      return `Selecciona al menos ${MIN_TRAITS} rasgos`;
    }

    if (!formState.imageFile) {
      return "Por favor sube una imagen de tu mascota";
    }

    return null;
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validar formulario
    const validationError = validateForm();
    if (validationError) {
      setFormState((prev) => ({ ...prev, error: validationError }));
      return;
    }

    // Preparar FormData
    const formData = new FormData();
    formData.append("petName", formState.petName);
    formData.append("traits", JSON.stringify(formState.selectedTraits));
    formData.append("image", formState.imageFile!);

    // Limpiar calaverita anterior y error
    setFormState((prev) => ({
      ...prev,
      generatedCalaverita: "",
      error: null,
    }));

    // Enviar con transición
    startTransition(async () => {
      try {
        const result = await generateCalaverita(formData);

        if (!result.success) {
          setFormState((prev) => ({
            ...prev,
            error: result.error || "Error al generar la calaverita",
          }));
          return;
        }

        // Procesar stream de respuesta
        if (result.stream) {
          const reader = result.stream.getReader();
          const decoder = new TextDecoder();

          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              // value puede ser string o Uint8Array dependiendo del stream
              const chunk =
                typeof value === "string"
                  ? value
                  : decoder.decode(value, { stream: true });

              setFormState((prev) => ({
                ...prev,
                generatedCalaverita: prev.generatedCalaverita + chunk,
              }));
            }
          } catch (streamError) {
            console.error("Error reading stream:", streamError);
            setFormState((prev) => ({
              ...prev,
              error:
                "Error al recibir la calaverita. Por favor intenta de nuevo.",
            }));
          }
        }
      } catch {
        setFormState((prev) => ({
          ...prev,
          error: "Ocurrió un error inesperado. Por favor intenta de nuevo.",
        }));
      }
    });
  };

  // Manejar reintentar
  const handleRetry = () => {
    setFormState((prev) => ({
      ...prev,
      error: null,
      generatedCalaverita: "",
    }));
  };

  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre de mascota */}
        <div>
          <label
            htmlFor="petName"
            className="block font-display text-sm sm:text-base font-bold text-[#2d1b2e] mb-2 uppercase tracking-wide"
          >
            Nombre de tu mascota
          </label>
          <input
            type="text"
            id="petName"
            value={formState.petName}
            onChange={handleNameChange}
            disabled={isPending}
            className="w-full px-4 py-3 sm:py-4 font-display text-base sm:text-lg bg-white border-[3px] border-[#2d1b2e] focus:outline-none focus:border-[#a91a8a] focus:shadow-[2px_2px_0px_#a91a8a] sm:focus:shadow-[4px_4px_0px_#a91a8a] disabled:bg-gray-100 disabled:cursor-not-allowed transition-shadow duration-100 placeholder:text-[#5a3a5c]"
            placeholder="Ej: Firulais"
            maxLength={50}
          />
        </div>

        {/* Selector de rasgos */}
        <div>
          <label className="block font-display text-sm sm:text-base font-bold text-[#2d1b2e] mb-2 uppercase tracking-wide">
            Rasgos de personalidad (selecciona {MIN_TRAITS}-{MAX_TRAITS})
          </label>
          <div className="space-y-4 sm:space-y-5">
            {(Object.keys(PET_TRAITS) as TraitCategory[]).map((category) => (
              <div key={category}>
                <h3 className="font-display text-xs sm:text-sm font-bold text-[#5a3a5c] uppercase tracking-wider mb-2 sm:mb-3">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {PET_TRAITS[category].map((trait) => {
                    const isSelected = formState.selectedTraits.includes(
                      trait.value
                    );
                    return (
                      <button
                        key={trait.value}
                        type="button"
                        onClick={() => handleTraitToggle(trait.value)}
                        disabled={isPending}
                        className={`min-h-[44px] px-4 py-2 sm:px-5 sm:py-3 font-display text-sm sm:text-base font-bold border-[3px] border-[#2d1b2e] transition-all duration-100 ${
                          isSelected
                            ? "bg-[#a91a8a] text-white shadow-[2px_2px_0px_#2d1b2e] sm:shadow-[3px_3px_0px_#2d1b2e]"
                            : "bg-white text-[#2d1b2e] shadow-[2px_2px_0px_#2d1b2e] hover:bg-[#fcefe8]"
                        } active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#2d1b2e] disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {trait.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <p className="font-display text-xs sm:text-sm text-[#5a3a5c] mt-2">
            Seleccionados: {formState.selectedTraits.length}/{MAX_TRAITS}
          </p>
        </div>

        {/* Input de imagen */}
        <div>
          <label
            htmlFor="image"
            className="block font-display text-sm sm:text-base font-bold text-[#2d1b2e] mb-2 uppercase tracking-wide"
          >
            Foto de tu mascota
          </label>
          <input
            type="file"
            id="image"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
            disabled={isPending}
            className="w-full text-sm sm:text-base text-[#2d1b2e] font-display file:mr-3 sm:file:mr-4 file:py-3 file:px-5 sm:file:px-6 file:min-h-[44px] file:font-display file:font-bold file:border-[3px] file:border-[#2d1b2e] file:bg-[#e1611a] file:text-white file:shadow-[2px_2px_0px_#2d1b2e] sm:file:shadow-[3px_3px_0px_#2d1b2e] file:cursor-pointer hover:file:bg-[#c54e15] hover:file:shadow-[3px_3px_0px_#2d1b2e] sm:hover:file:shadow-[4px_4px_0px_#2d1b2e] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-100"
          />
          <p className="font-display text-xs sm:text-sm text-[#5a3a5c] mt-1">
            Formatos: JPEG, PNG, WebP. Máximo 5MB
          </p>

          {/* Preview de imagen */}
          {formState.imagePreview && (
            <div className="mt-4 inline-block border-[3px] border-[#2d1b2e] shadow-[2px_2px_0px_#2d1b2e] sm:shadow-[4px_4px_0px_#2d1b2e] bg-white p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={formState.imagePreview}
                alt="Preview de tu mascota"
                className="max-w-full sm:max-w-xs w-full h-auto"
                style={{ imageRendering: "auto" }}
              />
            </div>
          )}
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full min-h-[56px] py-4 px-6 font-display text-base sm:text-lg font-bold bg-[#a91a8a] text-white border-[3px] border-[#2d1b2e] shadow-[3px_3px_0px_#2d1b2e] sm:shadow-[4px_4px_0px_#2d1b2e] hover:bg-[#8a1570] hover:shadow-[4px_4px_0px_#2d1b2e] sm:hover:shadow-[6px_6px_0px_#2d1b2e] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#2d1b2e] disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-100"
        >
          {isPending ? "⏳ Generando..." : "🎃 Generar Calaverita"}
        </button>

        {/* Mensajes de error */}
        {formState.error && (
          <div className="bg-red-50 border-[3px] border-red-600 shadow-[2px_2px_0px_#2d1b2e] sm:shadow-[4px_4px_0px_#2d1b2e] p-3 sm:p-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <span className="text-xl sm:text-2xl flex-shrink-0">⚠️</span>
              <div className="flex-1">
                <p className="font-display text-sm sm:text-base font-bold text-red-800 mb-1">
                  Error
                </p>
                <p className="font-body text-sm sm:text-base text-red-700">
                  {formState.error}
                </p>
              </div>
            </div>
            {formState.generatedCalaverita && (
              <button
                type="button"
                onClick={handleRetry}
                className="mt-3 min-h-[44px] px-4 py-2 sm:px-5 sm:py-3 font-display text-sm sm:text-base font-bold bg-[#a91a8a] text-white border-[3px] border-[#2d1b2e] shadow-[2px_2px_0px_#2d1b2e] sm:shadow-[3px_3px_0px_#2d1b2e] hover:bg-[#8a1570] hover:shadow-[3px_3px_0px_#2d1b2e] sm:hover:shadow-[4px_4px_0px_#2d1b2e] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#2d1b2e] transition-all duration-100"
              >
                🎃 Reintentar
              </button>
            )}
          </div>
        )}

        {/* Indicador de carga */}
        {isPending && (
          <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 py-6 sm:py-8">
            <div className="relative w-12 h-12 sm:w-16 sm:h-16">
              {/* Pixel-art style spinner */}
              <div className="absolute inset-0 border-[3px] sm:border-[4px] border-[#2d1b2e] border-t-[#a91a8a] animate-spin"></div>
            </div>
            <p className="font-display text-sm sm:text-base text-[#5a3a5c]">
              ⏳ Generando tu calaverita...
            </p>
          </div>
        )}

        {/* Calaverita generada */}
        {formState.generatedCalaverita && (
          <div className="bg-[#fcefe8] border-[3px] sm:border-[4px] border-[#2d1b2e] shadow-[3px_3px_0px_#2d1b2e] sm:shadow-[6px_6px_0px_#2d1b2e] p-4 sm:p-6 md:p-8">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <span className="text-2xl sm:text-3xl">💀</span>
              <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-[#a91a8a]">
                Tu Calaverita
              </h3>
              <span className="text-2xl sm:text-3xl">💀</span>
            </div>
            <div className="font-display text-sm sm:text-base leading-relaxed text-[#2d1b2e] whitespace-pre-wrap">
              {formState.generatedCalaverita}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
