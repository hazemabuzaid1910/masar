import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function AuthLayout({
  children,
}: Props) {
  return (
    <div className="flex min-h-screen bg-white">
      <div className="relative hidden flex-1 overflow-hidden bg-[#1A0B2E] lg:flex lg:flex-col lg:justify-between">
        {/* الخلفية */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="absolute inset-0 bg-linear-to-br from-[#4A148C]/70 via-[#8E24AA]/30 to-transparent" />

        <div className="relative z-10 flex items-center gap-3 px-12 pt-10">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
            <img
              src="/images/Untitled-1.png"
              alt=""
              className="h-6 w-6"
            />
          </div>

          <span className="font-mono text-sm uppercase tracking-[0.2em] text-[#CE93D8]">
            Control Center
          </span>
        </div>

        <div className="relative z-10 flex flex-1 flex-col justify-center gap-6 px-12">
          <h1 className="max-w-md text-4xl font-semibold text-white">
            Every system,
            <br />
            one clear view.
          </h1>

          <p className="max-w-sm text-sm text-white/60">
            Sign in to monitor activity, manage access, and respond to what
            matters in real time.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-px border-t border-white/10 bg-white/5 px-12 py-6">
          <Stat label="Uptime" value="99.98%" />
          <Stat label="Active nodes" value="128" />
          <Stat label="Open alerts" value="0" />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-12">
        {children}
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div>
      <div className="text-lg font-semibold text-white">
        {value}
      </div>

      <div className="text-[10px] uppercase tracking-wider text-white/40">
        {label}
      </div>
    </div>
  );
}