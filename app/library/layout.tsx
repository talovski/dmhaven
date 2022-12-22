import React from "react";
import Sidebar from "../../ui/Sidebar";

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <aside>
        <Sidebar />
      </aside>
      <main className="ml-72 font-dmserif">{children}</main>
    </div>
  );
}
