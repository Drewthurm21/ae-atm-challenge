import { twMerge } from 'tailwind-merge';

export const standardFormClasses = twMerge(
  "flex flex-col h-[50vh] w-[65vw] rounded-md items-center justify-center",
  "border-2 border-slate-900 bg-gradient-to-br from-violet-100 to-indigo-300/90"
);

export const standardInputClasses = twMerge(
  "w-full md:w-96 md:h-12 px-3 py-2 rounded-md text-center text-lg bold bg-white",
  "border border-slate-700 ring-2 ring-transparent placeholder-slate-500",
  "transition-shadow focus:border-0 focus:outline-0 focus:ring-primary-200 focus:ring-1 focus:ring-offset-1"
);

export const standardButtonClasses = twMerge(
  "w-64 h-12 rounded-md px-4 py-2 text-lg text-zinc-50",
  "bg-gradient-to-tl from-primary-100 to-primary-200",
  "ring-1 ring-indigo-200/50 shadow-lg",
  "transition-all hover:scale-[1.02] hover:shadow-xl hover:ring-2 active:scale-[0.98] "
);

export const confirmBtnClasses = twMerge(
  "shadow-md ring-1 ring-black bg-white text-center text-primary-100 w-1/3 py-2 rounded",
  "transition-all hover:text-black hover:scale-[1.02] hover:shadow-lg hover:underline hover:-translate-y-1",
  "active:scale-[0.98] active:ring-1 acrive:ring-white active:shadow-none duration-200",
)

export const cancelBtnClasses = twMerge(
  "shadow-md ring-1 ring-black bg-white text-center text-primary-100 w-1/3 py-2 rounded",
  "transition-all hover:bg-white/90 hover:scale-[1.02] hover:shadow-lg hover:ring-red",
  "active:scale-[0.98] active:y-2 active:font-bold active:ring-0 active:shadow-none duration-200",
)