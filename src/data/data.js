// Static seed data — returned by GET endpoints
// Replace with real database queries as your business grows

const services = [
  {
    id: 1,
    slug: "full-truckload",
    name: "Full Truckload",
    tagline: "Dedicated capacity, door to door",
    description:
      "Your freight fills the entire trailer. No sharing, no stops, no surprises. Ideal for large shipments that need dedicated, time-sensitive transport.",
    features: [
      "Dedicated 53' dry van trailer",
      "Direct point-to-point routing",
      "Real-time GPS tracking",
      "Flexible pickup windows",
      "Temperature-controlled options available",
      "Drop trailer programs available",
    ],
  },
  {
    id: 2,
    slug: "ltl",
    name: "Less Than Truckload",
    tagline: "Pay only for the space you use",
    description:
      "Share trailer space with other shippers and only pay for what you use. Cost-effective for smaller loads that don't fill a full trailer.",
    features: [
      "Pallet-level pricing",
      "Consolidated carrier network",
      "Guaranteed transit times",
      "Liftgate service available",
      "Residential delivery",
      "Inside pickup and delivery",
    ],
  },
  {
    id: 3,
    slug: "refrigerated",
    name: "Refrigerated",
    tagline: "Cold chain integrity, guaranteed",
    description:
      "Temperature-controlled transport for perishable goods, pharmaceuticals, and sensitive cargo. Continuous monitoring from pickup to delivery.",
    features: [
      "Continuous temp monitoring",
      "Multi-zone temperature control",
      "FSMA compliant operations",
      "Pre-cooled trailers",
      "Pharmaceutical-grade options",
      "Real-time temperature alerts",
    ],
  },
  {
    id: 4,
    slug: "flatbed",
    name: "Flatbed",
    tagline: "No walls, no limits",
    description:
      "Open-deck transport for oversized, heavy, or awkwardly shaped freight. Construction materials, machinery, steel — we haul it all.",
    features: [
      "Standard and step-deck trailers",
      "Oversized load permitting",
      "Tarping and securement",
      "Pilot car coordination",
      "Heavy-haul specialists",
      "Drop-deck and RGN available",
    ],
  },
  {
    id: 5,
    slug: "specialized",
    name: "Specialized",
    tagline: "When standard won't cut it",
    description:
      "Custom solutions for freight that doesn't fit any standard mode. Over-dimensional loads, high-value cargo, and mission-critical shipments.",
    features: [
      "Over-dimensional transport",
      "High-value cargo handling",
      "Custom crating available",
      "Dedicated project management",
      "White-glove service",
      "Military and government compliant",
    ],
  },
  {
    id: 6,
    slug: "intermodal",
    name: "Intermodal",
    tagline: "Rail + truck, the smart way",
    description:
      "Combine the cost efficiency of rail with the flexibility of trucking. Ideal for long hauls where speed is less critical than cost.",
    features: [
      "53' domestic containers",
      "Ramp-to-ramp coordination",
      "Drayage included",
      "Tracking across modes",
      "Lower carbon footprint",
      "Competitive long-haul rates",
    ],
  },
];

const stats = {
  yearsInBusiness: 1,
  loadsDelivered: 150,
  statesServed: 48,
  onTimeRate: 98,
  carriersInNetwork: 500,
  avgTransitDays: 2.4,
};

const testimonials = [
  {
    id: 1,
    quote:
      "Fastest response I've ever gotten from a freight broker. Load was picked up same day. These guys hustle.",
    author: "Marcus T.",
    role: "Logistics Manager",
    company: "Midwest Steel Supply",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "Finally a broker that answers the phone and gives me a straight number. No games, no callbacks three days later.",
    author: "Sandra K.",
    role: "Operations Director",
    company: "Pacific Fresh Foods",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "New team but they know what they're doing. Refrigerated load to Florida, on time, on temp. Will book again.",
    author: "Derek M.",
    role: "Supply Chain Lead",
    company: "Harvest Organics",
    rating: 5,
  },
];

export { services, stats, testimonials };