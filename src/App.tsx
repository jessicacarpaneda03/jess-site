import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import GuiaConversaoWhatsapp from "./pages/GuiaConversaoWhatsapp.tsx";
import NotFound from "./pages/NotFound.tsx";
import Login from "./pages/Login.tsx";
import OAuthConsent from "./pages/OAuthConsent.tsx";
import ValidacaoMcp from "./pages/ValidacaoMcp.tsx";
import AuditoriaTemplates from "./pages/AuditoriaTemplates.tsx";
import WhatsappApp from "./pages/WhatsappApp.tsx";
import Tema from "./pages/Tema.tsx";
import Temas from "./pages/Temas.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/guia-conversao-whatsapp" element={<GuiaConversaoWhatsapp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/.lovable/oauth/consent" element={<OAuthConsent />} />
          <Route path="/validacao-mcp" element={<ValidacaoMcp />} />
          <Route path="/auditoria-templates" element={<AuditoriaTemplates />} />
          <Route path="/whatsapp" element={<WhatsappApp />} />
          <Route path="/temas" element={<Temas />} />
          <Route path="/tema/:slug" element={<Tema />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
