import { useEffect, useState } from "react";
import { Save, Shield, Bell, Database, CreditCard } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { adminApi } from "../../../services/api";

// Maps the platform_settings row (snake_case columns) <-> the form state.
const DEFAULTS = {
  platform_fee: "3",
  auto_approve: true,
  maintenance_mode: false,
  email_alerts: true,
  fraud_alerts: true,
  daily_report: false,
  two_factor: true,
  session_timeout: "30 minutes",
  auto_backup: true,
};

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
  const [form, setForm] = useState(DEFAULTS);

  const { data } = useQuery({
    queryKey: ["admin-settings"],
    queryFn: () => adminApi.getSettings().then((r) => r.data),
  });

  // Hydrate the form once settings arrive, keeping defaults for missing keys.
  useEffect(() => {
    if (data?.settings) {
      setForm((prev) => ({ ...prev, ...DEFAULTS, ...data.settings }));
    }
  }, [data]);

  const set = (key) => (value) => setForm((prev) => ({ ...prev, [key]: value }));
  const toggle = (key) => () => setForm((prev) => ({ ...prev, [key]: !prev[key] }));

  const save = useMutation({
    mutationFn: () => adminApi.updateSettings(form),
    onSuccess: () => toast.success("Settings saved successfully"),
    onError: (err) => toast.error(err.message || "Failed to save settings"),
  });

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
                value={form.platform_fee}
                onChange={(e) => set("platform_fee")(e.target.value)}
                min="0" max="10"
                className="w-16 bg-[#13131A] text-white text-sm px-3 py-1.5 rounded-lg border border-gray-700 focus:outline-none focus:border-secondary text-center"
              />
              <span className="text-sm text-gray-400">%</span>
            </div>
          </SettingRow>
          <SettingRow label="Auto-approve Campaigns" description="Campaigns under $500 are automatically approved">
            <Toggle on={form.auto_approve} onToggle={toggle("auto_approve")} />
          </SettingRow>
          <SettingRow label="Maintenance Mode" description="Disable public access — only admins can log in">
            <Toggle on={form.maintenance_mode} onToggle={toggle("maintenance_mode")} />
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
            <Toggle on={form.email_alerts} onToggle={toggle("email_alerts")} />
          </SettingRow>
          <SettingRow label="Fraud Alerts" description="Immediate notification on suspicious activity">
            <Toggle on={form.fraud_alerts} onToggle={toggle("fraud_alerts")} />
          </SettingRow>
          <SettingRow label="Daily Report" description="Receive platform summary every morning at 8am">
            <Toggle on={form.daily_report} onToggle={toggle("daily_report")} />
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
            <Toggle on={form.two_factor} onToggle={toggle("two_factor")} />
          </SettingRow>
          <SettingRow label="Session Timeout" description="Auto-logout after inactivity">
            <select
              value={form.session_timeout}
              onChange={(e) => set("session_timeout")(e.target.value)}
              className="bg-[#13131A] text-white text-sm px-3 py-1.5 rounded-lg border border-gray-700 focus:outline-none focus:border-secondary"
            >
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
            <Toggle on={form.auto_backup} onToggle={toggle("auto_backup")} />
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
          onClick={() => save.mutate()}
          disabled={save.isPending}
          className="flex items-center gap-2 px-10 py-[1px] bg-gradient-to-r from-primary to-secondary text-black rounded-sm font-semibold hover:opacity-90 transition-opacity text-sm border-2 border-white hover:border-secondary disabled:opacity-60"
        >
          <Save size={15} />
          {save.isPending ? "Saving…" : "Save Changes"}
        </button>
      </div>

    </div>
  );
}
