interface CactusProps {
  className?: string;
  variant?: 1 | 2;
}

export default function Cactus({ className = "", variant = 1 }: CactusProps) {
  if (variant === 1) {
    return (
      <svg
        className={`w-12 h-16 ${className}`}
        viewBox="0 0 48 64"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Main body */}
        <rect x="16" y="16" width="16" height="48" fill="#2d5016" />

        {/* Left arm */}
        <rect x="4" y="24" width="12" height="16" fill="#2d5016" />
        <rect x="4" y="24" width="16" height="8" fill="#2d5016" />

        {/* Right arm */}
        <rect x="32" y="32" width="12" height="12" fill="#2d5016" />
        <rect x="28" y="32" width="16" height="8" fill="#2d5016" />

        {/* Spines */}
        <rect x="18" y="20" width="2" height="4" fill="#f0f0f0" />
        <rect x="28" y="24" width="2" height="4" fill="#f0f0f0" />
        <rect x="22" y="32" width="2" height="4" fill="#f0f0f0" />
        <rect x="26" y="40" width="2" height="4" fill="#f0f0f0" />
        <rect x="20" y="48" width="2" height="4" fill="#f0f0f0" />
        <rect x="8" y="28" width="2" height="4" fill="#f0f0f0" />
        <rect x="36" y="36" width="2" height="4" fill="#f0f0f0" />

        {/* Flower on top */}
        <rect x="20" y="12" width="8" height="4" fill="#e1611a" />
        <rect x="24" y="8" width="4" height="8" fill="#e1611a" />
      </svg>
    );
  }

  // variant 2
  return (
    <svg
      className={`w-10 h-14 ${className}`}
      viewBox="0 0 40 56"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Main body */}
      <rect x="12" y="12" width="16" height="44" fill="#2d5016" />

      {/* Left arm */}
      <rect x="4" y="20" width="8" height="16" fill="#2d5016" />
      <rect x="4" y="20" width="12" height="8" fill="#2d5016" />

      {/* Right arm */}
      <rect x="28" y="28" width="8" height="12" fill="#2d5016" />
      <rect x="24" y="28" width="12" height="8" fill="#2d5016" />

      {/* Spines */}
      <rect x="16" y="16" width="2" height="4" fill="#f0f0f0" />
      <rect x="22" y="20" width="2" height="4" fill="#f0f0f0" />
      <rect x="18" y="28" width="2" height="4" fill="#f0f0f0" />
      <rect x="20" y="36" width="2" height="4" fill="#f0f0f0" />
      <rect x="16" y="44" width="2" height="4" fill="#f0f0f0" />
      <rect x="8" y="24" width="2" height="4" fill="#f0f0f0" />
      <rect x="30" y="32" width="2" height="4" fill="#f0f0f0" />

      {/* Flower on top */}
      <rect x="16" y="8" width="8" height="4" fill="#a91a8a" />
      <rect x="20" y="4" width="4" height="8" fill="#a91a8a" />
    </svg>
  );
}
