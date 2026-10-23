export const profile = {
  name: "Rakshith Chandra Shekar",
  role: "Software Engineer · SAP ABAP Cloud · Applied AI/ML",
  location: "Chippendale, Sydney NSW",
  email: "rakshithc46@gmail.com",
  // Corrected format: no leading 0 after the "+61" country code.
  phone: "+61 478 086 899",
  phoneHref: "tel:+61478086899",
  linkedin: "linkedin.com/in/rakshithc46",
  linkedinUrl: "https://linkedin.com/in/rakshithc46",
  // Was rakshithc46 — all three project repos (assetpulse, procureflow,
  // brain-tumour-cnn-classification) live under rakshithc4, so that's the
  // profile that actually has the work on it.
  github: "github.com/rakshithc4",
  githubUrl: "https://github.com/rakshithc4",
  // Full paragraph, kept for reference / meta text. The About section renders
  // aboutLead + aboutBody instead of this in one block — see below.
  summary:
    "Final-year Computer Science student at the University of Sydney (graduating Dec 2027) with hands-on experience building and deploying SAP RAP applications end-to-end on SAP BTP. Co-authored applied machine learning research benchmarking multiple model architectures. Comfortable across the full engineering lifecycle — design, build, test, and deployment — combined with proven leadership managing 22-person teams, cross-functional coordination, and stakeholder communication. Seeking graduate opportunities in technology, enterprise systems, or consulting.",
}

// Toggle to true (and add " (Honours)" where `education` is rendered — just
// append `honoursSuffix` to `degree`) if Honours is confirmed later.
export const honoursConfirmed = false
export const honoursSuffix = honoursConfirmed ? " (Honours)" : ""

// Split out for the About section: one strong lead sentence at display size,
// a shorter supporting paragraph below it — instead of one long wall of text.
export const aboutLead =
  "Computer Science student at the University of Sydney (graduating Dec 2027), with hands-on experience building and deploying real enterprise systems."

export const aboutBody =
  "Two SAP ABAP Cloud applications built and deployed on SAP BTP, plus co-authored applied machine learning research. Comfortable across the full engineering lifecycle — design, build, test, deployment — backed by proven leadership managing 22-person teams and cross-functional stakeholders."

export const aboutHighlights = [
  { value: "2", label: "SAP systems built and deployed" }, // TODO(Rakshith): verify count
  { value: "22", label: "22-person committee led as President" },
  { value: "4", label: "CNN architectures benchmarked in research" }, // TODO(Rakshith): verify count
]

export const heroStats = [
  { value: "2", label: "SAP RAP apps built" },
  { value: "18/18", label: "ABAP Unit tests passing" },
  { value: "0", label: "ATC findings" },
]

export const skillMarquee = [
  "ABAP Cloud",
  "SAP BTP",
  "RAP Model",
  "CDS Views",
  "Python",
  "TensorFlow / Keras",
  "Next.js",
  "FastAPI",
  "TanStack Query",
  "SQL",
  "Java",
  "Git / GitHub",
]

