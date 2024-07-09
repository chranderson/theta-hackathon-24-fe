export default function Nav() {
  return (
    <nav className="flex items-center gap-4 text-sm lg:gap-6">
      <a
        className="transition-colors hover:text-foreground/80 text-foreground/60"
        href="/"
      >
        Home
      </a>
    </nav>
  );
}
