import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CTALabelsProvider } from "@/context/CtaContext.tsx";
import LandingPageSkeleton from "./components/LandingPageSkeleton.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense
      fallback={
        <div className="bg-primary w-screen h-screen">
          <LandingPageSkeleton />
        </div>
      }
    >
      <CTALabelsProvider>
        <App />
      </CTALabelsProvider>
    </Suspense>
  </StrictMode>,
);
