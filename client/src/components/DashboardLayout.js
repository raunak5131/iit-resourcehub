import { Link, Outlet } from "react-router-dom";
import AvatarMenu from "../components/AvatarMenu"; // ⬅️ Import this

const sidebarLinks = [
  { path: "/dashboard/clubs", label: "Clubs" },
  { path: "/dashboard/resources", label: "Resources" },
  { path: "/dashboard/qa", label: "Q&A" },
  { path: "/dashboard/lostfound", label: "Lost & Found" },
  { path: "/dashboard/bookmarks", label: "Bookmarks" },
  { path: "/dashboard/planner", label: "Planner" },
];

export default function DashboardLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-4 space-y-4">
        <h2 className="text-2xl font-bold mb-6">IIT ResourceHub</h2>
        {sidebarLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="hover:bg-gray-700 px-3 py-2 rounded"
          >
            {link.label}
          </Link>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-4 overflow-y-auto">
        {/* Header with avatar */}
        <div className="flex justify-end mb-4">
          <AvatarMenu />
        </div>

        {/* Actual Page Content */}
        <Outlet />
      </main>
    </div>
  );
}
