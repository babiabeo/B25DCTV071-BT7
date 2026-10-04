export default function Section({
  id,
  title,
  infoList,
  imageSrc,
  imageAlt,
}: {
  id: string;
  title: string;
  infoList: string[][];
  imageSrc: string;
  imageAlt: string;
}) {
  return (
    <section id={id}>
      <div className="container">
        <h2>{title}</h2>
        <ul>
          {infoList.map(([name, description], i) => (
            <li key={`${id}_${i}`}>
              <b>{name}:</b> {description}
            </li>
          ))}
        </ul>
      </div>
      <div className="img-container">
        <img src={imageSrc} alt={imageAlt} />
      </div>
    </section>
  );
}
