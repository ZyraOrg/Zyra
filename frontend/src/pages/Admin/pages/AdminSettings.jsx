import { useState } from "react";
import { Save, Shield, Bell, Database, CreditCard } from "lucide-react";
import toast from "react-hot-toast";

function Toggle({ on, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="relative inline-flex w-10 h-6 transition-colors duration-200 rounded-full shrink-0"
      style={{ background: on ? "#0ea5e9" : "#374151" }}
    >
      <span
        className="absolute w-4 h-4 transition-all duration-200 bg-white rounded-full shadow top-1"
        style={{ left: on ? "22px" : "2px" }}
      />
    </button>
  );
}

function SettingRow({ label, description, children }) {
  return (
    <div className="flex items-center justify-between p-4 md:p-5 bg-[#010410] rounded-sm gap-4 flex-wrap">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white">{label}</p>
        {description && <p className="text-gray-400 text-xs mt-0.5">{description}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

export default function AdminSettings() {
  const [fee,         setFee]         = useState("3");
  const [autoApprove, setAutoApprove] = useState(true);
  const [maintenance, setMaintenance] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [fraudAlerts, setFraudAlerts] = useState(true);
  const [dailyReport, setDailyReport] = useState(false);
  const [backupAuto,  setBackupAuto]  = useState(true);

  function handleSave() {
    toast.success("Settings saved successfully");
  }

  return (
    <div className="max-w-3xl space-y-6">

      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">
          Admin <span className="text-secondary">Settings</span>
        </h1>
        <p className="mt-1 text-sm text-gray-400">Platform-wide configuration and controls</p>
      </div>

      {/* Platform */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <CreditCard size={15} className="text-secondary" />
          <h2 className="text-xs font-semibold tracking-widest text-gray-400 uppercase">Platform</h2>
        </div>
        <div className="space-y-1">
          <SettingRow label="Platform Fee" description="Percentage collected from each donation">
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                min="0" max="10"
                className="w-16 bg-[#13131A] text-white text-sm px-3 py-1.5 rounded-lg border border-gray-700 focus:outline-none focus:border-secondary text-center"
              />
              <span className="text-sm text-gray-400">%</span>
            </div>
          </SettingRow>
          <SettingRow label="Auto-approve Campaigns" description="Campaigns under $500 are automatically approved">
            <Toggle on={autoApprove} onToggle={() => setAutoApprove((v) => !v)} />
          </SettingRow>
          <SettingRow label="Maintenance Mode" description="Disable public access — only admins can log in">
            <Toggle on={maintenance} onToggle={() => setMaintenance((v) => !v)} />
          </SettingRow>
        </div>
      </section>

      {/* Notifications */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Bell size={15} className="text-secondary" />
          <h2 className="text-xs font-semibold tracking-widest text-gray-400 uppercase">Notifications</h2>
        </div>
        <div className="space-y-1">
          <SettingRow label="Email Alerts" description="Receive email on new campaign submissions">
            <Toggle on={emailAlerts} onToggle={() => setEmailAlerts((v) => !v)} />
          </SettingRow>
          <SettingRow label="Fraud Alerts" description="Immediate notification on suspicious activity">
            <Toggle on={fraudAlerts} onToggle={() => setFraudAlerts((v) => !v)} />
          </SettingRow>
          <SettingRow label="Daily Report" description="Receive platform summary every morning at 8am">
            <Toggle on={dailyReport} onToggle={() => setDailyReport((v) => !v)} />
          </SettingRow>
        </div>
      </section>

      {/* Security */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Shield size={15} className="text-secondary" />
          <h2 className="text-xs font-semibold tracking-widest text-gray-400 uppercase">Security</h2>
        </div>
        <div className="space-y-1">
          <SettingRow label="Two-Factor Auth" description="Require 2FA for all admin accounts">
            <Toggle on={true} onToggle={() => {}} />
          </SettingRow>
          <SettingRow label="Session Timeout" description="Auto-logout after inactivity">
            <select className="bg-[#13131A] text-white text-sm px-3 py-1.5 rounded-lg border border-gray-700 focus:outline-none focus:border-secondary">
              <option>30 minutes</option>
              <option>1 hour</option>
              <option>4 hours</option>
              <option>8 hours</option>
            </select>
          </SettingRow>
        </div>
      </section>

      {/* Data */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Database size={15} className="text-secondary" />
          <h2 className="text-xs font-semibold tracking-widest text-gray-400 uppercase">Data</h2>
        </div>
        <div className="space-y-1">
          <SettingRow label="Auto Backup" description="Daily database backup at midnight">
            <Toggle on={backupAuto} onToggle={() => setBackupAuto((v) => !v)} />
          </SettingRow>
          <SettingRow label="Export Data" description="Download full platform data as CSV">
            <button className="px-4 py-1.5 text-sm border border-gray-700 rounded-lg text-gray-400 hover:text-white hover:border-secondary transition-colors">
              Export CSV
            </button>
          </SettingRow>
        </div>
      </section>

      {/* Save */}
      <div className="flex justify-center pt-2 pb-8">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-10 py-[1px] bg-gradient-to-r from-primary to-secondary text-black rounded-sm font-semibold hover:opacity-90 transition-opacity text-sm border-2 border-white hover:border-secondary"
        >
          <Save size={15} />
          Save Changes
        </button>
      </div>

    </div>
  );
}