export const projects = [
  {
    id: "assetpulse",
    name: "AssetPulse",
    tagline: "SAP Plant Maintenance-Style Asset System · Mining",
    period: "2025 – Present",
    description:
      "An SAP Plant Maintenance-style asset maintenance system for mining operations, built on real SAP RAP business objects with a dark-themed Next.js control-room frontend and a Python FastAPI analytics service. Models the full lifecycle — fault reported → triaged into a work order → scheduled → executed — with MTTR, availability %, and downtime surfaced on a live dashboard.",
    highlights: [
      "Cross-business-object transactional logic in ABAP: starting repair work flips the linked equipment's status to \"under maintenance\", completing it restores \"operational\" — real state changes, not just UI state",
      "Next.js 14 (App Router, TypeScript, Tailwind, TanStack Query) control-room frontend consuming the OData v4 service layer",
      "FastAPI + pandas analytics service computing MTTR, availability, and downtime KPIs",
      "12/12 ABAP Unit tests passing, ATC-clean static analysis, GitHub Actions CI, published via abapGit for public source visibility",
    ],
    stack: ["SAP BTP", "RAP", "CDS Views", "OData V4", "Next.js", "TanStack Query", "FastAPI", "pandas"],
    stats: [
      { value: "12/12", label: "ABAP Unit tests" }, // confirmed against repo CI
      { value: "2", label: "linked services" },
      { value: "3", label: "live KPIs" }, // MTTR, availability %, downtime — confirmed against README dashboard
      { value: "0", label: "ATC findings" }, // confirmed: README reports 0 errors
    ],
    href: "https://github.com/rakshithc4/assetpulse",
    liveDemo: "https://assetpulse-psi.vercel.app/login",
    // AssetPulse's README says the hosted demo runs on sample data — you
    // pick a persona card, there's no username/password login.
    demoLoginNote: "No login — pick a persona card" as string | null,
    // Placeholder until a real walkthrough video exists.
    watchDemoUrl: "#" as string | null,
    sampleDataNote:
      "Hosted demo uses sample data; backend built and tested on SAP BTP ABAP Environment." as string | null,
    colabUrl: null as string | null,
    image: "/assetpulse-01.jpg" as string | null,
  },
  {
    id: "procureflow",
    name: "ProcureFlow",
    tagline: "SAP ABAP Cloud Procurement Workflow",
    period: "2025 – Present",
    description:
      "An end-to-end RAP business object on SAP BTP ABAP Environment implementing a procurement requisition-to-purchase-order approval workflow — data modelling, business logic, service exposure, and unit testing across 17 activated objects.",
    highlights: [
      "Full status lifecycle (DRAFT → SUBMITTED → APPROVED/REJECTED) with 4 RAP actions: SubmitForApproval, Approve, Reject, CreatePurchaseOrder",
      "Field-level validations, duplicate PO prevention, and a 7-message domain-specific message class",
      "Resolved 15 complex activation bugs via root-cause analysis: schema mismatches, UUID key-type conflicts, strict-mode raw DB write violations, RAP redirection restrictions",
      "6/6 ABAP Unit tests passing with a clean ATC scan — zero structural or logic errors",
    ],
    stack: ["ABAP Cloud", "RAP", "CDS Views", "OData V4", "Eclipse ADT", "SAP BTP", "SQL", "Git"],
    stats: [
      { value: "17", label: "objects" },
      { value: "4", label: "RAP actions" },
      { value: "6/6", label: "ABAP Unit tests" }, // confirmed against repo CI
      { value: "0", label: "ATC findings" }, // confirmed: README reports a clean ATC scan
    ],
    href: "https://github.com/rakshithc4/procureflow",
    liveDemo: "https://procureflow-alpha.vercel.app/login",
    // Confirmed in the repo README: requestor@demo / approver@demo, both
    // password demo1234.
    demoLoginNote: "Demo credentials on login page" as string | null,
    // Placeholder until a real walkthrough video exists.
    watchDemoUrl: "#" as string | null,
    sampleDataNote:
      "Hosted demo uses sample data; backend built and tested on SAP BTP ABAP Environment." as string | null,
    colabUrl: null as string | null,
    image: "/procureflow-01.jpg" as string | null,
  },
  {
    id: "brain-tumour-cnn",
    name: "Brain Tumour Classification",
    tagline: "Deep Learning · CNN Benchmark Study",
    period: "Jan 2024 – Jun 2025",
    description:
      "A deep learning study (co-authored with Sneha Sinha, University of Sydney) benchmarking 4 CNN architectures — ResNet50V2, InceptionV3, VGG16, and a custom Advanced Residual CNN — across 7,023 brain MRI scans spanning 4 tumour classes.",
    highlights: [
      "ResNet50V2 achieved 95.5% test accuracy with precision, recall, and F1-score all at 0.95",
      "Full preprocessing pipeline: multi-source dataset curation (Figshare, SARTAJ, Br35H), RGB standardisation, normalisation, class-imbalance augmentation",
      "Custom CNN from scratch incorporating CBAM attention, Swish activation, and two-phase focal-loss training",
      "Grad-CAM visualisations applied for clinical interpretability",
    ],
    stack: ["Python", "TensorFlow/Keras", "ResNet50V2", "InceptionV3", "VGG16", "Transfer Learning", "Grad-CAM"],
    stats: [
      { value: "7,023", label: "MRI scans" }, // TODO(Rakshith): verify against dataset
      { value: "4", label: "architectures" }, // TODO(Rakshith): verify
      { value: "95.5%", label: "test accuracy" }, // TODO(Rakshith): verify against notebook
      { value: "0.95", label: "F1-score" }, // TODO(Rakshith): verify against notebook
    ],
    href: "https://github.com/rakshithc4/brain-tumour-cnn-classification",
    liveDemo: null as string | null,
    demoLoginNote: null as string | null,
    watchDemoUrl: null as string | null,
    sampleDataNote: null as string | null,
    colabUrl: "https://colab.research.google.com/drive/1vvph17UAAuNw68lGIp_GgqsNjHtncsZt?usp=sharing",
    image: "/brain-tumor-01.png" as string | null,
  },
]

