type CreativeTemplateProps = {
  portfolio: any;
  publishing: boolean;
  onRegenerate: () => void;
  onDownload: () => void;
  onPublish: () => void;
};

export default function CreativeTemplate({ portfolio }: CreativeTemplateProps) {
  const projects = portfolio?.projects || [];
  const skills = portfolio?.skills || [];
  const experience = portfolio?.experience || [];
  const contact = portfolio?.contact || {};

  return (
    <main className="min-h-screen overflow-hidden bg-[#f4efe7] text-[#15110c]">
      <section className="relative mx-auto min-h-screen max-w-7xl px-6 py-20">
        <div className="absolute right-[-120px] top-20 h-[420px] w-[420px] rounded-full bg-[#001d39]/20 blur-3xl" />
        <div className="absolute bottom-10 left-[-120px] h-[360px] w-[360px] rounded-full bg-[#2a1308]/20 blur-3xl" />

        <div className="relative flex min-h-[80vh] flex-col justify-between">
          <p className="w-fit rounded-full border border-black/10 bg-white/50 px-5 py-2 text-xs uppercase tracking-[0.35em] text-black/45">
            Creative Portfolio
          </p>

          <div>
            <h1 className="max-w-6xl text-[18vw] font-black uppercase leading-[0.78] tracking-[-0.1em] md:text-[11rem]">
              {portfolio?.name || "Your Name"}
            </h1>

            <div className="mt-10 grid gap-8 md:grid-cols-[0.7fr_1.3fr]">
              <p className="text-3xl font-black tracking-[-0.04em] md:text-5xl">
                {portfolio?.role || "Creative Developer"}
              </p>

              <p className="max-w-2xl text-2xl leading-snug text-black/55 md:text-4xl">
                {portfolio?.headline ||
                  "Designing expressive digital experiences with code, clarity and imagination."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="rounded-[3rem] bg-[#15110c] p-10 text-[#f4efe7] md:p-16">
          <p className="mb-8 text-xs uppercase tracking-[0.35em] text-white/35">
            About
          </p>

          <p className="max-w-5xl text-4xl font-black leading-[1.05] tracking-[-0.06em] md:text-7xl">
            {portfolio?.about ||
              "I build memorable digital products that balance strong engineering with thoughtful user experience."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 flex items-end justify-between gap-8">
          <h2 className="text-6xl font-black uppercase tracking-[-0.08em] md:text-9xl">
            Skills
          </h2>
          <p className="hidden max-w-xs text-right text-black/45 md:block">
            A compact stack shaped by real projects, practical tools and hands-on delivery.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {skills.length > 0 ? (
            skills.map((skill: string, index: number) => (
              <div
                key={index}
                className="rounded-[2rem] border border-black/10 bg-white/50 p-8 text-3xl font-black tracking-[-0.05em] transition hover:-translate-y-1 hover:bg-white"
              >
                {skill}
              </div>
            ))
          ) : (
            <p className="text-black/45">No skills available.</p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="mb-8 text-xs uppercase tracking-[0.35em] text-black/40">
          Selected Work
        </p>

        <div className="grid gap-6">
          {projects.length > 0 ? (
            projects.map((project: any, index: number) => (
              <article
                key={index}
                className={`grid overflow-hidden rounded-[3rem] border border-black/10 bg-white/60 ${
                  index % 2 === 0 ? "md:grid-cols-[1.1fr_0.9fr]" : "md:grid-cols-[0.9fr_1.1fr]"
                }`}
              >
                <div
                  className={`min-h-[360px] bg-[#15110c] p-10 text-[#f4efe7] ${
                    index % 2 !== 0 ? "md:order-2" : ""
                  }`}
                >
                  <p className="mb-8 text-xs uppercase tracking-[0.35em] text-white/35">
                    Project {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3 className="max-w-xl text-6xl font-black leading-[0.9] tracking-[-0.08em] md:text-8xl">
                    {project?.name || project?.title || "Project"}
                  </h3>
                </div>

                <div className="flex flex-col justify-between p-10">
                  <div>
                    <p className="text-xl leading-9 text-black/55">
                      {project?.description ||
                        "Project description generated from resume."}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-2">
                      {(project?.techStack || project?.technologies || []).map(
                        (tech: string, i: number) => (
                          <span
                            key={i}
                            className="rounded-full bg-black/[0.06] px-4 py-2 text-sm font-semibold text-black/55"
                          >
                            {tech}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div className="mt-10 flex gap-3">
                    {project?.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        className="rounded-full bg-[#15110c] px-6 py-3 text-sm font-bold text-white"
                      >
                        Live
                      </a>
                    )}

                    {project?.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        className="rounded-full border border-black/10 px-6 py-3 text-sm font-bold"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p className="text-black/45">No projects available.</p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-10 md:grid-cols-[0.7fr_1.3fr]">
          <h2 className="text-6xl font-black uppercase tracking-[-0.08em] md:text-9xl">
            Experience
          </h2>

          <div className="space-y-6">
            {experience.length > 0 ? (
              experience.map((exp: any, index: number) => (
                <article
                  key={index}
                  className="rounded-[2rem] border border-black/10 bg-white/50 p-8"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-black/35">
                    {exp?.duration || "Timeline"}
                  </p>

                  <h3 className="mt-4 text-4xl font-black tracking-[-0.05em]">
                    {exp?.role || "Role"}
                  </h3>

                  {exp?.company && (
                    <p className="mt-2 text-lg text-black/45">{exp.company}</p>
                  )}

                  {exp?.description && (
                    <p className="mt-6 text-lg leading-8 text-black/55">
                      {exp.description}
                    </p>
                  )}
                </article>
              ))
            ) : (
              <p className="text-black/45">No experience available.</p>
            )}
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-6 py-24">
        <div className="rounded-[3rem] bg-[#15110c] p-10 text-[#f4efe7] md:p-16">
          <h2 className="max-w-5xl text-6xl font-black leading-[0.9] tracking-[-0.08em] md:text-9xl">
            Let’s create something impossible to ignore.
          </h2>

          <div className="mt-12 flex flex-wrap gap-3">
            {contact?.email && (
              <a
                href={`mailto:${contact.email}`}
                className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white/70"
              >
                {contact.email}
              </a>
            )}

            {contact?.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white/70"
              >
                {contact.phone}
              </a>
            )}

            {contact?.location && (
              <span className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white/70">
                {contact.location}
              </span>
            )}

            {contact?.linkedin && (
              <a
                href={contact.linkedin}
                target="_blank"
                className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white/70"
              >
                LinkedIn
              </a>
            )}

            {contact?.github && (
              <a
                href={contact.github}
                target="_blank"
                className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white/70"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </footer>
    </main>
  );
}