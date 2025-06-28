import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { Editor } from "primereact/editor";

export default function Page() {
  return (
    <section className="p-4!">
      <div className="flex justify-between items-center w-full">
        <div className="space-y-3!">
          <h1 className="text-2xl">Terms & Condition</h1>
          <p>Admin can edit personal information</p>
        </div>
      </div>
      <Card className="mt-6!">
        <CardContent>
          <Editor style={{ height: "40dvh" }} />
        </CardContent>
        <CardFooter>
          <Button className="text-foreground rounded-md w-full">
            Update Terms & Conditions
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
