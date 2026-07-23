"use client";

import { FloatingPathsBackground } from "@/components/ui/floating-paths";

// Заполняет пустые поля по бокам на широких экранах узором из линий.
// Ширина строго ограничена зазором за пределами max-w-container (1360px) —
// физически не может наложиться на контент, поэтому не требует возни с z-index.
const GUTTER_WIDTH = "max(0px, calc((100vw - 1360px) / 2))";

export function SideGutterPaths() {
  return (
    <div className="pointer-events-none fixed inset-y-0 left-0 right-0 z-0 hidden 2xl:block" aria-hidden>
      <div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: GUTTER_WIDTH }}
      >
        <FloatingPathsBackground pathCount={10} />
      </div>
      <div
        className="absolute inset-y-0 right-0 overflow-hidden"
        style={{ width: GUTTER_WIDTH }}
      >
        <FloatingPathsBackground pathCount={10} />
      </div>
    </div>
  );
}
