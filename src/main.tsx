import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CTALabelsProvider } from "@/context/CtaContext.tsx";
import LandingPageSkeleton from "./components/LandingPageSkeleton.tsx";
import posthog from "posthog-js";
import { PostHogProvider } from "@posthog/react";

function posthogInit() {
  if (import.meta.env.VITE_ENV === "PROD") {
    console.log("");
    posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_TOKEN, {
      api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
      defaults: "2026-01-30",
    });
  }
}

posthogInit();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PostHogProvider client={posthog}>
      <Suspense
        fallback={
          <div className="w-screen h-screen">
            <LandingPageSkeleton />
          </div>
        }
      >
        <CTALabelsProvider>
          <App />
        </CTALabelsProvider>
      </Suspense>
    </PostHogProvider>
  </StrictMode>,
);
