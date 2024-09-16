import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app.tsx";
import "./index.css";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Toaster } from "sonner";

export const queryClient =
  new QueryClient();

createRoot(
  document.getElementById("root")!
).render(
  <StrictMode>
    <QueryClientProvider
      client={queryClient}
    >
      <App />
      <Toaster
        position="bottom-left"
        richColors
      />
    </QueryClientProvider>
  </StrictMode>
);
