import React from "react";
import Sidebar from "../../ui/Sidebar";

export default function LibraryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <aside>
        <Sidebar />
      </aside>
      <main className="mt-12 max-w-prose px-4 font-dmserif lg:ml-72">{children}</main>
    </div>
  );
}
