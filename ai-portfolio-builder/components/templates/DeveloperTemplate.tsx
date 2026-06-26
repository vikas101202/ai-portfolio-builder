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
    <main className="min-h-screen bg-[#050505] px-6 py-20 text-white">
      <h1 className="text-5xl font-bold">
        {portfolio?.name || "Developer Template"}
      </h1>
    </main>
  );
}