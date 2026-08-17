import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import CapabilityProcess from "./pages/CapabilityProcess";
import Principles from "./pages/Principles";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import CapabilitiesRedirect from "./pages/CapabilitiesRedirect";
import About from "./pages/About";
import Solutions from "./pages/Solutions";
import Security from "./pages/Security";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/capability"} component={CapabilityProcess} />
      <Route path={"/capabilities"} component={CapabilitiesRedirect} />
      <Route path={"/principles"} component={Principles} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/privacy"} component={Privacy} />
      <Route path={"/about"} component={About} />
      <Route path={"/solutions"} component={Solutions} />
      <Route path={"/security"} component={Security} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
