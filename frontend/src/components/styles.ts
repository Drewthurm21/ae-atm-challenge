import { twMerge } from 'tailwind-merge';

export const standardFormClasses = twMerge(
  "flex flex-col h-[50vh] w-[65vw] rounded-md items-center justify-center",
  "shadow-xl border-2 border-slate-700 bg-gradient-to-br from-violet-100 to-indigo-300"
);

export const standardInputClasses = twMerge(
  "w-full md:w-96 md:h-12 px-3 py-2 rounded-md text-center text-16 bold bg-white",
  "border border-slate-700 ring-2 ring-transparent placeholder-slate-500",
  "transition-shadow focus:border-0 focus:outline-0 focus:ring-primary-200 focus:ring-1 focus:ring-offset-1"
);

export const standardButtonClasses = twMerge(
  "w-64 h-12 rounded-md px-4 py-2 text-lg text-zinc-50",
  "bg-gradient-to-tl from-primary-100 to-primary-200",
  "ring-1 ring-indigo-200/50",
  "transition-all hover:scale-[1.03] hover:ring-2 active:scale-[.98] "
);