/* eslint-disable react-refresh/only-export-components */
import { use, createContext, useContext } from "react";
import { ctaPromise } from "@/lib/queries";
import type { CTALabels } from "@/lib/notion";

const CTALabelsContext = createContext<CTALabels | undefined>(undefined);

export function CTALabelsProvider({ children }: { children: React.ReactNode }) {
  const labels = use(ctaPromise);

  return (
    <CTALabelsContext.Provider value={labels}>
      {children}
    </CTALabelsContext.Provider>
  );
}

// Custom hook — throws if used outside the provider
export function useCTALabels() {
  const ctx = useContext(CTALabelsContext);
  if (ctx === undefined)
    throw new Error("useCTALabels must be used inside <CTALabelsProvider>");
  return ctx;
}
