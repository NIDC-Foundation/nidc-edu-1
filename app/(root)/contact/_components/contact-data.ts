export const CONTACTS = [
  {
    icon: "✉️",
    label: "General Enquiries",
    value: "hello@nidcfoundation.org",
  },
  {
    icon: "🎓",
    label: "Scholarship Applications",
    value: "apply@nidcfoundation.org",
  },
  {
    icon: "💳",
    label: "Donations & Giving",
    value: "giving@nidcfoundation.org",
  },
  {
    icon: "🏛️",
    label: "University Partnerships",
    value: "partnerships@nidcfoundation.org",
  },
  {
    icon: "📰",
    label: "Press & Media",
    value: "press@nidcfoundation.org",
  },
] as const;

export const OFFICES = [
  {
    city: "Accra",
    country: "Ghana 🇬🇭",
    address: "Independence Avenue, Accra, Ghana",
    type: "Headquarters",
  },
  {
    city: "Lagos",
    country: "Nigeria 🇳🇬",
    address: "Victoria Island, Lagos, Nigeria",
    type: "West Africa Hub",
  },
  {
    city: "Nairobi",
    country: "Kenya 🇰🇪",
    address: "Upper Hill, Nairobi, Kenya",
    type: "East Africa Hub",
  },
] as const;
