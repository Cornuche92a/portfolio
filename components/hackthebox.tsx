"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { useTranslations } from "next-intl";
import SectionHeading from "./section-heading";
import { FaLinux, FaWindows, FaApple, FaServer } from "react-icons/fa";
import { SiHackthebox } from "react-icons/si";
import { HiTrophy, HiChevronDown, HiChevronUp } from "react-icons/hi2";

const INITIAL_VISIBLE = 6;
const LOAD_STEP = 6;

type HtbMachine = {
  id: number;
  name: string;
  os: string;
  difficulty: string;
  stars: number;
  avatar: string;
  ownedUser: boolean;
  ownedRoot: boolean;
  ownedAt: string | null;
  points: number;
  release: string | null;
  synopsis: string | null;
};

type HtbResponse = {
  source: "htb" | "fallback";
  machines: HtbMachine[];
};

const difficultyGradient = (difficulty: string) => {
  const d = difficulty.toLowerCase();
  if (d.includes("easy")) return "from-emerald-400 via-emerald-500 to-green-700";
  if (d.includes("medium")) return "from-amber-400 via-orange-500 to-red-500";
  if (d.includes("hard")) return "from-rose-500 via-red-600 to-red-800";
  if (d.includes("insane")) return "from-fuchsia-500 via-purple-600 to-indigo-800";
  return "from-slate-400 via-slate-500 to-slate-700";
};

const difficultyAccentText = (difficulty: string) => {
  const d = difficulty.toLowerCase();
  if (d.includes("easy")) return "text-emerald-600 dark:text-emerald-300";
  if (d.includes("medium")) return "text-amber-600 dark:text-amber-300";
  if (d.includes("hard")) return "text-rose-600 dark:text-rose-300";
  if (d.includes("insane")) return "text-fuchsia-600 dark:text-fuchsia-300";
  return "text-slate-600 dark:text-slate-300";
};

const OsIcon = ({ os, className }: { os: string; className?: string }) => {
  const o = os.toLowerCase();
  if (o.includes("linux"))
    return <FaLinux aria-label="Linux" className={className} />;
  if (o.includes("windows"))
    return <FaWindows aria-label="Windows" className={className} />;
  if (o.includes("mac") || o.includes("osx") || o.includes("bsd"))
    return <FaApple aria-label="macOS / BSD" className={className} />;
  return <FaServer aria-label={os} className={className} />;
};

