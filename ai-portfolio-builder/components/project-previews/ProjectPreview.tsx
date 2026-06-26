type ProjectPreviewProps = {
  project: any;
};

function getProjectType(project: any) {
  const text = `${project?.name || ""} ${project?.title || ""} ${
    project?.description || ""
  } ${(project?.techStack || project?.technologies || []).join(" ")}`.toLowerCase();

  if (text.includes("resume") || text.includes("ats")) return "resume";
  if (text.includes("portfolio") || text.includes("folio")) return "portfolio";
  if (text.includes("rest") || text.includes("api") || text.includes("flask")) return "api";
  if (text.includes("classification") || text.includes("tensorflow") || text.includes("keras") || text.includes("cnn") || text.includes("water")) return "ai";

  return "default";
}

export default function ProjectPreview({ project }: ProjectPreviewProps) {
  const type = getProjectType(project);

  if (type === "resume") return <ResumePreview />;
  if (type === "portfolio") return <PortfolioPreview />;
  if (type === "api") return <ApiPreview />;
  if (type === "ai") return <AiPreview />;

  return <DefaultPreview project={project} />;
}

function ResumePreview() {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
      <p className="mb-5 text-xs uppercase tracking-[0.35em] text-white/35">ATS Engine</p>
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <p className="text-sm text-white/40">ATS Score</p>
        <div className="mt-3 flex items-end gap-2">
          <p className="text-6xl font-black tracking-[-0.08em]">92</p>
          <p className="mb-2 text-white/40">/100</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <MiniMetric label="Skills" value="18" />
        <MiniMetric label="Grade" value="A+" />
      </div>
      <div className="mt-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-300">
        Resume uploaded ✓
      </div>
    </div>
  );
}

function PortfolioPreview() {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
      <p className="mb-5 text-xs uppercase tracking-[0.35em] text-white/35">Portfolio Preview</p>
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <div className="mb-6 flex gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        </div>
        <p className="text-xs uppercase tracking-[0.35em] text-white/35">folioforge.dev</p>
        <h4 className="mt-8 text-4xl font-black tracking-[-0.07em]">Generated Portfolio</h4>
        <div className="mt-8 grid gap-3">
          <div className="h-3 w-3/4 rounded-full bg-white/20" />
          <div className="h-3 w-1/2 rounded-full bg-white/10" />
          <div className="h-3 w-2/3 rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}

function ApiPreview() {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/40 p-6 font-mono backdrop-blur-xl">
      <p className="mb-5 text-xs uppercase tracking-[0.35em] text-white/35">API Console</p>
      <div className="space-y-3 text-sm">
        <ApiRow method="GET" route="/tasks" status="200 OK" />
        <ApiRow method="POST" route="/tasks" status="201 CREATED" />
        <ApiRow method="PUT" route="/tasks/:id" status="200 OK" />
        <ApiRow method="DELETE" route="/tasks/:id" status="204 EMPTY" />
      </div>
    </div>
  );
}

function AiPreview() {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
      <p className="mb-5 text-xs uppercase tracking-[0.35em] text-white/35">AI Prediction</p>
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <div className="mb-5 h-28 rounded-2xl border border-white/10 bg-gradient-to-br from-[#001d39] to-[#2a1308]" />
        <p className="text-sm text-white/40">Predicted Class</p>
        <p className="mt-2 text-5xl font-black tracking-[-0.07em]">Lake</p>
        <div className="mt-6 h-2 rounded-full bg-white/10">
          <div className="h-2 w-[98%] rounded-full bg-white/70" />
        </div>
      </div>
    </div>
  );
}

function DefaultPreview({ project }: { project: any }) {
  const tech = project?.techStack || project?.technologies || [];

  return (
    <div className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
      <p className="mb-5 text-xs uppercase tracking-[0.35em] text-white/35">Live Preview</p>
      <MiniMetric label="System Status" value="200 OK" />
      <div className="mt-4 grid grid-cols-2 gap-4">
        <MiniMetric label="Stack" value={tech[0] || "Next.js"} />
        <MiniMetric label="Type" value="Product" />
      </div>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-sm text-white/40">{label}</p>
      <p className="mt-1 text-2xl font-black text-white">{value}</p>
    </div>
  );
}

function ApiRow({
  method,
  route,
  status,
}: {
  method: string;
  route: string;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
      <div>
        <span className="text-emerald-300">{method}</span>{" "}
        <span className="text-white/70">{route}</span>
      </div>
      <span className="text-white/40">{status}</span>
    </div>
  );
}