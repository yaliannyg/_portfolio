/* eslint-disable react-refresh/only-export-components */
import { getCTALabels, type CTALabels } from "@/lib/notion";
import { createContext, useContext, useState, useEffect } from "react";

const CTALabelsContext = createContext<CTALabels | null | undefined>(undefined);

export function CTALabelsProvider({ children }: { children: React.ReactNode }) {
  const [labels, setLabels] = useState<CTALabels | null>(null);

  useEffect(() => {
    const fetchCTAs = async () => {
      const _ctas = await getCTALabels();
      setLabels(_ctas);
    };
    fetchCTAs();
  }, []);

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
