export default function Section({
  id,
  children,
}: React.PropsWithChildren<{ id: string }>) {
  return <section id={id}>{children}</section>;
}
