"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, FileText, Globe2, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const openUpload = () => setShowUploadModal(true);

  const generatePortfolio = () => {
    if (!file) return;
    router.push("/preview");
  };

  return (
    <main className="min-h-screen bg-[#050505] text-[#f4eadc] overflow-hidden">
      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-sm tracking-[0.55em] text-[#e5c185]"
        >
          AI-POWERED · PORTFOLIO GENERATION
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-7xl text-6xl md:text-8xl lg:text-[8.5rem] font-black leading-[0.9] tracking-tight"
        >
          The Story Was
          <br />
          Already There
          <br />
          <span className="text-[#777268]">
            We Just Gave It an Address.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-10 max-w-3xl text-xl md:text-2xl leading-relaxed text-[#b8afa3]"
        >
          Upload your résumé and turn it into a premium personal website with
          projects, skills, experience, and your own digital presence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-5"
        >
          <button
            onClick={openUpload}
            className="rounded-full bg-[#e5c185] px-10 py-5 text-lg font-bold text-black shadow-[0_0_60px_rgba(229,193,133,0.25)] transition hover:scale-[1.03]"
          >
            Generate Portfolio
          </button>

          <button className="rounded-full border border-[#e5c185]/25 px-10 py-5 text-lg font-bold text-[#f4eadc] transition hover:bg-white/[0.04]">
            View Example
          </button>
        </motion.div>
      </section>

      {/* FORGE SECTION */}
      <section className="px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <p className="mb-8 text-sm tracking-[0.45em] text-[#e5c185]">
            THE FORGE
          </p>

          <h2 className="max-w-4xl text-5xl md:text-7xl font-black leading-[0.95] tracking-tight">
            Resume in.
            <br />
            Presence out.
          </h2>

          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-[#b8afa3]">
            Watch your resume become a structured personal website in one clean
            flow.
          </p>

          <div className="mt-20 grid gap-10 md:grid-cols-2">
            <div className="rounded-[2rem] border border-[#e5c185]/15 bg-white/[0.035] p-8">
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e5c185] text-black">
                  <FileText />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">resume.pdf</h3>
                  <p className="text-[#b8afa3]">Experience · Skills · Projects</p>
                </div>
              </div>

              <div className="mt-10 space-y-5">
                <div className="h-4 w-4/5 rounded-full bg-white/10" />
                <div className="h-4 w-3/5 rounded-full bg-white/10" />
                <div className="h-28 rounded-3xl bg-[#2a1308]/70" />
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#e5c185]/15 bg-[#120c09] p-6">
              <div className="rounded-[1.5rem] border border-[#e5c185]/15 bg-black/50 overflow-hidden">
                <div className="flex items-center gap-3 border-b border-[#e5c185]/15 px-6 py-4">
                  <span className="h-3 w-3 rounded-full bg-[#e5c185]/60" />
                  <span className="h-3 w-3 rounded-full bg-[#e5c185]/35" />
                  <span className="h-3 w-3 rounded-full bg-[#e5c185]/20" />
                  <span className="ml-6 rounded-full border border-white/10 px-5 py-1 text-sm text-white/50">
                    vikky.dev
                  </span>
                </div>

                <div className="p-8">
                  <p className="mb-6 text-sm tracking-[0.45em] text-[#e5c185]">
                    GENERATED PORTFOLIO
                  </p>

                  <h3 className="text-4xl font-black">Vikas Vikky</h3>
                  <p className="mt-2 text-xl text-[#b8afa3]">
                    Full Stack Developer
                  </p>

                  <div className="mt-10 space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                      Premium project section generated from your resume.
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                      Career Copilot
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO STYLES */}
      <section className="px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <p className="mb-8 text-sm tracking-[0.45em] text-[#e5c185]">
            PORTFOLIO STYLES
          </p>

          <h2 className="max-w-5xl text-5xl md:text-7xl font-black leading-[0.98] tracking-tight">
            Before The Handshake.
            <br />
            Your Work Has Entered The Room.
          </h2>

          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-[#b8afa3]">
            Different roles need different presentation. FolioForge adapts the
            layout around your story.
          </p>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {["Developer", "Designer", "Founder"].map((item, index) => (
              <div
                key={item}
                className="rounded-[2rem] border border-[#e5c185]/15 bg-white/[0.035] p-7"
              >
                <div className="h-52 rounded-[1.5rem] border border-[#e5c185]/15 bg-[radial-gradient(circle_at_30%_25%,#334155,transparent_35%),linear-gradient(135deg,#001d39,#2a1308)]" />

                <p className="mt-8 text-sm tracking-[0.4em] text-[#e5c185]">
                  PORTFOLIO 0{index + 1}
                </p>

                <h3 className="mt-5 text-3xl font-black">{item}</h3>

                <p className="mt-6 text-lg leading-relaxed text-[#b8afa3]">
                  A personal website generated from your resume, projects,
                  skills, and career goals.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-36 text-center">
        <Globe2 className="mx-auto mb-10 text-[#e5c185]" size={44} />

        <h2 className="mx-auto max-w-5xl text-5xl md:text-7xl font-black leading-[0.98] tracking-tight">
          The Story Has An Address.
          <br />
          Let It Travel.
        </h2>

        <p className="mt-8 text-xl text-[#b8afa3]">
          Start with your resume. Leave with a polished personal brand.
        </p>

        <button
          onClick={openUpload}
          className="mt-12 inline-flex items-center gap-4 rounded-full bg-[#e5c185] px-12 py-5 text-lg font-bold text-black shadow-[0_0_60px_rgba(229,193,133,0.25)] transition hover:scale-[1.03]"
        >
          Generate Portfolio
          <ArrowRight size={22} />
        </button>
      </section>

      {/* UPLOAD MODAL */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-6 backdrop-blur-xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-xl rounded-[2rem] border border-white/10 bg-[#0a0a0a] p-8 shadow-2xl"
            >
              <button
                onClick={() => setShowUploadModal(false)}
                className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:bg-white/10"
              >
                <X size={18} />
              </button>

              <div className="mb-8 text-center">
                <p className="mb-4 text-sm tracking-[0.4em] text-[#e5c185]">
                  BEGIN THE FORGE
                </p>

                <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                  Upload Your Resume
                </h2>

                <p className="mt-4 text-white/50">
                  The story is already there. Let’s give it an address.
                </p>
              </div>

              <label
                htmlFor="resume-upload"
                className="group flex cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-white/15 bg-white/[0.035] px-8 py-14 text-center transition hover:border-[#e5c185]/70 hover:bg-white/[0.05]"
              >
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e5c185] text-black transition group-hover:scale-105">
                  <Upload size={28} />
                </div>

                <h3 className="text-2xl font-bold">
                  {file ? file.name : "Choose Resume"}
                </h3>

                <p className="mt-3 text-sm text-white/40">
                  PDF, DOCX, or TXT supported
                </p>

                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </label>

              <div className="mt-8 flex gap-4">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 rounded-full border border-white/10 py-4 font-medium text-white/70 transition hover:bg-white/[0.05]"
                >
                  Cancel
                </button>

                <button
                  disabled={!file}
                  onClick={generatePortfolio}
                  className="flex-1 rounded-full bg-[#e5c185] py-4 font-bold text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Generate Portfolio →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}