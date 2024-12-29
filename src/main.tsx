import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ModeToggle } from "./components/ui/mode-toggle.tsx";
import { ThemeProvider } from "@/components/ui/theme-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModeToggle></ModeToggle>
      <App />
    </ThemeProvider>
  </StrictMode>
);
