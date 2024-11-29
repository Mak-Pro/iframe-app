"use client";
import { useScreenSize } from "@/hooks";
import { cssVariables } from "@/assets/styles/variables";

export function Spacer({
  desktop = 10,
  mobile = 10,
}: {
  desktop?: number;
  mobile?: number;
}) {
  const window = useScreenSize();
  const space =
    window.width > parseFloat(cssVariables.width1199) ? desktop : mobile;

  return <div style={{ padding: `${space / 2}px 0` }}></div>;
}
