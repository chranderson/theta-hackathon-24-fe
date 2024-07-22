import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { env } from './env';

export const config = getDefaultConfig({
  appName: env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_NAME!,
  projectId: env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  chains: [sepolia],
  ssr: true
});
