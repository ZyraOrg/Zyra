import AdminStatsCards from "./components/dashboard/AdminStatsCards";
import UsersTable from "./components/dashboard/UsersTable";
import CampaignModeration from "./components/dashboard/CampaignModeration";

export default function AdminHome() {
  return (
    <div className="space-y-6">

      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">
          Hi, Welcome <span className="text-secondary">Admin</span>
        </h1>
        <p className="mt-1 text-sm text-gray-400">
          Platform overview and management
        </p>
      </div>

      {/* Stats */}
      <AdminStatsCards />

      {/* Two column tables */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <UsersTable />
        <CampaignModeration />
      </div>

    </div>
  );
}