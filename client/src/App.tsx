import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import { QuizProvider } from "./contexts/QuizContext";
import Quiz from "./pages/Quiz";
import Admin from "./pages/Admin";
import NotFound from "./pages/not-found";
import Home from "./pages/Home";
import Contribution from "./pages/Contribution";



function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/quiz/:id" component={Quiz} />
      <Route path="/admin" component={Admin} />
      <Route path="/contributions" component={Contribution} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <QuizProvider>
            <Toaster />
            <Router />
          </QuizProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
