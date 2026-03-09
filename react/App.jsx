import { useMemo, useState } from "react";

const profile = {
  name: "Your Name",
  role: "Frontend / React Developer",
  location: "Philippines",
  tagline: "I build clean, fast, user-friendly web apps.",
  about:
    "Write a short intro about you here. Mention what you build, what tools you use, and what you're learning now.",
  links: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    email: "you@email.com",
    resume: "",
  },
  skills: [
    "React",
    "JavaScript",
    "HTML/CSS",
    "Responsive UI",
    "REST APIs",
    "Git/GitHub",
  ],
  experience: [
    {
      company: "Company Name",
      title: "Job Title",
      location: "City, Country",
      start: "2024",
      end: "Present",
      highlights: [
        "Shipped feature X that improved metric Y.",
        "Worked with API integrations and UI polish.",
      ],
    },
  ],
  projects: [
    {
      title: "Trading Bot UI",
      description:
        "A dashboard interface for monitoring signals, risk settings, and performance.",
      tags: ["React", "Charts", "UI"],
      repo: "https://github.com/yourusername/trading-bot-ui",
      live: "",
    },
  ],
};

function IconLink({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="px-3 py-2 rounded-lg border border-white/10 hover:border-white/25 hover:bg-white/5 transition"
    >
      {label}
    </a>
  );
}

function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold">{title}</h2>
      {subtitle && <p className="text-white/70 mt-1">{subtitle}</p>}
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState("");

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return profile.projects;
    return profile.projects.filter((p) => {
      const blob =
        `${p.title} ${p.description} ${(p.tags || []).join(" ")}`.toLowerCase();
      return blob.includes(q);
    });
  }, [query]);

  const emailHref = useMemo(() => {
    const subject = encodeURIComponent(`Portfolio Inquiry — ${profile.name}`);
    const body = encodeURIComponent(
      `Hi ${profile.name},\n\nI saw your portfolio and would like to connect.\n\nMy message:\n`
    );
    return `mailto:${profile.links.email}?subject=${subject}&body=${body}`;
  }, []);

  return (
    <div className="min-h-screen bg-[#0b1020] text-white">
      <div className="relative max-w-5xl mx-auto px-5 py-10">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-white/70">{profile.location}</p>
            <h1 className="text-4xl md:text-5xl font-bold mt-1">{profile.name}</h1>
            <p className="text-xl text-white/80 mt-2">{profile.role}</p>
            <p className="text-white/70 mt-3 max-w-2xl">{profile.tagline}</p>

            <div className="flex flex-wrap gap-3 mt-5">
              <IconLink href={profile.links.github} label="GitHub" />
              <IconLink href={profile.links.linkedin} label="LinkedIn" />
              <a
                href={emailHref}
                className="px-3 py-2 rounded-lg bg-white text-black hover:bg-white/90 transition font-medium"
              >
                Email Me
              </a>
            </div>
          </div>
        </header>

        <section className="mt-12">
          <SectionTitle title="About" subtitle="A short introduction." />
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/80 leading-relaxed">
            {profile.about}
          </div>
        </section>

        <section className="mt-12">
          <SectionTitle title="Experience" subtitle="Recent roles and responsibilities." />
          <div className="grid gap-5">
            {profile.experience.map((job) => (
              <div
                key={`${job.company}-${job.title}-${job.start}`}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <p className="text-white/75 mt-1">
                      {job.company}
                      {job.location ? <span className="text-white/60"> • {job.location}</span> : null}
                    </p>
                  </div>
                  <div className="text-sm text-white/60">
                    {job.start} — {job.end}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <SectionTitle title="Projects" subtitle="Some work (filter by keyword)." />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full md:w-72 px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-white/25"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {filteredProjects.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-white/20 transition"
              >
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="text-white/70 mt-2">{p.description}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-14 py-8 text-center text-white/60">
          © {new Date().getFullYear()} {profile.name}. Built with React.
        </footer>
      </div>
    </div>
  );
}

