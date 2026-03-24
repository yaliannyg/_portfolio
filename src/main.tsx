import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CTALabelsProvider } from "@/context/ctaContext.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CTALabelsProvider>
      <App />
    </CTALabelsProvider>
  </StrictMode>,
);
