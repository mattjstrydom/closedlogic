// The two people on the site (About and the home page). To add a headshot: put a square JPG in public/team/, list it in
// images.manifest.json with [96, 192], run `node scripts/build-images.mjs`, then set photo below. Without a photo the card
// shows the initials. No LinkedIn links are shown (Matt, 3 Nov 2026); add `linkedin` to an entry to show one on the home page and /about.
import type { Person } from "./components/headshot";

export const team: (Person & { short: string })[] = [
  {
    id: "matt",
    name: "Matt Strydom",
    initials: "MS",
    heading: "Matt Strydom, founder.",
    bio: "Matt has spent 7 years in marketing and revenue operations. He runs HubSpot and Google Tag Manager in production for B2B SaaS, and has built CRM architecture, lead scoring and attribution across HubSpot, GA4, Google Ads, Clay and Amplitude.",
    short: "7 years in marketing and revenue operations. Runs HubSpot and Google Tag Manager in production for B2B SaaS.",
    photo: "/team/matt.jpg",
    alt: "Matt Strydom, founder of Closed Logic",
  },
  {
    id: "jennifer",
    name: "Jennifer Taylor",
    initials: "JT",
    heading: "Jennifer Taylor, revenue operations and MarTech.",
    bio: "Revenue operations and MarTech background: CRM resets, pipeline upgrades, lead routing and workflow automation, outbound systems, and reporting and attribution for sales and marketing leaders. She starts with clean data and consistent pipelines, so the reporting is something a team can trust.",
    short: "CRM resets, pipeline upgrades, lead routing and workflow automation.",
    photo: "/team/jennifer.jpg",
    alt: "Jennifer Taylor, Closed Logic",
  },
];
