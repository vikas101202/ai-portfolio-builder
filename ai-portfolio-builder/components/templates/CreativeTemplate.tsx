type CreativeTemplateProps = {
  portfolio: any;
};

export default function CreativeTemplate({
  portfolio,
}: CreativeTemplateProps) {
  return (
    <main className="min-h-screen bg-[#111] text-white p-16">
      <h1 className="text-5xl font-bold">
        {portfolio?.name || "Creative Template"}
      </h1>
    </main>
  );
}