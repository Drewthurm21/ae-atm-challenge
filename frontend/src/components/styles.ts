import { twMerge } from 'tailwind-merge';

export const standardFormClasses = twMerge(
  "flex flex-col h-[50vh] w-[65vw] rounded-md items-center justify-center",
  "shadow-xl border-2 border-slate-700 bg-gradient-to-br from-primary-100 to-primary-200"
);

export const standardInputClasses = twMerge(
  "w-full md:w-96 md:h-12 px-3 py-2 rounded-md text-center text-16 bg-white",
  "border border-slate-700 ring-2 ring-transparent placeholder-slate-500",
  "transition-shadow focus:border-0 focus:outline-0 focus:ring-accent focus:ring-1 focus:ring-offset-1"
);

export const standardButtonClasses = twMerge(
  "rounded-md px-4 py-2 text-lg text-zinc-50",
  "bg-gradient-to-br from-blue-400 to-blue-700",
  "ring-2 ring-blue-500/50 ring-offset-2 ring-offset-slate-950",
  "transition-all hover:scale-[1.02] hover:ring-2 active:scale-[0.98] active:ring-blue-500/70"
);