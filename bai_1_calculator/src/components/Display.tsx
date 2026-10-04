export default function Display({
  topLine,
  bottomLine,
}: {
  topLine: string;
  bottomLine: string;
}) {
  return (
    <div className="display">
      <div className="display-top">
        <p>{topLine}</p>
      </div>
      <div className="display-bottom">
        <p>{bottomLine}</p>
      </div>
    </div>
  );
}
