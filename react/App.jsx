import { useMemo, useState } from "react";

const profile = {
  name: "Johnlenard Bernarte",
  role: "Junior Web Developer | IT Support | Technical Support",
  location: "San Fernando, Philippines",
  tagline:
    "I build practical, user-focused web interfaces and support real-world operations with reliable technical problem-solving.",
  about:
    "Entry-level developer with hands-on experience building practical front-end projects with clean, responsive UI and strong information hierarchy.",
  links: {
    github: "https://github.com/LittleDev-20",
    linkedin: "https://www.linkedin.com/in/john-lenard-bernarte-4a7b25269/",
    email: "",
    resume: "",
  },
  projects: [
    {
      title: "Atlas TradeOps Frontend",
      description:
        "A dark-themed operator console frontend with secure login, dashboard metrics, and risk-focused workflow sections.",
      tags: ["Frontend", "Trading UI", "Dashboard", "Responsive UI"],
      image: "assets/atlas-tradeops/shot-04.png",
      repo: "",
      live: "https://frontend-web-three-alpha.vercel.app/login?next=%2Fportfolio",
    },
    {
      title: "Firefighter Robot Thesis Project",
      description:
        "A graduating-team robotics thesis project for firefighter support, recognized through public news coverage and demo video.",
      tags: ["Robotics", "Thesis", "Automation", "Team Project"],
      image: "assets/firefighter-robot/thumbnail.jpg",
      repo: "",
      live: "",
      links: [
        {
          label: "News Article",
          url: "https://newsinfo.inquirer.net/1805166/watch-graduating-students-make-firefighter-robot-thesis-project-inqstories",
        },
        {
          label: "Watch Video",
          url: "https://youtu.be/NI_17qHTkfI?si=sHrKAo1k91bmvpPN",
          primary: true,
        },
      ],
    },
  ],
};

function IconLink({ href, label }) {
  const hasHref = Boolean(href && href.trim());
  return (
    <a
      href={hasHref ? href : "#"}
      target="_blank"
      rel="noreferrer"
      aria-disabled={!hasHref}
      className="px-3 py-2 rounded-lg border border-white/10 hover:border-white/25 hover:bg-white/5 transition aria-disabled:opacity-50 aria-disabled:pointer-events-none"
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
      const linked = (p.links || [])
        .map((it) => `${it.label || ""} ${it.url || ""}`)
        .join(" ");
      const blob =
        `${p.title} ${p.description} ${(p.tags || []).join(" ")} ${linked} ${p.repo || ""} ${p.live || ""}`.toLowerCase();
      return blob.includes(q);
    });
  }, [query]);

  const emailHref = useMemo(() => {
    if (!profile.links.email) return "#";
    const subject = encodeURIComponent(`Portfolio Inquiry - ${profile.name}`);
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
                aria-disabled={emailHref === "#"}
                className="px-3 py-2 rounded-lg bg-white text-black hover:bg-white/90 transition font-medium aria-disabled:opacity-50 aria-disabled:pointer-events-none"
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
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <SectionTitle title="Projects" subtitle="Featured work with live link." />
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
                {p.image ? (
                  <img
                    src={p.image}
                    alt={`${p.title} screenshot`}
                    className="w-full aspect-video object-cover rounded-lg border border-white/10 mb-4"
                  />
                ) : null}
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="text-white/70 mt-2">{p.description}</p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {(p.tags || []).map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-full text-sm border border-white/15 text-white/80">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 mt-5">
                  {(p.links || []).map((link) => (
                    <a
                      key={`${p.title}-${link.label}`}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className={
                        link.primary
                          ? "px-3 py-2 rounded-lg bg-white text-black hover:bg-white/90 transition font-medium"
                          : "px-3 py-2 rounded-lg border border-white/15 hover:border-white/25 hover:bg-white/5 transition"
                      }
                    >
                      {link.label}
                    </a>
                  ))}
                  {p.repo ? (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-2 rounded-lg border border-white/15 hover:border-white/25 hover:bg-white/5 transition"
                    >
                      Source Code
                    </a>
                  ) : null}
                  {p.live ? (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-2 rounded-lg bg-white text-black hover:bg-white/90 transition font-medium"
                    >
                      View Live Project
                    </a>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-14 py-8 text-center text-white/60">
          (c) {new Date().getFullYear()} {profile.name}. Built with React.
        </footer>
      </div>
    </div>
  );
}
