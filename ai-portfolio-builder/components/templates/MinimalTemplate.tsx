type MinimalTemplateProps = {
  portfolio: any;
};

export default function MinimalTemplate({
  portfolio,
}: MinimalTemplateProps) {
  return (
    <main className="min-h-screen bg-white text-black p-16">
      <h1 className="text-5xl font-bold">
        {portfolio?.name || "Minimal Template"}
      </h1>
    </main>
  );
}