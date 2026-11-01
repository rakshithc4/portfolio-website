// All site copy lives here. Edit text here, not in components.
// Rule: every number comes from Rakshith's brief. Do not invent metrics.

export type Link = { label: string; href: string };

export type Pier = {
  stage: string;
  title: string;
  icon: "house" | "books" | "plane" | "speech" | "gear" | "blueprint" | "flag";
  text: string;
  links?: { text: string; href: string }[];
  cta?: Link;
  /** Drawn as dashed line-work: the span that isn't built yet. */
  unfinished?: boolean;
};

export type Project = {
  id: string;
  kind: "sap" | "ml";
  name: string;
  tagline: string;
  problem?: string;
  built?: string;
  summary?: string;
  tags: string[];
  metrics: { value: string; label: string; sub?: string }[];
  links: Link[];
  note?: string;
  /** Renders a "Watch demo" button only when filled in. */
  videoUrl?: string;
  image: { src: string; alt: string; width: number; height: number };
};

export const site = {
  meta: {
    title: "Rakshith Chandra Shekar — SAP ABAP Cloud & BTP Developer",
    description:
      "SAP ABAP Cloud applications that turn business processes into reliable, tested software — and when I'm not coding, you'll find me on the Sydney Harbour Bridge.",
  },
  name: "Rakshith Chandra Shekar",
  resumeHref: "/Rakshith-Chandra-Shekar-Resume.pdf",
  nav: [
    { id: "work", label: "Work" },
    { id: "journey", label: "Journey" },
    { id: "experience", label: "Experience" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ],

  // The 5 bridge stages, used in the hero drawing, project diagrams and gauge.
  stages: [
    "Business process",
    "CDS data model",
    "RAP business object",
    "OData V4 service",
    "UI (Fiori / Next.js)",
  ],

  hero: {
    eyebrow: "SAP ABAP Cloud · RAP · BTP — CS student, University of Sydney",
    heading: "Hey, I'm Rakshith.",
    subheading: "I build bridges between business and code.",
    fullName: "Rakshith Chandra Shekar · Sydney",
    oneLiner:
      "SAP ABAP Cloud applications that turn business processes into reliable, tested software — and when I'm not coding, you'll find me on the Sydney Harbour Bridge.",
    status: "Open to summer internships · Dec 2026 – Feb 2027",
    proof: [
      { value: "2", label: "SAP RAP apps built" },
      { value: "18/18", label: "ABAP Unit tests passing" },
      { value: "0", label: "ATC errors" },
    ],
  },

  work: {
    heading: "Selected work",
    projects: [
      {
        id: "procureflow",
        kind: "sap",
        name: "ProcureFlow",
        tagline: "SAP ABAP Cloud procurement workflow",
        problem:
          "Purchase requests get stuck in email. Approved requests are re-keyed into purchase orders.",
        built:
          "A RAP managed business object (strict(2)) on SAP BTP ABAP Environment. Requisition, approve or reject, then purchase order. A Next.js front end talks to it through a server-side proxy that handles CSRF tokens and session cookies.",
        tags: [
          "ABAP Cloud",
          "RAP",
          "CDS Views",
          "OData V4",
          "Eclipse ADT",
          "SAP BTP",
          "Next.js",
          "Playwright",
        ],
        metrics: [
          { value: "17", label: "activated objects" },
          { value: "4", label: "RAP actions" },
          { value: "6/6", label: "ABAP Unit tests" },
          { value: "Clean", label: "ATC scan" },
        ],
        links: [
          {
            label: "Live demo",
            href: "https://procureflow-alpha.vercel.app/login",
          },
          { label: "Code", href: "https://github.com/rakshithc4/procureflow" },
        ],
        note: "Hosted demo can use sample data; backend built and tested on SAP BTP ABAP Environment. Demo logins are shown on the login page.",
        image: {
          src: "/procureflow-01.jpg",
          alt: "ProcureFlow screenshot: purchase requisition list and approval actions",
          width: 807,
          height: 606,
        },
      },
      {
        id: "assetpulse",
        kind: "sap",
        name: "AssetPulse",
        tagline: "SAP Plant Maintenance-style asset system for mining",
        problem:
          "Equipment downtime is expensive. Faults must move quickly from report to repair, and managers need reliability metrics.",
        built:
          "3 RAP managed business objects with 6 actions and cross-object status logic. A fault becomes a work order, then scheduled, started, completed. A FastAPI analytics service and a Next.js control-room dashboard show MTTR, availability % and backlog.",
        tags: [
          "SAP BTP",
          "RAP",
          "CDS Views",
          "OData V4",
          "Next.js",
          "TanStack Query",
          "FastAPI",
          "pandas",
        ],
        metrics: [
          { value: "12/12", label: "ABAP Unit tests" },
          { value: "0", label: "ATC errors" },
          { value: "80", label: "web + analytics tests in CI" },
          { value: "3", label: "dashboard KPIs" },
        ],
        links: [
          {
            label: "Live demo (no login: pick a persona card)",
            href: "https://assetpulse-psi.vercel.app",
          },
          { label: "Code", href: "https://github.com/rakshithc4/assetpulse" },
        ],
        note: "Hosted demo runs on sample data; RAP backend built and verified on SAP BTP ABAP Environment.",
        image: {
          src: "/assetpulse-01.jpg",
          alt: "AssetPulse control-room dashboard showing MTTR, availability and backlog",
          width: 768,
          height: 576,
        },
      },
      {
        id: "brain-tumour",
        kind: "ml",
        name: "Brain tumour classification",
        tagline: "Deep learning benchmark study",
        summary:
          "Co-authored with Sneha Sinha (University of Sydney). Benchmarked ResNet50V2, InceptionV3, VGG16 and a custom residual CNN on 7,023 brain MRI scans across 4 tumour classes.",
        tags: ["TensorFlow/Keras", "CNNs", "Transfer learning", "Grad-CAM"],
        metrics: [
          { value: "7,023", label: "scans" },
          { value: "4", label: "architectures" },
          // Confirmed against the repo README (best model = ResNet50V2).
          { value: "95.5%", label: "test accuracy", sub: "best model: ResNet50V2" },
          { value: "0.95", label: "F1" },
        ],
        links: [
          {
            label: "Code",
            href: "https://github.com/rakshithc4/brain-tumour-cnn-classification",
          },
          {
            label: "Colab notebook",
            href: "https://colab.research.google.com/drive/1vvph17UAAuNw68lGIp_GgqsNjHtncsZt?usp=sharing",
          },
        ],
        image: {
          src: "/brain-tumor-01.png",
          alt: "Brain tumour classification results: model comparison and Grad-CAM output",
          width: 1436,
          height: 1077,
        },
      },
    ] satisfies Project[],
  },

  journey: {
    heading: "How this bridge got built",
    intro: "Every bridge starts on one bank. Mine started in Bangalore.",
    piers: [
      {
        stage: "FOUNDATIONS",
        title: "Bangalore",
        icon: "house",
        text: "I grew up in a middle-class family in Bangalore and had never left my home state. My parents are my world. They taught me to be organised, to finish every job I'm given, and to listen. I always had one instinct: if everyone went one way, I'd look at the other.",
      },
      {
        stage: "SURVEY",
        title: "Manipal",
        icon: "books",
        text: "I dreamed of seeing the world, but finances meant starting closer to home. I joined Manipal's 2+2 program, worked hard, and earned a place at the University of Sydney — even though it wasn't one of the program's partner universities.",
      },
      {
        stage: "CROSSING",
        title: "Sydney",
        icon: "plane",
        text: "Landing in Sydney was a shock. New culture, new people, and honestly, I didn't know how to talk to anyone yet.",
      },
      {
        stage: "LOAD TEST",
        title: "BridgeClimb",
        icon: "speech",
        text: "My job on the Sydney Harbour Bridge changed that. Guiding climbers from all over the world taught me to communicate clearly under pressure. Today people tell me I'm a confident speaker — I wasn't when I arrived. I learned because I was willing to.",
      },
      {
        stage: "DESIGN",
        title: "Finding SAP",
        icon: "gear",
        text: "My dad is an auditor. He'd always talked about SAP — how it runs businesses, and how he once dreamed of working with it. When I researched it myself, everything clicked: organising complex systems, automation, consulting, and the technology behind it on SAP BTP. It felt like all the things I enjoy in one place.",
      },
      {
        stage: "BUILD",
        title: "Proof, not promises",
        icon: "blueprint",
        text: "I knew nobody would hire me on potential alone, so I set out to be useful first. I studied on SAP Learning Hub and built two production-style SAP applications on BTP — ProcureFlow and AssetPulse — with automated tests and clean code-quality checks. I'm completing the C_ABAPD certification by January 2027.",
        links: [
          { text: "ProcureFlow", href: "#procureflow" },
          { text: "AssetPulse", href: "#assetpulse" },
        ],
      },
      {
        stage: "NEXT SPAN — UNDER CONSTRUCTION",
        title: "Under construction",
        icon: "flag",
        unfinished: true,
        text: "Looking for my first summer internship (Dec 2026 – Feb 2027) and SAP ABAP Cloud / BTP graduate roles from Dec 2027. Let's build the next span together.",
        cta: { label: "Get in touch →", href: "#contact" },
      },
    ] as Pier[],
  },

  experience: {
    heading: "Experience",
    roles: [
      {
        title: "Guest Relations Representative",
        org: "BridgeClimb, Sydney",
        dates: "Jul 2026 – Present",
        text: "Safety-critical, face-to-face service for international guests. Clear instructions to large groups under time pressure.",
      },
      {
        title: "Peer Mentor",
        org: "University of Sydney",
        dates: "2025 – Present",
        text: "Guide new Computer Science students. Explain technical concepts in plain language.",
      },
      {
        title: "President, Student Council",
        org: "Manipal Academy of Higher Education, India",
        dates: "2022 – 2024",
        text: "Led a 22-person student committee running 17 events for 800+ students. Budgets, vendors and logistics.",
      },
    ],
  },

  about: {
    heading: "About",
    caption: "FIG. 1 · R. CHANDRA SHEKAR",
    photo: {
      src: "/headshot.jpeg",
      alt: "Portrait of Rakshith Chandra Shekar",
      width: 405,
      height: 542,
    },
    paragraphs: [
      "I'm a Bachelor of Advanced Computing student at the University of Sydney (major Computer Science, minor Software Development, WAM 76), graduating Dec 2027. I like turning messy business processes into clean, reliable systems — and explaining them in plain English.",
    ],
    languages: "English, Hindi, Kannada",
    bom: [
      {
        group: "SAP",
        items: [
          "ABAP Cloud",
          "RAP",
          "CDS Views",
          "OData V4",
          "SAP BTP",
          "ATC",
          "ABAP Unit",
          "abapGit",
        ],
      },
      {
        group: "Software",
        items: [
          "Python",
          "TypeScript / Next.js",
          "FastAPI",
          "SQL",
          "Java",
          "Git",
          "Playwright",
          "GitHub Actions",
        ],
      },
      {
        group: "AI/ML",
        items: ["TensorFlow/Keras", "CNNs", "Transfer learning", "Grad-CAM"],
      },
    ],
    credentials: [
      {
        label:
          "C_ABAPD_2507 SAP Certified Associate – Back-End Developer, ABAP Cloud (in progress, expected Jan 2027)",
      },
      {
        label: "SAP Learning credential: Positioning SAP Business Data Cloud (Apr 2026)",
        href: "https://badger.learning.sap.com/verify/xefuc-mudaf-gebaf-medug-hisac",
      },
      {
        label:
          "Object-Oriented C++: Inheritance and Encapsulation (Coursera, Jan 2024)",
        href: "https://www.coursera.org/account/accomplishments/verify/FGT2FHQNCNDE",
      },
    ] as { label: string; href?: string }[],
  },

  contact: {
    heading: "Let's build something.",
    email: "rakshithc46@gmail.com",
    phone: "+61 478 086 899",
    phoneHref: "tel:+61478086899",
    linkedin: "https://linkedin.com/in/rakshithc46",
    github: "https://github.com/rakshithc4",
    line: "Open to summer internships (Dec 2026 – Feb 2027) and SAP ABAP Cloud / BTP graduate roles across Australia from Dec 2027.",
    footer: "© 2026 Rakshith Chandra Shekar · Drawn in Sydney",
  },
};
