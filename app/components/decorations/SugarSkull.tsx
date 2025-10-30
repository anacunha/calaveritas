interface SugarSkullProps {
  className?: string;
  variant?: 1 | 2 | 3;
}

export default function SugarSkull({
  className = "",
  variant = 1,
}: SugarSkullProps) {
  if (variant === 1) {
    return (
      <svg
        className={`w-20 h-20 ${className}`}
        viewBox="0 0 80 80"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Skull base */}
        <rect x="16" y="8" width="48" height="56" fill="#f0f0f0" />
        <rect x="8" y="16" width="8" height="40" fill="#f0f0f0" />
        <rect x="64" y="16" width="8" height="40" fill="#f0f0f0" />

        {/* Eyes */}
        <rect x="24" y="24" width="12" height="16" fill="#333" />
        <rect x="44" y="24" width="12" height="16" fill="#333" />
        <circle
          className="animate-[blink_5s_ease-in-out_infinite]"
          cx="30"
          cy="32"
          r="3"
          fill="#a91a8a"
        />
        <circle
          className="animate-[blink_5s_ease-in-out_infinite_0.1s]"
          cx="50"
          cy="32"
          r="3"
          fill="#a91a8a"
        />

        {/* Nose */}
        <rect x="36" y="44" width="8" height="8" fill="#333" />

        {/* Teeth */}
        <rect x="24" y="56" width="8" height="8" fill="#333" />
        <rect x="40" y="56" width="8" height="8" fill="#333" />
        <rect x="56" y="56" width="8" height="8" fill="#333" />

        {/* Decorative patterns */}
        <rect x="32" y="16" width="4" height="4" fill="#e1611a" />
        <rect x="44" y="16" width="4" height="4" fill="#e1611a" />
        <circle cx="40" cy="12" r="4" fill="#fcefe8" />
        <rect x="20" y="32" width="4" height="4" fill="#e1611a" />
        <rect x="56" y="32" width="4" height="4" fill="#e1611a" />
      </svg>
    );
  }

  if (variant === 2) {
    return (
      <svg
        className={`w-20 h-20 ${className}`}
        viewBox="0 0 80 80"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Skull base */}
        <rect x="16" y="8" width="48" height="56" fill="#f0f0f0" />
        <rect x="8" y="16" width="8" height="40" fill="#f0f0f0" />
        <rect x="64" y="16" width="8" height="40" fill="#f0f0f0" />

        {/* Eyes */}
        <rect x="24" y="24" width="12" height="16" fill="#333" />
        <rect x="44" y="24" width="12" height="16" fill="#333" />
        <circle
          className="animate-[blink_5s_ease-in-out_infinite]"
          cx="30"
          cy="32"
          r="3"
          fill="#e1611a"
        />
        <circle
          className="animate-[blink_5s_ease-in-out_infinite_0.1s]"
          cx="50"
          cy="32"
          r="3"
          fill="#e1611a"
        />

        {/* Nose */}
        <rect x="36" y="44" width="8" height="8" fill="#333" />

        {/* Teeth */}
        <rect x="24" y="56" width="8" height="8" fill="#333" />
        <rect x="40" y="56" width="8" height="8" fill="#333" />
        <rect x="56" y="56" width="8" height="8" fill="#333" />

        {/* Decorative patterns */}
        <circle cx="30" cy="16" r="4" fill="#a91a8a" />
        <circle cx="50" cy="16" r="4" fill="#a91a8a" />
        <rect x="36" y="12" width="8" height="4" fill="#fcefe8" />
        <rect x="12" y="28" width="4" height="4" fill="#a91a8a" />
        <rect x="64" y="28" width="4" height="4" fill="#a91a8a" />
      </svg>
    );
  }

  // variant 3
  return (
    <svg
      className={`w-16 h-16 ${className}`}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Skull base */}
      <rect x="12" y="6" width="40" height="46" fill="#f0f0f0" />
      <rect x="6" y="14" width="6" height="32" fill="#f0f0f0" />
      <rect x="52" y="14" width="6" height="32" fill="#f0f0f0" />

      {/* Eyes */}
      <rect x="18" y="18" width="10" height="12" fill="#333" />
      <rect x="36" y="18" width="10" height="12" fill="#333" />
      <circle
        className="animate-[blink_5s_ease-in-out_infinite]"
        cx="23"
        cy="24"
        r="2"
        fill="#fcefe8"
      />
      <circle
        className="animate-[blink_5s_ease-in-out_infinite_0.1s]"
        cx="41"
        cy="24"
        r="2"
        fill="#fcefe8"
      />

      {/* Nose */}
      <rect x="28" y="34" width="8" height="6" fill="#333" />

      {/* Teeth */}
      <rect x="18" y="46" width="6" height="6" fill="#333" />
      <rect x="30" y="46" width="6" height="6" fill="#333" />
      <rect x="42" y="46" width="6" height="6" fill="#333" />

      {/* Decorative patterns */}
      <rect x="24" y="12" width="4" height="4" fill="#e1611a" />
      <rect x="36" y="12" width="4" height="4" fill="#e1611a" />
      <circle cx="32" cy="8" r="3" fill="#a91a8a" />
    </svg>
  );
}
