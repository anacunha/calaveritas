interface MarigoldProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Marigold({
  className = "",
  size = "md",
}: MarigoldProps) {
  const sizeMap = {
    sm: { width: "w-9 h-9", viewBox: "0 0 36 36" },
    md: { width: "w-10 h-10", viewBox: "0 0 40 40" },
    lg: { width: "w-12 h-12", viewBox: "0 0 48 48" },
  };

  const { width, viewBox } = sizeMap[size];

  if (size === "lg") {
    return (
      <svg
        className={`${width} ${className}`}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Petals */}
        <rect x="16" y="4" width="16" height="8" fill="#e1611a" />
        <rect x="4" y="16" width="8" height="16" fill="#e1611a" />
        <rect x="36" y="16" width="8" height="16" fill="#e1611a" />
        <rect x="16" y="36" width="16" height="8" fill="#e1611a" />

        {/* Diagonal petals */}
        <rect x="8" y="8" width="8" height="8" fill="#fcefe8" />
        <rect x="32" y="8" width="8" height="8" fill="#fcefe8" />
        <rect x="8" y="32" width="8" height="8" fill="#fcefe8" />
        <rect x="32" y="32" width="8" height="8" fill="#fcefe8" />

        {/* Center */}
        <rect x="16" y="16" width="16" height="16" fill="#FF9900" />
        <rect x="20" y="20" width="8" height="8" fill="#e1611a" />
      </svg>
    );
  }

  if (size === "md") {
    return (
      <svg
        className={`${width} ${className}`}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Petals */}
        <rect x="12" y="4" width="16" height="8" fill="#e1611a" />
        <rect x="4" y="12" width="8" height="16" fill="#e1611a" />
        <rect x="28" y="12" width="8" height="16" fill="#e1611a" />
        <rect x="12" y="28" width="16" height="8" fill="#e1611a" />

        {/* Diagonal petals */}
        <rect x="6" y="6" width="8" height="8" fill="#fcefe8" />
        <rect x="26" y="6" width="8" height="8" fill="#fcefe8" />
        <rect x="6" y="26" width="8" height="8" fill="#fcefe8" />
        <rect x="26" y="26" width="8" height="8" fill="#fcefe8" />

        {/* Center */}
        <rect x="12" y="12" width="16" height="16" fill="#FF9900" />
        <rect x="16" y="16" width="8" height="8" fill="#e1611a" />
      </svg>
    );
  }

  // size === "sm"
  return (
    <svg
      className={`${width} ${className}`}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Petals */}
      <rect x="10" y="2" width="16" height="8" fill="#e1611a" />
      <rect x="2" y="10" width="8" height="16" fill="#e1611a" />
      <rect x="26" y="10" width="8" height="16" fill="#e1611a" />
      <rect x="10" y="26" width="16" height="8" fill="#e1611a" />

      {/* Diagonal petals */}
      <rect x="4" y="4" width="8" height="8" fill="#fcefe8" />
      <rect x="24" y="4" width="8" height="8" fill="#fcefe8" />
      <rect x="4" y="24" width="8" height="8" fill="#fcefe8" />
      <rect x="24" y="24" width="8" height="8" fill="#fcefe8" />

      {/* Center */}
      <rect x="10" y="10" width="16" height="16" fill="#FF9900" />
      <rect x="14" y="14" width="8" height="8" fill="#e1611a" />
    </svg>
  );
}
