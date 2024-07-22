import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center gap-4">
      <h2 className="text-5xl font-bold">Not Found</h2>
      <Link href="/">Return Home</Link>
    </main>
  );
}
