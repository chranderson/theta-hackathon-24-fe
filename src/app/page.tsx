import { env } from '@/lib/env';

export default function Home() {
  return (
    <main className="flex-1 flex h-full flex-col items-center justify-center p-24">
      <h1 className="font-serif text-4xl text-center">
        {env.NEXT_PUBLIC_APP_NAME}
        <span className="block text-primary text-6xl">2024</span>
      </h1>
    </main>
  );
}
