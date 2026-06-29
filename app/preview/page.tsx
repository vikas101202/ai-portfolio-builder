"use client";

import { AnimatePresence, motion } from "framer-motion";
import DeveloperTemplate from "../../components/templates/DeveloperTemplate";
import CreativeTemplate from "../../components/templates/CreativeTemplate";
import MinimalTemplate from "../../components/templates/MinimalTemplate";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PreviewPage() {
  const router = useRouter();

  const [portfolio, setPortfolio] = useState<any>(null);
  const [publishing, setPublishing] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("developer");

  useEffect(() => {
    setSelectedTemplate(
      localStorage.getItem("folioforge-template") || "developer"
    );

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
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#050505] text-white">
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

  const templateProps = {
    portfolio,
    publishing,
    onRegenerate: regeneratePortfolio,
    onDownload: downloadJSON,
    onPublish: publishPortfolio,
  };

  return (
  <main className="relative min-h-screen bg-[#050505]">
    <div className="fixed right-5 top-5 z-50 flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-3 py-2 shadow-2xl backdrop-blur-xl">
      <button
        type="button"
        onClick={() => router.push("/templates")}
        className="rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-white/70 transition hover:bg-white/[0.06] sm:text-sm"
      >
        ← Templates
      </button>

      <button
        type="button"
        onClick={downloadJSON}
        className="rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-white/70 transition hover:bg-white/[0.06] sm:text-sm"
      >
        Download
      </button>

      <button
        type="button"
        onClick={publishPortfolio}
        disabled={publishing}
        className="rounded-full bg-[#e5c185] px-4 py-2 text-xs font-bold text-black transition hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
      >
        {publishing ? "Publishing..." : "Publish 🚀"}
      </button>
    </div>

    <AnimatePresence mode="wait">
      <motion.div
        key={selectedTemplate}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -18 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {selectedTemplate === "minimal" ? (
          <MinimalTemplate {...templateProps} />
        ) : selectedTemplate === "creative" ? (
          <CreativeTemplate {...templateProps} />
        ) : (
          <DeveloperTemplate {...templateProps} />
        )}
      </motion.div>
    </AnimatePresence>
  </main>
);
}