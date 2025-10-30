export const PET_TRAITS = {
  energia: [
    { value: "jugueton", label: "Juguetón/a" },
    { value: "tranquilo", label: "Tranquilo/a" },
    { value: "hiperactivo", label: "Hiperactivo/a" },
    { value: "dormilon", label: "Dormilón/a" },
  ],
  personalidad: [
    { value: "carinoso", label: "Cariñoso/a" },
    { value: "independiente", label: "Independiente" },
    { value: "travieso", label: "Travieso/a" },
    { value: "timido", label: "Tímido/a" },
    { value: "valiente", label: "Valiente" },
    { value: "miedoso", label: "Miedoso/a" },
  ],
  comportamiento: [
    { value: "gloton", label: "Glotón/a" },
    { value: "ladrador", label: "Ladrador/a" },
    { value: "protector", label: "Protector/a" },
    { value: "curioso", label: "Curioso/a" },
    { value: "obediente", label: "Obediente" },
    { value: "rebelde", label: "Rebelde" },
  ],
  especiales: [
    { value: "elegante", label: "Elegante" },
    { value: "payaso", label: "Payaso/a" },
    { value: "grunon", label: "Gruñón/a" },
    { value: "consentido", label: "Consentido/a" },
  ],
} as const;

export type TraitCategory = keyof typeof PET_TRAITS;
export type TraitValue = (typeof PET_TRAITS)[TraitCategory][number]["value"];
