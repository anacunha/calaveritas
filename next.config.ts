import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverActions: {
    bodySizeLimit: "6mb", // Aumentar límite para permitir imágenes de hasta 5MB + metadata
  },
};

export default nextConfig;
