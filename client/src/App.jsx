import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profiles from "./pages/Profile";
import ProfileDetail from "./pages/ProfileData";
import NotFound from "./pages/NotFound";



const App = () => (

    <TooltipProvider>
     
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Profiles />} />
          <Route path="/profile/:id" element={<ProfileDetail />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
);

export default App;
