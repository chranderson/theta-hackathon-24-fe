import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 dark:bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <a className="mr-4 flex items-center space-x-2 lg:mr-6" href="/">
            <span className="hidden font-bold lg:inline-block">Team Theta</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <Button size="sm" variant="secondary">
            Connect Wallet
          </Button>
        </div>
      </div>
    </header>
  );
}
