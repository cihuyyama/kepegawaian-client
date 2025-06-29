// app/dashboard/users/page.tsx
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { UserBreadcrumb } from "@/components/users/user-breadcrumb";
import { UserTable } from "@/components/users/user-table";
import { dummyUsers } from "@/components/users/user-data";

export default function UsersPage() {
  return (
    <ContentLayout title="Users">
      <UserBreadcrumb />
      <UserTable users={dummyUsers} />
    </ContentLayout>
  );
}
