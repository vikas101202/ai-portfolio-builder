type MinimalTemplateProps = {
  portfolio: any;
  publishing: boolean;
  onRegenerate: () => void;
  onDownload: () => void;
  onPublish: () => void;
};

export default function MinimalTemplate({ portfolio }: MinimalTemplateProps) {
  const projects = portfolio?.projects || [];
  const skills = portfolio?.skills || [];
  const experience = portfolio?.experience || [];
  const contact = portfolio?.contact || {};

  return (
    <main className="min-h-screen bg-[#f7f6f2] text-[#111111]">
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="border-b border-black/10 pb-16">
          <p className="mb-8 text-xs uppercase tracking-[0.45em] text-black/45">
            Minimal Portfolio
          </p>

          <h1 className="max-w-5xl text-7xl font-black uppercase leading-[0.85] tracking-[-0.08em] md:text-[10rem]">
            {portfolio?.name || "Your Name"}
          </h1>

          <div className="mt-12 grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
            <p className="text-2xl font-semibold md:text-4xl">
              {portfolio?.role || "Software Engineer"}
            </p>

            <p className="max-w-2xl text-2xl leading-snug text-black/55 md:text-4xl">
              {portfolio?.headline ||
                "Building clean, useful and reliable software products."}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[220px_1fr]">
        <h2 className="text-sm uppercase tracking-[0.35em] text-black/40">
          About
        </h2>

        <p className="max-w-3xl text-3xl font-medium leading-tight tracking-[-0.04em] md:text-5xl">
          {portfolio?.about ||
            "A developer focused on creating practical software with thoughtful architecture and clean execution."}
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[220px_1fr]">
        <h2 className="text-sm uppercase tracking-[0.35em] text-black/40">
          Skills
        </h2>

        <div className="flex flex-wrap gap-3">
          {skills.length > 0 ? (
            skills.map((skill: string, index: number) => (
              <span
                key={index}
                className="rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-medium text-black/70 shadow-sm"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-black/40">No skills available.</p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-14 grid gap-12 md:grid-cols-[220px_1fr]">
          <h2 className="text-sm uppercase tracking-[0.35em] text-black/40">
            Projects
          </h2>

          <p className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
            Selected work built with clarity, utility and real-world purpose.
          </p>
        </div>

        <div className="divide-y divide-black/10 border-y border-black/10">
          {projects.length > 0 ? (
            projects.map((project: any, index: number) => (
              <article
                key={index}
                className="group grid gap-8 py-12 transition md:grid-cols-[120px_1fr_220px]"
              >
                <p className="text-sm text-black/35">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <div>
                  <h3 className="text-4xl font-black tracking-[-0.06em] md:text-6xl">
                    {project?.name || project?.title || "Project"}
                  </h3>

                  <p className="mt-6 max-w-3xl text-lg leading-8 text-black/55">
                    {project?.description ||
                      "Project description generated from resume."}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {(project?.techStack || project?.technologies || []).map(
                      (tech: string, i: number) => (
                        <span
                          key={i}
                          className="rounded-full bg-black/[0.04] px-3 py-1.5 text-xs font-medium text-black/55"
                        >
                          {tech}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3 md:justify-end">
                  {project?.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      className="rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold transition hover:border-black/30"
                    >
                      Live
                    </a>
                  )}

                  {project?.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      className="rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold transition hover:border-black/30"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </article>
            ))
          ) : (
            <p className="py-12 text-black/40">No projects available.</p>
          )}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[220px_1fr]">
        <h2 className="text-sm uppercase tracking-[0.35em] text-black/40">
          Experience
        </h2>

        <div className="divide-y divide-black/10 border-y border-black/10">
          {experience.length > 0 ? (
            experience.map((exp: any, index: number) => (
              <article key={index} className="py-10">
                <p className="text-sm uppercase tracking-[0.25em] text-black/35">
                  {exp?.duration || "Timeline"}
                </p>

                <h3 className="mt-4 text-3xl font-bold tracking-[-0.04em]">
                  {exp?.role || "Role"}
                </h3>

                {exp?.company && (
                  <p className="mt-2 text-lg text-black/45">{exp.company}</p>
                )}

                {exp?.description && (
                  <p className="mt-5 max-w-3xl text-lg leading-8 text-black/55">
                    {exp.description}
                  </p>
                )}
              </article>
            ))
          ) : (
            <p className="py-10 text-black/40">No experience available.</p>
          )}
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-6 py-24">
        <div className="border-t border-black/10 pt-16">
          <h2 className="max-w-4xl text-6xl font-black leading-[0.9] tracking-[-0.08em] md:text-8xl">
            Let’s make something useful.
          </h2>

          <div className="mt-12 flex flex-wrap gap-3">
            {contact?.email && (
              <a
                href={`mailto:${contact.email}`}
                className="rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold"
              >
                {contact.email}
              </a>
            )}

            {contact?.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold"
              >
                {contact.phone}
              </a>
            )}

            {contact?.location && (
              <span className="rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold">
                {contact.location}
              </span>
            )}

            {contact?.linkedin && (
              <a
                href={contact.linkedin}
                target="_blank"
                className="rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold"
              >
                LinkedIn
              </a>
            )}

            {contact?.github && (
              <a
                href={contact.github}
                target="_blank"
                className="rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold"
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