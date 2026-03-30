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
    <div ref={settingsRef} className="space-y-10">
      {/* Header - Account Matrix Style */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-[#0A0A0A] p-10 lg:p-14 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_70%_30%,_#C8FF00_0%,_transparent_70%)] opacity-20" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C8FF00]/10 border border-[#C8FF00]/20 mb-6 font-bold text-[10px] uppercase tracking-widest text-[#C8FF00]">
              <Shield size={14} />
              Identity Management
            </div>
            <h1 className="text-5xl lg:text-6xl font-black tracking-tighter mb-4">Account Matrix</h1>
            <p className="text-lg text-gray-400 font-medium max-w-xl">
              Configure your neural profile and manage security protocols for your AI command center.
            </p>
          </div>
          
          <div className="flex items-center gap-6 p-6 glass-dark rounded-[2rem] border border-white/5">
             <div className="w-16 h-16 rounded-2xl bg-[#C8FF00] flex items-center justify-center text-[#0A0A0A] font-black text-2xl shadow-lg shadow-[#C8FF00]/20">
                {user.first_name[0]}{user.last_name[0]}
             </div>
             <div>
                <p className="text-xl font-black text-white">{user.first_name} {user.last_name}</p>
                <p className="text-sm font-medium text-gray-400 opacity-80">{user.role} Administrator</p>
             </div>
          </div>
        </div>
      </section>

      {/* Status Messages */}
      {message && (
        <div className={`px-8 py-5 rounded-2xl border ${message.type === 'success' ? 'bg-green-50/50 border-green-200 text-green-700' : 'bg-red-50/50 border-red-200 text-red-700'} animate-fade-in`}>
          <div className="flex items-center gap-3">
             <div className={`w-2 h-2 rounded-full ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
             <p className="font-bold text-sm uppercase tracking-widest">{message.text}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Profile Configuration Ledger */}
        <div className="lg:col-span-8">
          <div className="glass rounded-[2.5rem] border border-black/5 p-10 shadow-premium">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-black text-[#0A0A0A] tracking-tight">Identity Profile</h2>
              {!isEditing && (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-3 bg-[#0A0A0A] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2"
                >
                  <Edit2 size={16} />
                  Modify Profile
                </button>
              )}
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[11px] font-bold text-[#6B7280] uppercase tracking-widest px-1">First Canonical Name</label>
                  <div className="relative group">
                     {isEditing ? (
                       <input 
                        type="text" 
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-black/5 border border-black/5 rounded-2xl font-bold text-[#0A0A0A] focus:outline-none focus:border-[#C8FF00] focus:bg-white transition-all"
                       />
                     ) : (
                       <div className="w-full px-6 py-4 bg-black/[0.02] border border-transparent rounded-2xl font-bold text-[#0A0A0A]">
                         {user.first_name}
                       </div>
                     )}
                     <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity">
                        <UserIcon size={18} />
                     </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[11px] font-bold text-[#6B7280] uppercase tracking-widest px-1">Last Canonical Name</label>
                  <div className="relative group">
                     {isEditing ? (
                       <input 
                        type="text" 
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-black/5 border border-black/5 rounded-2xl font-bold text-[#0A0A0A] focus:outline-none focus:border-[#C8FF00] focus:bg-white transition-all"
                       />
                     ) : (
                       <div className="w-full px-6 py-4 bg-black/[0.02] border border-transparent rounded-2xl font-bold text-[#0A0A0A]">
                         {user.last_name}
                       </div>
                     )}
                     <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity">
                        <UserIcon size={18} />
                     </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-bold text-[#6B7280] uppercase tracking-widest px-1">Verified Node Email</label>
                <div className="relative">
                   <input 
                    type="email" 
                    value={user.email}
                    disabled
                    className="w-full px-6 py-4 bg-black/[0.04] border border-black/5 rounded-2xl font-bold text-[#6B7280] cursor-not-allowed italic"
                   />
                   <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] opacity-40">
                      <Mail size={18} />
                   </div>
                </div>
                <p className="text-[10px] font-medium text-[#6B7280] px-1 italic">Node authentication email cannot be modified once established.</p>
              </div>

              {isEditing && (
                <div className="flex gap-4 pt-6 animate-scale-in">
                  <button 
                    type="submit"
                    disabled={saving}
                    className="flex-1 py-4 bg-[#C8FF00] text-[#0A0A0A] rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] hover:shadow-lg hover:shadow-[#C8FF00]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Save size={18} />
                    {saving ? 'Synchronizing...' : 'Save Matrix Updates'}
                  </button>
                  <button 
                    type="button"
                    onClick={handleCancel}
                    className="px-8 py-4 bg-white border border-black/5 text-[#0A0A0A] rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-black/5 transition-all"
                  >
                    Abort
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Security Sidebar - Protocols */}
        <div className="lg:col-span-4 space-y-8">
           <div className="glass rounded-[2.5rem] border border-black/5 p-8 shadow-premium relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8FF00]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-[#0A0A0A] rounded-xl flex items-center justify-center mb-6 shadow-xl">
                   <Shield className="text-[#C8FF00]" size={24} />
                </div>
                <h3 className="text-2xl font-black text-[#0A0A0A] tracking-tighter mb-2 leading-none">Access Protocol</h3>
                <p className="text-xs font-medium text-[#6B7280] leading-relaxed mb-8">Verification status and account activity logs.</p>
                
                <div className="space-y-4">
                   <div className="p-4 rounded-2xl bg-black/5 border border-black/5 flex items-center justify-between">
                      <div>
                         <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Network Node</p>
                         <p className="text-xs font-black text-[#0A0A0A]">Initialized {formattedDate}</p>
                      </div>
                      <Calendar size={16} className="text-[#6B7280]" />
                   </div>
                   
                   <div className="p-4 rounded-2xl bg-[#C8FF00]/10 border border-[#C8FF00]/20 flex items-center justify-between">
                      <div>
                         <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Security Level</p>
                         <p className="text-xs font-black text-[#0A0A0A] uppercase tracking-tighter">Level 4 Administrator</p>
                      </div>
                      <Shield size={16} className="text-[#C8FF00]" />
                   </div>
                </div>

                <div className="mt-10 pt-8 border-t border-black/5 space-y-3">
                   <p className="text-[11px] font-bold text-[#0A0A0A] uppercase tracking-[0.2em] mb-4">Master Controls</p>
                   <button className="w-full flex items-center justify-between p-4 rounded-xl bg-black/5 hover:bg-black/10 transition-all group">
                      <span className="text-xs font-bold text-[#0A0A0A]">Reset Access Key</span>
                      <Edit2 size={14} className="group-hover:translate-x-1 transition-transform" />
                   </button>
                   <button className="w-full flex items-center justify-between p-4 rounded-xl bg-black/5 hover:bg-black/10 transition-all group">
                      <span className="text-xs font-bold text-[#0A0A0A]">Download Artifact Log</span>
                      <Save size={14} className="group-hover:translate-x-1 transition-transform" />
                   </button>
                   <button className="w-full flex items-center justify-between p-4 rounded-xl bg-red-50 hover:bg-red-100 transition-all group">
                      <span className="text-xs font-bold text-red-600">Decommission Node</span>
                      <X size={14} className="text-red-600 group-hover:rotate-90 transition-transform" />
                   </button>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
