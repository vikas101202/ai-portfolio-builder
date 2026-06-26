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
  <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">

    {/* Background */}
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#001d39_0%,transparent_35%),radial-gradient(circle_at_bottom_right,#2a1308_0%,transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:70px_70px]" />
    </div>

    <section className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-8">

      <div className="mb-10 inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
        <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-sm tracking-wide text-white/70">
          Available for Opportunities
        </span>
      </div>

      <h1 className="text-[18vw] leading-[0.82] font-black uppercase tracking-[-0.09em] md:text-[10rem]">
        {portfolio?.name || "Your Name"}
      </h1>

      <div className="mt-12 max-w-4xl border-t border-white/10 pt-10">

        <p className="text-2xl font-medium text-white md:text-4xl">
          {portfolio?.role || "Software Engineer"}
        </p>

        <p className="mt-6 text-xl leading-relaxed text-white/55 md:text-3xl">
          {portfolio?.headline ||
            "Building scalable software, AI-powered products and modern web experiences."}
        </p>

      </div>

      <div className="mt-24 text-sm uppercase tracking-[0.4em] text-white/30">
        Scroll ↓
      </div>

    </section>

  </main>
);
}