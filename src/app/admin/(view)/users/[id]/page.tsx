import { notFound } from "next/navigation";
import Profile from "./profile";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const store = await params;
  const id = store.id;
  if (!id) {
    return notFound();
  }
  return (
    <div className="bg-background p-8">
      <div className="w-full space-y-8!">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Profile details</h1>
          <p className="text-xl text-muted-foreground">
            Detailed profile and activity overview of the selected admin.
          </p>
        </div>

        <Profile id={id} />
      </div>
    </div>
  );
}
