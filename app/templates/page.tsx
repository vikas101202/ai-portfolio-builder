"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Sparkles,
  LayoutPanelLeft,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
const templates = [
  {
    id: "developer",
    title: "Developer",
    subtitle: "Built for Engineers",
    icon: Code2,
    description:
      "A technical portfolio focused on projects, skills, GitHub and engineering experience.",
    gradient:
      "from-[#001d39] via-[#071a2f] to-[#050505]",
  },
  {
    id: "minimal",
    title: "Minimal",
    subtitle: "Elegant & Professional",
    icon: LayoutPanelLeft,
    description:
      "A clean Apple-inspired layout that lets your experience speak for itself.",
    gradient:
      "from-[#222222] via-[#141414] to-[#050505]",
  },
  {
    id: "creative",
    title: "Creative",
    subtitle: "Bold & Modern",
    icon: Sparkles,
    description:
      "A visual portfolio with striking sections, perfect for designers and creators.",
    gradient:
      "from-[#2a1308] via-[#1b1010] to-[#050505]",
  },
];

export default function TemplatesPage() {
  const router = useRouter();

  const chooseTemplate = (template: string) => {
    localStorage.setItem("folioforge-template", template);
    router.push("/preview");
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-hidden">
      <section className="relative px-6 py-24">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#001d39_0%,transparent_35%),radial-gradient(circle_at_bottom_right,#2a1308_0%,transparent_30%)] opacity-70" />

        <div className="relative z-10 mx-auto max-w-7xl">

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 text-center text-sm tracking-[0.45em] text-[#e5c185]"
          >
            CHOOSE YOUR STYLE
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-5xl md:text-7xl font-black leading-[0.95]"
          >
            One Resume.
            <br />

            <span className="text-[#777268]">
              Three Different Stories.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .15 }}
            className="mx-auto mt-8 max-w-3xl text-center text-xl text-white/55 leading-relaxed"
          >
            The information stays exactly the same.
            <br />
            Only the presentation changes.
          </motion.p>

          <div className="mt-20 grid gap-8 lg:grid-cols-3">

            {templates.map((template, index) => {

              const Icon = template.icon;

              return (

                <motion.button
                  key={template.id}
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * .15 }}
                  onClick={() => chooseTemplate(template.id)}
                  className="group text-left rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/[0.035] hover:border-[#e5c185]/40 transition-all duration-300 hover:-translate-y-2"
                >

                  <div
                    className={`h-64 bg-gradient-to-br ${template.gradient} p-8 flex flex-col justify-between`}
                  >

                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-black">

                      <Icon size={30} />

                    </div>

                    <div>

                      <p className="text-sm tracking-[0.35em] uppercase text-[#e5c185]">

                        {template.subtitle}

                      </p>

                      <h2 className="mt-3 text-4xl font-black">

                        {template.title}

                      </h2>

                    </div>

                  </div>

                  <div className="p-8">

                    <p className="leading-relaxed text-white/60">

                      {template.description}

                    </p>

                    <div className="mt-10 inline-flex items-center gap-3 font-semibold text-[#e5c185]">

                      Use this template

                      <ArrowRight
                        size={18}
                        className="transition group-hover:translate-x-2"
                      />

                    </div>

                  </div>

                </motion.button>

              );

            })}

          </div>

        </div>

      </section>
    </main>
  );
}