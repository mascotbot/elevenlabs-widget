"use client";

import { MascotProvider } from "@mascotbot-sdk/react";

export default function WidgetTemplate({ children }: React.PropsWithChildren) {
  return (
    <MascotProvider>
      <main className="flex h-screen flex-col overflow-hidden">{children}</main>
    </MascotProvider>
  );
}
