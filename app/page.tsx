import CalaveritaForm from "./components/CalaveritaForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
              🎃 Calaveritas con IA 💀
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
              Sube una foto de tu mascota y descubre su calaverita literaria
              personalizada. Usando inteligencia artificial, creamos versos
              únicos que celebran a tu compañero peludo al estilo del Día de
              Muertos.
            </p>
          </div>

          {/* Form */}
          <CalaveritaForm />

          {/* Footer */}
          <div className="mt-12 text-center text-sm text-zinc-600 dark:text-zinc-400">
            <p>
              Las calaveritas son poemas tradicionales mexicanos que celebran la
              vida con humor y cariño.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
