"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { useDashboard } from "@/lib/dashboard-context";
import { User as UserIcon, Mail, Calendar, Shield, Edit2, Save, X } from "lucide-react";

export default function SettingsSection() {
  const { user, refreshUser } = useDashboard();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (settingsRef.current) {
      gsap.fromTo(
        ".settings-card",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulate saving (in a real app, this would call an API)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setMessage({
        type: "success",
        text: "Profile updated successfully!",
      });
      setIsEditing(false);
      await refreshUser();

      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to update profile",
      });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
    });
    setIsEditing(false);
  };

  if (!user) return null;

  const joinDate = new Date(user.created_at);
  const formattedDate = joinDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-6" ref={settingsRef}>
      {/* Header */}
      <div className="bg-[#C8FF00] rounded-xl p-8 text-[#0A0A0A] shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
        <p className="text-[#0A0A0A]">Manage your profile and account preferences</p>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div
          className={`px-6 py-4 rounded-lg border ${
            message.type === "success"
              ? "bg-green-50 border-green-200 text-green-700"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          <p className="font-medium">{message.text}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Section */}
        <div className="lg:col-span-2">
          <div className="settings-card bg-white rounded-xl shadow-md border border-black/10 p-8">
            <h2 className="text-2xl font-bold text-[#0A0A0A] mb-6">Profile Information</h2>

            {!isEditing ? (
              <div className="space-y-6">
                {/* Profile Header */}
                <div className="flex items-start gap-6 pb-6 border-b border-black/10">
                  <div className="w-24 h-24 bg-[#C8FF00] rounded-lg flex items-center justify-center text-[#0A0A0A]">
                    <UserIcon size={48} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#0A0A0A]">
                      {user.first_name} {user.last_name}
                    </h3>
                    <p className="text-[#6B7280] mt-1">{user.email}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <Shield size={16} className="text-[#C8FF00]" />
                      <span className="text-sm font-semibold text-[#0A0A0A] capitalize">
                        {user.role} Account
                      </span>
                    </div>
                  </div>
                </div>

                {/* User Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">
                      First Name
                    </label>
                    <p className="text-lg font-semibold text-[#0A0A0A] mt-2">
                      {user.first_name}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">
                      Last Name
                    </label>
                    <p className="text-lg font-semibold text-[#0A0A0A] mt-2">
                      {user.last_name}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide flex items-center gap-2">
                      <Mail size={14} /> Email
                    </label>
                    <p className="text-lg font-semibold text-[#0A0A0A] mt-2">
                      {user.email}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide flex items-center gap-2">
                      <Calendar size={14} /> Member Since
                    </label>
                    <p className="text-lg font-semibold text-[#0A0A0A] mt-2">
                      {formattedDate}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-6 flex items-center gap-2 px-6 py-2 bg-[#C8FF00] text-[#0A0A0A] rounded-lg hover:bg-[#C8FF00]/90 transition-colors font-medium"
                >
                  <Edit2 size={18} />
                  Edit Profile
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-semibold text-[#0A0A0A] mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8FF00]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0A0A0A] mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8FF00]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0A0A0A] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled
                    className="w-full px-4 py-2 border border-black/10 rounded-lg bg-black/5 cursor-not-allowed"
                  />
                  <p className="text-xs text-[#6B7280] mt-1">
                    Email cannot be changed
                  </p>
                </div>

                <div className="flex gap-2 pt-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-2 bg-[#C8FF00] text-[#0A0A0A] rounded-lg hover:bg-[#C8FF00]/90 disabled:opacity-50 transition-colors font-medium"
                  >
                    <Save size={18} />
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-2 bg-black/5 text-[#0A0A0A] rounded-lg hover:bg-black/10 transition-colors font-medium border border-black/10"
                  >
                    <X size={18} />
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="lg:col-span-1 space-y-4">
          <div className="settings-card bg-[#C8FF00]/10 rounded-xl p-6 border border-[#C8FF00]/20">
            <h3 className="text-lg font-bold text-[#0A0A0A] mb-4">Account Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#0A0A0A]">Status</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#0A0A0A]">Role</span>
                <span className="px-3 py-1 bg-[#C8FF00]/20 text-[#0A0A0A] rounded-full text-xs font-semibold capitalize">
                  {user.role}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#0A0A0A]">Verification</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  Verified
                </span>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="settings-card bg-black/5 rounded-xl p-6 border border-black/10">
            <h3 className="text-lg font-bold text-[#0A0A0A] mb-4">Security</h3>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-2 bg-white hover:bg-black/2 border border-black/10 rounded-lg text-sm font-medium text-[#0A0A0A] transition-colors">
                Change Password
              </button>
              <button className="w-full text-left px-4 py-2 bg-white hover:bg-black/2 border border-black/10 rounded-lg text-sm font-medium text-[#0A0A0A] transition-colors">
                Two-Factor Auth
              </button>
              <button className="w-full text-left px-4 py-2 bg-white hover:bg-red-50 border border-red-200 rounded-lg text-sm font-medium text-red-600 transition-colors">
                Delete Account
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="settings-card bg-[#C8FF00]/10 rounded-xl p-6 border border-[#C8FF00]/20">
            <h3 className="text-lg font-bold text-[#0A0A0A] mb-4">Preferences</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm text-[#0A0A0A]">Email Notifications</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm text-[#0A0A0A]">Price Alerts</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm text-[#0A0A0A]">Weekly Report</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
