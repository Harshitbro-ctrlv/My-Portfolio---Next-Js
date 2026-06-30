import type { LucideIcon } from "lucide-react";

export type LinkItem = {
  label: string;
  href: string;
};

export type StatItem = {
  label: string;
  value: number;
  suffix?: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type TimelineItem = {
  title: string;
  organization: string;
  period: string;
  description: string;
  tags?: string[];
};

export type Project = {
  title: string;
  description: string;
  image: string;
  video?: string;
  technologies: string[];
  github?: string;
  demo?: string;
};

export type Certification = {
  title: string;
  issuer: string;
  period: string;
  url?: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type CommandItem = {
  label: string;
  href: string;
  icon?: LucideIcon;
};
