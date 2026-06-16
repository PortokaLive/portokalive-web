/**
 * Demo catalog — static showcase until API + api.video are live.
 * Replace with live data when portokalive-api is deployed.
 */
export const demoCreators = [
  {
    id: "kevin-studio",
    name: "Kevin Studio",
    handle: "@kevinstudio",
    avatar: "🎙️",
    tagline: "Product demos & rebirth streams",
    viewers: 128,
    live: true,
    category: "Tech",
  },
  {
    id: "meditation-room",
    name: "Meditation Room",
    handle: "@calm",
    avatar: "🧘",
    tagline: "Ambient practice sessions",
    viewers: 54,
    live: true,
    category: "Wellness",
  },
  {
    id: "music-lab",
    name: "Music Lab",
    handle: "@musiclab",
    avatar: "🎸",
    tagline: "Live looping & collabs",
    viewers: 0,
    live: false,
    category: "Music",
  },
  {
    id: "dev-office-hours",
    name: "Dev Office Hours",
    handle: "@devhours",
    avatar: "💻",
    tagline: "Open-source Q&A",
    viewers: 312,
    live: true,
    category: "Education",
  },
  {
    id: "creator-academy",
    name: "Creator Academy",
    handle: "@academy",
    avatar: "📚",
    tagline: "Streaming setup tutorials",
    viewers: 0,
    live: false,
    category: "Education",
  },
  {
    id: "portoka-official",
    name: "PortokaLive Official",
    handle: "@portoka",
    avatar: "🍊",
    tagline: "Platform updates & rebirth",
    viewers: 89,
    live: true,
    category: "Announcements",
  },
];

export const demoStats = {
  liveNow: 4,
  creators: 6,
  recordings: 24,
  categories: 5,
};
