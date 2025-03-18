
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TrainSearch from "./pages/TrainSearch";
import TrainListing from "./pages/TrainListing";
import TrainDetails from "./pages/TrainDetails";
import Booking from "./pages/Booking";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import PnrStatus from "./pages/PnrStatus";
import TrainSchedules from "./pages/TrainSchedules";
import TicketManagement from "./pages/TicketManagement";
import SeatAvailability from "./pages/SeatAvailability";
import Notifications from "./pages/Notifications";
import TravelHistory from "./pages/TravelHistory";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/train-search" element={<TrainSearch />} />
          <Route path="/train-listing" element={<TrainListing />} />
          <Route path="/train-details/:id" element={<TrainDetails />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/pnr-status" element={<PnrStatus />} />
          <Route path="/train-schedules" element={<TrainSchedules />} />
          <Route path="/ticket-management" element={<TicketManagement />} />
          <Route path="/seat-availability" element={<SeatAvailability />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/travel-history" element={<TravelHistory />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
