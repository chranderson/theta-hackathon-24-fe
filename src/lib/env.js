import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/** todo
 *  - configure different env files (.env.test.local)
 */
export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {},
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    NEXT_PUBLIC_APP_NAME: z.string().min(1),
    NEXT_PUBLIC_REPO_LINK: z.string().url(),
    NEXT_PUBLIC_TEAM_NAME: z.string().min(1),
    NEXT_PUBLIC_WALLET_CONNECT_PROJECT_NAME: z.string().min(1).optional(),
    NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: z.string().min(32)
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_REPO_LINK: process.env.NEXT_PUBLIC_REPO_LINK,
    NEXT_PUBLIC_TEAM_NAME: process.env.NEXT_PUBLIC_TEAM_NAME,
    NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID:
      process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID
  },
  NEXT_PUBLIC_WALLET_CONNECT_PROJECT_NAME:
    process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_NAME
});
