// Hero visual: three systems, three numbers. Built from HTML and the existing tokens; styles under .tn-* in app/globals.css.
const rows: [string, string, string][] = [
  ["Google Ads", "conversions", "42"],
  ["HubSpot", "leads", "31"],
  ["Board deck", "opportunities", "18"],
];

export default function ThreeNumbers() {
  return (
    <figure className="card tn mx-auto w-full max-w-[44rem]">
      <figcaption className="img-label">Illustrative numbers, not a client result</figcaption>
      <div className="tn-wrap">
        <ul className="tn-rows">
          {rows.map(([name, unit, n]) => (
            <li key={name}>
              <span>
                <span className="tn-name">{name}</span>
                <span className="tn-unit">{unit}</span>
              </span>
              <span className="tn-num">{n}</span>
            </li>
          ))}
        </ul>
        <span className="tn-bracket" aria-hidden="true" />
        <p className="tn-note">One number is wrong. We find out which.</p>
      </div>
    </figure>
  );
}
