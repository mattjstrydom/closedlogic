import Image from "next/image";

export type Person = { id: string; name: string; initials: string; heading: string; bio: string; photo?: string; alt?: string; linkedin?: string };

/** Square team photo (radius-md, 1px border), or the initials in the same tile when a person has no photo yet. */
export default function Headshot({ person, size = 96 }: { person: Person; size?: 72 | 96 }) {
  const box = `shrink-0 rounded-[var(--radius-md)] border border-solid border-rule`;
  const px = { width: size, height: size };
  if (person.photo) {
    return <Image src={person.photo} alt={person.alt ?? person.name} width={96} height={96} sizes={`${size}px`} style={px} className={`${box} object-cover`} />;
  }
  return (
    <div role="img" aria-label={person.name} style={px} className={`${box} flex items-center justify-center bg-band text-[22px] font-semibold text-body`}>
      <span aria-hidden="true">{person.initials}</span>
    </div>
  );
}
