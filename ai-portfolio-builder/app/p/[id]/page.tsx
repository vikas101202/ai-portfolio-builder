import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import { Globe2, Code2, Briefcase, Mail } from "lucide-react";
import clientPromise from "../../../lib/mongodb";

export default async function PublicPortfolioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!ObjectId.isValid(id)) {
    notFound();
  }

  const client = await clientPromise;
  const db = client.db("folioforge");

  const saved = await db.collection("portfolios").findOne({
    _id: new ObjectId(id),
  });

  if (!saved?.portfolio) {
    notFound();
  }

  const portfolio: any = saved.portfolio;

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-10 text-[#f4eadc]">
      <section className="mx-auto max-w-6xl">
        <p className="mb-6 text-sm tracking-[0.45em] text-[#e5c185]">
          PUBLISHED PORTFOLIO
        </p>

        <h1 className="max-w-5xl text-6xl font-black leading-[0.92] tracking-tight md:text-8xl">
          {portfolio.name || "Your Name"}
          <br />
          <span className="text-[#777268]">
            {portfolio.role || "Developer"}
          </span>
        </h1>

        <p className="mt-8 max-w-3xl text-xl leading-relaxed text-[#b8afa3]">
          {portfolio.headline || portfolio.about}
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-[2rem] border border-[#e5c185]/15 bg-white/[0.035] p-8">
            <Globe2 className="mb-8 text-[#e5c185]" />
            <h2 className="text-3xl font-black">About</h2>

            <p className="mt-5 leading-relaxed text-[#b8afa3]">
              {portfolio.about}
            </p>
          </div>

          <div className="rounded-[2rem] border border-[#e5c185]/15 bg-white/[0.035] p-8">
            <Code2 className="mb-8 text-[#e5c185]" />
            <h2 className="text-3xl font-black">Skills</h2>

            <div className="mt-5 flex flex-wrap gap-2">
              {portfolio.skills?.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm text-[#d8cabb]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-[2rem] border border-[#e5c185]/15 bg-white/[0.035] p-8">
          <Briefcase className="mb-8 text-[#e5c185]" />
          <h2 className="text-3xl font-black">Projects</h2>

          {portfolio.projects?.length > 0 ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {portfolio.projects.map((project: any, index: number) => (
                <div
                  key={index}
                  className="rounded-3xl border border-white/10 bg-black/30 p-6"
                >
                  <h3 className="text-xl font-bold">
                    {project.title || project.name}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[#b8afa3]">
                    {project.description}
                  </p>

                  {project.tech && (
                    <p className="mt-4 text-xs uppercase tracking-[0.25em] text-[#e5c185]/70">
                      {Array.isArray(project.tech)
                        ? project.tech.join(" • ")
                        : project.tech}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-3xl border border-dashed border-white/10 bg-black/20 p-12 text-center">
              <h3 className="text-2xl font-bold text-[#f4eadc]">
                No Projects Found
              </h3>
            </div>
          )}
        </div>

        {portfolio.experience?.length > 0 && (
          <div className="mt-8 rounded-[2rem] border border-[#e5c185]/15 bg-white/[0.035] p-8">
            <Briefcase className="mb-8 text-[#e5c185]" />
            <h2 className="text-3xl font-black">Experience</h2>

            <div className="mt-8 space-y-6">
              {portfolio.experience.map((item: any, index: number) => (
                <div
                  key={index}
                  className="rounded-3xl border border-white/10 bg-black/30 p-6"
                >
                  <h3 className="text-xl font-bold">
                    {item.role || item.title}
                  </h3>

                  <p className="mt-1 text-sm text-[#e5c185]/70">
                    {item.company}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-[#b8afa3]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 rounded-[2rem] border border-[#e5c185]/15 bg-white/[0.035] p-8">
          <Mail className="mb-8 text-[#e5c185]" />
          <h2 className="text-3xl font-black">Contact</h2>

          <div className="mt-5 space-y-2 text-[#b8afa3]">
            <p>{portfolio.contact?.email}</p>
            <p>{portfolio.contact?.phone}</p>
            <p>{portfolio.contact?.location}</p>
            <p>{portfolio.contact?.linkedin}</p>
            <p>{portfolio.contact?.github}</p>
          </div>
        </div>
      </section>
    </main>
  );
}