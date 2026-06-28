"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowTopRightOnSquareIcon, FireIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { BoltIcon, TrophyIcon, CalendarDaysIcon } from "@heroicons/react/24/solid";
import { leetcodeStats as defaultStats } from "@/lib/profile";
import { SectionHeading } from "@/components/ui/motion";

interface LeetcodeStats {
  username: string;
  profileUrl: string;
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
  totalEasy: number;
  totalMedium: number;
  totalHard: number;
  activeDays: number;
  maxStreak: number;
  rank: string;
  recentProblems: string[];
}

export function LeetCode() {
  const [leetcodeStats, setLeetcodeStats] = useState<LeetcodeStats>(defaultStats);

  useEffect(() => {
    let isMounted = true;

    async function fetchLeetcodeData() {
      try {
        const response = await fetch("/api/leetcode?username=mish123_harshit", {
          cache: "no-store"
        });
        if (response.ok) {
          const data = await response.json();
          if (isMounted) {
            setLeetcodeStats(data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch LeetCode stats:", error);
        // Keep using default stats if fetch fails
      }
    }

    fetchLeetcodeData();
    const intervalId = window.setInterval(fetchLeetcodeData, 10 * 60 * 1000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, []);

  const easyPct = Math.round((leetcodeStats.easy / leetcodeStats.totalEasy) * 100);
  const mediumPct = Math.round((leetcodeStats.medium / leetcodeStats.totalMedium) * 100);
  const hardPct = Math.round((leetcodeStats.hard / leetcodeStats.totalHard) * 100);

  return (
    <section id="leetcode" className="py-24 section-alt">
      <div className="section-shell">
        <SectionHeading eyebrow="LeetCode" title="Building algorithmic thinking, one problem at a time." />
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="glass rounded-[2rem] p-7 flex flex-col gap-6 shadow-soft border border-primary/10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.32em] text-primary/80 mb-1">@{leetcodeStats.username}</p>
                <h3 className="text-2xl font-semibold text-base-content">LeetCode Profile</h3>
                <p className="text-sm text-muted mt-1">Global Rank #{leetcodeStats.rank}</p>
              </div>
              <a href={leetcodeStats.profileUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary gap-2">
                <ArrowTopRightOnSquareIcon className="h-4 w-4" /> View Profile
              </a>
            </div>

            <div className="grid gap-6 lg:grid-cols-[140px_1fr]">
              <div className="relative flex h-32 w-32 items-center justify-center rounded-[1.75rem] bg-base-200 shadow-soft">
                <svg viewBox="0 0 100 100" className="h-28 w-28 -rotate-90 text-primary opacity-70">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="opacity-10" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - Math.min(1, leetcodeStats.totalSolved / 500))}`}
                    className="text-primary transition-all duration-1000" />
                </svg>
                <div className="absolute text-center">
                  <p className="text-2xl font-bold text-primary">{leetcodeStats.totalSolved}</p>
                  <p className="text-[10px] text-muted">Solved</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Easy", solved: leetcodeStats.easy, total: leetcodeStats.totalEasy, pct: easyPct, color: "bg-emerald-500", text: "text-emerald-500" },
                  { label: "Medium", solved: leetcodeStats.medium, total: leetcodeStats.totalMedium, pct: mediumPct, color: "bg-amber-400", text: "text-amber-400" },
                  { label: "Hard", solved: leetcodeStats.hard, total: leetcodeStats.totalHard, pct: hardPct, color: "bg-rose-500", text: "text-rose-500" }
                ].map((d) => (
                  <div key={d.label} className="space-y-2">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted font-medium">
                      <span className={d.text}>{d.label}</span>
                      <span>{d.solved} / {d.total}</span>
                    </div>
                    <div className="h-2 rounded-full bg-base-300 overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${d.pct}%` }}
                        viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}
                        className={`h-full rounded-full ${d.color}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: <FireIcon className="h-4 w-4 text-orange-400" />, label: "Max Streak", value: `${leetcodeStats.maxStreak} days` },
                { icon: <CalendarDaysIcon className="h-4 w-4 text-primary" />, label: "Active Days", value: `${leetcodeStats.activeDays}` },
                { icon: <TrophyIcon className="h-4 w-4 text-amber-400" />, label: "Global Rank", value: `#${leetcodeStats.rank}` }
              ].map((chip) => (
                <div key={chip.label} className="rounded-lg border-subtle bg-subtle p-3 text-center border">
                  <div className="flex justify-center mb-1">{chip.icon}</div>
                  <p className="text-sm font-semibold text-base-content">{chip.value}</p>
                  <p className="text-[10px] text-muted-2 mt-0.5">{chip.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="flex flex-col gap-5">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="glass rounded-[2rem] p-6 shadow-soft border border-primary/10">
              <div className="flex items-center gap-2 mb-4">
                <BoltIcon className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-base-content">Recent Submissions</h3>
              </div>
              <ul className="space-y-3">
                {leetcodeStats.recentProblems.map((problem, i) => (
                  <li key={problem} className="flex items-center gap-3 text-sm">
                    <span className="font-mono text-[10px] text-primary/70 w-5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-muted-3 flex-1 text-xs leading-5">{problem}</span>
                    <CheckCircleIcon className="h-4 w-4 text-emerald-500 shrink-0" />
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
              className="glass rounded-[2rem] p-6 flex-1 shadow-soft border border-primary/10">
              <h3 className="font-semibold mb-3 text-base-content">Focus Areas</h3>
              <div className="flex flex-wrap gap-2">
                {["Strings", "Arrays", "Two Pointers", "Sliding Window", "Stack", "Palindrome", "Hashing", "C++", "Python"].map((tag) => (
                  <span key={tag} className="rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs text-primary font-medium">{tag}</span>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted leading-6">
                Practicing DSA to strengthen problem-solving for technical interviews and competitive programming.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