export default function HackTheBox() {
  const { ref } = useSectionInView("HackTheBox", 0.25);
  const t = useTranslations("HackTheBox");

  const [data, setData] = useState<HtbResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/htb");
        if (!res.ok) throw new Error(`status ${res.status}`);
        const json = (await res.json()) as HtbResponse;
        if (!cancelled) setData(json);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const machines = data?.machines ?? [];

  const descriptionFor = (machine: HtbMachine) => {
    if (t.has(`descriptions.${machine.name}`)) {
      const custom = t(`descriptions.${machine.name}`);
      if (typeof custom === "string" && custom.trim().length > 0) return custom;
    }
    if (machine.synopsis && machine.synopsis.trim().length > 0) {
      return machine.synopsis;
    }
    return t("defaultDescription", { name: machine.name });
  };

  const stats = useMemo(() => {
    const total = machines.length;
    const counts = { easy: 0, medium: 0, hard: 0, insane: 0 };
    for (const m of machines) {
      const d = m.difficulty.toLowerCase();
      if (d.includes("easy")) counts.easy++;
      else if (d.includes("medium")) counts.medium++;
      else if (d.includes("hard")) counts.hard++;
      else if (d.includes("insane")) counts.insane++;
    }
    return { total, ...counts };
  }, [machines]);

  return (
    <section
      id="hackthebox"
      ref={ref}
      className="mb-28 w-full max-w-[72rem] scroll-mt-28 sm:mb-40"
    >
      <SectionHeading>{t("title")}</SectionHeading>

      <motion.p
        className="mx-auto -mt-2 mb-6 max-w-[40rem] text-center text-gray-700 dark:text-white/70"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {t("desc")}
      </motion.p>

      <motion.div
        className="mx-auto mb-10 flex w-fit items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-sm font-medium text-emerald-700 backdrop-blur dark:text-emerald-300"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <SiHackthebox className="text-base" />
        <span>{t("badge")}</span>
      </motion.div>

      {machines.length > 0 && (
        <motion.div
          className="mx-auto mb-12 grid max-w-[42rem] grid-cols-2 gap-3 sm:grid-cols-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <StatTile
            label={t("stats.total")}
            value={stats.total}
            accent="from-sky-400 to-indigo-500"
          />
          <StatTile
            label="Easy"
            value={stats.easy}
            accent="from-emerald-400 to-green-600"
          />
          <StatTile
            label="Medium"
            value={stats.medium}
            accent="from-amber-400 to-orange-500"
          />
          <StatTile
            label="Hard"
            value={stats.hard}
            accent="from-rose-400 to-red-600"
          />
          <StatTile
            label="Insane"
            value={stats.insane}
            accent="from-fuchsia-500 to-purple-700"
          />
        </motion.div>
      )}

      {loading && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-[24rem] w-full animate-pulse rounded-2xl border border-black/5 bg-white/60 dark:border-white/5 dark:bg-white/5"
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <p className="text-center text-sm text-rose-500">{t("error")}</p>
      )}

      {!loading && !error && machines.length === 0 && (
        <p className="text-center text-sm text-gray-500 dark:text-white/60">
          {t("empty")}
        </p>
      )}

      {!loading && machines.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {machines.slice(0, visibleCount).map((machine) => (
              <MachineCard
                key={machine.id}
                machine={machine}
                description={descriptionFor(machine)}
                userLabel={t("userFlag")}
                rootLabel={t("rootFlag")}
              />
            ))}
          </div>

          {machines.length > INITIAL_VISIBLE && (
            <div className="mt-10 flex flex-col items-center gap-3">
              <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-white/50">
                {t("showingCount", {
                  shown: Math.min(visibleCount, machines.length),
                  total: machines.length,
                })}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                {visibleCount < machines.length && (
                  <button
                    type="button"
                    onClick={() =>
                      setVisibleCount((n) =>
                        Math.min(n + LOAD_STEP, machines.length)
                      )
                    }
                    className="group inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-5 py-2.5 text-sm font-medium text-gray-800 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-white/[0.06] dark:text-white/90 dark:hover:bg-white/[0.12]"
                  >
                    {t("showMore")}
                    <HiChevronDown className="transition group-hover:translate-y-0.5" />
                  </button>
                )}

                {visibleCount < machines.length && (
                  <button
                    type="button"
                    onClick={() => setVisibleCount(machines.length)}
                    className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-gray-950 hover:shadow-md dark:bg-white/10 dark:hover:bg-white/20"
                  >
                    {t("showAll")}
                  </button>
                )}

                {visibleCount > INITIAL_VISIBLE && (
                  <button
                    type="button"
                    onClick={() => {
                      setVisibleCount(INITIAL_VISIBLE);
                      document
                        .getElementById("hackthebox")
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="group inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-5 py-2.5 text-sm font-medium text-gray-700 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-white/70 dark:hover:bg-white/[0.1]"
                  >
                    <HiChevronUp className="transition group-hover:-translate-y-0.5" />
                    {t("showLess")}
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}

function MachineCard({
  machine,
  description,
  userLabel,
  rootLabel,
}: {
  machine: HtbMachine;
  description: string;
  userLabel: string;
  rootLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  const ownedDate =
    machine.ownedAt &&
    new Date(machine.ownedAt).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
      className="group h-full w-full"
    >
      <section className="bg-white/70 relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 shadow-sm backdrop-blur-md transition hover:bg-white/90 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]">
        <MachineVisual machine={machine} />

        <div className="flex flex-1 flex-col px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h3 className="min-w-0 break-words text-xl font-semibold sm:text-2xl">
              {machine.name}
            </h3>
            <span
              className={`shrink-0 rounded-full border border-current/20 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider ${difficultyAccentText(
                machine.difficulty
              )}`}
            >
              {machine.difficulty}
            </span>
          </div>

          <div className="mt-1 flex items-center gap-3 text-xs text-gray-500 dark:text-white/50">
            <span className="flex items-center gap-1">
              <OsIcon os={machine.os} />
              {machine.os}
            </span>
            {ownedDate && <span>{ownedDate}</span>}
          </div>

          <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-gray-700 dark:text-white/70">
            {description}
          </p>

          <ul className="mt-4 flex flex-wrap gap-2">
            <Pwn label={userLabel} owned={machine.ownedUser} />
            <Pwn label={rootLabel} owned={machine.ownedRoot} />
          </ul>
        </div>
      </section>
    </motion.div>
  );
}

function MachineVisual({ machine }: { machine: HtbMachine }) {
  const gradient = difficultyGradient(machine.difficulty);

  return (
    <div
      className="relative mx-4 mt-4 origin-bottom transition duration-300
        group-hover:-translate-y-1
        group-hover:scale-[1.03]
        group-hover:-rotate-1"
    >
      <div
        className={`relative h-44 overflow-hidden rounded-xl bg-gradient-to-br shadow-lg sm:h-48 ${gradient}`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <OsIcon
          os={machine.os}
          className="absolute -right-6 -bottom-8 text-[14rem] text-white/10"
        />

        <div className="absolute left-4 top-4 flex items-center gap-2 font-mono text-[0.7rem] text-white/70">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          <span className="h-2 w-2 rounded-full bg-yellow-300" />
          <span className="h-2 w-2 rounded-full bg-emerald-300" />
          <span className="ml-2 truncate select-none">
            root@htb:~/{machine.name.toLowerCase()}#
          </span>
        </div>

        <div className="absolute left-4 right-4 top-12 font-mono text-[0.65rem] leading-4 text-white/80">
          <p className="truncate">
            <span className="text-white/50">$</span> nmap -sC -sV{" "}
            {machine.name.toLowerCase()}.htb
          </p>
          <p className="truncate">
            <span className="text-white/50">$</span> exploit --target {machine.os}
          </p>
          <p className="truncate text-emerald-200">
            [+] {machine.ownedUser ? "user.txt" : "…"}{" "}
            {machine.ownedRoot ? "& root.txt captured" : ""}
          </p>
        </div>

        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/30 bg-white/10 text-white backdrop-blur-sm">
              {machine.avatar ? (
                <Image
                  src={machine.avatar}
                  alt={machine.name}
                  width={40}
                  height={40}
                  className="h-8 w-8 rounded object-cover"
                  unoptimized={machine.avatar.startsWith("http")}
                />
              ) : (
                <SiHackthebox className="text-xl" />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-[0.6rem] uppercase tracking-wider text-white/60">
                HackTheBox
              </p>
              <p className="truncate text-sm font-semibold text-white">
                {machine.name}
              </p>
            </div>
          </div>

          {machine.ownedUser && machine.ownedRoot && (
            <div className="flex shrink-0 items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[0.65rem] font-semibold text-white backdrop-blur-sm">
              <HiTrophy className="text-yellow-200" />
              Pwned
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatTile({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-black/5 bg-white/70 p-3 text-center backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04]">
      <div
        className={`mx-auto mb-1 inline-block bg-gradient-to-r ${accent} bg-clip-text text-2xl font-bold text-transparent`}
      >
        {value}
      </div>
      <div className="text-[0.7rem] uppercase tracking-wider text-gray-500 dark:text-white/50">
        {label}
      </div>
    </div>
  );
}

function Pwn({ label, owned }: { label: string; owned: boolean }) {
  return (
    <li
      className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[0.7rem] font-semibold uppercase tracking-wider ${
        owned
          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300"
          : "bg-gray-200/60 text-gray-400 dark:bg-white/5 dark:text-white/30"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          owned ? "bg-emerald-500" : "bg-gray-400 dark:bg-white/30"
        }`}
      />
      {label}
    </li>
  );
}
