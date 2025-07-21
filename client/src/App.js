import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Dashboard/Home";
import DashboardLayout from "./components/DashboardLayout";
import ClubDetails from "./pages/Dashboard/ClubDetails";
import Clubs from "./pages/Dashboard/Clubs";
import Resources from "./pages/Dashboard/Resources";
import QA from "./pages/Dashboard/QA";
import LostFound from "./pages/Dashboard/LostFound";
import Bookmarks from "./pages/Dashboard/Bookmarks";
import Planner from "./pages/Dashboard/Planner";
import UserList from './components/UserList';
import EventList from "./components/EventList";
import AddEvent from "./components/AddEvent";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/add-event" element={<AddEvent />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="clubs" element={<Clubs />} />
          <Route path="clubs/:id" element={<ClubDetails />} />
          <Route path="resources" element={<Resources />} />
          <Route path="qa" element={<QA />} />
          <Route path="lostfound" element={<LostFound />} />
          <Route path="bookmarks" element={<Bookmarks />} />
          <Route path="planner" element={<Planner />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
