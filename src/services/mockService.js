export const mockVerifyCompany = async (data) => {
  await new Promise((r) => setTimeout(r, 1200));
  if (data.companyName && data.password) {
    return { success: true, companyName: data.companyName, token: "mock-token-xyz" };
  }
  throw { message: "Invalid company name or password." };
};

export const mockSaveUserDetails = async (data) => {
  await new Promise((r) => setTimeout(r, 1200));
  if (data.email) return { success: true, message: "OTP sent successfully." };
  throw { message: "Failed to send OTP." };
};

export const mockVerifyOtp = async (data) => {
  await new Promise((r) => setTimeout(r, 1000));
  if (data.otp === "724106" || data.otp?.length === 6) return { success: true };
  throw { message: "Invalid OTP. Please try again." };
};

export const mockResendOtp = async () => {
  await new Promise((r) => setTimeout(r, 800));
  return { success: true, message: "OTP resent successfully." };
};

export const mockFetchInterests = async () => {
  await new Promise((r) => setTimeout(r, 1000));
  return {
    success: true,
    data: [
      { id: 1, name: "Fitness", icon: "🏋️" },
      { id: 2, name: "Nutrition", icon: "🥗" },
      { id: 3, name: "Mental Health", icon: "🧠" },
      { id: 4, name: "Sleep", icon: "😴" },
      { id: 5, name: "Meditation", icon: "🧘" },
      { id: 6, name: "Yoga", icon: "🤸" },
      { id: 7, name: "Running", icon: "🏃" },
      { id: 8, name: "Cycling", icon: "🚴" },
      { id: 9, name: "Swimming", icon: "🏊" },
      { id: 10, name: "Work-Life Balance", icon: "⚖️" },
      { id: 11, name: "Stress Management", icon: "🌿" },
      { id: 12, name: "Social Wellness", icon: "🤝" },
    ],
  };
};

export const mockCompleteRegistration = async (data) => {
  await new Promise((r) => setTimeout(r, 1800));
  return { success: true, message: "Registration completed successfully!", userId: "usr_" + Date.now() };
};

export const PILLARS = [
  { id: 1, name: "Physical", description: "Body strength & fitness", icon: "💪", color: "#C8515A" },
  { id: 2, name: "Mental", description: "Mind & cognitive health", icon: "🧠", color: "#6366f1" },
  { id: 3, name: "Emotional", description: "Feelings & relationships", icon: "❤️", color: "#ec4899" },
  { id: 4, name: "Social", description: "Community & connection", icon: "🤝", color: "#10b981" },
  { id: 5, name: "Spiritual", description: "Purpose & meaning", icon: "✨", color: "#f59e0b" },
  { id: 6, name: "Financial", description: "Financial wellness", icon: "💰", color: "#3b82f6" },
];
