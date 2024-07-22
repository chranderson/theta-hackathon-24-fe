import { env } from '@/lib/env';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 dark:bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="mr-4 flex">
          <a className="mr-4 flex items-center space-x-2 lg:mr-6" href="/">
            <span className="font-bold lg:inline-block">
              {env.NEXT_PUBLIC_TEAM_NAME}
            </span>
          </a>
        </div>
        <div className="flex  items-center justify-end space-x-2 md:justify-end">
          <ConnectButton showBalance={false} />
        </div>
      </div>
    </header>
  );
}