export const experience = [
  {
    role: "Guest Relations Representative",
    org: "BridgeClimb",
    location: "Sydney, NSW",
    period: "Jul 2026 – Present",
    points: [
      "Deliver safety-critical customer service to international visitors in a high-pressure, time-constrained environment.",
      "Manage group logistics and give clear instructions to large groups.",
    ],
  },
  {
    role: "Peer Mentor",
    org: "University of Sydney",
    location: "Sydney, NSW",
    period: "2025 – Present",
    points: [
      "Support new Computer Science students with academic guidance and transition advice.",
      "Translate technical concepts into clear, accessible explanations for students new to the degree.",
    ],
  },
  {
    role: "President, Student Council",
    org: "Manipal Academy of Higher Education",
    location: "India",
    period: "2022 – 2024",
    points: [
      "Led a 22-person student committee to plan and run 17 campus events for a student body of 800+.",
      "Coordinated budgets, vendors, and cross-team logistics across the full event calendar.",
    ],
  },
]

export const skillGroups = [
  { label: "Languages", items: ["Python", "Java", "C / C++", "SQL", "R"] },
  { label: "AI / ML", items: ["CNNs", "Transfer Learning", "ResNet / VGG / InceptionV3", "TensorFlow / Keras", "Grad-CAM"] },
  { label: "SAP & ERP", items: ["ABAP Cloud", "RAP Model", "CDS Views", "SAP BTP", "SAP Fiori", "OData V4"] },
  { label: "Cloud & Tools", items: ["Git / GitHub", "Next.js", "Vercel", "FastAPI", "TanStack Query", "GitHub Actions", "abapGit"] },
  { label: "SDLC & Quality", items: ["Agile / Scrum", "Version Control", "Unit Testing", "Debugging & Troubleshooting", "ATC Static Analysis"] },
  { label: "Leadership", items: ["Stakeholder Communication", "Team Coordination", "Cross-functional Collaboration"] },
]

export const education = [
  {
    degree: `Bachelor of Advanced Computing${honoursSuffix}`,
    org: "University of Sydney",
    location: "Sydney, NSW",
    period: "Expected Dec 2027",
    detail: "Major: Computer Science · Minor: Software Development · WAM: 76 · 2+2 transfer from Manipal Academy of Higher Education, India.",
  },
]

export const certifications = [
  {
    name: "Positioning SAP Business Data Cloud",
    org: "SAP",
    period: "Issued Apr 2026",
    credentialId: null as string | null,
    href: "https://badger.learning.sap.com/verify/xefuc-mudaf-gebaf-medug-hisac",
  },
  {
    name: "C_ABAPD_2507 — SAP Certified Associate: Back-End Developer ABAP Cloud",
    org: "In progress",
    period: "",
    credentialId: null as string | null,
    href: null as string | null,
  },
  // Not SAP-related — kept last, after both SAP entries.
  {
    name: "Object-Oriented C++: Inheritance and Encapsulation",
    // Issuing org is Codio (an authoring partner); Coursera is just the
    // hosting/verification platform — the verify URL does belong to this
    // course, confirmed against the cert page content. No mismatch here.
    org: "Codio",
    period: "Issued Jan 2024",
    credentialId: "FGT2FHQNCNDE",
    href: "https://www.coursera.org/account/accomplishments/verify/FGT2FHQNCNDE",
  },
]

export const languages = [
  { name: "English", level: "Fluent" },
  { name: "Hindi", level: "Fluent" },
  { name: "Kannada", level: "Native" },
]
