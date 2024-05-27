import { ReactNode } from "react";

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-zinc-900 text-zinc-50 p-4">
        <h1 className="text-xl font-bold">Banking App</h1>
      </nav>
      <header className="p-4">
        <h2 className="text-2xl font-bold">Welcome to the Banking App</h2>
      </header>
      <main className="p-8 fixed inset-0 grid place-items-center overflow-y-scroll cursor-pointer">
        {children}
      </main>
    </div>
  );
}
