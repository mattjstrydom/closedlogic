// The two people on the site (About and the home page). To add a headshot: put a square JPG in public/team/, list it in
// images.manifest.json with [96, 192], run `node scripts/build-images.mjs`, then set photo below. Without a photo the card
// shows the initials. Jennifer has no LinkedIn link yet; add `linkedin` to her entry when she wants one shown.
import type { Person } from "./components/headshot";
import { site } from "./site.config";

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
    linkedin: site.linkedin,
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
