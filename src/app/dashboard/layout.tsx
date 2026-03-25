import { DashboardProvider } from "@/lib/dashboard-context";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <DashboardLayout initialSection="home">
        {children}
      </DashboardLayout>
    </DashboardProvider>
  );
}
