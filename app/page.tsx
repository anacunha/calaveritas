import CalaveritaForm from "./components/CalaveritaForm";
import PapelPicado from "./components/decorations/PapelPicado";
import SugarSkull from "./components/decorations/SugarSkull";
import Cactus from "./components/decorations/Cactus";
import Marigold from "./components/decorations/Marigold";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f6e8f3] relative overflow-hidden">
      {/* Top decorative banner - papel picado */}
      <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none z-10 animate-sway">
        <PapelPicado />
      </div>

      {/* Decorative elements container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Sugar Skulls */}
        <SugarSkull
          variant={1}
          className="absolute top-[15%] left-[5%] hidden sm:block animate-[pixel-float_3s_ease-in-out_infinite]"
        />
        <SugarSkull
          variant={2}
          className="absolute top-[20%] right-[8%] hidden sm:block animate-[pixel-float_3.5s_ease-in-out_infinite_0.5s]"
        />
        <SugarSkull
          variant={3}
          className="absolute bottom-[15%] left-[10%] hidden md:block animate-[pixel-float_4s_ease-in-out_infinite_1s]"
        />

        {/* Cacti */}
        <Cactus
          variant={1}
          className="absolute bottom-[10%] left-[2%] hidden md:block"
        />
        <Cactus
          variant={2}
          className="absolute bottom-[12%] right-[3%] hidden md:block"
        />

        {/* Marigolds */}
        <Marigold
          size="lg"
          className="absolute top-[40%] left-[3%] hidden lg:block animate-[pixel-float_3.2s_ease-in-out_infinite_0.8s]"
        />
        <Marigold
          size="md"
          className="absolute top-[50%] right-[5%] hidden lg:block animate-[pixel-float_3.8s_ease-in-out_infinite_1.2s]"
        />
        <Marigold
          size="sm"
          className="absolute bottom-[25%] right-[12%] hidden lg:block animate-[pixel-float_3.5s_ease-in-out_infinite_0.3s]"
        />
      </div>

      <main className="relative container mx-auto px-4 pt-24 pb-8 sm:pt-28 sm:pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 sm:mb-12 text-center px-2 sm:px-4">
            <h1 className="mb-3 sm:mb-4 text-4xl sm:text-5xl md:text-6xl font-bold font-display text-[#2d1b2e] [text-shadow:2px_2px_0px_rgba(169,26,138,0.3)] sm:[text-shadow:3px_3px_0px_rgba(169,26,138,0.3)] md:[text-shadow:4px_4px_0px_rgba(169,26,138,0.3)]">
              Peludo Huesudo 🎃💀🐶
            </h1>
            <p className="mx-auto max-w-2xl text-xs sm:text-sm leading-normal text-[#2d1b2e] px-2 font-display font-normal">
              Sube una foto de tu mascota y descubre su calaverita literaria
              personalizada. Usando inteligencia artificial, creamos versos
              únicos que celebran a tu compañero peludo al estilo del Día de
              Muertos.
            </p>

            {/* Code of the Dead Challenge Badge */}
            <div className="mt-4 sm:mt-6 inline-block px-3 py-2 sm:px-4 bg-[#fcefe8] border-[3px] border-[#2d1b2e] shadow-[2px_2px_0px_#2d1b2e] sm:shadow-[4px_4px_0px_#2d1b2e]">
              <p className="font-display text-xs sm:text-sm text-[#e1611a]">
                🏆 Code of the Dead Challenge - JSConf MX 2025
              </p>
            </div>
          </div>

          {/* Form */}
          <CalaveritaForm />

          {/* Footer */}
          <div className="mt-8 sm:mt-12 text-center text-xs sm:text-sm text-[#5a3a5c] px-4">
            <p className="font-display">
              Las calaveritas son poemas tradicionales mexicanos que celebran la
              vida con humor y cariño.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative mt-16 py-8 text-center bg-[#fcefe8]">
        <p className="font-display text-sm text-[#2d1b2e]">
          Hecho con 🧡 y 👻 Kiro
        </p>
      </footer>
    </div>
  );
}
