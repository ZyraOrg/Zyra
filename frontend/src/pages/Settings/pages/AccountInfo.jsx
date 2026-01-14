import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../../../services/api";
import useAuthStore from "../../../store/useAuthStore";
// import LoadingSpinner from "../../../components/LoadingSpinner";

export default function AccountInfo() {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [isLoadingData, setIsLoadingData] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    role: "",
    dateJoined: "",
  });

  useEffect(() => {
    loadUserData();
  }, [user]);

  const loadUserData = async () => {
    // setIsLoadingData(true);
    try {
      const { data } = await api.getUser();
      const userData = data?.user || {};

      setFormData({
        fullName: userData?.name || userData?.username || "",
        email: userData?.email || "",
        phoneNumber: userData?.phone || userData?.phoneNumber || "",
        role: userData?.role || "Donor",
        dateJoined: userData?.createdAt
          ? formatDate(userData.createdAt)
          : formatDate(new Date()),
      });
    } catch (err) {
      console.error("Error loading user data:", err);
    } finally {
      // setIsLoadingData(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();

    const suffix =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
        ? "rd"
        : "th";

    return `${day}${suffix} ${month}, ${year}`;
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    loadUserData();
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.saveProfile({
        name: formData.fullName,
        phone: formData.phoneNumber,
      });

      // Update auth store
      useAuthStore.getState().checkAuth();

      toast.success("Account information updated successfully");
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving profile:", err);
      toast.error(err?.message || "Failed to update account information");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // if (isLoadingData) {
  //   return <LoadingSpinner message="Loading account information..." />;
  // }

  return (
    <div>
      <h1 className="text-lg md:text-2xl font-bold mb-6 p-4 md:p-6 bg-[#010410] rounded-sm">
        Account <span className="text-secondary">Info</span>
      </h1>

      <div className="space-y-1 text-sm md:text-md">
        {/* Full Name */}
        <div className="flex items-center justify-between p-4 md:p-6 bg-[#010410] rounded-sm">
          <span className="text-white font-semibold">Full name</span>
          {isEditing ? (
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              className="bg-[#13131A] text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-secondary"
            />
          ) : (
            <span className="text-gray-400">
              {formData.fullName || "Not set"}
            </span>
          )}
        </div>

        {/* Email Address */}
        <div className="flex items-center justify-between p-4 md:p-6 bg-[#010410] rounded-sm">
          <span className="text-white font-semibold">Email address</span>
          <span className="text-gray-400">{formData.email}</span>
        </div>

        {/* Phone Number */}
        <div className="flex items-center justify-between p-4 md:p-6 bg-[#010410] rounded-sm">
          <span className="text-white font-semibold">Phone number</span>
          {isEditing ? (
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              className="bg-[#13131A] text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-secondary"
            />
          ) : (
            <span className="text-gray-400">
              {formData.phoneNumber || "Not set"}
            </span>
          )}
        </div>

        {/* Account Role */}
        <div className="flex items-center justify-between p-4 md:p-6 bg-[#010410] rounded-sm">
          <span className="text-white font-semibold">Account role</span>
          <span className="text-gray-400">{formData.role}</span>
        </div>

        {/* Date Joined */}
        <div className="flex items-center justify-between p-4 md:p-6 bg-[#010410] rounded-sm">
          <span className="text-white font-semibold">Date joined</span>
          <span className="text-gray-400">{formData.dateJoined}</span>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-12 flex justify-center">
        {isEditing ? (
          <div className="flex gap-4">
            <button
              onClick={handleCancel}
              disabled={loading}
              className="px-8 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-15 py-[1px] bg-gradient-to-r from-primary to-secondary text-black rounded-sm shadow-md shadow-primary hover:opacity-90 transition-opacity font-semibold text-sm"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        ) : (
          <button
            onClick={handleEdit}
            className="px-15 py-[1px] bg-gradient-to-r from-primary to-secondary text-black rounded-sm shadow-md shadow-primary hover:opacity-90 transition-opacity font-semibold text-sm"
          >
            Edit Info
          </button>
        )}
      </div>
    </div>
  );
}
