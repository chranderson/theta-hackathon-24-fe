import { fileURLToPath } from 'node:url';
import createJiti from 'jiti';
const jiti = createJiti(fileURLToPath(import.meta.url));

// Import env here to validate during build. Using jiti we can import .ts files :)
jiti('./src/lib/env');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@t3-oss/env-nextjs', '@t3-oss/env-core']
};

export default nextConfig;
