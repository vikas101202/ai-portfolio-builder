"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Upload, FileText, Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";

export default function GeneratePage() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    localStorage.removeItem("folioforge-portfolio");
    window.name = "";

    setFile(selectedFile);
  };

  const extractPdfText = async (file: File) => {
    const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");

    pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/legacy/build/pdf.worker.min.mjs`;

    const arrayBuffer = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({
      data: arrayBuffer,
    }).promise;

    let text = "";

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();

      const pageText = Array.from(content.items)
        .map((item: any) => item.str || "")
        .join(" ");

      text += pageText + "\n";
    }

    return text;
  };

  const extractResumeText = async (file: File) => {
    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (isPdf) {
      return await extractPdfText(file);
    }

    return await file.text();
  };

  const generatePortfolio = async () => {
    if (!file) {
      alert("Please upload a resume first.");
      return;
    }

    try {
      setIsGenerating(true);
      setLoadingText("Reading Resume...");

      setTimeout(() => setLoadingText("Analyzing Experience..."), 1200);
      setTimeout(() => setLoadingText("Identifying Skills..."), 2400);
      setTimeout(() => setLoadingText("Building Portfolio..."), 3600);
      setTimeout(() => setLoadingText("Almost Ready..."), 4800);

      const resumeText = await extractResumeText(file);
      const finalResumeText = resumeText.trim();

      if (!finalResumeText) {
        alert("Could not read text from this file. Try another resume.");
        return;
      }

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resumeText: finalResumeText }),
      });

      const data = await response.json();
console.log("Generate status:", response.status);
console.log("Generate data:", data);
      if (!response.ok || !data.portfolio) {
        console.error("Invalid generate response:", data);
        alert(data.error || "Failed to generate portfolio. Please try again.");
        return;
      }

      localStorage.setItem(
        "folioforge-portfolio",
        JSON.stringify(data.portfolio)
      );

      window.name = JSON.stringify({
        folioforgePortfolio: data.portfolio,
      });

      router.push("/templates");
    } catch (error) {
      console.error(error);
      alert("Something went wrong while generating the portfolio.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-hidden">
      <section className="relative min-h-screen flex items-center justify-center px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#001d39_0%,transparent_35%),radial-gradient(circle_at_bottom_right,#2a1308_0%,transparent_30%)] opacity-80" />

        <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70 mb-8"
          >
            <Sparkles size={16} />
            Your story becomes a portfolio here
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]"
          >
            Upload Your Resume.
            <br />
            <span className="text-white/55">We’ll Shape The Address.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-white/55 leading-relaxed"
          >
            FolioForge reads your resume, understands your work, and turns it
            into a polished portfolio experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-14 mx-auto max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 shadow-2xl shadow-black/40 backdrop-blur-xl"
          >
            <label
              htmlFor="resume-upload"
              className="group flex min-h-[260px] cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-white/15 bg-black/30 px-6 py-12 transition hover:border-white/30 hover:bg-white/[0.04]"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-black transition group-hover:scale-105">
                <Upload size={28} />
              </div>

              <h2 className="text-2xl font-medium">
                {file ? file.name : "Drop your resume here"}
              </h2>

              <p className="mt-3 text-sm text-white/45">
                PDF and TXT supported. DOCX comes next.
              </p>

              <input
                id="resume-upload"
                type="file"
                accept=".pdf,.txt"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {file && (
              <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                    <FileText size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white">
                      {file.name}
                    </p>

                    <p className="text-xs text-white/45">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <button
                  onClick={generatePortfolio}
                  disabled={isGenerating}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isGenerating && (
                    <Loader2 size={16} className="animate-spin" />
                  )}

                  {isGenerating ? loadingText : "Continue"}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}