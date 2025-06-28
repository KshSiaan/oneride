import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ImageIcon, MapPin, PhoneIcon, User2Icon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <section className="p-4!">
      <div className="flex justify-between items-center w-full">
        <div className="space-y-3!">
          <h1 className="text-2xl">Personal Information</h1>
          <p>Admin can edit personal information</p>
        </div>
      </div>
      <Card className="mt-6!">
        <CardContent className="flex flex-col justify-center items-center gap-4">
          <div className="flex flex-col justify-center items-center gap-2">
            <label htmlFor="profilepic">
              <div className="size-34 border-2 border-dashed rounded-md flex items-center justify-center cursor-pointer hover:scale-105 hover:bg-zinc-950 transition-all ease-in-out">
                <ImageIcon className="text-secondary" />
              </div>
            </label>
            <input
              type="file"
              className="hidden"
              id="profilepic"
              name="profilepic"
            />
          </div>
          <h1 className="text-2xl">Upload your photo</h1>

          <form className="grid grid-cols-2 gap-6 w-full">
            <div className="col-span-1">
              <FormInput
                icon={<User2Icon className="size-5 text-muted-foreground" />}
                placeholder="First name"
              />
            </div>
            <div className="col-span-1">
              <FormInput
                icon={<User2Icon className="size-5 text-muted-foreground" />}
                placeholder="Last name"
              />
            </div>
            <div className="col-span-2">
              <FormInput
                icon={<PhoneIcon className="size-5 text-muted-foreground" />}
                placeholder="Contact number"
              />
            </div>
            <div className="col-span-2">
              <FormInput
                icon={<MapPin className="size-5 text-muted-foreground" />}
                placeholder="Location"
              />
              <Button className="col-span-2 w-full mt-6! rounded-md font-semibold text-foreground!">
                Save changes
              </Button>
              <Button
                className="col-span-2 w-full mt-6! rounded-md font-semibold text-foreground!"
                variant="outline"
                asChild
              >
                <Link href={"info/update-pass"}>Update password form here</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
function FormInput({
  icon,
  placeholder,
}: {
  icon: React.ReactNode;
  placeholder: string;
}) {
  return (
    <div className="flex items-center gap-2 border rounded-md pl-3! bg-background focus-within:ring-2 ring-ring transition">
      {icon}
      <Input
        className="border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0! bg-inherit!"
        placeholder={placeholder}
      />
    </div>
  );
}
