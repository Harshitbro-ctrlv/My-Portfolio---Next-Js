"use client";

import type { HTMLAttributes, PointerEvent, ReactNode } from "react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type TiltCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  maxTilt?: number;
};

export function TiltCard({ children, className, maxTilt = 7, ...props }: TiltCardProps) {
  const frame = useRef(0);

  const updateTilt = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const element = event.currentTarget;
    const { left, top, width, height } = element.getBoundingClientRect();
    const x = (event.clientX - left) / width;
    const y = (event.clientY - top) / height;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      element.style.setProperty("--tilt-x", `${(0.5 - y) * maxTilt}deg`);
      element.style.setProperty("--tilt-y", `${(x - 0.5) * maxTilt}deg`);
      element.style.setProperty("--spot-x", `${x * 100}%`);
      element.style.setProperty("--spot-y", `${y * 100}%`);
    });
  };

  const resetTilt = (event: PointerEvent<HTMLDivElement>) => {
    cancelAnimationFrame(frame.current);
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <div
      {...props}
      className={cn("tilt-surface group relative h-full", className)}
      onPointerMove={updateTilt}
      onPointerLeave={resetTilt}
    >
      <div aria-hidden className="tilt-reflection" />
      <div className="tilt-content relative z-10 h-full">{children}</div>
    </div>
  );
}
