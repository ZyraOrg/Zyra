import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../../../services/api";
import LoadingSpinner from "../../../components/LoadingSpinner";

export default function Privacy() {
  const [anonymousDonation, setAnonymousDonation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    loadPrivacySettings();
  }, []);

  const loadPrivacySettings = async () => {
    setIsLoadingData(true);
    try {
      const { data } = await api.getProfile();
      setAnonymousDonation(data?.anonymousDonation || false);
    } catch (err) {
      console.error("Error loading privacy settings:", err);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      await api.saveProfile({
        anonymousDonation,
      });

      toast.success("Privacy settings updated successfully");
    } catch (err) {
      console.error("Error saving privacy settings:", err);
      toast.error(err?.message || "Failed to update privacy settings");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    try {
      // Implement password change API call here
      toast.success("Password changed successfully");
      setShowPasswordModal(false);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Error changing password:", err);
      toast.error(err?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  if (isLoadingData) {
    return <LoadingSpinner message="Loading privacy settings..." />;
  }

  return (
    <div>
      <h1 className="text-lg md:text-2xl font-bold mb-6 p-4 md:p-6 bg-[#010410] rounded-sm">
        Privacy & <span className="text-secondary">security</span>
      </h1>

      <div className="space-y-1 text-sm md:text-md">
        {/* Password Section */}
        <div className="flex items-center justify-between p-4 md:p-6 bg-[#010410] rounded-sm">
          <div>
            <span className="text-white font-semibold block mb-1">
              Password
            </span>
            <span className="text-gray-400">••••••</span>
          </div>
          <button
            onClick={() => setShowPasswordModal(true)}
            className="border-button-gradient rounded-sm"
          >
            <div className="bg-background rounded-sm text-sm px-3 md:px-12 py-1">
              {" "}
              Change password
            </div>
          </button>
        </div>

        {/* Anonymous Donation Toggle */}
        <div className="flex items-center justify-between p-4 md:p-6 bg-[#010410] rounded-sm">
          <span className="text-white font-semibold">Anonymous donation</span>
          <button
            onClick={() => setAnonymousDonation(!anonymousDonation)}
            className="relative inline-flex h-7 w-16 items-center rounded-full transition-all overflow-hidden"
            style={{
              background: anonymousDonation ? " #06b6d4" : "#4B5563",
            }}
          >
            <span
              className={`inline-block h-5 w-6 transform rounded-full transition-transform bg-secondary shadow-lg ${
                anonymousDonation ? "translate-x-9" : "translate-x-1 bg-white"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Save Changes Button */}
      <div className="mt-12 flex justify-center">
        <button
          onClick={handleSaveChanges}
          disabled={loading}
          className="px-15 py-[1px] bg-gradient-to-r from-primary to-secondary text-black rounded-sm shadow-md shadow-primary hover:opacity-90 transition-opacity font-semibold text-sm disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save changes"}
        </button>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-background/95 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#13131A] rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-6 text-white">
              Change Password
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      currentPassword: e.target.value,
                    })
                  }
                  className="w-full bg-[#010410] text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-secondary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full bg-[#010410] text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-secondary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full bg-[#010410] text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-secondary"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setPasswordForm({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  });
                }}
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordChange}
                disabled={loading}
                className="flex-1 text-sm md:text-md px-4 py-2 bg-gradient-to-r from-primary to-secondary text-black rounded-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? "Changing..." : "Change Password"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
