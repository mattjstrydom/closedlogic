// Text-only product names with small generic icons. No trademarked logos: nothing here implies a partnership
// (the footer carries the not-affiliated line).
const icon = (d: React.ReactNode) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className="text-green-text">
    {d}
  </svg>
);

export const platforms: { name: string; icon: React.ReactNode }[] = [
  { name: "HubSpot Marketing Hub", icon: icon(<><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /></>) },
  { name: "Google Ads Data Manager", icon: icon(<><path d="M4 7h16M4 12h16M4 17h10" /><circle cx="19" cy="17" r="2" /></>) },
  { name: "Enhanced conversions for leads", icon: icon(<path d="M5 12l4.5 4.5L19 7" />) },
  { name: "Google Tag Manager", icon: icon(<><path d="M3.5 12.5l8-8h8v8l-8 8z" /><circle cx="15.5" cy="8.5" r="1.2" /></>) },
  { name: "Stripe", icon: icon(<><rect x="3.5" y="6" width="17" height="12" rx="2.5" /><path d="M3.5 10.5h17" /></>) },
];

export function PlatformPills({ names, className = "" }: { names?: string[]; className?: string }) {
  const list = names ? platforms.filter((p) => names.includes(p.name)) : platforms;
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {list.map((p, i) => (
        <li key={p.name} className="pill pill-rise" style={{ "--pd": `${0.15 + i * 0.08}s` } as React.CSSProperties}>
          {p.icon}
          {p.name}
        </li>
      ))}
    </ul>
  );
}
