"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Code2, GraduationCap, Mail, Search, User } from "lucide-react";
import { navItems } from "@/lib/profile";

const icons = [User, Code2, Briefcase, GraduationCap, Mail];

export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[95] bg-black/55 p-4 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onOpenChange(false)}
        >
          <motion.div
            className="mx-auto mt-12 sm:mt-24 max-w-xl overflow-hidden rounded-lg border border-subtle bg-base-200 shadow-soft"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-subtle px-4 py-3 text-muted">
              <Search size={18} />
              <span className="text-sm">Jump to a section</span>
            </div>
            <div className="p-2">
              {navItems.map((item, index) => {
                const Icon = icons[index] ?? Search;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => onOpenChange(false)}
                    className="flex items-center gap-3 rounded-md px-3 py-3 text-sm text-muted-3 transition hover:bg-subtle hover:text-base-content"
                  >
                    <Icon size={17} className="text-primary" />
                    {item.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
