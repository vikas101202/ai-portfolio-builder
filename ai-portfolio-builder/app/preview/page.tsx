"use client";
import DeveloperTemplate from "../../components/templates/DeveloperTemplate";
import CreativeTemplate from "../../components/templates/CreativeTemplate";
import MinimalTemplate from "../../components/templates/MinimalTemplate";
import { ArrowLeft, Globe2, Code2, Briefcase, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PreviewPage() {
  const router = useRouter();
  const [portfolio, setPortfolio] = useState<any>(null);
  const [publishing, setPublishing] = useState(false);
const [selectedTemplate, setSelectedTemplate] = useState("developer");
  useEffect(() => {
    setSelectedTemplate(localStorage.getItem("folioforge-template") || "developer");
    const stored = localStorage.getItem("folioforge-portfolio");

    if (stored) {
      try {
        setPortfolio(JSON.parse(stored));
        return;
      } catch {
        localStorage.removeItem("folioforge-portfolio");
      }
    }

    if (window.name) {
      try {
        const parsed = JSON.parse(window.name);

        if (parsed.folioforgePortfolio) {
          setPortfolio(parsed.folioforgePortfolio);
        }
      } catch {
        setPortfolio(null);
      }
    }
  }, []);

  const goBackToGenerate = () => {
    router.push("/generate");
  };

  const regeneratePortfolio = () => {
    localStorage.removeItem("folioforge-portfolio");
    window.name = "";
    router.push("/generate");
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(portfolio, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "folioforge-portfolio.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const publishPortfolio = async () => {
    try {
      setPublishing(true);

      const res = await fetch("/api/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(portfolio),
      });

      const data = await res.json();

      if (!data.success || !data.url) {
        alert(data.error || "Publishing failed.");
        return;
      }

      const fullUrl = `${window.location.origin}${data.url}`;

      try {
        await navigator.clipboard.writeText(fullUrl);
        alert("Portfolio published! Link copied to clipboard.");
      } catch {
        alert(`Portfolio published! Copy this link: ${fullUrl}`);
      }

      router.push(data.url);
    } catch (error) {
      console.error(error);
      alert("Something went wrong while publishing.");
    } finally {
      setPublishing(false);
    }
  };

 if (!portfolio) {
  return (
    <main className="min-h-screen bg-[#050505] flex flex-col items-center justify-center gap-6 text-white">
      <p>No generated portfolio found.</p>

      <button
        onClick={regeneratePortfolio}
        className="rounded-full bg-white px-6 py-3 font-medium text-black"
      >
        Generate Again
      </button>
    </main>
  );
}

if (selectedTemplate === "developer") {
return (
  <DeveloperTemplate
    portfolio={portfolio}
    publishing={publishing}
    onRegenerate={regeneratePortfolio}
    onDownload={downloadJSON}
    onPublish={publishPortfolio}
  />
);
}

if (selectedTemplate === "minimal") {
return (
  <MinimalTemplate
    portfolio={portfolio}
  />
);
if (selectedTemplate === "creative") {
return (
  <CreativeTemplate
    portfolio={portfolio}
  />
);
  return (
    <main className="min-h-screen bg-[#050505] px-6 py-10 text-[#f4eadc]">
      <section className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={goBackToGenerate}
            className="inline-flex items-center gap-3 rounded-full border border-white/10 px-5 py-3 text-white/70 transition hover:bg-white/[0.05]"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={regeneratePortfolio}
              className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/70 transition hover:bg-white/[0.05]"
            >
              Regenerate
            </button>

            <button
              onClick={downloadJSON}
              className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:scale-[1.03]"
            >
              Download JSON
            </button>

            <button
              onClick={publishPortfolio}
              disabled={publishing}
              className="rounded-full border border-[#e5c185]/30 px-5 py-3 text-sm text-[#e5c185] transition hover:bg-[#e5c185]/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {publishing ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>

        <p className="mb-6 text-sm tracking-[0.45em] text-[#e5c185]">
          PORTFOLIO PREVIEW
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
              {portfolio.about || "No about section was generated."}
            </p>
          </div>

          <div className="rounded-[2rem] border border-[#e5c185]/15 bg-white/[0.035] p-8">
            <Code2 className="mb-8 text-[#e5c185]" />
            <h2 className="text-3xl font-black">Skills</h2>

            {portfolio.skills?.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {portfolio.skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm text-[#d8cabb]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-5 text-[#8a8379]">
                No skills were detected in this resume.
              </p>
            )}
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
                Projects Section Ready
              </h3>

              <p className="mx-auto mt-4 max-w-xl text-[#8a8379]">
                No projects were detected in this resume. Add projects to
                showcase your work and achievements.
              </p>
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
            {portfolio.contact?.email && <p>{portfolio.contact.email}</p>}
            {portfolio.contact?.phone && <p>{portfolio.contact.phone}</p>}
            {portfolio.contact?.location && <p>{portfolio.contact.location}</p>}

            {portfolio.contact?.linkedin && (
              <a
                href={portfolio.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="block transition hover:text-[#e5c185]"
              >
                {portfolio.contact.linkedin}
              </a>
            )}

            {portfolio.contact?.github && (
              <a
                href={portfolio.contact.github}
                target="_blank"
                rel="noreferrer"
                className="block transition hover:text-[#e5c185]"
              >
                {portfolio.contact.github}
              </a>
            )}
          </div>
        </div>
      </section>
    </main>
  );}}}