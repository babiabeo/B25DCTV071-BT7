export default function Button({
  tag,
  color,
  onClick,
}: {
  tag: string;
  color: string;
  onClick?: () => void;
}) {
  return (
    <button
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {tag}
    </button>
  );
}
