import ProjectPreview from "../project-previews/ProjectPreview";

type DeveloperTemplateProps = {
  portfolio: any;
  publishing: boolean;
  onRegenerate: () => void;
  onDownload: () => void;
  onPublish: () => void;
};

export default function DeveloperTemplate({
  portfolio,
}: DeveloperTemplateProps) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <div className="fixed inset-0 -z-10">
        <div className="absolute left-[-250px] top-[-200px] h-[700px] w-[700px] rounded-full bg-[#001d39]/30 blur-[180px]" />
        <div className="absolute bottom-[-180px] right-[-180px] h-[500px] w-[500px] rounded-full bg-[#2a1308]/30 blur-[170px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px]" />
        <div className="absolute inset-0 bg-black/55" />
      </div>
<section className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 py-24 sm:px-8">
        <div className="mb-12 inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-xl">
          <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          <span className="text-sm uppercase tracking-[0.25em] text-white/65">
            Available for Opportunities
          </span>
        </div>
<h1 className="max-w-5xl break-words text-[17vw] font-black uppercase leading-[0.86] tracking-[-0.08em] sm:text-[14vw] md:text-[9rem]">
          {portfolio?.name || "Developer"}
        </h1>

        <div className="mt-14 max-w-2xl border-t border-white/10 pt-10">
          <p className="text-2xl font-semibold md:text-4xl">
            {portfolio?.role || "Software Engineer"}
          </p>

          <p className="mt-6 text-xl leading-relaxed text-white/55 md:text-3xl">
            {portfolio?.headline ||
              "Building scalable APIs, AI-powered applications and modern backend systems."}
          </p>
        </div>

        <div className="mt-24 text-xs uppercase tracking-[0.45em] text-white/30">
          Scroll ↓
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-8 py-40">
        <div className="grid items-start gap-20 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.45em] text-white/35">
              Who I Am
            </p>
            <h2 className="text-6xl font-black uppercase leading-none tracking-[-0.08em] md:text-8xl">
              About
            </h2>
          </div>

          <div className="max-w-4xl">
            <h3 className="max-w-3xl text-3xl font-semibold leading-[1.25] tracking-[-0.03em] md:text-5xl">
              Building AI-powered applications, scalable backend systems and
              digital products people actually use.
            </h3>

            <div className="mt-12 h-px w-28 bg-gradient-to-r from-white/40 to-transparent" />

            <p className="mt-12 max-w-3xl text-lg leading-9 text-white/55">
              {portfolio?.about ||
                "Passionate software developer focused on creating production-ready applications with modern backend technologies, AI integration and intuitive user experiences."}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-8 pb-32">
        <p className="mb-12 text-sm uppercase tracking-[0.35em] text-white/40">
          Skills
        </p>

        <div className="flex flex-wrap gap-5">
          {(portfolio?.skills || []).map((skill: string, index: number) => (
            <div
              key={index}
              className="rounded-full border border-white/10 bg-white/[0.04] px-6 py-4 text-lg text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/10"
            >
              {skill}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-8 py-36">
        <p className="mb-16 text-sm uppercase tracking-[0.35em] text-white/40">
          Selected Work
        </p>

        <div className="space-y-10">
          {(portfolio?.projects || []).length > 0 ? (
            portfolio.projects.map((project: any, index: number) => (
              <article
                key={index}
                className="group overflow-hidden rounded-[34px] border border-white/10 bg-[#090909] transition-all duration-500 hover:border-white/20 hover:shadow-[0_40px_120px_rgba(0,0,0,.55)]"
              >
               <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="relative min-h-[520px] overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#001d39_0%,transparent_65%),radial-gradient(circle_at_bottom_right,#2a1308_0%,transparent_60%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] bg-[size:42px_42px]" />

                    <div className="relative flex h-full min-h-[520px] flex-col justify-between p-10">
                      <div className="flex gap-2">
                        <span className="h-3 w-3 rounded-full bg-white/25" />
                        <span className="h-3 w-3 rounded-full bg-white/15" />
                        <span className="h-3 w-3 rounded-full bg-white/10" />
                      </div>

                      <ProjectPreview project={project} />

                      <div>
                        <div className="mb-5 inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-emerald-300">
                          Production Ready
                        </div>

                        <h3 className="max-w-md text-5xl font-black leading-[0.9] tracking-[-0.06em]">
                          {project?.name || project?.title || "Project"}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between pp-6 sm:p-12">
                    <div>
                      <p className="text-xl leading-9 text-white/60">
                        {project?.description ||
                          "Project description generated from resume."}
                      </p>

                      <div className="mt-10 flex flex-wrap gap-3">
                        {(project?.techStack || project?.technologies || []).map(
                          (tech: string, i: number) => (
                            <span
                              key={i}
                              className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/55 backdrop-blur-xl"
                            >
                              {tech}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    <div className="mt-14 flex gap-4">
                      {project?.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          className="rounded-full bg-white px-6 py-3 font-semibold text-black transition duration-300 hover:scale-105"
                        >
                          View Live →
                        </a>
                      )}

                      {project?.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          className="rounded-full border border-white/10 px-6 py-3 text-white/70 transition hover:border-white/30"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 sm:p-12 text-white/40">
              No projects available.
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-8 py-36">
        <p className="mb-16 text-sm uppercase tracking-[0.35em] text-white/40">
          Experience
        </p>

        <div className="border-l border-white/10 pl-8">
          {(portfolio?.experience || []).length > 0 ? (
            portfolio.experience.map((exp: any, index: number) => (
              <div key={index} className="relative mb-16">
                <div className="absolute -left-[41px] top-2 h-4 w-4 rounded-full border border-white/20 bg-black" />

                <p className="text-sm uppercase tracking-[0.3em] text-white/35">
                  {exp?.duration || "Timeline"}
                </p>

                <h3 className="mt-3 text-4xl font-bold">
                  {exp?.role || "Role"}
                </h3>

                {exp?.company && (
                  <p className="mt-2 text-xl text-white/50">{exp.company}</p>
                )}

                {exp?.description && (
                  <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/55">
                    {exp.description}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-white/40">No experience available.</p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-8 py-36">
        <div className="rounded-[40px] border border-white/10 bg-white/[0.04] p-14 backdrop-blur-xl">
          <h2 className="max-w-4xl text-6xl font-black leading-[0.9] tracking-[-0.08em] md:text-8xl">
            Let's build something together.
          </h2>

          <div className="mt-12 flex flex-wrap gap-4 text-lg text-white/60">
            {portfolio?.contact?.email && (
              <a
                href={`mailto:${portfolio.contact.email}`}
                className="rounded-full border border-white/10 px-5 py-3 hover:text-white"
              >
                {portfolio.contact.email}
              </a>
            )}

            {portfolio?.contact?.phone && (
              <a
                href={`tel:${portfolio.contact.phone}`}
                className="rounded-full border border-white/10 px-5 py-3 hover:text-white"
              >
                {portfolio.contact.phone}
              </a>
            )}

            {portfolio?.contact?.location && (
              <span className="rounded-full border border-white/10 px-5 py-3">
                {portfolio.contact.location}
              </span>
            )}

            {portfolio?.contact?.linkedin && (
              <a
                href={portfolio.contact.linkedin}
                target="_blank"
                className="rounded-full border border-white/10 px-5 py-3 hover:text-white"
              >
                LinkedIn
              </a>
            )}

            {portfolio?.contact?.github && (
              <a
                href={portfolio.contact.github}
                target="_blank"
                className="rounded-full border border-white/10 px-5 py-3 hover:text-white"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}