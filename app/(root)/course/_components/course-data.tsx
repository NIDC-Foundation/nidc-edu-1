export const FIELDS = [
  {
    id: "stem",
    icon: "💻",
    name: "STEM & Technology",
    color: "emerald",
    desc: "Engineering, Computer Science, Mathematics, Data Science, Biotechnology",
    demand: "Highest",
    programmes: [
      {
        title: "BSc Computer Science",
        duration: "4 years",
        universities: ["University of Ghana", "University of Nairobi"],
      },
      {
        title: "BSc Software Engineering",
        duration: "4 years",
        universities: ["University of Lagos", "University of Nairobi"],
      },
      {
        title: "BSc Electrical Engineering",
        duration: "4 years",
        universities: ["University of Ghana", "Makerere University"],
      },
      {
        title: "BSc Data Science",
        duration: "3 years",
        universities: ["University of Cape Town"],
      },
      {
        title: "BSc Biotechnology",
        duration: "4 years",
        universities: ["Addis Ababa University"],
      },
    ],
  },
  {
    id: "medicine",
    icon: "🏥",
    name: "Medicine & Health",
    color: "rose",
    desc: "Medicine, Pharmacy, Nursing, Public Health, Dentistry",
    demand: "Very High",
    programmes: [
      {
        title: "MBChB Medicine & Surgery",
        duration: "6 years",
        universities: ["University of Lagos", "Addis Ababa University"],
      },
      {
        title: "BPharm Pharmacy",
        duration: "5 years",
        universities: ["University of Ghana"],
      },
      {
        title: "BSc Nursing",
        duration: "4 years",
        universities: ["Makerere University"],
      },
      {
        title: "MPH Public Health",
        duration: "2 years",
        universities: ["University of Nairobi"],
      },
    ],
  },
  {
    id: "business",
    icon: "📊",
    name: "Business & Economics",
    color: "amber",
    desc: "Business Administration, Economics, Finance, Accounting, Entrepreneurship",
    demand: "High",
    programmes: [
      {
        title: "BSc Business Administration",
        duration: "4 years",
        universities: ["University of Ghana", "University of Lagos"],
      },
      {
        title: "BSc Economics",
        duration: "3 years",
        universities: ["University of Cape Town"],
      },
      {
        title: "BCom Accounting",
        duration: "3 years",
        universities: ["University of Cape Town"],
      },
    ],
  },
  {
    id: "law",
    icon: "⚖️",
    name: "Law & Governance",
    color: "violet",
    desc: "LLB Law, International Relations, Political Science, Human Rights",
    demand: "High",
    programmes: [
      {
        title: "LLB Law",
        duration: "4 years",
        universities: ["University of Ghana", "University of Lagos"],
      },
      {
        title: "BA International Relations",
        duration: "3 years",
        universities: ["University of Nairobi"],
      },
      {
        title: "BA Political Science",
        duration: "3 years",
        universities: ["Makerere University"],
      },
    ],
  },
  {
    id: "education",
    icon: "📚",
    name: "Education",
    color: "sky",
    desc: "Bachelor of Education, Educational Psychology, Early Childhood Development",
    demand: "Medium",
    programmes: [
      {
        title: "BEd Primary Education",
        duration: "4 years",
        universities: ["Makerere University", "University of Ghana"],
      },
      {
        title: "BEd Science Education",
        duration: "4 years",
        universities: ["University of Nairobi"],
      },
    ],
  },
  {
    id: "agriculture",
    icon: "🌱",
    name: "Agriculture & Environment",
    color: "teal",
    desc: "Agriculture, Environmental Science, Food Technology, Forestry",
    demand: "Growing",
    programmes: [
      {
        title: "BSc Agriculture",
        duration: "4 years",
        universities: ["Makerere University", "Addis Ababa University"],
      },
      {
        title: "BSc Environmental Science",
        duration: "3 years",
        universities: ["University of Nairobi"],
      },
    ],
  },
];

export const DEMAND_COLOR: Record<string, string> = {
  Highest: "text-primary bg-primary/10 border-primary/20",
  "Very High": "text-amber-400 bg-amber-400/10 border-amber-400/20",
  High: "text-sky-400 bg-sky-400/10 border-sky-400/20",
  Medium: "text-violet-400 bg-violet-400/10 border-violet-400/20",
  Growing: "text-teal-400 bg-teal-400/10 border-teal-400/20",
};

export const FIELD_COLORS: Record<string, string> = {
  emerald: "border-primary/20 bg-primary/5",
  rose: "border-rose-500/20 bg-rose-500/5",
  amber: "border-amber-500/20 bg-amber-500/5",
  violet: "border-violet-500/20 bg-violet-500/5",
  sky: "border-sky-500/20 bg-sky-500/5",
  teal: "border-teal-500/20 bg-teal-500/5",
};
