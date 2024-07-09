import { env } from '@/lib/env';

export default function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-0 outline border-t">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by {env.NEXT_PUBLIC_TEAM_NAME}. The source code is available on{' '}
          <a
            href={env.NEXT_PUBLIC_REPO_LINK}
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
