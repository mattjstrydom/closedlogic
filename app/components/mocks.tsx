import CodeBlock, { type Tok } from "./code-block";

// Product-style illustrations. Values are literal identifiers / example rows, labelled "Example".
const frame = "frag overflow-hidden text-[0.8125rem] leading-snug";

function Caption() {
  return <p className="img-label-quiet m-3">Example</p>;
}

export function ConversionMock() {
  const rows: [string, "Primary" | "Secondary"][] = [
    ["Lead form submit", "Primary"],
    ["HubSpot MQL", "Secondary"],
    ["HubSpot SQL", "Secondary"],
    ["Test conversion", "Secondary"],
  ];
  return (
    <div className={frame}>
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">Example conversion action list</caption>
        <thead>
          <tr className="border-b border-gray-100 text-gray-600">
            <th scope="col" className="px-3 py-2.5 font-normal">Conversion action</th>
            <th scope="col" className="px-3 py-2.5 font-normal">Goal</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([n, g]) => (
            <tr key={n} className="border-b border-gray-100">
              <td className="px-3 py-2.5">{n}</td>
              <td className="px-3 py-2.5">
                <span className={g === "Primary" ? "goal-primary" : "goal-secondary"}>{g}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Caption />
    </div>
  );
}

export function CookieMock() {
  return (
    <div>
      <CodeBlock
        title="Cookie"
        copyText="_gcl_aw"
        copyLabel="Copy the cookie name _gcl_aw"
        lines={[
          [["k", "Name    "], ["v", "_gcl_aw"]],
          [["k", "Value   "], ["s", "GCL.1700000000.Cj0KCQ…"]],
          [["k", "Domain  "], ["s", ".example.com"]],
        ]}
      />
      <Caption />
    </div>
  );
}

export function ConsentMock() {
  const keys = ["ad_storage", "analytics_storage", "ad_user_data", "ad_personalization"];
  return (
    <div>
      <CodeBlock
        title="Consent"
        copyText={keys.map((k) => k + ": denied").join("\n")}
        copyLabel="Copy the four consent defaults"
        lines={[
          [["c", "consent: default"]],
          ...keys.map((k): Tok[] => [["k", k], ["", ": "], ["s", "denied"]]),
        ]}
      />
      <Caption />
    </div>
  );
}
