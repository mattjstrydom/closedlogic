import Image from "next/image";

export type Person = { id: string; name: string; initials: string; heading: string; bio: string; photo?: string; alt?: string; linkedin?: string };

const headshot = "size-24 shrink-0 rounded-full border-2 border-solid border-ink";

/** Round team photo, or the initials in the same circle when a person has no photo yet. */
export default function Headshot({ person }: { person: Person }) {
  if (person.photo) {
    return <Image src={person.photo} alt={person.alt ?? person.name} width={96} height={96} sizes="96px" className={`${headshot} object-cover`} />;
  }
  return (
    <div role="img" aria-label={person.name} className={`${headshot} flex items-center justify-center bg-band font-display text-[1.75rem] font-bold tracking-[-0.03em] text-ink`}>
      <span aria-hidden="true">{person.initials}</span>
    </div>
  );
}
