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
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Nombre de tu mascota
          </label>
          <input
            type="text"
            id="petName"
            value={formState.petName}
            onChange={handleNameChange}
            disabled={isPending}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Ej: Firulais"
            maxLength={50}
          />
        </div>

        {/* Selector de rasgos */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rasgos de personalidad (selecciona {MIN_TRAITS}-{MAX_TRAITS})
          </label>
          <div className="space-y-4">
            {(Object.keys(PET_TRAITS) as TraitCategory[]).map((category) => (
              <div key={category}>
                <h3 className="text-xs font-semibold text-gray-600 uppercase mb-2">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
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
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                          isSelected
                            ? "bg-purple-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {trait.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Seleccionados: {formState.selectedTraits.length}/{MAX_TRAITS}
          </p>
        </div>

        {/* Input de imagen */}
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Foto de tu mascota
          </label>
          <input
            type="file"
            id="image"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
            disabled={isPending}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <p className="text-xs text-gray-500 mt-1">
            Formatos: JPEG, PNG, WebP. Máximo 5MB
          </p>

          {/* Preview de imagen */}
          {formState.imagePreview && (
            <div className="mt-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={formState.imagePreview}
                alt="Preview"
                className="w-full max-w-xs rounded-lg shadow-md"
              />
            </div>
          )}
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isPending ? "Generando calaverita..." : "Generar Calaverita"}
        </button>

        {/* Mensajes de error */}
        {formState.error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 text-sm">{formState.error}</p>
            {formState.generatedCalaverita && (
              <button
                type="button"
                onClick={handleRetry}
                className="mt-2 text-red-600 text-sm font-medium hover:text-red-700"
              >
                Reintentar
              </button>
            )}
          </div>
        )}

        {/* Indicador de carga */}
        {isPending && (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
            <span className="text-gray-600">Generando tu calaverita...</span>
          </div>
        )}

        {/* Calaverita generada */}
        {formState.generatedCalaverita && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-purple-900 mb-3">
              Tu Calaverita
            </h3>
            <div className="whitespace-pre-wrap text-gray-800 font-serif leading-relaxed">
              {formState.generatedCalaverita}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
