import ThemeToggle from "./ThemeToggle";

export default function Header({
  sections,
}: {
  sections: { id: string; title: string }[];
}) {
  return (
    <header>
      <nav>
        {sections.map((sec, i) => (
          <a key={`nav_${i}`} href={`#${sec.id}`}>
            {sec.title}
          </a>
        ))}
      </nav>
      <ThemeToggle />
    </header>
  );
}
